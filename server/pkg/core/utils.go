package core

import (
	"database/sql"
	"log"

	"github.com/jmoiron/sqlx"
)

func rollback(tx *sql.Tx) {
	if err := tx.Rollback(); err != nil {
		log.Println("failed to rollback", err)
	}
}

func rollbackx(tx *sqlx.Tx) {
	if err := tx.Rollback(); err != nil {
		log.Println("failed to rollback", err)
	}
}
