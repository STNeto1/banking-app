package core

import (
	"log"

	"github.com/huandu/go-sqlbuilder"
	"github.com/jmoiron/sqlx"
	_ "github.com/mattn/go-sqlite3"
)

func CreateDB() *sqlx.DB {
	return nil
}

func CreateTempDB() *sqlx.DB {
	// This commented like is to create a temporary database in /tmp
	// db, err := sqlx.Connect("sqlite3", fmt.Sprintf("file:/tmp/%s.db", ulid.MustNew(ulid.Now(), nil).String()))
	db, err := sqlx.Connect("sqlite3", ":memory:")
	if err != nil {
		log.Fatalln("failed to connect", err)
	}

	for _, schema := range getSchemas() {
		_, err := db.Exec(schema)
		if err != nil {
			log.Fatalln("failed to create table", err)
		}
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

	return []string{usersTableSql, addSoftDeleteToUsersTableSql, invitesTableSql, invitesUniqueIndex}
}
