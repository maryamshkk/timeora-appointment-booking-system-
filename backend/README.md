# TIMEORA — Backend

> **One Platform. Every Appointment.**

TIMEORA is an appointment booking and management platform that connects customers with businesses and their staff. The backend provides secure REST APIs for authentication, scheduling, appointments, payments, receipts, notifications, reports, and administrative management.

---

## 🚀 Backend Overview

The TIMEORA backend is built with **Laravel** and provides a RESTful API consumed by the React frontend.

### Core Features

* 🔐 Authentication & OTP verification
* 👥 Role-based authorization
* 🏢 Company management
* 👨‍💼 Staff management
* 🛠️ Service management
* 📅 Business & staff availability
* ⏰ Automatic available-slot calculation
* 📌 Appointment booking & management
* 🔄 Cancellation & rescheduling
* 💵 Cash-on-reception payments
* 🧾 Digital receipts & PDF generation
* 🔔 In-app & email notifications
* ⏱️ 24-hour & 1-hour reminders
* ⚙️ Company, Staff & Customer settings
* 👑 Super Admin management
* 📊 Reports & analytics
* 🔒 Company-level data isolation

---

## 🛠️ Tech Stack

| Technology            | Purpose                  |
| --------------------- | ------------------------ |
| Laravel               | Backend framework        |
| PHP                   | Programming language     |
| MySQL                 | Database                 |
| Laravel Sanctum       | Authentication           |
| Eloquent ORM          | Database & relationships |
| REST API              | Frontend communication   |
| Laravel Notifications | Notifications            |
| Laravel Mail          | Email notifications      |
| Laravel Queues        | Background jobs          |
| Laravel Scheduler     | Appointment reminders    |
| PDF Generation        | Digital receipts         |
| Pest / PHPUnit        | Testing                  |

---

## 👤 User Roles

TIMEORA supports four roles:

### Super Admin

Platform-level management, companies, users, appointments, receipts, reports, settings, categories and audit logs.

### Company Admin

Manages their company, staff, services, customers, schedules and appointments.

### Staff

Manages assigned appointments, availability, schedule and profile.

### Customer

Discovers services, checks available slots, books appointments and manages their appointments.

---

## 📅 Appointment System

The booking engine checks multiple conditions before allowing an appointment:

```text
Business Hours
      ↓
Staff Availability
      ↓
Service Duration
      ↓
Breaks
      ↓
Blocked Time
      ↓
Holidays / Exceptions
      ↓
Existing Appointments
      ↓
Available Slot
      ↓
Appointment Booking
```

The backend prevents invalid bookings and double-booking conflicts.

---

## 💳 Payments & Receipts

TIMEORA uses **Cash on Reception** as the payment method.

The backend supports:

* Payment records
* Payment status
* Marking appointments as paid
* Digital receipt generation
* PDF receipts
* Appointment ↔ Payment ↔ Receipt relationships

No online payment gateway is required for the current version.

---

## 🔔 Notifications

Notifications are triggered by important appointment events:

* Booking created
* Appointment accepted
* Appointment rejected
* Cancellation
* Rescheduling
* Appointment completion
* Email verification
* 24-hour reminder
* 1-hour reminder

Laravel Queues and Scheduler are used for background notification processing and reminders.

---

## 📊 Reports & Analytics

The backend provides company and platform-level analytics including:

* Appointment statistics
* Booking trends
* Customer statistics
* Staff performance
* Popular services
* Payment statistics
* Receipt statistics
* Platform statistics

Reports support date-based filtering and role-based access.

---

## 🔒 Security & Authorization

TIMEORA uses:

* Laravel Sanctum
* Middleware
* Policies
* Request validation
* Password hashing
* Database transactions
* Company-level data isolation
* Appointment conflict protection

Company Admins can only access data belonging to their own company.

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd backend
```

### 2. Install dependencies

```bash
composer install
```

### 3. Configure environment

```bash
cp .env.example .env
php artisan key:generate
```

Configure the MySQL database in `.env`.

### 4. Run migrations

```bash
php artisan migrate
```

### 5. Start the development server

```bash
php artisan serve
```

The API will be available at:

```text
http://127.0.0.1:8000
```

---

## 🧪 Testing

Run the backend test suite with:

```bash
php artisan test
```

Important areas covered include:

* Authentication
* Authorization
* Company isolation
* Availability
* Slot calculation
* Appointments
* Double-booking prevention
* Payments
* Receipts
* Notifications
* Reports

---

## 📁 Main Backend Structure

```text
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   ├── Middleware/
│   │   └── Requests/
│   ├── Models/
│   ├── Notifications/
│   ├── Policies/
│   └── ...
├── database/
│   ├── migrations/
│   └── seeders/
├── routes/
│   └── api.php
├── config/
├── tests/
└── .env
```

---

## 🔄 Backend Status

**Backend feature development: Complete ✅**

Completed modules include:

```text
Authentication
Authorization
Company Management
Staff Management
Services
Availability
Slot Engine
Appointments
Payments
Receipts
Notifications
Settings
Super Admin
Reports & Analytics
```

The backend is ready for **full integration, QA, security testing, and production deployment**.

---

## 👩‍💻 Project

**TIMEORA — Appointment Booking & Management System**

> **One Platform. Every Appointment.**
