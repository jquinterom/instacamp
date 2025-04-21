# Instacamp

## Introducción

El proyecto Instacamp es un proyecto clon de instagram que permite a los usuarios crear un perfil personal y compartir fotos con amigos y familiares.

## Objetivos

- Crear un perfil personal
- Compartir fotos con amigos y familiares
- Compartir fotos con grupos
- Compartir fotos con público
- Poder dar like a las fotos
- Poder comentar las fotos

## Tecnologías

- Laravel
- React JS
- Sqlite
- Tailwind CSS
- Bun
- Shadcn

## Instalación

Para instalar el proyecto, primero debemos clonarlo desde github y luego instalar las dependencias necesarias.

## Clonar el proyecto

```
git clone https://github.com/gesoft/instacamp.git
```

## Instalar dependencias

```
cd instacamp
composer install
bun install
```

## Ejecución

Una vez que se hayan instalado las dependencias ahora si se puede ejecutar el proyecto con el siguiente comando:

```
php artisan serve
```

en otro terminal se puede ejecutar el siguiente comando para iniciar el servidor de react:

```
bun run dev
```

Luego, se puede acceder al proyecto en la siguiente dirección:

http://localhost:8000

## Tests

Para ejecutar los tests del backend se puede ejecutar el siguiente comando:

```
php artisan test
```
