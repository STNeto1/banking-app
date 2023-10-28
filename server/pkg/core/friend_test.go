package core_test

import (
	"context"
	"testing"

	"github.com/huandu/go-sqlbuilder"
	"github.com/oklog/ulid/v2"
	"github.com/stneto1/banking-server/pkg/core"
	"github.com/stretchr/testify/assert"
)

func TestListUserFriends(t *testing.T) {
	db := core.CreateTempDB()
	defer db.Close()

	authContainer := core.NewAuthContainer(db)
	friendContainer := core.NewFriendContainer(db)

	fromUser, err := authContainer.CreateUser(context.Background(), "foo", "mail@mail.com", "102030")
	assert.NotNil(t, fromUser)
	assert.NoError(t, err)

	toUser, err := authContainer.CreateUser(context.Background(), "foo", "mail2@mail.com", "102030")
	assert.NotNil(t, toUser)
	assert.NoError(t, err)

	sb := sqlbuilder.PostgreSQL.NewInsertBuilder().InsertInto("friends")
	_sql, args := sb.Cols("id", "user_id", "friend_id").
		Values(ulid.Make().String(), fromUser.ID, toUser.ID).
		Build()

	_, err = db.ExecContext(context.Background(), _sql, args...)
	assert.NoError(t, err)

	friends, err := friendContainer.GetFriends(context.Background(), fromUser.ID)
	assert.NotNil(t, friends)
	assert.Len(t, friends, 1)
	assert.NoError(t, err)
}

func TestDeleteFriend(t *testing.T) {
	db := core.CreateTempDB()
	defer db.Close()

	authContainer := core.NewAuthContainer(db)
	friendContainer := core.NewFriendContainer(db)

	fromUser, err := authContainer.CreateUser(context.Background(), "foo", "mail@mail.com", "102030")
	assert.NotNil(t, fromUser)
	assert.NoError(t, err)

	toUser, err := authContainer.CreateUser(context.Background(), "foo", "mail2@mail.com", "102030")
	assert.NotNil(t, toUser)
	assert.NoError(t, err)

	sb := sqlbuilder.PostgreSQL.NewInsertBuilder().InsertInto("friends")
	_sql, args := sb.Cols("id", "user_id", "friend_id").
		Values(ulid.Make().String(), fromUser.ID, toUser.ID).
		Build()

	_, err = db.ExecContext(context.Background(), _sql, args...)
	assert.NoError(t, err)

	err = friendContainer.DeleteFriend(context.Background(), fromUser.ID, toUser.ID)
	assert.NoError(t, err)
}
