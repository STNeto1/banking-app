package handlers

import (
	"github.com/jmoiron/sqlx"
	"github.com/stneto1/banking-server/pkg/core"
)

type Container struct {
	connection    *sqlx.DB
	authContainer *core.AuthContainer
}

func CreateContainer(connection *sqlx.DB) *Container {
	return &Container{
		connection:    connection,
		authContainer: core.NewAuthContainer(connection),
	}
}
