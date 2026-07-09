# 📋 Mini-Guía de Pruebas de QA: "Learn with Parents"

Esta guía ha sido diseñada para estructurar y validar el correcto funcionamiento de la plataforma educativa **Learn with Parents**, simulando la experiencia real de un usuario final (padres e hijos).

---

## 1. Pruebas de Navegación

### Caso de Prueba 1.1: Flujo de Navegación Principal
*   **Objetivo**: Validar que los botones y pestañas de la barra de navegación redirijan a las secciones correspondientes sin enlaces rotos ni errores 404.
*   **Pasos**:
    1. Acceder a `http://localhost:3000`.
    2. Hacer clic en **Learn** (Área de aprendizaje infantil).
    3. Hacer clic en **Parents** (Rincón de padres).
    4. Hacer clic en **Home** o **Cerrar Sesión** para volver a la pantalla de bienvenida.
*   **Resultado Esperado**:
    *   Cada botón cambia de vista de forma instantánea.
    *   No se presentan pantallas en blanco ni excepciones de enrutado.
    *   La consola del navegador permanece libre de errores 404 de recursos.

---

## 2. Pruebas de Formularios

### Caso de Prueba 2.1: Validación de Login por Email
*   **Objetivo**: Comprobar que los campos de inicio de sesión acepten formatos correctos y rechacen datos inválidos con mensajes de error amigables.
*   **Datos de Prueba**:
    *   *Credenciales válidas*: `admin@pizzeria.com` / `password123`
    *   *Formato inválido*: `correo-sin-arroba.com`
    *   *Contraseña corta*: `123`
*   **Pasos**:
    1. En la pantalla principal, seleccionar **Sign In** (o ingresar por email).
    2. Intentar enviar con un correo vacío o mal estructurado.
    3. Intentar enviar con una contraseña menor a 6 caracteres.
    4. Ingresar las credenciales válidas y hacer clic en **Sign In**.
*   **Resultado Esperado**:
    *   El navegador o la app muestra validaciones nativas/mensajes como *"La contraseña debe tener al menos 6 caracteres"* o *"Por favor, ingresa tu correo electrónico."*
    *   Al usar credenciales correctas, la sesión se inicia con éxito y carga los perfiles del niño.

---

## 3. Pruebas de Lecciones

### Caso de Prueba 3.1: Secuencialidad y Trazado de Letras (Trace Letter)
*   **Objetivo**: Confirmar que la lección activa se bloquea/desbloquea en orden y que la interfaz de trazado registra progreso de forma interactiva.
*   **Pasos**:
    1. Iniciar sesión y elegir el perfil del niño (ej. *Mateo*).
    2. Intentar ingresar a la Lección 2 antes de completar la Lección 1.
    3. Seleccionar la pestaña **Trace Letter** en la lección activa.
    4. Usar el mouse o pantalla táctil para seguir la guía de puntos y flechas de la letra.
*   **Resultado Esperado**:
    *   Las lecciones avanzadas se muestran con candado y no son clickeables (bloqueo secuencial).
    *   La pizarra de trazado permite dibujar usando diferentes colores (crayones) y borrar con la esponja.
    *   Al completar el trazado, hacer clic en *"Done! 👍"* incrementa el progreso de la actividad.

---

## 4. Pruebas de Juegos (Pop Game)

### Caso de Prueba 4.1: Validación de Físicas y Dinámica del Juego de Burbujas
*   **Objetivo**: Verificar que las burbujas floten de abajo hacia arriba de forma fluida y respondan a las interacciones táctiles/clics.
*   **Pasos**:
    1. Ir a la pestaña **Pop Game** (Juego de Burbujas).
    2. Observar el movimiento de las burbujas (deben subir fluidamente sin pausarse ni atascarse al inicio).
    3. Hacer clic en una burbuja con la **letra correcta** (coincidente con el nivel actual).
    4. Hacer clic en una burbuja con una **letra incorrecta**.
*   **Resultado Esperado**:
    *   **Físicas correctas**: Las burbujas flotan hacia arriba a una velocidad constante y rebotan en las paredes laterales.
    *   **Clic Correcto**: Sonido pop agudo, explosión de partículas de colores, incremento de estrellas en el marcador y multiplicación del Combo.
    *   **Clic Incorrecto**: Sonido de aviso grave, vibración/sacudida en pantalla, desvanecimiento de la burbuja y reinicio del Combo a cero.
    *   **Meta**: Al llegar a 10 pops correctos, se muestra el modal de victoria *"Congratulations!"* con medalla de oro y botón para avanzar.

---

## 5. Panel de Padres (Parents Corner)

### Caso de Prueba 5.1: Métricas en Tiempo Real y Puerta de Seguridad
*   **Objetivo**: Validar el funcionamiento del control de seguridad para padres y la actualización de los datos de progreso.
*   **Pasos**:
    1. Hacer clic en **Parents** en la barra inferior.
    2. Resolver el desafío matemático o puerta de seguridad de bloqueo para niños.
    3. Revisar las métricas de Mateo (Estrellas obtenidas, lección actual).
    4. Cambiar el límite de tiempo de juego (ej. a 15 min) y guardar.
*   **Resultado Esperado**:
    *   La puerta de seguridad bloquea accesos accidentales de niños.
    *   Las métricas se actualizan reflejando las estrellas ganadas en el Pop Game en tiempo real.
    *   Al cumplirse el límite de tiempo establecido, el sistema bloquea temporalmente la pantalla de juego indicando que el tiempo ha concluido.

---

## 6. Pruebas de Usabilidad

### Caso de Prueba 6.1: Accesibilidad Infantil e Interfaz Responsiva
*   **Objetivo**: Validar que los botones sean lo suficientemente grandes para dedos infantiles y que la UI se adapte a dispositivos móviles (tablets).
*   **Pasos**:
    1. Redimensionar el navegador a resolución de tablet (`768px` de ancho) y móvil (`480px` de ancho).
    2. Comprobar que los crayones de colores y botones de navegación tengan áreas de clic amplias.
    3. Comprobar que las animaciones (giros, estrellas voladoras, sacudida de pantalla) sean fluidas.
*   **Resultado Esperado**:
    *   Ningún elemento interactivo se solapa.
    *   Los botones e inputs tienen un tamaño mínimo accesible (mínimo `44px` de alto/ancho).

---

## 7. Pruebas de Rendimiento

### Caso de Prueba 7.1: Tiempos de Carga y Estabilidad
*   **Objetivo**: Asegurar que la aplicación cargue los datos de la lección JSON de manera asíncrona sin congelar la interfaz.
*   **Pasos**:
    1. Abrir las Herramientas de Desarrollador (F12) y simular una red lenta (*Throttling -> Fast 3G*).
    2. Cambiar de lección activa y medir el tiempo que tarda la mascota en actualizar su diálogo.
*   **Resultado Esperado**:
    *   La página no se bloquea al realizar consultas a la base de datos local o al cargar el archivo JSON de lecciones.
    *   La aplicación sigue respondiendo y muestra indicadores visuales de carga si es necesario.
