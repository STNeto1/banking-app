package handlers

import (
	"github.com/jmoiron/sqlx"
	"github.com/stneto1/banking-server/pkg/core"
)

type Container struct {
	connection      *sqlx.DB
	authContainer   *core.AuthContainer
	userContainer   *core.UserContainer
	inviteContainer *core.InviteContainer
}

func CreateContainer(connection *sqlx.DB) *Container {
	return &Container{
		connection:      connection,
		authContainer:   core.NewAuthContainer(connection),
		userContainer:   core.NewUserContainer(connection),
		inviteContainer: core.NewInviteContainer(connection),
	}
}
