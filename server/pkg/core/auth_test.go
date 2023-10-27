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

	usr, err := authContainer.CreateUser(context.Background(), "foo", "mail@mail.com", "102030")
	assert.NotNil(t, usr)
	assert.Nil(t, err)
}

func TestNotCreateUserWithEmailReadyInUse(t *testing.T) {
	db := core.CreateTempDB()
	defer db.Close()

	authContainer := core.NewAuthContainer(db)

	usr, err := authContainer.CreateUser(context.Background(), "foo", "mail@mail.com", "102030")
	assert.NotNil(t, usr)
	assert.Nil(t, err)

	usr, err = authContainer.CreateUser(context.Background(), "foo", "mail@mail.com", "102030")
	assert.Nil(t, usr)
	assert.Equal(t, core.ErrUserAlreadyExists, err)

}

func TestAuthenticateWithSuccess(t *testing.T) {
	db := core.CreateTempDB()
	defer db.Close()

	authContainer := core.NewAuthContainer(db)

	usr, err := authContainer.CreateUser(context.Background(), "foo", "mail@mail.com", "102030")
	assert.NotNil(t, usr)
	assert.Nil(t, err)

	user, err := authContainer.AuthenticateUser(context.Background(), usr.Email, "102030")
	assert.Nil(t, err)
	assert.Equal(t, usr.ID, user.ID)
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

	user, err := authContainer.CreateUser(context.Background(), "foo", "mail@mail.com", "102030")
	assert.NotNil(t, user)
	assert.Nil(t, err)

	user, err = authContainer.AuthenticateUser(context.Background(), user.Email, "invalid")
	assert.Nil(t, user)
	assert.Equal(t, err, core.ErrInvalidCredentials)
}

func TestUpdateWithSuccess(t *testing.T) {
	db := core.CreateTempDB()
	defer db.Close()

	authContainer := core.NewAuthContainer(db)

	user, err := authContainer.CreateUser(context.Background(), "foo", "mail@mail.com", "102030")
	assert.NotNil(t, user)
	assert.NoError(t, err)

	newName := "new name"
	newMail := "bar"
	newPassword := "102030"
	err = authContainer.UpdateUser(context.Background(), user, &newName, &newMail, &newPassword)
	assert.NoError(t, err)
}

func TestUpdateWithNullFields(t *testing.T) {
	db := core.CreateTempDB()
	defer db.Close()

	authContainer := core.NewAuthContainer(db)

	user, err := authContainer.CreateUser(context.Background(), "foo", "mail@mail.com", "102030")
	assert.NotNil(t, user)
	assert.NoError(t, err)

	err = authContainer.UpdateUser(context.Background(), user, nil, nil, nil)
	assert.NoError(t, err)
}

func TestFailUpdateWithAlreadyExistingMail(t *testing.T) {
	db := core.CreateTempDB()
	defer db.Close()

	authContainer := core.NewAuthContainer(db)

	user, err := authContainer.CreateUser(context.Background(), "foo", "mail@mail.com", "102030")
	assert.NotNil(t, user)
	assert.NoError(t, err)

	user2, err := authContainer.CreateUser(context.Background(), "foo", "mail2@mail.com", "102030")
	assert.NotNil(t, user2)
	assert.NoError(t, err)

	newName := "new name"
	newPassword := "102030"
	err = authContainer.UpdateUser(context.Background(), user, &newName, &user2.Email, &newPassword)
	assert.Error(t, err, core.ErrUserAlreadyExists)
}

func TestSoftDeleteWithSuccess(t *testing.T) {
	db := core.CreateTempDB()
	defer db.Close()

	authContainer := core.NewAuthContainer(db)

	user, err := authContainer.CreateUser(context.Background(), "foo", "mail@mail.com", "102030")
	assert.NotNil(t, user)
	assert.NoError(t, err)

	err = authContainer.SoftDeleteUser(context.Background(), user)
	assert.NoError(t, err)
}

func TestGetUserByIDWithSuccess(t *testing.T) {
	db := core.CreateTempDB()
	defer db.Close()

	authContainer := core.NewAuthContainer(db)

	user, err := authContainer.CreateUser(context.Background(), "foo", "mail@mail.com", "102030")
	assert.NotNil(t, user)
	assert.NoError(t, err)

	usr, err := authContainer.GetUserByID(context.Background(), user.ID)
	assert.NotNil(t, usr)
	assert.NoError(t, err)
}

func TestInvalidGetUserByIDSoftDelete(t *testing.T) {
	db := core.CreateTempDB()
	defer db.Close()

	authContainer := core.NewAuthContainer(db)

	user, err := authContainer.CreateUser(context.Background(), "foo", "mail@mail.com", "102030")
	assert.NotNil(t, user)
	assert.NoError(t, err)

	err = authContainer.SoftDeleteUser(context.Background(), user)
	assert.NoError(t, err)

	usr, err := authContainer.GetUserByID(context.Background(), user.ID)
	assert.Nil(t, usr)
	assert.Equal(t, err, core.ErrUserDoesNotExists)
}

func TestCreateToken(t *testing.T) {
	authContainer := core.NewAuthContainer(nil)

	user := core.User{
		ID: "some",
	}

	token, err := authContainer.CreateToken(&user)
	assert.NotEmpty(t, token)
	assert.NoError(t, err)

	userID, err := authContainer.UseUserID(token)
	assert.NoError(t, err)
	assert.Equal(t, user.ID, userID)
}
