# 🦷 Dental Clinic Management System

A full-stack web application for managing a dental clinic, built with React and Supabase. It allows patients to book appointments and doctors to manage patients, clinical records, and schedules.

---

## 🚀 Live Demo

👉 https://consultorio-odontologico-lac.vercel.app/

---

## 🛠️ Tech Stack

* ⚛️ React + Vite
* 🎨 CSS (Tailwind planned)
* 🔐 Supabase (Authentication + Database)
* 🌐 React Router
* 🧠 Context API (Global State)

---

## ✨ Key Features

### 👤 Patient

* User registration and login
* Password recovery
* Book appointments
* View personal appointments

### 👨‍⚕️ Doctor

* Dashboard with statistics
* Appointment management
* Clinical panel
* Patient management
* Clinical history tracking
* Odontogram system
* Budget management

---

## 🔒 Authentication

* Supabase authentication system
* Role-based access (patient / doctor)
* Protected routes
* Fully functional password recovery

---

## 📅 Appointment System

* Date validation (no past dates allowed)
* Controlled working hours (morning & afternoon)
* Relationship between:

  * Patient (user)
  * Doctor
  * Clinical record

---

## 🧠 Project Structure

```id="2gk3r9"
src/
├──assets
├── components/
├── context/
├── pages/
├── routes/
├── services/
```

---

## ⚙️ Local Setup

```bash id="5y2l9c"
git clone https://github.com/alexisrrh/consultorio-odontologico.git
cd consultorio-odontologico
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file:

```id="8pq1dr"
VITE_SUPABASE_URL=YOUR_URL
VITE_SUPABASE_ANON_KEY=YOUR_KEY
VITE_APP_URL=https://consultorio-odontologico-lac.vercel.app
```

---

## ⚠️ Challenges Solved

* Password recovery redirect issues (especially on mobile)
* Session handling with Supabase
* Automatic user profile creation
* Role-based route protection
* Sync between authenticated user and patient data

---

## 📈 Future Improvements

* Full UI redesign with Tailwind
* Real-time notifications
* Payment system
* Calendar-based scheduling
* Multi-doctor support

---

## 👨‍💻 Author

**Alexis**
Junior Frontend Developer

* GitHub: https://github.com/alexisrrh

---

## 💼 Open to Work

I’m currently looking for my first opportunity as a Frontend Developer.
I’m highly motivated, fast-learning, and focused on building real-world applications.

---

## 📢 Note

This project is part of my learning journey and is continuously improving.
