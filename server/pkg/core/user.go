package core

import (
	"context"
	"database/sql"
	"fmt"
	"log"

	"github.com/huandu/go-sqlbuilder"
	"github.com/jmoiron/sqlx"
)

var (
	ErrUserDoesNotExists = fmt.Errorf("User does not exists")
)

type UserContainer struct {
	connection *sqlx.DB
}

func NewUserContainer(connection *sqlx.DB) *UserContainer {
	return &UserContainer{
		connection: connection,
	}
}

func (ac *UserContainer) GetUserByID(ctx context.Context, id string) (*User, error) {
	sb := sqlbuilder.PostgreSQL.NewSelectBuilder().From("users")
	_sql, args := sb.Select("*").
		Where(sb.Equal("id", id)).
		Where(sb.IsNull("deleted_at")).
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

	return &user, nil
}

func (ac *UserContainer) GetUserByEmail(ctx context.Context, email string) (*User, error) {
	sb := sqlbuilder.PostgreSQL.NewSelectBuilder().From("users")
	_sql, args := sb.Select("*").
		Where(sb.Equal("email", email)).
		Where(sb.IsNull("deleted_at")).
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

	return &user, nil
}
