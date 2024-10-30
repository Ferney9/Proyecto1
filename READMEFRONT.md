# Frontend - Proyecto de Gestión de Mascotas

Este es el frontend de la aplicación de gestión de mascotas, desarrollado con **React** y **TypeScript**. Proporciona una interfaz de usuario que permite a los usuarios gestionar sus mascotas mediante un conjunto de componentes interactivos y accesibles.

## Requisitos Previos

Asegúrate de tener instalados los siguientes programas:

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [Git](https://git-scm.com/)

## Configuración e Instalación

### Paso 1: Clonar el Proyecto

1. Abre una terminal y clona el repositorio:

   git clone https://github.com/usuario/proyecto-mascotas.git
   cd proyecto-mascotas/frontend


Paso 2: Instalar Dependencias
En el directorio frontend, instala las dependencias necesarias para el proyecto:

npm install

Paso 3: Configurar las Variables de Entorno
Crea un archivo .env en el directorio frontend y agrega la URL base de la API del backend. Esto permite que el frontend se comunique con el backend en la ruta adecuada.


REACT_APP_API_URL=http://localhost:3000
Asegúrate de que la URL coincida con la dirección y el puerto donde está ejecutándose tu backend.

Paso 4: Iniciar la Aplicación
Inicia la aplicación en modo desarrollo con el siguiente comando:

npm start
La aplicación debería abrirse automáticamente en tu navegador en http://localhost:3001 o en otro puerto disponible.

Estructura del Proyecto
src/components: Contiene los componentes de React utilizados en la aplicación.
src/pages: Contiene las vistas principales de la aplicación, como el listado de mascotas y el formulario de edición.
src/services: Contiene los servicios para manejar las peticiones a la API (ej. registro, inicio de sesión, gestión de mascotas).

src/styles: Incluye los archivos CSS o estilos aplicados en la aplicación.
Scripts Disponibles

npm start: Ejecuta la aplicación en modo de desarrollo.
npm run build: Crea una versión optimizada para producción en la carpeta build.
npm run test: Ejecuta los tests disponibles para el frontend (si se han implementado).

Funcionalidades Principales
Autenticación: Inicio de sesión y registro de usuarios.
Gestión de Mascotas: Agregar, editar, eliminar y listar mascotas.
Filtros: Filtrado de mascotas por diferentes atributos.
Sesión Persistente: La sesión del usuario permanece activa al actualizar la página.
Manejo de Errores y Depuración

Para depurar y monitorear errores en el frontend:

Utiliza las herramientas de desarrollo de tu navegador (como la consola) para ver los mensajes de error.
Asegúrate de que las variables de entorno estén configuradas correctamente en el archivo .env.
Revisa la conexión con el backend y confirma que el servidor esté ejecutándose en el puerto correcto.
Contribuciones
Si deseas contribuir a este proyecto, por favor, abre un "issue" o realiza un "pull request".

Licencia
Este proyecto está bajo la licencia MIT.

Este `README.md` para el frontend proporciona instrucciones detalladas sobre cómo configurar e iniciar el frontend, la estructura de carpetas, los scripts de npm disponibles y una breve descripción de las funcionalidades principales y el manejo de errores.






