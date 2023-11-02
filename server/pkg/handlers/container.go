package handlers

import "github.com/jmoiron/sqlx"

type Container struct {
	connection *sqlx.DB
}

func CreateContainer(connection *sqlx.DB) *Container {
	return &Container{
		connection: connection,
	}
}
