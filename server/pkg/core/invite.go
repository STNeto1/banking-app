package core

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/huandu/go-sqlbuilder"
	"github.com/jmoiron/sqlx"
	"github.com/oklog/ulid/v2"
)

var (
	ErrInviteAlreadyExists = fmt.Errorf("Invite already exists")
)

type InviteContainer struct {
	connection *sqlx.DB
}

func NewInviteContainer(connection *sqlx.DB) *InviteContainer {
	return &InviteContainer{
		connection: connection,
	}
}

func (ic *InviteContainer) UserHasInvitedUser(ctx context.Context, userID, invitedUserID string) (bool, error) {
	sb := sqlbuilder.PostgreSQL.NewSelectBuilder().From("invites")

	_sql, args := sb.Select("count(*)").
		Where(sb.Equal("from_user_id", userID)).
		Where(sb.Equal("to_user_id", invitedUserID)).
		Build()

	res := ic.connection.QueryRowxContext(ctx, _sql, args...)
	var count int
	err := res.Scan(&count)
	if err != nil {
		log.Println("failed to scan", err)

		return false, ErrInternalError
	}

	return count > 0, nil
}

func (ic *InviteContainer) CreateInvite(ctx context.Context, fromUserID, toUserID string) (*Invite, error) {
	if invited, err := ic.UserHasInvitedUser(ctx, fromUserID, toUserID); err != nil {
		return nil, err
	} else if invited {
		return nil, ErrInviteAlreadyExists
	}

	tx, err := ic.connection.BeginTxx(ctx, nil)
	if err != nil {
		log.Println("failed to begin transaction", err)

		return nil, ErrInternalError
	}

	invite := Invite{
		ID:         ulid.MustNew(ulid.Now(), nil).String(),
		FromUserID: fromUserID,
		ToUserID:   toUserID,
		Status:     InviteStatusPending,
		CreatedAt:  time.Now().Format(time.RFC3339),
	}

	sb := sqlbuilder.PostgreSQL.NewInsertBuilder().InsertInto("invites")
	_sql, args := sb.Cols("id", "from_user_id", "to_user_id", "status", "created_at").
		Values(invite.ID, invite.FromUserID, invite.ToUserID, invite.Status, invite.CreatedAt).
		Build()

	_, err = tx.ExecContext(ctx, _sql, args...)
	if err != nil {
		log.Println("failed to insert invite", err)

		rollbackx(tx)
		return nil, ErrInternalError
	}

	if err := tx.Commit(); err != nil {
		log.Println("failed to commit transaction", err)

		return nil, ErrInternalError
	}

	return &invite, nil
}
