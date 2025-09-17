# Documentacion de la API

## Tecnologias:

- Express
- Nodejs

## Instalacion:

Para correr el proyecto es necesario tener instalado:

- Nodejs
- NPM
- SQLITE

Una vez asegurado de tener estos requisitos utilizas el comando: `npm install`

## Rutas de la REST API

### GET: /api/v1/tasks

- Devuelve un objeto JSON con todas las tareas registradas.

### POST: /api/v1/tasks

- Registra una nueva tarea con los datos proporcionados (title, description)
- Si no se proporicionan datos devuelve error 400 (BAD REQUEST) y un mensaje indicando que faltan datos

### PUT: /api/v1/tasks/:id

- Actualiza los datos de una tarea en especifico
- Si los datos proporcionados son invalidos devuelve error 400 (BAD REQUEST) y un mensaje indicando que faltan datos

### DELETE: /api/v1/tasks/:id

- Elimina una tarea especifica
- Si la tarea no existe devuelve un error 404 (NOT FOUND)