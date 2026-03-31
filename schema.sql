PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;

-- ─── Departamentos ────────────────────────────────────────────
CREATE TABLE departamentos (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre     TEXT    NOT NULL UNIQUE,
  creado_en  DATETIME DEFAULT (datetime('now','localtime'))
);

-- ─── Productos ────────────────────────────────────────────────
CREATE TABLE productos (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  codigo_barras   TEXT    UNIQUE,
  nombre          TEXT    NOT NULL,
  precio_costo    REAL    NOT NULL DEFAULT 0,
  precio_venta    REAL    NOT NULL DEFAULT 0,
  precio_mayoreo  REAL    NOT NULL DEFAULT 0,
  departamento_id INTEGER REFERENCES departamentos(id) ON DELETE SET NULL,
  existencias     INTEGER NOT NULL DEFAULT 0,
  activo          INTEGER NOT NULL DEFAULT 1,
  creado_en       DATETIME DEFAULT (datetime('now','localtime')),
  actualizado_en  DATETIME DEFAULT (datetime('now','localtime'))
);

CREATE INDEX idx_productos_codigo  ON productos(codigo_barras);
CREATE INDEX idx_productos_dpto    ON productos(departamento_id);
CREATE INDEX idx_productos_activo  ON productos(activo);

-- ─── Promociones ──────────────────────────────────────────────
CREATE TABLE promociones (
  id               INTEGER PRIMARY KEY AUTOINCREMENT,
  producto_id      INTEGER NOT NULL REFERENCES productos(id) ON DELETE CASCADE,
  cantidad_minima  INTEGER NOT NULL,   -- a partir de X unidades aplica
  precio_promocion REAL    NOT NULL,   -- precio unitario con promoción
  activo           INTEGER NOT NULL DEFAULT 1
);

-- ─── Usuarios ─────────────────────────────────────────────────
CREATE TABLE usuarios (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  username      TEXT    NOT NULL UNIQUE,
  password_hash TEXT    NOT NULL,
  nombre        TEXT    NOT NULL,
  rol           TEXT    NOT NULL DEFAULT 'cajero', -- cajero | admin
  activo        INTEGER NOT NULL DEFAULT 1,
  creado_en     DATETIME DEFAULT (datetime('now','localtime'))
);

-- ─── Tickets ──────────────────────────────────────────────────
-- estado: abierto | cobrado | cancelado
CREATE TABLE tickets (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  folio       INTEGER NOT NULL,           -- número visible al usuario
  estado      TEXT    NOT NULL DEFAULT 'abierto',
  total       REAL    NOT NULL DEFAULT 0,
  pago_recibido REAL  DEFAULT NULL,
  cambio        REAL  DEFAULT NULL,
  usuario_id  INTEGER REFERENCES usuarios(id) ON DELETE SET NULL,
  fecha       DATE    NOT NULL DEFAULT (date('now','localtime')),
  creado_en   DATETIME DEFAULT (datetime('now','localtime')),
  cerrado_en  DATETIME DEFAULT NULL
);

CREATE INDEX idx_tickets_fecha   ON tickets(fecha);
CREATE INDEX idx_tickets_estado  ON tickets(estado);

-- ─── Items del ticket ─────────────────────────────────────────
CREATE TABLE items_ticket (
  id                INTEGER PRIMARY KEY AUTOINCREMENT,
  ticket_id         INTEGER NOT NULL REFERENCES tickets(id) ON DELETE CASCADE,
  producto_id       INTEGER REFERENCES productos(id) ON DELETE SET NULL,
  nombre_producto   TEXT    NOT NULL,     -- snapshot del nombre al momento de venta
  cantidad          INTEGER NOT NULL DEFAULT 1,
  precio_unitario   REAL    NOT NULL,     -- precio aplicado (puede ser mayoreo o promo)
  precio_mayoreo    REAL    NOT NULL DEFAULT 0,
  es_mayoreo        INTEGER NOT NULL DEFAULT 0,
  es_producto_comun INTEGER NOT NULL DEFAULT 0,
  subtotal          REAL    NOT NULL      -- cantidad * precio_unitario
);

CREATE INDEX idx_items_ticket_id ON items_ticket(ticket_id);

