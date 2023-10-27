package core

import "github.com/jmoiron/sqlx"

type InviteContainer struct {
	connection *sqlx.DB
}
