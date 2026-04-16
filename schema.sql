CREATE TABLE IF NOT EXISTS users
(
    id           INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE,
    display_name TEXT                              NOT NULL,
    username     TEXT                              NOT NULL UNIQUE,
    password     TEXT                              NOT NULL
);

CREATE TABLE IF NOT EXISTS category
(
    id   INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE,
    name TEXT                              NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS product
(
    id                INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE,
    barcode           TEXT                              NOT NULL UNIQUE,
    name              TEXT                              NOT NULL,
    type              TEXT                              NOT NULL CHECK (type in ('unit', 'in_bulk', 'kit')),
    cost_price        REAL                              NOT NULL CHECK (cost_price >= -99999999.99 AND cost_price <= 99999999.99),
    sale_price        REAL                              NOT NULL CHECK (sale_price >= -99999999.99 AND sale_price <= 99999999.99),
    wholesale_price   REAL CHECK (wholesale_price >= -99999999.99 AND wholesale_price <= 99999999.99),
    quantity_in_stock REAL                              NOT NULL CHECK (quantity_in_stock >= -1 AND quantity_in_stock <= 99999999.999),
    is_favorite       BOOLEAN                           NOT NULL DEFAULT 0,
    category_id       INTEGER                           NOT NULL REFERENCES category (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS offers
(
    id            INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE,
    product_id    INTEGER                           NOT NULL REFERENCES product (id) ON DELETE CASCADE,
    name          TEXT                              NOT NULL,
    quantity_from REAL                              NOT NULL CHECK (quantity_from >= 0 AND quantity_from <= 99999999.999),
    quantity_to   REAL                              NOT NULL CHECK (quantity_to >= 0 AND quantity_to <= 99999999.999),
    offer_price   REAL                              NOT NULL CHECK (offer_price >= -99999999.99 AND offer_price <= 99999999.99),
    is_active     BOOLEAN                           NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS movement_history
(
    id                INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE,
    movement_date     TEXT                              NOT NULL,
    product_id        INTEGER                           NOT NULL REFERENCES product (id) ON DELETE CASCADE,
    movement_type     TEXT                              NOT NULL CHECK (movement_type in ('sale', 'restock', 'adjustment')),
    movement_location TEXT                              NOT NULL,
    previous_quantity REAL                              NOT NULL CHECK (previous_quantity >= -1 AND previous_quantity <= 99999999.999),
    quantity_changed  REAL                              NOT NULL CHECK (quantity_changed >= -99999999.999 AND quantity_changed <= 99999999.999),
    current_stock     REAL                              NOT NULL CHECK (current_stock >= -1 AND current_stock <= 99999999.999),
    user_id           INTEGER                           NOT NULL REFERENCES users (id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS sales
(
    id             INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE,
    receive_amount REAL                              NOT NULL CHECK (receive_amount >= -99999999.99 AND receive_amount <= 99999999.99),
    total_amount   REAL                              NOT NULL CHECK (total_amount >= -99999999.99 AND total_amount <= 99999999.99),
    sale_date      TEXT                              NOT NULL,
    user_id        INTEGER                           NOT NULL REFERENCES users (id) ON DELETE SET NULL,
    is_canceled    BOOLEAN                           NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS sale_details
(
    sale_id      INTEGER NOT NULL REFERENCES sales (id) ON DELETE CASCADE,
    product_id   INTEGER NOT NULL REFERENCES product (id) ON DELETE CASCADE,
    quantity     REAL    NOT NULL CHECK (quantity >= -99999999.999 AND quantity <= 99999999.999),
    total_amount REAL    NOT NULL CHECK (total_amount >= -99999999.99 AND total_amount <= 99999999.99)
);