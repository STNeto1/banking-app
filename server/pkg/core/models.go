package core

type User struct {
	ID        string  `db:"id"`
	Name      string  `db:"name"`
	Email     string  `db:"email"`
	Password  string  `db:"password"`
	CreatedAt string  `db:"created_at"`
	DeletedAt *string `db:"deleted_at"`
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
	ID         string       `db:"id"`
	FromUserID string       `db:"from_user_id"`
	ToUserID   string       `db:"to_user_id"`
	Status     InviteStatus `db:"status"`
	CreatedAt  string       `db:"created_at"`
	User       *User        `db:"-"`
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

//"invites.id", "invites.to_user_id", "invites.status", "invites.created_at", "users.name", "users.email").
