package core_test

import (
	"context"
	"testing"

	"github.com/stneto1/banking-server/pkg/core"
	"github.com/stretchr/testify/assert"
)

func TestGetUserByIDWithSuccess(t *testing.T) {
	db := core.CreateTempDB()
	defer db.Close()

	authContainer := core.NewAuthContainer(db)
	container := core.NewUserContainer(db)

	user, err := authContainer.CreateUser(context.Background(), "foo", "mail@mail.com", "102030")
	assert.NotNil(t, user)
	assert.NoError(t, err)

	usr, err := container.GetUserByID(context.Background(), user.ID)
	assert.NotNil(t, usr)
	assert.NoError(t, err)
}

func TestGetUserByIDWithInvalidID(t *testing.T) {
	db := core.CreateTempDB()
	defer db.Close()

	container := core.NewUserContainer(db)

	usr, err := container.GetUserByID(context.Background(), "invalid-id")
	assert.Nil(t, usr)
	assert.Equal(t, err, core.ErrUserDoesNotExists)
}

func TestGetUserByEmailWithSuccess(t *testing.T) {
	db := core.CreateTempDB()
	defer db.Close()

	authContainer := core.NewAuthContainer(db)
	container := core.NewUserContainer(db)

	user, err := authContainer.CreateUser(context.Background(), "foo", "mail@mail.com", "102030")
	assert.NotNil(t, user)
	assert.NoError(t, err)

	usr, err := container.GetUserByEmail(context.Background(), user.Email)
	assert.NotNil(t, usr)
	assert.NoError(t, err)
}

func TestGetUserByEmailWithInvalidEmail(t *testing.T) {
	db := core.CreateTempDB()
	defer db.Close()

	container := core.NewUserContainer(db)

	usr, err := container.GetUserByEmail(context.Background(), "invalid-email")
	assert.Nil(t, usr)
	assert.Equal(t, err, core.ErrUserDoesNotExists)
}
