package core

import (
	"fmt"
	"log"

	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/sqlite3"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"github.com/jmoiron/sqlx"
	_ "github.com/mattn/go-sqlite3"
)

func CreateDB() *sqlx.DB {
	db, err := sqlx.Connect("sqlite3", fmt.Sprintf("file:%s.db", "dev"))
	if err != nil {
		log.Fatalln("failed to connect", err)
	}

	return db
}

func CreateTempDB() *sqlx.DB {
	// This commented like is to create a temporary database in /tmp
	// db, err := sqlx.Connect("sqlite3", fmt.Sprintf("file:/tmp/%s.db", "sut"))
	db, err := sqlx.Connect("sqlite3", ":memory:")
	if err != nil {
		log.Fatalln("failed to connect", err)
	}

	driver, err := sqlite3.WithInstance(db.DB, &sqlite3.Config{})
	m, err := migrate.NewWithDatabaseInstance("file://../../db/migrations", "sqlite3", driver)
	if err != nil {
		log.Fatalln("failed to create migration instance", err)
	}

	if err := m.Up(); err != nil {
		log.Fatalln("failed to run migrations", err)
	}

	return db
}
