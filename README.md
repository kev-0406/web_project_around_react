# Around the U.S.

Aplicación web hecha con React, TypeScript y Vite. Muestra el perfil de un usuario y una galería de tarjetas con lugares, conectada a una API real.

## Funcionalidades

- Carga del perfil y de las tarjetas desde la API al abrir la página.
- Edición del nombre y la descripción del perfil.
- Cambio de la foto de perfil.
- Creación de nuevas tarjetas.
- Like y quitar like en las tarjetas.
- Eliminación de tarjetas propias, con ventana de confirmación.
- Ventana emergente para ver una imagen en grande.

## Tecnologías

- React
- TypeScript
- Vite
- Context API (`CurrentUserContext`)
- CSS con metodología BEM

## Estructura del proyecto

- `src/components`: componentes de React (`App`, `Header`, `Main`, `Card`, popups y `Footer`).
- `src/contexts`: contexto del usuario actual.
- `src/interfaces`: definiciones de tipos de TypeScript.
- `src/utils`: clase `Api` para comunicarse con el servidor.
- `src/blocks`: hojas de estilo.
