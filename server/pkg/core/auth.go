package core

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"time"

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

func (ac *AuthContainer) CreateUser(ctx context.Context, name, email, password string) (*User, error) {
	tx, err := ac.connection.BeginTxx(ctx, nil)
	if err != nil {
		log.Println("failed to begin transaction", err)

		return nil, ErrInternalError
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
		return nil, ErrInternalError
	}

	if count > 0 {
		rollbackx(tx)

		return nil, ErrUserAlreadyExists
	}

	hashedPwd, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		log.Println("failed to generate password", err)

		rollbackx(tx)
		return nil, ErrInternalError
	}

	user := User{
		ID:       ulid.Make().String(),
		Name:     name,
		Email:    email,
		Password: string(hashedPwd),
	}

	_sql, args = sqlbuilder.PostgreSQL.NewInsertBuilder().
		InsertInto("users").Cols("id", "name", "email", "password").
		Values(user.ID, user.Name, user.Email, user.Password).
		Build()

	_, err = tx.ExecContext(ctx, _sql, args...)
	if err != nil {
		log.Println("failed to insert", err)

		rollbackx(tx)
		return nil, ErrInternalError
	}

	return &user, tx.Commit()
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

func (ac *AuthContainer) UpdateUser(ctx context.Context, currentUser *User, name, email, password *string) error {
	if email == nil {
		email = &currentUser.Email
	}

	if name == nil {
		name = &currentUser.Name
	}

	tx, err := ac.connection.BeginTxx(ctx, nil)
	if err != nil {
		log.Println("failed to begin transaction", err)
		return ErrInternalError
	}

	sb := sqlbuilder.PostgreSQL.NewSelectBuilder().From("users")

	if currentUser.Email != *email {
		_sql, args := sb.Select("count(*)").
			Where(sb.Equal("email", email)).
			Where(sb.NotEqual("id", currentUser.ID)).
			Limit(1).
			Build()

		res := tx.QueryRowxContext(ctx, _sql, args...)
		var count int
		if err := res.Scan(&count); err != nil {
			log.Println("failed to scan", err)

			rollbackx(tx)
			return ErrInternalError
		}

		if count > 0 {
			rollbackx(tx)
			return ErrUserAlreadyExists
		}

	}

	if password != nil {
		hashedPwd, err := bcrypt.GenerateFromPassword([]byte(*password), bcrypt.DefaultCost)
		if err != nil {
			log.Println("failed to generate password", err)

			rollbackx(tx)
			return ErrInternalError
		}

		_pwd := string(hashedPwd)
		password = &_pwd
	} else {
		password = &currentUser.Password
	}

	ub := sqlbuilder.PostgreSQL.NewUpdateBuilder().Update("users")
	_sql, args := ub.Set(
		ub.Assign("name", *name),
		ub.Assign("email", *email),
		ub.Assign("password", *password),
	).Where(ub.Equal("id", currentUser.ID)).Build()

	_, err = tx.ExecContext(ctx, _sql, args...)
	if err != nil {
		log.Println("failed to update", err)

		rollbackx(tx)
		return ErrInternalError
	}

	return tx.Commit()
}

func (ac *AuthContainer) SoftDeleteUser(ctx context.Context, currentUser *User) error {
	tx, err := ac.connection.BeginTxx(ctx, nil)
	if err != nil {
		log.Println("failed to begin transaction", err)
		return ErrInternalError
	}

	ub := sqlbuilder.PostgreSQL.NewUpdateBuilder().Update("users")
	_sql, args := ub.Set(
		ub.Assign("deleted_at", time.Now()),
	).Where(ub.Equal("id", currentUser.ID)).Build()

	_, err = tx.ExecContext(ctx, _sql, args...)
	if err != nil {
		log.Println("failed to update", err)

		rollbackx(tx)
		return ErrInternalError
	}

	return tx.Commit()
}
