CREATE TABLE IF NOT EXISTS friends (
    id varchar(26) PRIMARY KEY, 
    user_id varchar(26) NOT NULL REFERENCES users(id), 
    friend_id varchar(26) NOT NULL REFERENCES users(id),
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX friends_unique_key ON friends (user_id, friend_id)
