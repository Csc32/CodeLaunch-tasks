# Documentacion de la API

## Tecnologias

- Express
- Nodejs

## Instalacion

Para correr el proyecto es necesario tener instalado:

- Nodejs
- NPM
- SQLITE

Una vez asegurado de tener estos requisitos utilizas el comando: `npm install`

## Comandos

- `npm run dev` : ejecuta el proyecto en el puerto 3000

## Rutas de la REST API

### GET: /api/v1/tasks

- Devuelve un objeto JSON con todas las tareas registradas.

#### GET REQUEST

![Uso del GET request](/api/src/images/get-request.png)

### POST: /api/v1/tasks

- Registra una nueva tarea con los datos proporcionados (title, description)
- Si no se proporicionan datos devuelve error 400 (BAD REQUEST) y un mensaje indicando que faltan datos

#### POST REQUEST

![Uso del POST request](/api/src/images/post-request.png)

### PUT: /api/v1/tasks/:id

- Actualiza los datos de una tarea en especifico
- Si los datos proporcionados son invalidos devuelve error 400 (BAD REQUEST) y un mensaje indicando que faltan datos

#### PUT REQUEST

![Uso del PUT request](/api/src/images/put-request.png)

### DELETE: /api/v1/tasks/:id

- Elimina una tarea especifica
- Si la tarea no existe devuelve un error 404 (NOT FOUND)

#### DELETE REQUEST

![Uso del DELETE request](/api/src/images/delete-request.png)
