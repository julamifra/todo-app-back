CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT FALSE
);

INSERT INTO todos (name) VALUES ('first todo');
INSERT INTO todos (name) VALUES ('second todo');