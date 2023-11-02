package core

import (
	"fmt"
	"log"

	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/sqlite3"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"github.com/huandu/go-sqlbuilder"
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

func getSchemas() []string {
	usersTableSql, _ := sqlbuilder.NewCreateTableBuilder().
		CreateTable("users").
		IfNotExists().
		Define("id", "varchar(26)", "PRIMARY KEY").
		Define("name", "varchar(255)", "NOT NULL").
		Define("email", "varchar(255)", "NOT NULL UNIQUE").
		Define("password", "varchar(255)", "NOT NULL").
		Define("created_at", "timestamp", "NOT NULL DEFAULT CURRENT_TIMESTAMP").
		Build()

	addSoftDeleteToUsersTableSql, _ := sqlbuilder.Buildf("ALTER TABLE users ADD COLUMN deleted_at timestamp").Build()

	invitesTableSql, _ := sqlbuilder.NewCreateTableBuilder().
		CreateTable("invites").
		IfNotExists().
		Define("id", "varchar(26)", "PRIMARY KEY").
		Define("from_user_id", "varchar(26)", "NOT NULL", "REFERENCES users(id)").
		Define("to_user_id", "varchar(26)", "NOT NULL", "REFERENCES users(id)").
		Define("status", "varchar(20)", "NOT NULL").
		Define("created_at", "timestamp", "NOT NULL DEFAULT CURRENT_TIMESTAMP").
		Build()

	invitesUniqueIndex, _ := sqlbuilder.Buildf("CREATE UNIQUE INDEX invites_unique_key ON invites (from_user_id, to_user_id)").Build()

	// sql of a "friends" kind of table between users using many to many relationship
	friendsTableSql, _ := sqlbuilder.NewCreateTableBuilder().
		CreateTable("friends").
		IfNotExists().
		Define("id", "varchar(26)", "PRIMARY KEY").
		Define("user_id", "varchar(26)", "NOT NULL", "REFERENCES users(id)").
		Define("friend_id", "varchar(26)", "NOT NULL", "REFERENCES users(id)").
		Define("created_at", "timestamp", "NOT NULL DEFAULT CURRENT_TIMESTAMP").
		Build()

	friendsUniqueIndex, _ := sqlbuilder.Buildf("CREATE UNIQUE INDEX friends_unique_key ON friends (user_id, friend_id)").Build()

	return []string{usersTableSql, addSoftDeleteToUsersTableSql, invitesTableSql, invitesUniqueIndex, friendsTableSql, friendsUniqueIndex}
}
