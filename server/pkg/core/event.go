package core

import (
	"context"
	"database/sql"
	"log"

	"github.com/huandu/go-sqlbuilder"
	"github.com/jmoiron/sqlx"
	"github.com/oklog/ulid/v2"
	"github.com/shopspring/decimal"
)

// create withdraw event
// create deposit event
// create transfer event

// list user events

type EventContainer struct {
	connection    *sqlx.DB
	userContainer *UserContainer
}

func NewEventContainer(connection *sqlx.DB) *EventContainer {
	return &EventContainer{
		connection:    connection,
		userContainer: NewUserContainer(connection),
	}
}

func (ec *EventContainer) CreateDepositEvent(ctx context.Context, userID string, amount decimal.Decimal) error {
	tx, err := ec.connection.BeginTxx(ctx, &sql.TxOptions{
		Isolation: sql.LevelSerializable,
	})
	if err != nil {
		log.Println("failed to open transaction", err)
		return ErrInternalError
	}

	ub := sqlbuilder.NewUpdateBuilder().Update("users")
	_sql, args := ub.Set(ub.Add("balance", amount)).Where(ub.Equal("id", userID)).Build()

	// log.Println("update", _sql, args)

	_, err = tx.ExecContext(ctx, _sql, args...)
	if err != nil {
		rollbackx(tx)

		log.Println("error updating balance", err)
		return ErrInternalError
	}

	cb := sqlbuilder.NewInsertBuilder().InsertInto("events")
	_sql, args = cb.Cols("id", "user_id", "type", "description", "amount").
		Values(ulid.Make().String(), userID, "deposit", "WIP", amount).
		Build()

	// log.Println("insert", _sql, args)

	_, err = tx.ExecContext(ctx, _sql, args...)
	if err != nil {
		rollbackx(tx)

		log.Println("error creating event", err)
		return ErrInternalError
	}

	if err := tx.Commit(); err != nil {
		log.Println("failed to commit", err)

		return ErrInternalError
	}
	return nil
}
