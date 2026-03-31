# Vendera POS - Documento base del proyecto

## Contexto

Este proyecto nace para reemplazar parcialmente a **Eleventa** en un negocio familiar.
Actualmente se utiliza Eleventa (`https://eleventa.com`), pero por costos de licencia se busca una alternativa propia que:

- Cubra solo las funcionalidades necesarias.
- Mantenga un flujo de trabajo muy similar para evitar friccion en la operacion diaria.

## Objetivo

Construir un sistema de punto de venta (POS) de escritorio, con una experiencia de uso familiar para alguien que ya trabaja con Eleventa.

## Requisitos funcionales

- Registro de productos.
- Actualizacion de producto (excepto datos de inventario).
- Eliminacion de producto.
- Creacion de promociones por cantidades.
- Agregar existencias al inventario de un producto.
- Ajustar/actualizar existencias de un producto.
- Registro de departamentos (categorias).
- Eliminacion de departamentos.
- Actualizacion de nombres de departamentos.
- Consulta de movimientos del dia (entradas, salidas, ajustes).
- Consulta de inventario con existencia en `0`.
- Consulta de inventario completo y visualizacion del valor total por costo.
- Registro de entradas de efectivo.
- Registro de salidas de efectivo.
- Registro de ventas de productos.
- Registro de tickets de venta y cancelaciones.
- Consulta de tickets del dia o anteriores.
- Consulta de corte final del dia: entradas, gastos, ventas totales generales y por departamento.

## Requisitos no funcionales

- Interfaz separada por secciones/pestanas/paginas: ventas, productos, inventario, corte.
- Diseno visual similar a Eleventa para mantener familiaridad.
- Implementar los mismos atajos de teclado (shortcuts) que Eleventa.
- Aplicar descuento por promocion automaticamente al alcanzar cantidades definidas.
- Aplicar precio de mayoreo mediante boton y shortcut.
- Permitir devolucion parcial o total de productos de una venta ya realizada.
- Permitir cancelar una venta completa y regresar existencias al inventario.
- Permitir abrir varios tickets simultaneos para ventas en proceso.
- Permitir agregar producto comun (no registrado) con nombre por defecto `"Producto Comun"`, cantidad y precio.
- Permitir cambiar entre tickets activos.
- Generar respaldo de informacion al cerrar la aplicacion cada dia.
- Mantener productos de ventas sin concluir al cambiar de pestana.
- Sincronizar existencias en venta cuando se actualizan desde inventario.
- Solicitar entrada inicial de efectivo solo la primera vez que se abre la app en el dia.
- Mostrar por defecto informacion del dia, con opcion de consultar dias anteriores por seccion.
- Mostrar avisos cuando no haya existencia suficiente durante el proceso de venta.
- Mostrar avisos si se intenta registrar una salida de efectivo mayor al dinero en caja.
- Ofrecer importacion de inventario desde Eleventa via Excel.
- Modal de cobro con entrada de pago en efectivo y calculo de cambio; pago por defecto igual al total.
- Distribuir la app mediante instalador para Windows/Linux.
- Permitir actualizar features/patches sin desinstalar ni soporte manual.

## UX y accesibilidad

- Navegacion por filas en tablas con teclas `UP` y `DOWN`.
- Filas preseleccionadas por defecto (sin necesidad de clic inicial).

## Flujos criticos y dificultades

### 1) Registro de productos a vender

#### Flujo con buscador

1. Usuario presiona boton de buscar.
2. Se abre modal de busqueda (nombre, precio de venta, existencia, departamento).
3. Selecciona producto y confirma con boton o shortcut (`Enter`).
4. Producto se agrega a la tabla de ventas.

#### Flujo por codigo de barras

1. Usuario ingresa codigo de barras en input.
2. Presiona boton de busqueda.
3. Si existe, se agrega a tabla de ventas.
4. Si no existe, se muestra mensaje al usuario.

#### Flujo adicional

- Agregar existencias al inventario de un producto que ya esta en la tabla de ventas.

#### Problemas detectados

- Comunicar seleccion/resultados de busqueda con la tabla de ventas.
- Sincronizar inventario al cambiar entre pestanas (inventario/producto).

### 2) Cambio de tickets

#### Flujo al crear ticket

1. Usuario crea nuevo ticket.
2. Sistema cambia a ese ticket y limpia la tabla de ventas para iniciar captura.
3. Usuario registra productos.
4. Al volver al ticket anterior, deben persistir y cargarse los productos pendientes de cobro.

#### Flujo al cobrar tickets concurrentes

- Caso: hay 2 tickets con el mismo producto, inventario total `4`, y ambos tickets capturan `4` unidades.
- Si se cobra uno, el otro puede romper integridad de inventario.

#### Problemas detectados

- Persistir productos por ticket de forma aislada.
- Restringir capturas que ya comprometen stock en otros tickets abiertos.

## Shortcuts

| Shortcut   | Accion                                                    |
| ---------- | --------------------------------------------------------- |
| `Ctrl + P` | Abrir modal de producto comun y agregar a tabla de ventas |
| `F10`      | Abrir modal de busqueda                                   |
| `F11`      | Aplicar precio de mayoreo al producto seleccionado        |
| `F7`       | Abrir modal de entrada de efectivo                        |
| `F8`       | Abrir modal de salida de efectivo                         |
| `F12`      | Abrir modal de cobro                                      |
| `F6`       | Abrir dialog para crear nuevo ticket                      |
| `F5`       | Abrir modal para cambiar entre tickets                    |
| `F1`       | Cambiar a pestana de ventas                               |
| `F3`       | Cambiar a pestana de productos                            |
| `F4`       | Cambiar a pestana de inventario                           |
| `F2`       | Ejecutar cobro dentro del modal de cobro                  |

