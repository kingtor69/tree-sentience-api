CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    privileges INTEGER NOT NULL,
    password VARCHAR NOT NULL
);

CREATE TABLE room_data(
    id SERIAL INT PRIMARY KEY,
    template VARCHAR(20) NOT NULL,
    color VARCHAR(20) NOT NULL,
    user_id INT FOREIGN KEY REFERENCES users(id),
    message VARCHAR(256) NOT NULL,
    recipient VARCHAR,
    ANIMAL VARCHAR
);
