package core_test

import (
	"context"
	"sync"
	"testing"

	"github.com/shopspring/decimal"
	"github.com/stneto1/banking-server/pkg/core"
	"github.com/stretchr/testify/assert"
)

func TestCreateDepositWithSuccess(t *testing.T) {
	db := core.CreateTempDB()
	defer db.Close()

	authContainer := core.NewAuthContainer(db)
	eventContainer := core.NewEventContainer(db)

	usr, err := authContainer.CreateUser(context.Background(), "foo", "mail@mail.com", "102030")
	assert.NotNil(t, usr)
	assert.NoError(t, err)

	err = eventContainer.CreateDepositEvent(context.Background(), usr.ID, decimal.NewFromInt(10))
	assert.NoError(t, err)
}

func TestCreateMultipleDepositsWithSuccess(t *testing.T) {
	db := core.CreateTempDB()
	defer db.Close()

	authContainer := core.NewAuthContainer(db)
	eventContainer := core.NewEventContainer(db)
	userContainer := core.NewUserContainer(db)

	usr, err := authContainer.CreateUser(context.Background(), "foo", "mail@mail.com", "102030")
	assert.NotNil(t, usr)
	assert.NoError(t, err)

	count := 10
	var wg sync.WaitGroup
	wg.Add(count)

	for i := 0; i < count; i++ {
		go func() {
			defer wg.Done()
			err := eventContainer.CreateDepositEvent(context.Background(), usr.ID, decimal.NewFromInt(10))
			assert.NoError(t, err)
		}()
	}

	wg.Wait()
	updatedUser, err := userContainer.GetUserByID(context.Background(), usr.ID)
	assert.NotNil(t, updatedUser)
	assert.NoError(t, err)

	assert.True(t, updatedUser.Balance.Equal(decimal.NewFromInt(100)))
}

func TestCreateWithdrawalWithSuccess(t *testing.T) {
	db := core.CreateTempDB()
	defer db.Close()

	authContainer := core.NewAuthContainer(db)
	eventContainer := core.NewEventContainer(db)
	userContainer := core.NewUserContainer(db)

	usr, err := authContainer.CreateUser(context.Background(), "foo", "mail@mail.com", "102030")
	assert.NotNil(t, usr)
	assert.NoError(t, err)

	err = eventContainer.CreateDepositEvent(context.Background(), usr.ID, decimal.NewFromInt(10))
	assert.NoError(t, err)

	err = eventContainer.CreateWithdrawalEvent(context.Background(), usr.ID, decimal.NewFromInt(10))
	assert.NoError(t, err)

	updatedUser, err := userContainer.GetUserByID(context.Background(), usr.ID)
	assert.NotNil(t, updatedUser)
	assert.NoError(t, err)

	assert.True(t, updatedUser.Balance.Equal(decimal.NewFromInt(0)))
}

func TestCreateWithdrawalWithInsufficientBalance(t *testing.T) {
	db := core.CreateTempDB()
	defer db.Close()

	authContainer := core.NewAuthContainer(db)
	eventContainer := core.NewEventContainer(db)
	userContainer := core.NewUserContainer(db)

	usr, err := authContainer.CreateUser(context.Background(), "foo", "mail@mail.com", "102030")
	assert.NotNil(t, usr)
	assert.NoError(t, err)

	err = eventContainer.CreateWithdrawalEvent(context.Background(), usr.ID, decimal.NewFromInt(10))
	assert.Equal(t, core.ErrInsufficientBalance, err)

	updatedUser, err := userContainer.GetUserByID(context.Background(), usr.ID)
	assert.NotNil(t, updatedUser)
	assert.NoError(t, err)

	assert.True(t, updatedUser.Balance.Equal(decimal.NewFromInt(0)))
}

func TestCreateMultipleWithdrawalsWithSuccess(t *testing.T) {
	db := core.CreateTempDB()
	defer db.Close()

	authContainer := core.NewAuthContainer(db)
	eventContainer := core.NewEventContainer(db)
	userContainer := core.NewUserContainer(db)

	usr, err := authContainer.CreateUser(context.Background(), "foo", "mail@mail.com", "102030")
	assert.NotNil(t, usr)
	assert.NoError(t, err)

	err = eventContainer.CreateDepositEvent(context.Background(), usr.ID, decimal.NewFromInt(200))
	assert.NoError(t, err)

	count := 10
	var wg sync.WaitGroup
	wg.Add(count)

	for i := 0; i < count; i++ {
		go func() {
			defer wg.Done()
			err := eventContainer.CreateWithdrawalEvent(context.Background(), usr.ID, decimal.NewFromInt(10))
			assert.NoError(t, err)
		}()
	}

	wg.Wait()
	updatedUser, err := userContainer.GetUserByID(context.Background(), usr.ID)
	assert.NotNil(t, updatedUser)
	assert.NoError(t, err)

	assert.True(t, updatedUser.Balance.Equal(decimal.NewFromInt(100)))

	// add 200 to balance, then create 10 "parallel" withdrawal operations with 10 for each of them, resulting in 100 as final balance
}
