package core

import (
	"context"
	"database/sql"
	"fmt"
	"log"

	"github.com/huandu/go-sqlbuilder"
	"github.com/jmoiron/sqlx"
	"github.com/oklog/ulid/v2"
	"github.com/shopspring/decimal"
)

var (
	ErrInsufficientBalance = fmt.Errorf("User has insufficient funds")
)

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

func (ec *EventContainer) ListUserEvents(ctx context.Context, userID string) ([]*Event, error) {
	sb := sqlbuilder.NewSelectBuilder().From("events")
	_sql, args := sb.Select("*").Where(sb.Equal("user_id", userID)).
		OrderBy("events.created_at").Desc().
		Build()

	rows, err := ec.connection.QueryxContext(ctx, _sql, args...)
	if err != nil {
		log.Println("failed to query", err)
		return nil, ErrInternalError
	}

	defer rows.Close()

	var events []*Event
	for rows.Next() {
		var event Event
		if err := rows.StructScan(&event); err != nil {
			log.Println("failed to scan", err)
			return nil, ErrInternalError
		}

		events = append(events, &event)
	}

	if len(events) == 0 {
		events = make([]*Event, 0)
	}

	return events, nil
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

func (ec *EventContainer) CreateWithdrawalEvent(ctx context.Context, userID string, amount decimal.Decimal) error {
	tx, err := ec.connection.BeginTxx(ctx, &sql.TxOptions{
		Isolation: sql.LevelSerializable,
	})
	if err != nil {
		log.Println("failed to open transaction", err)
		return ErrInternalError
	}

	sb := sqlbuilder.NewSelectBuilder().From("users")
	_sql, args := sb.Select("balance").Where(sb.Equal("id", userID)).Build()

	var userBalance decimal.Decimal
	row := tx.QueryRowxContext(ctx, _sql, args...)
	if err := row.Scan(&userBalance); err != nil {
		rollbackx(tx)

		log.Println("error fetching user balance", err)
		return ErrInternalError

	}

	if userBalance.LessThan(amount) {
		rollbackx(tx)

		return ErrInsufficientBalance
	}

	ub := sqlbuilder.NewUpdateBuilder().Update("users")
	_sql, args = ub.Set(ub.Sub("balance", amount)).Where(ub.Equal("id", userID)).Build()

	_, err = tx.ExecContext(ctx, _sql, args...)
	if err != nil {
		rollbackx(tx)

		log.Println("error updating balance", err)
		return ErrInternalError
	}

	cb := sqlbuilder.NewInsertBuilder().InsertInto("events")
	_sql, args = cb.Cols("id", "user_id", "type", "description", "amount").
		Values(ulid.Make().String(), userID, "withdrawal", "WIP", amount).
		Build()

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

func (ec *EventContainer) CreateTransferEvent(ctx context.Context, fromUserID, toUserID string, amount decimal.Decimal) error {
	tx, err := ec.connection.BeginTxx(ctx, &sql.TxOptions{
		Isolation: sql.LevelSerializable,
	})
	if err != nil {
		log.Println("failed to open transaction", err)
		return ErrInternalError
	}

	sb := sqlbuilder.NewSelectBuilder().From("users")
	_sql, args := sb.Select("balance").Where(sb.Equal("id", fromUserID)).Build()

	var fromUserBalance decimal.Decimal
	row := tx.QueryRowxContext(ctx, _sql, args...)
	if err := row.Scan(&fromUserBalance); err != nil {
		rollbackx(tx)

		log.Println("error fetching user balance", err)
		return ErrInternalError

	}

	if fromUserBalance.LessThan(amount) {
		rollbackx(tx)

		return ErrInsufficientBalance
	}

	ub := sqlbuilder.NewUpdateBuilder().Update("users")
	_sql, args = ub.Set(ub.Sub("balance", amount)).Where(ub.Equal("id", fromUserID)).Build()

	_, err = tx.ExecContext(ctx, _sql, args...)
	if err != nil {
		rollbackx(tx)

		log.Println("error updating balance", err)
		return ErrInternalError
	}

	ub = sqlbuilder.NewUpdateBuilder().Update("users")
	_sql, args = ub.Set(ub.Add("balance", amount)).Where(ub.Equal("id", toUserID)).Build()

	_, err = tx.ExecContext(ctx, _sql, args...)
	if err != nil {
		rollbackx(tx)

		log.Println("error updating balance", err)
		return ErrInternalError
	}

	cb := sqlbuilder.NewInsertBuilder().InsertInto("events")
	_sql, args = cb.Cols("id", "user_id", "type", "description", "amount").
		Values(ulid.Make().String(), fromUserID, "transference_from", "WIP", amount).
		Values(ulid.Make().String(), toUserID, "transference_to", "WIP", amount).
		Build()

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