## Problemas de desarrollo identificados

- Gestion de contextos compartidos para operaciones transversales (ej. agregar producto a tabla de ventas).
- Gestion escalable de shortcuts conforme crecen funcionalidades.
- Gestion de modales para evitar aperturas simultaneas y mantener orden de estados.

## Stack tecnologico propuesto

- **Desktop runtime:** Wails (Go), por rendimiento y curva de aprendizaje mas amigable frente a Tauri (Rust).
- **UI:** React + Tailwind CSS.
- **Librerias UI:** HeroUI v2.
- **Formularios/validacion:** React Hook Form + Valibot.
- **Estado global (duda actual):** Zustand.
- **Base de datos:** SQLite por ligereza y facilidad.

## Modelo de base de datos actual (`schema.sql`)

El modelo real implementado en `/home/tito/workspace/vendera-pos/schema.sql` usa SQLite con:

- `PRAGMA journal_mode = WAL`
- `PRAGMA foreign_keys = ON`

### Tablas principales

| Tabla                    | Proposito                           | Campos clave                                                                                                                           |
| ------------------------ | ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `departamentos`          | Catalogo de categorias              | `id`, `nombre` (unico), `creado_en`                                                                                                    |
| `productos`              | Catalogo de productos e inventario  | `codigo_barras` (unico), precios (`costo`, `venta`, `mayoreo`), `departamento_id`, `existencias`, `activo`, timestamps                 |
| `promociones`            | Reglas de promo por cantidad        | `producto_id`, `cantidad_minima`, `precio_promocion`, `activo`                                                                         |
| `usuarios`               | Operadores del sistema              | `username` (unico), `password_hash`, `rol` (`cajero/admin`), `activo`                                                                  |
| `tickets`                | Encabezado de venta                 | `folio`, `estado` (`abierto/cobrado/cancelado`), `total`, `pago_recibido`, `cambio`, `usuario_id`, `fecha`, `cerrado_en`               |
| `items_ticket`           | Renglones de cada ticket            | `ticket_id`, `producto_id`, `nombre_producto` (snapshot), `cantidad`, `precio_unitario`, `es_mayoreo`, `es_producto_comun`, `subtotal` |
| `movimientos_inventario` | Kardex de stock                     | `producto_id`, `ticket_id`, `tipo` (`entrada/salida/ajuste/devolucion`), `cantidad_anterior`, `cantidad_nueva`, `razon`, `fecha`       |
| `movimientos_caja`       | Flujo de efectivo                   | `tipo` (`fondo_inicial/entrada/salida/venta/devolucion`), `cantidad`, `razon`, `usuario_id`, `fecha`                                   |
| `cortes_caja`            | Cierre diario                       | `fecha` (unica), `fondo_inicial`, `totales` (ventas/entradas/salidas/devoluciones), `saldo_final`, `usuario_id`                        |
| `corte_ventas_por_dpto`  | Desglose por departamento del corte | `corte_id`, `departamento_id`, `nombre_departamento` (snapshot), `total`, `num_ventas`                                                 |
| `config_sistema`         | Configuraciones runtime             | `clave` (unica), `valor`, `actualizado_en`                                                                                             |
| `respaldos`              | Historial de backups                | `ruta_archivo`, `tipo` (`diario/manual`), `exitoso`, `error_msg`, `creado_en`                                                          |

### Relaciones y reglas de integridad

- `productos.departamento_id -> departamentos.id` (`ON DELETE SET NULL`)
- `promociones.producto_id -> productos.id` (`ON DELETE CASCADE`)
- `tickets.usuario_id -> usuarios.id` (`ON DELETE SET NULL`)
- `items_ticket.ticket_id -> tickets.id` (`ON DELETE CASCADE`)
- `items_ticket.producto_id -> productos.id` (`ON DELETE SET NULL`)
- `movimientos_inventario.producto_id -> productos.id` (`ON DELETE CASCADE`)
- `movimientos_inventario.ticket_id -> tickets.id` (`ON DELETE SET NULL`)
- `movimientos_caja.usuario_id -> usuarios.id` (`ON DELETE SET NULL`)
- `cortes_caja.usuario_id -> usuarios.id` (`ON DELETE SET NULL`)
- `corte_ventas_por_dpto.corte_id -> cortes_caja.id` (`ON DELETE CASCADE`)
- `corte_ventas_por_dpto.departamento_id -> departamentos.id` (`ON DELETE SET NULL`)

### Indices definidos

- `productos`: por `codigo_barras`, `departamento_id`, `activo`
- `tickets`: por `fecha`, `estado`
- `items_ticket`: por `ticket_id`
- `movimientos_inventario`: por `producto_id`, `fecha`
- `movimientos_caja`: por `fecha`

### Triggers y valores iniciales

- Trigger `trg_productos_updated`: actualiza `productos.actualizado_en` en cada `UPDATE`.
- Valores iniciales en `config_sistema`:
  - `dia_iniciado = false`
  - `fecha_dia_actual = ''`
  - `folio_actual = 1`
  - `version_db = 1`

## Consideraciones futuras

- Agregar nuevas funcionalidades con el tiempo.
- Evaluar respaldos online (ej. Supabase u otra alternativa gratuita).
- Incorporar nuevas pestanas/secciones segun necesidad.
- Evolucionar a sistema multi-caja con permisos.
