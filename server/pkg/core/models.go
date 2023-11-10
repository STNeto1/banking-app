package core

import "github.com/shopspring/decimal"

type User struct {
	ID        string  `db:"id" json:"id"`
	Name      string  `db:"name" json:"name"`
	Email     string  `db:"email" json:"email"`
	Password  string  `db:"password" swaggerignore:"true" json:"-"`
	CreatedAt string  `db:"created_at" swaggerignore:"true" json:"-"`
	DeletedAt *string `db:"deleted_at" swaggerignore:"true" json:"-"`

	Balance decimal.Decimal `db:"balance" json:"balance,omitempty"`
}

type InviteStatus string

// status enum
const (
	InviteStatusPending  InviteStatus = "pending"
	InviteStatusCanceled InviteStatus = "canceled"
	InviteStatusAccepted InviteStatus = "accepted"
	InviteStatusRejected InviteStatus = "rejected"
)

type Invite struct {
	ID         string       `db:"id" json:"id"`
	FromUserID string       `db:"from_user_id" json:"-"`
	ToUserID   string       `db:"to_user_id" json:"-"`
	Status     InviteStatus `db:"status" json:"status"`
	CreatedAt  string       `db:"created_at" json:"created_at"`
	User       *User        `db:"-" json:"user"`
}

type Event struct {
	ID          string          `db:"id" json:"id"`
	UserID      string          `db:"user_id" json:"-"`
	Type        string          `db:"type" json:"type" enums:"deposit,withdrawal,transference_from,transference_to"`
	Description string          `db:"description" json:"description"`
	Amount      decimal.Decimal `db:"amount" json:"amount"`
	CreatedAt   string          `db:"created_at" json:"created_at"`
}

// models for sql queries
type inviteUserRow struct {
	InviteID  string `db:"invite_id"`
	Status    string `db:"invite_status"`
	CreatedAt string `db:"invite_created_at"`
	UserID    string `db:"user_id"`
	UserName  string `db:"user_name"`
	UserEmail string `db:"user_email"`
}
