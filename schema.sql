DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS room_data;

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    privileges INTEGER NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE room_data(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    template VARCHAR(20) NOT NULL,
    color VARCHAR(20) NOT NULL,
    message VARCHAR(256) NOT NULL,
    recipient TEXT,
    ANIMAL TEXT,
    user_id INT NOT NULL,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);
