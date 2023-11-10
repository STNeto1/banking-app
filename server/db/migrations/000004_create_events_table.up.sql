
CREATE TABLE IF NOT EXISTS events (
    id varchar(26) PRIMARY KEY, 
    user_id varchar(26) NOT NULL REFERENCES users(id), 
    description varchar(255) NOT NULL,
    amount decimal(10,2) NOT NULL,
    type varchar(10) NOT NULL,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

