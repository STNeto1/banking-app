package core

import (
	"context"
	"log"

	"github.com/huandu/go-sqlbuilder"
	"github.com/jmoiron/sqlx"
)

type FriendContainer struct {
	connection *sqlx.DB
}

func NewFriendContainer(connection *sqlx.DB) *FriendContainer {
	return &FriendContainer{
		connection: connection,
	}
}

// list your friends
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

// delete friend
