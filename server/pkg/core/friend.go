package core

import (
	"context"
	"fmt"
	"log"

	"github.com/huandu/go-sqlbuilder"
	"github.com/jmoiron/sqlx"
)

var (
	ErrFriendDoesNotExist = fmt.Errorf("Friend does not exist")
)

type FriendContainer struct {
	connection *sqlx.DB
}

func NewFriendContainer(connection *sqlx.DB) *FriendContainer {
	return &FriendContainer{
		connection: connection,
	}
}

func (fc *FriendContainer) GetFriends(ctx context.Context, userID string) ([]User, error) {
	sb := sqlbuilder.PostgreSQL.NewSelectBuilder().From("friends")

	_sql, args := sb.Select("users.*").Where(sb.Equal("friends.user_id", userID)).
		JoinWithOption(sqlbuilder.LeftJoin, "users", "friends.friend_id= users.id").
		Build()

	rows, err := fc.connection.QueryxContext(ctx, _sql, args...)
	if err != nil {
		log.Println("failed to query", err)

		return nil, ErrInternalError
	}
	defer rows.Close()

	var users []User
	for rows.Next() {
		var row User
		err = rows.StructScan(&row)
		if err != nil {
			log.Println("failed to scan", err)

			return nil, ErrInternalError
		}

		users = append(users, row)
	}

	return users, nil
}

func (fc *FriendContainer) DeleteFriend(ctx context.Context, userID, friendID string) error {
	tx, err := fc.connection.BeginTxx(ctx, nil)
	if err != nil {
		log.Println("error creating transaction", err)

		return ErrInternalError
	}

	sb := sqlbuilder.PostgreSQL.NewSelectBuilder().From("friends")
	_sql, args := sb.Select("count(*)").
		Where(sb.Equal("user_id", userID), sb.Equal("friend_id", friendID)).
		Build()

	row := tx.QueryRowxContext(ctx, _sql, args...)
	if err != nil {
		log.Println("failed to query", err)

		return ErrInternalError
	}
	var count int
	if err := row.Scan(&count); err != nil {
		log.Println("error scanning friends count", err)

		rollbackx(tx)
		return ErrInternalError
	}

	if count == 0 {
		rollbackx(tx)
		return ErrFriendDoesNotExist
	}

	db := sqlbuilder.PostgreSQL.NewDeleteBuilder().DeleteFrom("friends")
	_sql, args = db.
		Where(db.Equal("user_id", userID), db.Equal("friend_id", friendID)).
		Build()

	_, err = tx.ExecContext(ctx, _sql, args...)
	if err != nil {
		log.Println("error deleting row", err)

		rollbackx(tx)
		return ErrInternalError
	}

	if err := tx.Commit(); err != nil {
		log.Println("error commiting transaction", err)

		return ErrInternalError
	}

	return nil
}
