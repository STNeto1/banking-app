CREATE TABLE IF NOT EXISTS invites (
    id varchar(26) PRIMARY KEY, 
    from_user_id varchar(26) NOT NULL REFERENCES users(id), 
    to_user_id varchar(26) NOT NULL REFERENCES users(id), 
    status varchar(20) NOT NULL, 
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX invites_unique_key ON invites (from_user_id, to_user_id);


