CREATE TABLE log (
    id SERIAL PRIMARY KEY,
    data TIMESTAMP NOT NULL,
    ip VARCHAR(20) NOT NULL,
    request VARCHAR(255) NOT NULL,
    status VARCHAR(10) NOT NULL,
    userAgent VARCHAR(255) NOT NULL
);