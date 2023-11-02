package main

import (
	"log"

	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/sqlite3"
	_ "github.com/golang-migrate/migrate/v4/source/file"

	"github.com/stneto1/banking-server/pkg/core"
)

func main() {
	db := core.CreateDB()

	driver, err := sqlite3.WithInstance(db.DB, &sqlite3.Config{})
	m, err := migrate.NewWithDatabaseInstance("file://db/migrations", "sqlite3", driver)
	if err != nil {
		log.Fatalln("failed to create migration instance", err)
	}

	if err := m.Up(); err != nil {
		log.Fatalln("failed to run migrations", err)
	}
}
