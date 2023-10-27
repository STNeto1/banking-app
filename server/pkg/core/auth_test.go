package core_test

import (
	"context"
	"testing"

	"github.com/stneto1/banking-server/pkg/core"
	"github.com/stretchr/testify/assert"
)

func TestCreateUserWithSuccess(t *testing.T) {
	db := core.CreateTempDB()
	defer db.Close()

	authContainer := core.NewAuthContainer(db)

	err := authContainer.CreateUser(context.Background(), "foo", "mail@mail.com", "102030")
	assert.Nil(t, err)
}

func TestNotCreateUserWithEmailReadyInUse(t *testing.T) {
	db := core.CreateTempDB()
	defer db.Close()

	authContainer := core.NewAuthContainer(db)

	err := authContainer.CreateUser(context.Background(), "foo", "mail@mail.com", "102030")
	assert.Nil(t, err)

	err = authContainer.CreateUser(context.Background(), "foo", "mail@mail.com", "102030")
	assert.Equal(t, core.ErrUserAlreadyExists, err)
}

func TestAuthenticateWithSuccess(t *testing.T) {
	db := core.CreateTempDB()
	defer db.Close()

	authContainer := core.NewAuthContainer(db)

	err := authContainer.CreateUser(context.Background(), "foo", "mail@mail.com", "102030")
	assert.Nil(t, err)

	user, err := authContainer.AuthenticateUser(context.Background(), "mail@mail.com", "102030")
	assert.Nil(t, err)
	assert.Equal(t, "foo", user.Name)
}

func TestFailAuthenticateWithInvalidEmail(t *testing.T) {
	db := core.CreateTempDB()
	defer db.Close()

	authContainer := core.NewAuthContainer(db)

	user, err := authContainer.AuthenticateUser(context.Background(), "mail@mail.com", "102030")
	assert.Nil(t, user)
	assert.Equal(t, err, core.ErrUserDoesNotExists)
}

func TestFailAuthenticateWithInvalidPassword(t *testing.T) {
	db := core.CreateTempDB()
	defer db.Close()

	authContainer := core.NewAuthContainer(db)

	err := authContainer.CreateUser(context.Background(), "foo", "mail@mail.com", "102030")
	assert.Nil(t, err)

	user, err := authContainer.AuthenticateUser(context.Background(), "mail@mail.com", "10203040")
	assert.Nil(t, user)
	assert.Equal(t, err, core.ErrInvalidCredentials)
}
