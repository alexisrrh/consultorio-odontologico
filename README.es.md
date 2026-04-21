# 🦷 Consultorio Odontológico Web

Aplicación web completa para la gestión de una clínica dental, desarrollada con React y Supabase. Permite a pacientes agendar citas y a médicos gestionar pacientes, historial clínico y agenda.

---

## 🚀 Demo

👉 https://consultorio-odontologico-lac.vercel.app/

---

## 🛠️ Tecnologías utilizadas

* ⚛️ React + Vite
* 🎨 CSS / (próximamente Tailwind)
* 🔐 Supabase (Auth + Base de datos)
* 🌐 React Router
* 🧠 Context API (estado global)

---

## ✨ Funcionalidades principales

### 👤 Cliente

* Registro e inicio de sesión
* Recuperación de contraseña
* Agendar citas
* Ver historial de citas

### 👨‍⚕️ Médico

* Dashboard con estadísticas
* Gestión de citas
* Panel clínico completo
* Registro de pacientes
* Historial clínico
* Odontograma
* Presupuestos

---

## 🔒 Autenticación

* Sistema de login con Supabase
* Control de roles (cliente / médico)
* Rutas protegidas
* Recuperación de contraseña funcional

---

## 📅 Sistema de citas

* Validación de fechas (no permite fechas pasadas)
* Horarios controlados (mañana y tarde)
* Relación entre:

  * Cliente
  * Médico
  * Paciente

---

## 🧠 Estructura del proyecto

```
src/
├── assets
├── componentes/
├── context/
├── paginas/
├── rutas/
├── servicios/
```

---

## ⚙️ Instalación local

```bash
git clone https://github.com/alexisrrh/consultorio-odontologico.git
cd consultorio-odontologico
npm install
npm run dev
```

---

## 🔑 Variables de entorno

Crear un archivo `.env`:

```
VITE_SUPABASE_URL=TU_URL
VITE_SUPABASE_ANON_KEY=TU_KEY
VITE_APP_URL=https://consultorio-odontologico-lac.vercel.app
```

---

## ⚠️ Problemas resueltos

* Redirección incorrecta en recuperación de contraseña (móvil)
* Manejo de sesiones con Supabase
* Creación automática de perfiles
* Protección de rutas por rol
* Sincronización entre usuario y paciente

---

## 📈 Mejoras futuras

* UI completa con Tailwind
* Notificaciones en tiempo real
* Sistema de pagos
* Agenda tipo calendario visual
* Multi-médico

---

## 👨‍💻 Autor

**Alexis**
Frontend Developer en formación

* GitHub: https://github.com/alexisrrh

---

## 📢 Nota

Este proyecto forma parte de mi proceso de aprendizaje y está en constante mejora.
