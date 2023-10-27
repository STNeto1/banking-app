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
