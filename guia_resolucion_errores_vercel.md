# Guía de Resolución de Errores en Vercel (Muunek)

Esta guía explica paso a paso la causa y la solución para los 3 errores de servidor que estás experimentando al desplegar la aplicación en Vercel.

---

## 1. El Origen del Problema: Entorno Local vs. Nube (Vercel)

Actualmente en tu archivo local `.env.local` tienes:
* `MYSQL_HOST=localhost`
* Base de datos corriendo en tu máquina física.

Cuando Vercel compila y despliega tu aplicación en su servidor en la nube:
1. **No puede acceder a `localhost`**: `localhost` para Vercel apunta a su propio contenedor serverless vacío, no a tu computadora. Al no haber base de datos allí, cualquier petición de Login o Registro de Email da un **`Error interno del servidor (500)`**.
2. **Falta de Variables en Vercel**: Vercel no lee tu archivo `.env.local` automáticamente por seguridad. Tienes que configurar estas variables directamente en el panel de control de Vercel.
3. **Restricción de Google OAuth**: Google bloquea el inicio de sesión si el token se solicita desde un dominio (`muunek-lectura.vercel.app`) que no ha sido explícitamente autorizado en tu consola de Google Cloud.

---

## 2. Paso a Paso para Solucionar los Errores

### Paso A: Migrar tu Base de Datos MySQL a la Nube (Gratis)
Dado que Vercel está en la nube, necesita una base de datos que también esté accesible en la nube 24/7.
1. Regístrate en una plataforma de bases de datos cloud gratuitas o de bajo costo (ej. **Aiven.io**, **Railway.app**, **PlanetScale** o **Clever Cloud**).
2. Crea una instancia de base de datos **MySQL** en su plan gratuito.
3. Obtén los datos de conexión que te proveerá el servicio:
   * **Host** (servidor público, ej: `mysql-XXXX.aivencloud.com`)
   * **User** (ej: `avnadmin` o `root`)
   * **Password** (la contraseña generada)
   * **Database** (ej: `defaultdb` o `plataforma_lectura`)
   * **Port** (ej: `3306`)

---

### Paso B: Configurar las Variables de Entorno en Vercel
1. Ingresa a tu panel de control de [Vercel Dashboard](https://vercel.com/dashboard).
2. Selecciona tu proyecto **`Muunek-Lectura`**.
3. Ve a la pestaña **Settings** (Configuración) -> **Environment Variables** (Variables de Entorno).
4. Agrega las siguientes variables con sus respectivos valores de tu nueva base de datos cloud y tu ID de Google:

| Key (Nombre de la Variable) | Value (Valor) |
|---|---|
| `MYSQL_HOST` | *(El host de tu base de datos en la nube)* |
| `MYSQL_USER` | *(El usuario de tu base de datos en la nube)* |
| `MYSQL_PASSWORD` | *(La contraseña de tu base de datos en la nube)* |
| `MYSQL_DATABASE` | *(El nombre de tu base de datos en la nube)* |
| `GOOGLE_CLIENT_ID` | `482195768804-pd1sdkfd9bv9s62t7m48spvs27ft8ogp.apps.googleusercontent.com` |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | `482195768804-pd1sdkfd9bv9s62t7m48spvs27ft8ogp.apps.googleusercontent.com` |

5. Haz clic en **Save** (Guardar).
6. **Redespliega el proyecto**: Ve a la pestaña **Deployments**, haz clic en los tres puntos del último despliegue y selecciona **Redeploy** para que tome las nuevas variables.

---

### Paso C: Autorizar tu dominio de Vercel en Google Cloud Console
Para solucionar el error *"Token de Google inválido o expirado"*:
1. Ve a la [Consola de Google Cloud](https://console.cloud.google.com/).
2. Selecciona el proyecto correspondiente a tu ID de cliente.
3. En el menú de la izquierda, navega a **API y servicios** -> **Pantalla de consentimiento de OAuth** o **Credenciales**.
4. Haz clic para editar tu **ID de cliente de OAuth 2.0** (el que estás usando en el proyecto).
5. En la sección **Orígenes de JavaScript autorizados** (Authorized JavaScript Origins), añade los siguientes dominios:
   * `http://localhost:3000` (para desarrollo local)
   * `https://muunek-lectura.vercel.app` (tu dominio de producción en Vercel)
6. En la sección **URIs de redireccionamiento autorizados** (Authorized redirect URIs), añade:
   * `http://localhost:3000`
   * `https://muunek-lectura.vercel.app`
7. Haz clic en **Guardar** en la parte inferior.
   > [!NOTE]
   > Los cambios en la consola de Google Cloud pueden tardar de 5 a 10 minutos en propagarse globalmente. Una vez transcurrido este tiempo, el token de Google será validado correctamente por Vercel.
