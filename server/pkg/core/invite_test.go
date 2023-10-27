package core_test

import (
	"context"
	"testing"

	"github.com/stneto1/banking-server/pkg/core"
	"github.com/stretchr/testify/assert"
)

func TestCreateInviteWithSuccess(t *testing.T) {
	db := core.CreateTempDB()
	defer db.Close()

	authContainer := core.NewAuthContainer(db)
	inviteContainer := core.NewInviteContainer(db)

	fromUser, err := authContainer.CreateUser(context.Background(), "foo", "mail@mail.com", "102030")
	assert.NotNil(t, fromUser)
	assert.NoError(t, err)

	toUser, err := authContainer.CreateUser(context.Background(), "foo", "mail2@mail.com", "102030")
	assert.NotNil(t, toUser)
	assert.NoError(t, err)

	invite, err := inviteContainer.CreateInvite(context.Background(), fromUser.ID, toUser.ID)
	assert.NotNil(t, invite)
	assert.NoError(t, err)
}

func TestFailCreateInviteWithDuplicateInvite(t *testing.T) {
	db := core.CreateTempDB()
	defer db.Close()

	authContainer := core.NewAuthContainer(db)
	inviteContainer := core.NewInviteContainer(db)

	fromUser, err := authContainer.CreateUser(context.Background(), "foo", "mail@mail.com", "102030")
	assert.NotNil(t, fromUser)
	assert.NoError(t, err)

	toUser, err := authContainer.CreateUser(context.Background(), "foo", "mail2@mail.com", "102030")
	assert.NotNil(t, toUser)
	assert.NoError(t, err)

	invite, err := inviteContainer.CreateInvite(context.Background(), fromUser.ID, toUser.ID)
	assert.NotNil(t, invite)
	assert.NoError(t, err)

	invite, err = inviteContainer.CreateInvite(context.Background(), fromUser.ID, toUser.ID)
	assert.Nil(t, invite)
	assert.Equal(t, err, core.ErrInviteAlreadyExists)
}

func TestListUserInvites(t *testing.T) {
	db := core.CreateTempDB()
	defer db.Close()

	authContainer := core.NewAuthContainer(db)
	inviteContainer := core.NewInviteContainer(db)

	fromUser, err := authContainer.CreateUser(context.Background(), "foo", "mail@mail.com", "102030")
	assert.NotNil(t, fromUser)
	assert.NoError(t, err)

	toUser, err := authContainer.CreateUser(context.Background(), "foo", "mail2@mail.com", "102030")
	assert.NotNil(t, toUser)
	assert.NoError(t, err)

	invite, err := inviteContainer.CreateInvite(context.Background(), fromUser.ID, toUser.ID)
	assert.NotNil(t, invite)
	assert.NoError(t, err)

	_, err = inviteContainer.CreateInvite(context.Background(), toUser.ID, fromUser.ID)
	assert.NoError(t, err)

	invites, err := inviteContainer.GetUserSentInvites(context.Background(), fromUser.ID)
	assert.NotNil(t, invites)
	assert.Len(t, invites, 1)
	assert.NoError(t, err)
}
