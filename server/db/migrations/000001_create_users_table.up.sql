CREATE TABLE IF NOT EXISTS users (
    id varchar(26) PRIMARY KEY, 
    name varchar(255) NOT NULL, 
    email varchar(255) NOT NULL UNIQUE, 
    password varchar(255) NOT NULL, 
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp NULL
);
