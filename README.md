# Proyecto Sistema de Planetas

Este proyecto es una aplicación web para la gestión de datos astronómicos, que permite administrar planetas y sus lunas. Ha sido migrado de una arquitectura de JavaScript tradicional a una solución moderna con React para el frontend y Node.js para el backend.

## Prerrequisitos

Para el correcto funcionamiento del entorno de desarrollo, es necesario contar con el siguiente software instalado:

- Node.js (Versión LTS recomendada)
- Laragon o un servidor MySQL equivalente
- Base de datos activa con el nombre: sistemaplanetas

## Instalación y Configuración

El proyecto se divide en dos directorios principales que requieren una configuración independiente.

### 1. Configuración del Backend

Acceda a la carpeta del servidor y ejecute el siguiente comando para instalar las dependencias:

`npm install`

Es indispensable crear un archivo llamado `.env` en la raíz de la carpeta del backend con el siguiente contenido para habilitar la seguridad de los tokens:

`JWT_SECRET=su_clave_secreta_aqui`

### 2. Configuración del Frontend (React)

Acceda a la carpeta del proyecto de React y ejecute el siguiente comando para instalar las librerías necesarias:

`npm install`

## Ejecución del Proyecto

Siga este orden para iniciar los servicios de la aplicación:

### Paso 1: Base de Datos

Asegúrese de que Laragon esté iniciado y el servicio de MySQL esté activo para permitir la conexión de Sequelize.

### Paso 2: Iniciar Servidor Backend

En la terminal del backend, ejecute:

`node server.js`

El servidor backend escuchará peticiones en `http://localhost:3000`.

### Paso 3: Iniciar Servidor Frontend

En la terminal del frontend, ejecute:

`npm run dev`

La interfaz de usuario estará disponible en `http://localhost:5173`.

## Funcionalidades Implementadas

- Autenticación de usuarios basada en roles (Administrador y Astrónomo).
- Visualización completa y filtrada de planetas y lunas.
- Creación y edición de registros con validación de datos.
- Sistema de borrado lógico (Ocultar/Restaurar) y borrado permanente.
- Generación de reportes dinámicos mediante parámetros de búsqueda.

## Tecnologías Utilizadas

- Frontend: React, React Router, Context API, Vite.
- Backend: Node.js, Express, Sequelize ORM.
- Base de datos: MySQL.
