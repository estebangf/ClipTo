## Shorten Links

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# ClipTo - Acortador de URL

![ClipTo Logo](https://link-a-tu-logo.com/logo.png) <!-- Asegúrate de reemplazar con la URL de tu logo -->

## Descripción

ClipTo es un acortador de URL que permite a los usuarios crear enlaces cortos y personalizados a partir de URL largas. Con una interfaz intuitiva y características adicionales como estadísticas de uso, gestión de enlaces y opciones de edición, ClipTo ofrece una solución eficiente para compartir enlaces en redes sociales, correos electrónicos y más.

## Funcionalidades

- **Acortador de URL**: Convierte URL largas en enlaces cortos y fáciles de compartir.
- **Gestión de enlaces**: Visualiza, edita y elimina tus enlaces acortados.
- **Estadísticas**: Accede a datos sobre el uso de tus enlaces, incluyendo clics y otras métricas.
- **Interfaz intuitiva**: Diseñada con React y Tailwind CSS para una experiencia de usuario fluida.
- **Responsive**: Compatible con dispositivos móviles y de escritorio.

## Tecnologías Utilizadas

- **Frontend**: React, Next.js (App Router), Tailwind CSS
- **Backend**: Node.js, MongoDB (MongoDB Atlas)
- **API**: RESTful API para la gestión de enlaces
- **Despliegue**: Vercel

## Instalación

Para comenzar a usar ClipTo en tu entorno local, sigue estos pasos:

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/ClipTo.git
   cd ClipTo
   ```
2. **Instala las dependencias**:
   ```bash
   npm install
   ```
3. **Configura las variables de entorno: Crea los archivos en la raíz del proyecto y añade las siguientes variables**:
   #### .env
   ```bash
    MONGODB_URI=<mongodb-uri>
    DB_NAME=<db-name>
   ```
   #### .env.local
   ```bash
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
   ```
   #### .env.production
   ```bash
   NEXT_PUBLIC_API_BASE_URL=https://tu-dominio.com
   ```
4. **Inicia la aplicación**:
   ```bash
   npm run dev
   ```
5. **Abre tu navegador y ve a http://localhost:3000.**

## Uso

Para acortar una URL, simplemente ingresa la URL larga en el campo correspondiente y presiona el botón "Acortar". Luego podrás gestionar tus enlaces desde el dashboard, donde podrás editar, eliminar y ver las estadísticas de cada enlace.

## Contribuciones

¡Las contribuciones son bienvenidas! Si deseas mejorar ClipTo, sigue estos pasos:

## Haz un fork del proyecto.

Crea tu rama:
Copiar código

```bash
git checkout -b feature/nueva-funcionalidad
```

Realiza tus cambios y haz commit:
Copiar código

```bash
git commit -m 'Añadir nueva funcionalidad'
```

Envía tu pull request.

## Licencia

Este proyecto está bajo la Licencia MIT. Para más detalles, consulta el archivo LICENSE.

## Contacto

Si tienes alguna pregunta o sugerencia, no dudes en contactarme a través de tu-email@example.com.

---

¡Gracias por usar ClipTo! Esperamos que lo disfrutes.
