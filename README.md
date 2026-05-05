# FormulariosAvanzados

**Demo en Netlify:** [Ver aplicación desplegada](mogasforms.netlify.app)

Formulario de registro de usuarios para un banco digital, construido con Angular Reactive Forms. Valida todos los campos en tiempo real, bloquea envíos con datos inválidos y simula una llamada a una API al enviar.

---

## Capturas de pantalla

**Vista general del formulario**

![Vista general del formulario](images/form-general.png)

**Errores de validación**

![Errores de validación visibles](images/form-validaciones.png)

**Validación asíncrona de email**

![Error de email ya registrado](images/form-email-async.png)

**Mensaje de éxito tras el envío**

![Mensaje de registro exitoso](images/form-exito.png)

> Las imágenes se mostrarán una vez que agregues los archivos `.png` en la carpeta `images/`.

---

## Funcionalidades

- Validación en tiempo real con mensajes de error específicos por campo
- Validador personalizado: confirmación de contraseña (entre campos)
- Validador personalizado: edad mínima de 18 años
- Validador asíncrono: verificación simulada de disponibilidad de email (800 ms de delay)
- Los errores solo aparecen después de que el usuario toca o modifica un campo
- El botón de envío se deshabilita mientras el formulario sea inválido
- Indicador de fuerza de contraseña (Débil / Media / Fuerte)
- Toggle para mostrar u ocultar la contraseña
- El formulario se resetea tras un envío exitoso
- Envío simulado a una API con `setTimeout`

---

## Campos y reglas de validación

| Campo | Reglas |
|---|---|
| Nombre | Obligatorio. 3–50 caracteres. Solo letras y espacios. |
| Email | Obligatorio. Formato válido. Emails bloqueados: `admin@banco.com`, `usuario@banco.com`, `test@test.com`. |
| Contraseña | Obligatorio. Mínimo 8 caracteres. Debe incluir mayúscula, minúscula y un número. |
| Confirmar contraseña | Debe coincidir con el campo de contraseña. |
| Edad | Obligatorio. Debe ser 18 años o más. |
| Términos | Debe ser aceptado. |

---

## Estructura del proyecto

```
src/app/
  registro/
    registro.component.ts     # Lógica del formulario y manejador de envío
    registro.component.html   # Template con bindings y mensajes de error
    registro.component.css    # Estilos del componente
    validators.ts             # Validadores personalizados y asíncronos
  app.ts                      # Componente raíz
images/                       # Capturas de pantalla para este README
```

---

## Cómo ejecutar el proyecto

```bash
# Clonar el repositorio
git clone https://github.com/JoyMoGas/AdvancedForms.git
cd AdvancedForms

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm start
```

La aplicación estará disponible en `http://localhost:4200`.

---

## Notas

- Construido con la API de componentes standalone de Angular (sin `NgModule`).
- Font Awesome 6 cargado mediante CDN para los iconos.
- El validador asíncrono de email se activa solo en `blur` para evitar peticiones innecesarias mientras se escribe.
