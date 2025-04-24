


          
# Email Faker

## Descripción

Email Faker Backend es un servicio API que permite crear y gestionar emails temporales verificados. Utiliza [Mail.tm](https://mail.tm) como proveedor de emails temporales y [Disify](https://www.disify.com) para verificar la validez de los emails generados. Además, genera perfiles de usuario aleatorios para cada email creado.

## Características

- Creación de emails temporales verificados
- Verificación de validez de emails mediante Disify
- Generación de perfiles de usuario aleatorios
- Gestión de mensajes recibidos
- Administración de cuentas de email

## Tecnologías

- Node.js
- TypeScript
- Express
- Axios
- Faker.js

## Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/email-faker-backend.git
cd email-faker-backend
```

2. Instala las dependencias:

```bash
npm install
```

3. Compila el proyecto:

```bash
npm run build
```

4. Inicia el servidor:

```bash
npm start
```

## Uso

El servidor se ejecutará en `http://localhost:3000` (o el puerto configurado en las variables de entorno).

## Documentación de la API

### Emails

#### Crear un email temporal verificado

```
POST /api/email
```

Crea un email temporal utilizando Mail.tm y verifica su validez con Disify. También genera un perfil de usuario aleatorio.

**Parámetros:**
- No requiere parámetros

**Respuesta:**
- `201 Created`: Email creado exitosamente
  ```json
  {
    "disposableDetected": false,
    "data": {
      "email": "usuario123@dominio.com",
      "password": "P@ssw0rd123!",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "isVerified": true
    },
    "userProfile": {
      "firstName": "Juan",
      "lastName": "Pérez",
      "fullName": "Juan Pérez",
      "gender": "male",
      "age": 30,
      "birthdate": "1993-05-15",
      "avatar": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/128.jpg",
      "address": {
        "street": "Calle Principal 123",
        "city": "Madrid",
        "state": "Madrid",
        "zipCode": "28001",
        "country": "España"
      },
      "phone": "+34 612 345 678",
      "occupation": "Desarrollador de Software",
      "company": "Tech Innovación S.L."
    }
  }
  ```
- `500 Internal Server Error`: Error del servidor
- `503 Service Unavailable`: Servicio no disponible

### Mensajes

#### Obtener todos los mensajes

```
GET /api/messages?token=TOKEN
```

Recupera la lista de mensajes para una cuenta específica.

**Parámetros:**

- `token` (query, requerido): Token de autenticación
- `page` (query, opcional): Número de página

**Respuestas:**

- `200 OK`: Lista de mensajes obtenida exitosamente
- `400 Bad Request`: Token no proporcionado
- `500 Internal Server Error`: Error del servidor

#### Obtener un mensaje específico

```
GET /api/messages/:id?token=TOKEN
```

Recupera un mensaje por su ID y lo marca automáticamente como leído.

**Parámetros:**

- `id` (path, requerido): ID del mensaje
- `token` (query, requerido): Token de autenticación

**Respuestas:**

- `200 OK`: Mensaje obtenido exitosamente
- `400 Bad Request`: Token no proporcionado
- `404 Not Found`: Mensaje no encontrado
- `500 Internal Server Error`: Error del servidor

#### Eliminar un mensaje

```
DELETE /api/messages/:id?token=TOKEN
```

Elimina un mensaje por su ID.

**Parámetros:**

- `id` (path, requerido): ID del mensaje
- `token` (query, requerido): Token de autenticación

**Respuestas:**

- `204 No Content`: Mensaje eliminado exitosamente
- `400 Bad Request`: Token no proporcionado
- `404 Not Found`: Mensaje no encontrado
- `500 Internal Server Error`: Error del servidor

### Cuenta

#### Obtener información de la cuenta

```
GET /api/account?token=TOKEN
```

Recupera los detalles de una cuenta específica usando el token de autenticación.

**Parámetros:**

- `token` (query, requerido): Token de autenticación

**Respuestas:**

- `200 OK`: Información de la cuenta obtenida exitosamente
- `400 Bad Request`: Token no proporcionado
- `401 Unauthorized`: No autorizado
- `404 Not Found`: Cuenta no encontrada
- `500 Internal Server Error`: Error del servidor

#### Eliminar una cuenta

```
DELETE /api/account?token=TOKEN
```

Elimina permanentemente una cuenta y todos sus mensajes.

**Parámetros:**

- `token` (query, requerido): Token de autenticación

**Respuestas:**

- `204 No Content`: Cuenta eliminada exitosamente
- `400 Bad Request`: Token no proporcionado
- `401 Unauthorized`: No autorizado
- `404 Not Found`: Cuenta no encontrada
- `500 Internal Server Error`: Error del servidor

#### Obtener información de la cuenta actual

```
GET /api/account/me?token=TOKEN
```

Recupera los detalles de la cuenta autenticada.

**Parámetros:**

- `token` (query, requerido): Token de autenticación

**Respuestas:**

- `200 OK`: Información de la cuenta obtenida exitosamente
- `400 Bad Request`: Token no proporcionado
- `401 Unauthorized`: No autorizado
- `500 Internal Server Error`: Error del servidor

## Servicios

### MailService

Proporciona funcionalidades para interactuar con la API de Mail.tm:

- `getDomains()`: Obtiene los dominios disponibles para crear cuentas
- `createAccount(username, domain, password)`: Crea una cuenta de email temporal
- `getToken(address, password)`: Obtiene un token de autenticación
- `getMessages(token, page)`: Obtiene todos los mensajes de una cuenta
- `getMessage(token, messageId)`: Obtiene un mensaje específico por su ID
- `markAsRead(token, messageId)`: Marca un mensaje como leído
- `deleteMessage(token, messageId)`: Elimina un mensaje
- `getAccount(token)`: Obtiene información de una cuenta específica
- `getMe(token)`: Obtiene información de la cuenta autenticada
- `deleteAccount(token)`: Elimina una cuenta

### DisifyService

Proporciona funcionalidades para verificar emails usando la API de Disify:

- `verifyEmail(email)`: Verifica si un email es válido
- `isEmailValid(response)`: Determina si un email es válido según los criterios de Disify

## Contribución

1. Haz un fork del proyecto
2. Crea una rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`)
3. Haz commit de tus cambios (`git commit -am 'Añadir nueva funcionalidad'`)
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crea un nuevo Pull Request