-- ─── Movimientos de inventario ────────────────────────────────
-- tipo: entrada | salida | ajuste | devolucion
CREATE TABLE movimientos_inventario (
  id               INTEGER PRIMARY KEY AUTOINCREMENT,
  producto_id      INTEGER NOT NULL REFERENCES productos(id) ON DELETE CASCADE,
  ticket_id        INTEGER REFERENCES tickets(id) ON DELETE SET NULL,
  tipo             TEXT    NOT NULL,
  cantidad         INTEGER NOT NULL,      -- siempre positivo; el tipo indica la dirección
  cantidad_anterior INTEGER NOT NULL,
  cantidad_nueva   INTEGER NOT NULL,
  razon            TEXT    DEFAULT NULL,
  fecha            DATE    NOT NULL DEFAULT (date('now','localtime')),
  creado_en        DATETIME DEFAULT (datetime('now','localtime'))
);

CREATE INDEX idx_mov_inv_producto ON movimientos_inventario(producto_id);
CREATE INDEX idx_mov_inv_fecha    ON movimientos_inventario(fecha);

-- ─── Movimientos de caja ──────────────────────────────────────
-- tipo: fondo_inicial | entrada | salida | venta | devolucion
CREATE TABLE movimientos_caja (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  tipo        TEXT    NOT NULL,
  cantidad    REAL    NOT NULL,
  razon       TEXT    DEFAULT NULL,
  usuario_id  INTEGER REFERENCES usuarios(id) ON DELETE SET NULL,
  fecha       DATE    NOT NULL DEFAULT (date('now','localtime')),
  creado_en   DATETIME DEFAULT (datetime('now','localtime'))
);

CREATE INDEX idx_mov_caja_fecha ON movimientos_caja(fecha);

-- ─── Corte de caja ────────────────────────────────────────────
CREATE TABLE cortes_caja (
  id                 INTEGER PRIMARY KEY AUTOINCREMENT,
  fecha              DATE    NOT NULL UNIQUE,
  fondo_inicial      REAL    NOT NULL DEFAULT 0,
  total_ventas       REAL    NOT NULL DEFAULT 0,
  total_entradas     REAL    NOT NULL DEFAULT 0,
  total_salidas      REAL    NOT NULL DEFAULT 0,
  total_devoluciones REAL    NOT NULL DEFAULT 0,
  saldo_final        REAL    NOT NULL DEFAULT 0,
  usuario_id         INTEGER REFERENCES usuarios(id) ON DELETE SET NULL,
  generado_en        DATETIME DEFAULT (datetime('now','localtime'))
);

-- Desglose de ventas por departamento (para el corte)
CREATE TABLE corte_ventas_por_dpto (
  id                  INTEGER PRIMARY KEY AUTOINCREMENT,
  corte_id            INTEGER NOT NULL REFERENCES cortes_caja(id) ON DELETE CASCADE,
  departamento_id     INTEGER REFERENCES departamentos(id) ON DELETE SET NULL,
  nombre_departamento TEXT    NOT NULL,   -- snapshot del nombre
  total               REAL    NOT NULL DEFAULT 0,
  num_ventas          INTEGER NOT NULL DEFAULT 0
);

-- ─── Configuración del sistema ────────────────────────────────
CREATE TABLE config_sistema (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  clave         TEXT    NOT NULL UNIQUE,
  valor         TEXT    NOT NULL,
  actualizado_en DATETIME DEFAULT (datetime('now','localtime'))
);

-- Valores iniciales de configuración
INSERT INTO config_sistema (clave, valor) VALUES
  ('dia_iniciado',        'false'),   -- controla si ya se capturó el fondo inicial
  ('fecha_dia_actual',    ''),        -- fecha ISO del día en curso
  ('folio_actual',        '1'),       -- folio autoincrementado de tickets
  ('version_db',          '1');

-- ─── Respaldos ────────────────────────────────────────────────
CREATE TABLE respaldos (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  ruta_archivo TEXT    NOT NULL,
  tipo         TEXT    NOT NULL DEFAULT 'diario',  -- diario | manual
  exitoso      INTEGER NOT NULL DEFAULT 1,
  error_msg    TEXT    DEFAULT NULL,
  creado_en    DATETIME DEFAULT (datetime('now','localtime'))
);

-- ─── Trigger: actualizar timestamp de productos ───────────────
CREATE TRIGGER trg_productos_updated
AFTER UPDATE ON productos
BEGIN
  UPDATE productos SET actualizado_en = datetime('now','localtime')
  WHERE id = NEW.id;
END;
