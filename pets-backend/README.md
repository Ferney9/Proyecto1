# Backend - Proyecto de Gestión de Mascotas

Este es el backend de la aplicación de gestión de mascotas, construido con Node.js y Express. Proporciona una API para gestionar las mascotas de los usuarios, incluyendo operaciones de CRUD (crear, leer, actualizar, eliminar) y autenticación básica. La base de datos utilizada es MySQL.

## Requisitos Previos

Asegúrate de tener instalados los siguientes programas:

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [MySQL](https://www.mysql.com/)
- [Git](https://git-scm.com/)

## Configuración e Instalación

### Paso 1: Clonar el Proyecto

1. Abre una terminal y clona el repositorio:
   ```bash
   git clone https://github.com/usuario/proyecto-mascotas.git
   cd proyecto-mascotas/backend


Paso 2: Instalar Dependencias
En el directorio backend, instala las dependencias del proyecto:
bash
Copiar código
npm install


Paso 3: Configurar la Base de Datos
Inicia sesión en tu servidor de MySQL y crea una base de datos para el proyecto:
sql
Copiar código
CREATE DATABASE gestion_mascotas;


Paso 4: Configurar las Variables de Entorno
Crea un archivo .env en el directorio backend y agrega la configuración de la base de datos y el puerto del 


servidor:
DB_HOST=localhost
DB_USER=tu_usuario_mysql
DB_PASSWORD=tu_contraseña_mysql
DB_NAME=gestion_mascotas
PORT=3000
Asegúrate de reemplazar tu_usuario_mysql y tu_contraseña_mysql con tus credenciales de MySQL.

Paso 5: Migrar la Base de Datos
Ejecuta las migraciones para crear las tablas necesarias en la base de datos:


npm run migrate
Este comando creará las tablas users y mascotas en la base de datos gestion_mascotas.

Paso 6: Iniciar el Servidor
Inicia el servidor en modo desarrollo con el siguiente comando:

npm start
El backend estará disponible en http://localhost:3000.

Endpoints de la API
A continuación, se describen algunos de los endpoints principales del backend:

POST /users/register - Registra un nuevo usuario.
POST /users/login - Inicia sesión un usuario.
GET /users/:userId/pets - Obtiene todas las mascotas de un usuario.
POST /users/:userId/pets - Crea una nueva mascota para un usuario.
PUT /pets/:petId - Actualiza los datos de una mascota.
DELETE /pets/:petId - Elimina una mascota.

Scripts Disponibles
npm start: Inicia el servidor en modo producción.
npm run dev: Inicia el servidor en modo desarrollo (recarga en caliente).
npm run migrate: Ejecuta las migraciones de base de datos para crear las tablas necesarias.
Manejo de Errores y Depuración

Para monitorear y depurar errores:
Revisa los mensajes de error en la consola.
Verifica las configuraciones en el archivo .env en caso de problemas de conexión con la base de datos.
Asegúrate de que el servidor de MySQL esté en ejecución.

Contribuciones
Si deseas contribuir a este proyecto, por favor, abre un "issue" o realiza un "pull request".

Licencia
Este proyecto está bajo la licencia MIT.

css
Copiar código

Este archivo `README.md` para el backend guía a los usuarios desde la clonación del proyecto hasta la ejecución del servidor, brindando una descripción detallada de cada paso y los comandos clave. Además, enumera los endpoints de la API y proporciona una breve explicación de manejo de errores y depuración.





