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
		ID:         ulid.Make().String(),
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

func (ic *InviteContainer) GetUserSentInvites(ctx context.Context, userID string) ([]Invite, error) {
	sb := sqlbuilder.PostgreSQL.NewSelectBuilder().From("invites")

	_sql, args := sb.Select("invites.id as invite_id",
		"invites.status as invite_status",
		"invites.created_at as invite_created_at",
		"users.id as user_id",
		"users.name as user_name",
		"users.email as user_email").
		Where(sb.Equal("invites.from_user_id", userID)).
		JoinWithOption(sqlbuilder.LeftJoin, "users", "invites.to_user_id = users.id").
		Build()

	rows, err := ic.connection.QueryxContext(ctx, _sql, args...)
	if err != nil {
		log.Println("failed to query", err)

		return nil, ErrInternalError
	}
	defer rows.Close()

	var invites []Invite
	for rows.Next() {
		var row inviteUserRow
		err = rows.StructScan(&row)
		if err != nil {
			log.Println("failed to scan", err)

			return nil, ErrInternalError
		}

		invites = append(invites, Invite{
			ID:         row.InviteID,
			FromUserID: userID,
			ToUserID:   row.UserID,
			User: &User{
				ID:    row.UserID,
				Name:  row.UserName,
				Email: row.UserEmail,
			},
			Status:    InviteStatus(row.Status),
			CreatedAt: row.CreatedAt,
		})
	}

	return invites, nil
}

func (ic *InviteContainer) GetUserReceivedInvites(ctx context.Context, userID string) ([]Invite, error) {
	sb := sqlbuilder.PostgreSQL.NewSelectBuilder().From("invites")

	_sql, args := sb.Select("invites.id as invite_id",
		"invites.status as invite_status",
		"invites.created_at as invite_created_at",
		"users.id as user_id",
		"users.name as user_name",
		"users.email as user_email").
		Where(sb.Equal("invites.from_user_id", userID)).
		JoinWithOption(sqlbuilder.LeftJoin, "users", "invites.from_user_id = users.id").
		Build()

	rows, err := ic.connection.QueryxContext(ctx, _sql, args...)
	if err != nil {
		log.Println("failed to query", err)

		return nil, ErrInternalError
	}
	defer rows.Close()

	var invites []Invite
	for rows.Next() {
		var row inviteUserRow
		err = rows.StructScan(&row)
		if err != nil {
			log.Println("failed to scan", err)

			return nil, ErrInternalError
		}

		invites = append(invites, Invite{
			ID:         row.InviteID,
			FromUserID: row.UserID,
			ToUserID:   userID,
			User: &User{
				ID:    row.UserID,
				Name:  row.UserName,
				Email: row.UserEmail,
			},
			Status:    InviteStatus(row.Status),
			CreatedAt: row.CreatedAt,
		})
	}

	return invites, nil
}
