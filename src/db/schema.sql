CREATE TABLE IF NOT EXISTS productos (
    id         SERIAL PRIMARY KEY,
    nombre     VARCHAR(100) NOT NULL,
    categoria  VARCHAR(50)  NOT NULL DEFAULT 'General',
    precio     NUMERIC(10, 2) NOT NULL DEFAULT 0,
    stock      INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);
