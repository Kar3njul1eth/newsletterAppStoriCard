# Newsletter Technology App

https://newsletter-app-storicard-9f2153e1b237.herokuapp.com/

![App](./assets/newsletterapp.png)

Este proyecto fue construido utilizando Nuxt.js como un framework de full-stack y consiste en una aplicación de newsletter que permite:

- Ver usuarios suscritos
- Suscribir nuevos usuarios
- Enviar un newsletter a todos los usuarios con una plantilla HTML predefinida
- Enviar un newsletter con una foto o documento adjunto
- Cancelar la suscripción de un usuario a través del enlace recibido en el correo

## Estructura del Proyecto

La aplicación utiliza Nuxt.js como framework de full-stack, permitiendo crear páginas y APIs sin la necesidad de un backend externo. Nuestras páginas consumen directamente estas APIs locales, que mediante bibliotecas como `resend` gestionan el envío de correos electrónicos. La estructura del proyecto sigue el patrón de contenedor, separando la lógica de negocio de la lógica de la interfaz de usuario.

### Tecnologías Utilizadas

- Nuxt.js
- TypeScript
- Vuetify
- Axios
- Resend
- Heroku (para el despliegue)

### Estructura del Proyecto

```plaintext
├── assets             # Archivos estáticos
├── components         # Componentes de la interfaz de usuario
├── layouts            # Diseños globales
├── pages              # Páginas del proyecto
├── server             # Directorio para el backend
│   ├── api            # Rutas de la API
│   ├── index.ts       # Archivo de entrada del servidor
│   ├── data.json      # Almacena la info de los emails o suscriptores
├── static             # Archivos estáticos públicos
├── nuxt.config.js     # Configuración de Nuxt.js
├── package.json       # Dependencias del proyecto
└── README.md          # Documentación del proyecto
```

## Build Setup

```bash
install dependencies (node >18)
$ yarn install

serve with hot reload at localhost:3000
$ yarn dev

build for production and launch server
$ yarn build
$ yarn start

generate static project
$ yarn generate
```

## Importante
Se recomienda en local dejar la configuracion de origin cors con '*', para que admita todos los origenes y ejecute correctamente.

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
};
## Información Adicional

Desde Resend se puede administrar el envío de los emails.
Resend es el servicio utilizado para enviar los correos electrónicos en esta aplicación. Algunas de las funcionalidades adicionales que ofrece Resend incluyen:

- Crear listas masivas de usuarios: Puedes gestionar y almacenar listas de usuarios para enviar correos electrónicos de manera eficiente.
- Crear plantillas: Resend permite diseñar y utilizar plantillas de correo electrónico para enviar mensajes personalizados.
- Incluir dominios: Puedes gestionar y verificar dominios desde la plataforma de Resend.
- Ver newsletters enviados: Resend proporciona un panel de control donde puedes ver y gestionar los correos electrónicos enviados.
Para más información, visita https://resend.com/
