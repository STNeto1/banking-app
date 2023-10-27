package core

import (
	"context"
	"database/sql"
	"fmt"
	"log"

	"github.com/huandu/go-sqlbuilder"
	"github.com/jmoiron/sqlx"
	"github.com/oklog/ulid/v2"
	"golang.org/x/crypto/bcrypt"
)

var (
	ErrUserAlreadyExists  = fmt.Errorf("User already exists")
	ErrUserDoesNotExists  = fmt.Errorf("User does not exists")
	ErrInvalidCredentials = fmt.Errorf("Invalid credentials")
	ErrInternalError      = fmt.Errorf("Internal error")
)

type AuthContainer struct {
	tokenSecret []byte
	connection  *sqlx.DB
}

func NewAuthContainer(connection *sqlx.DB) *AuthContainer {
	return &AuthContainer{
		tokenSecret: []byte("secret"),
		connection:  connection,
	}
}

func (ac *AuthContainer) CreateUser(ctx context.Context, name, email, password string) error {
	tx, err := ac.connection.BeginTxx(ctx, nil)
	if err != nil {
		return err
	}

	sb := sqlbuilder.PostgreSQL.NewSelectBuilder().
		From("users")
	_sql, args := sb.Select("count(*)").
		Where(sb.Equal("email", email)).
		Build()

	res := tx.QueryRowxContext(ctx, _sql, args...)
	var count int
	err = res.Scan(&count)
	if err != nil {
		log.Println("failed to scan", err)

		rollbackx(tx)
		return ErrInternalError
	}

	if count > 0 {
		rollbackx(tx)

		return ErrUserAlreadyExists
	}

	hashedPwd, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		log.Println("failed to generate password", err)

		rollbackx(tx)
		return ErrInternalError
	}

	_sql, args = sqlbuilder.PostgreSQL.NewInsertBuilder().
		InsertInto("users").Cols("id", "name", "email", "password").
		Values(ulid.Make().String(), name, email, string(hashedPwd)).
		Build()

	_, err = tx.ExecContext(ctx, _sql, args...)
	if err != nil {
		log.Println("failed to insert", err)

		rollbackx(tx)
		return ErrInternalError
	}

	return tx.Commit()
}

func (ac *AuthContainer) AuthenticateUser(ctx context.Context, email, password string) (*User, error) {
	sb := sqlbuilder.PostgreSQL.NewSelectBuilder().From("users")
	_sql, args := sb.Select("*").
		Where(sb.Equal("email", email)).
		Limit(1).
		Build()

	res := ac.connection.QueryRowxContext(ctx, _sql, args...)
	var user User
	err := res.StructScan(&user)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, ErrUserDoesNotExists
		}

		log.Println("failed to scan", err)

		return nil, ErrInternalError
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if err != nil {
		return nil, ErrInvalidCredentials
	}

	return &user, nil
}
