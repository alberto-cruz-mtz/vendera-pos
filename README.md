# Vendera POS

Sistema de punto de venta (POS) de escritorio para reemplazar parcialmente Eleventa en un negocio familiar, manteniendo un flujo de uso familiar para el operador.

## Objetivo

Construir una app de escritorio con foco en operaciones reales de caja:

- Ventas y tickets concurrentes.
- Inventario y movimientos del dia.
- Entradas/salidas de efectivo y corte diario.
- Flujo similar a Eleventa para reducir friccion operativa.

## Stack tecnologico

- Desktop runtime: Wails v2 (Go).
- Frontend: React 19 + TypeScript + Vite.
- UI: Tailwind CSS v4 + HeroUI.
- Formularios y validacion: React Hook Form + Valibot.
- Estado global: Zustand.
- Base de datos: SQLite.

## Funcionalidades principales

- Gestion de productos: alta, actualizacion (sin inventario), baja.
- Gestion de departamentos (categorias): alta, actualizacion, baja.
- Promociones por cantidad.
- Inventario: agregar existencias, ajustes, consulta completa y productos en `0`.
- Ventas: registro de productos, tickets, cancelaciones y devoluciones.
- Caja: entradas, salidas, fondo inicial, corte final por dia y por departamento.
- Consulta historica por fecha en secciones clave.

## Requisitos no funcionales clave

- Navegacion por secciones: ventas, productos, inventario y corte.
- Atajos de teclado alineados al flujo de Eleventa.
- Soporte para producto comun (`"Producto Comun"`).
- Varios tickets abiertos en paralelo con cambio entre tickets activos.
- Respaldo de informacion al cierre diario.
- Validaciones operativas (stock insuficiente, salida mayor al dinero en caja, etc.).

## Atajos de teclado

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

## Modelo de datos (SQLite)

El esquema se encuentra en `schema.sql` y contempla entidades para:

- Catalogos: `departamentos`, `productos`, `promociones`, `usuarios`.
- Operacion de venta: `tickets`, `items_ticket`.
- Trazabilidad: `movimientos_inventario`, `movimientos_caja`.
- Cierre diario: `cortes_caja`, `corte_ventas_por_dpto`.
- Sistema: `config_sistema`, `respaldos`.

Tambien incluye:

- `PRAGMA journal_mode = WAL` y `PRAGMA foreign_keys = ON`.
- Indices para consultas frecuentes.
- Trigger `trg_productos_updated` para `actualizado_en`.
- Configuracion inicial de runtime (`dia_iniciado`, `fecha_dia_actual`, `folio_actual`, `version_db`).

## Requisitos de desarrollo

- Go `1.23.x`.
- Bun instalado (usado por el frontend).
- Wails CLI v2.

Instalar Wails CLI:

```bash
go install github.com/wailsapp/wails/v2/cmd/wails@latest
```

## Desarrollo local

Desde la raiz del proyecto:

```bash
wails dev
```

Esto ejecuta la app en modo desarrollo y levanta Vite con hot reload.

Opcional (solo frontend):

```bash
cd frontend
bun install
bun run dev
```

## Build de produccion

```bash
wails build
```

### Build para Windows (ejecutable e instalador)

Comando directo (oficial Wails):

```bash
wails build -platform windows/amd64 -clean -o vendera-pos.exe
```

Para generar instalador NSIS:

```bash
wails build -platform windows/amd64 -clean -o vendera-pos.exe -nsis
```

Tambien tenes script listo para PowerShell:

```powershell
# Solo .exe
./scripts/build-windows.ps1 -Arch amd64 -Clean

# .exe + instalador NSIS
./scripts/build-windows.ps1 -Arch amd64 -Clean -Installer

# Estrategia WebView2 (download|embed|browser|error)
./scripts/build-windows.ps1 -Arch amd64 -WebView2 embed -Installer
```

Notas:

- El ejecutable se genera en `build/bin`.
- Si usas `-Installer`, necesitas NSIS (`makensis.exe`) en `PATH`.
- Metadata del instalador: se toma de `wails.json` (campo `Info`) y plantillas en `build/windows/installer`.

## Estado actual y roadmap

> Tablero inicial basado en el alcance definido en `vendera.md`. Ajustar estados conforme avance la implementacion.

### Fundaciones

- [x] Stack base definido (Wails + React + TypeScript + SQLite).
- [x] Esquema inicial de base de datos en `schema.sql`.
- [ ] Arquitectura de modulos y limites de contexto en frontend/backend.
- [ ] Estrategia de estado global para flujos transversales (tickets/modales/shortcuts).

### Ventas y tickets

- [ ] Alta de productos a venta por buscador.
- [ ] Alta de productos a venta por codigo de barras.
- [ ] Producto comun (`"Producto Comun"`) con cantidad y precio.
- [ ] Multiples tickets abiertos y cambio de ticket activo.
- [ ] Cobro con modal (pago en efectivo y cambio).
- [ ] Cancelacion de venta completa con restitucion de inventario.
- [ ] Devolucion parcial o total de productos ya vendidos.

### Inventario, catalogos y promociones

- [ ] CRUD de productos (sin editar inventario en actualizacion de producto).
- [ ] Alta de existencias en inventario.
- [ ] Ajuste/actualizacion de existencias.
- [ ] CRUD de departamentos.
- [ ] Promociones por cantidad con descuento automatico.
- [ ] Precio de mayoreo por boton y shortcut.

### Caja y corte

- [ ] Fondo inicial del dia (solo primera apertura diaria).
- [ ] Registro de entradas de efectivo.
- [ ] Registro de salidas de efectivo con validacion de saldo.
- [ ] Registro de movimientos de caja por venta/devolucion.
- [ ] Corte final diario (totales generales y por departamento).
- [ ] Consulta de tickets del dia y dias anteriores.

### UX, navegacion y operacion

- [ ] Navegacion por pestanas (`F1`, `F3`, `F4`) y shortcuts operativos.
- [ ] Filas preseleccionadas y navegacion con `UP`/`DOWN` en tablas.
- [ ] Persistencia de ventas no concluidas al cambiar de pestana.
- [ ] Sincronizacion de stock cuando inventario cambia con tickets abiertos.
- [ ] Mensajes de validacion (sin stock, salida mayor a caja, etc.).

### Distribucion y continuidad

- [ ] Respaldo automatico diario al cerrar la aplicacion.
- [ ] Importacion de inventario desde Eleventa (Excel).
- [ ] Instalador para Windows.
- [ ] Distribucion para Linux.
- [ ] Mecanismo de actualizacion sin reinstalacion manual.

## Estructura del proyecto

- `main.go`: bootstrap de la app Wails.
- `app.go`: metodos Go expuestos a frontend.
- `pkg/`: logica de dominio/infraestructura (incluye base de datos).
- `frontend/`: app React + TypeScript.
- `schema.sql`: modelo de base de datos SQLite.
- `wails.json`: configuracion del proyecto Wails.

## Referencias

- Configuracion de Wails: https://wails.io/docs/reference/project-config
