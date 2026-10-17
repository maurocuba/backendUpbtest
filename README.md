# 🐉 Capsule Corp — Backend de inventario

API REST para el inventario de la **Capsule Corp** del universo Dragon Ball: esferas del dragón, semillas del ermitaño, scouters, cápsulas Hoi-Poi y más.
Basada en el proyecto `backendUpbtest`, hecha con **Express 5 + PostgreSQL** y publicada en **Render**.

- API en producción: https://capsule-corp-api-mc.onrender.com
- Frontend: https://github.com/maurocuba/capsule-corp-frontend

## Arquitectura

```
src/
├── app.js               # Express, CORS, rutas, health check y manejador de errores
├── config/db.js         # Pool de conexión a PostgreSQL
├── db/                  # schema.sql, seed.sql e init.js (crea la tabla al arrancar)
├── routes/              # Definición de endpoints
├── controllers/         # Reciben la petición y responden
├── services/            # Reglas de negocio
├── repositories/        # Consultas SQL
├── dtos/                # Validación de entrada y forma de la respuesta
├── entities/            # Mapeo fila SQL → objeto Producto
└── utils/http-error.js  # Error con código HTTP
```

## Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/health` | Comprueba que la API y la base de datos responden |
| GET | `/api/productos` | Lista el inventario |
| GET | `/api/productos/:id` | Obtiene un producto |
| POST | `/api/productos` | Crea un producto: `{ "nombre", "categoria"?, "precio"?, "stock"? }` |
| PUT | `/api/productos/:id` | Actualiza parcialmente un producto |
| DELETE | `/api/productos/:id` | Elimina un producto |

Ejemplo de producto:

```json
{ "id": 3, "nombre": "Semilla del Ermitaño", "categoria": "Curación", "precio": 1500, "stock": 12 }
```

Errores: `400` datos inválidos, `404` no encontrado. En `postman/` hay una colección lista para importar.

## Ejecutar localmente

1. `npm install`
2. Copia `.env.example` a `.env` y completa `DATABASE_URL` con **tu propia** base PostgreSQL.
3. `npm run dev` y visita `http://localhost:3000/api/productos`.

La tabla `productos` y el inventario inicial se crean automáticamente al arrancar. También puedes crearla a mano con `npm run db:init`.

## Despliegue en Render

`render.yaml` es un Blueprint que crea el servicio web. Al aplicarlo (**New → Blueprint**), Render pide `DATABASE_URL`: pega la **Internal Database URL** de tu base PostgreSQL en Render (misma región). No hay credenciales en el repositorio.

> El plan gratuito de Render duerme el servicio tras ~15 min sin uso; la primera petición puede tardar hasta un minuto.
