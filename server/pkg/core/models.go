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
	InviteStatusAccepted InviteStatus = "accepted"
	InviteStatusRejected InviteStatus = "rejected"
)

type Invite struct {
	ID         string       `db:"id"`
	FromUserID string       `db:"from_user_id"`
	ToUserID   string       `db:"to_user_id"`
	Status     InviteStatus `db:"status"`
	CreatedAt  string       `db:"created_at"`
}
