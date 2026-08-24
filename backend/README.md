# TIMEORA — Backend

**TIMEORA by Tiemio**
*One Platform. Every Appointment.*

TIMEORA is an appointment booking and management platform that connects businesses, staff, and customers through a centralized appointment system.

This repository contains the **Laravel REST API backend** for TIMEORA.

---

## Tech Stack

* **Framework:** Laravel 13
* **Language:** PHP
* **API:** REST API
* **Database:** MySQL
* **ORM:** Eloquent ORM
* **Authentication:** Laravel Sanctum
* **Authorization:** Middleware + Policies
* **Email:** Laravel Mail / Notifications
* **Queue:** Laravel Queues
* **Scheduler:** Laravel Scheduler
* **PDF:** Laravel PDF generation
* **Testing:** Pest / PHPUnit
* **Version Control:** Git + GitHub

---

## Backend Architecture

TIMEORA follows a relational architecture based on the following hierarchy:

```text
Super Admin
    │
    └── Companies
            │
            ├── Company Admin
            │
            ├── Staff
            │
            ├── Services
            │
            ├── Availability
            │
            ├── Customers
            │
            └── Appointments
                    │
                    ├── Payments
                    └── Receipts
```

The backend exposes REST APIs that are consumed by the React frontend.

---

# Current Development Progress

## Day 1 — Project Setup

### Completed

* Laravel backend project created
* Backend environment configured
* MySQL database configured
* Laravel API installed
* Sanctum installed/configured
* CORS configured for React frontend
* Frontend ↔ Backend API connection tested
* Basic test API endpoint created
* Git repository initialized

### API Communication

The React frontend communicates with Laravel through REST APIs.

```text
React + Axios
      ↓
Laravel REST API
      ↓
Controllers
      ↓
Services / Business Logic
      ↓
Eloquent Models
      ↓
MySQL
```

---

# Day 2 — Database Design

The initial TIMEORA relational database structure has been planned around the core entities.

## Main Tables

```text
users
companies
staff
customers
services
availability
appointments
payments
receipts
notifications
```

The database design follows the TIMEORA business hierarchy and uses foreign keys and Eloquent relationships to connect entities.

### Main Relationships

```text
Company
 ├── Company Admin
 ├── Staff
 ├── Services
 ├── Availability
 ├── Customers
 └── Appointments

Appointment
 ├── Customer
 ├── Staff
 ├── Service
 ├── Payment
 └── Receipt
```

Database migrations and model relationships are being implemented incrementally rather than creating the complete system in one step.

---

# Day 3 — Authentication & Registration

The current backend work is focused on the **registration and authentication foundation**.

TIMEORA has a role-based registration system.

## Registration Roles

A user can register as:

```text
Company
Customer
```

The company registration flow is currently the primary registration flow being implemented.

---

## Company Registration Flow

The current planned flow is:

```text
Create Account
      ↓
Enter Email
      ↓
Enter Password
      ↓
Confirm Password
      ↓
Create Registration Record
      ↓
Send OTP
      ↓
Verify Email / OTP
      ↓
Account Verification
      ↓
Check Account / Company Status
      ↓
Login
      ↓
Company Dashboard
```

### Important Rule

A company does **not** require manual approval from the Super Admin.

Once the required registration and verification checks are successfully completed, the company can proceed according to its account/company status.

---

# Registration Status Logic

The backend distinguishes between the registration/verification stage and the normal dashboard state.

For example:

```text
Registration
     ↓
Email/OTP Verification
     ↓
Verification Successful
     ↓
Account + Company Status Check
     ↓
Access Granted
```

A pending verification state is relevant **during registration/verification**.

Once verification is successfully completed, the user should not continue appearing as a pending registration on the dashboard.

---

# Authentication

Laravel Sanctum is being used for API authentication.

The authentication system is responsible for:

* Registration
* Email/OTP verification
* Login
* Logout
* Password reset
* Authentication token management
* Protected API routes

Authentication and authorization are treated as separate concerns.

```text
Authentication
→ Who is the user?

Authorization
→ What is the user allowed to do?
```

---

# Roles & Authorization

TIMEORA uses role-based access control.

The main system roles are:

```text
Super Admin
Company Admin
Staff
Customer
```

Each role has its own panel and permissions.

## Super Admin

Responsible for platform-level management.

```text
Super Admin
 ├── Companies
 ├── Users
 ├── Appointments
 ├── Receipts
 └── Platform Reports
```

## Company Admin

Responsible for managing their own company.

```text
Company Admin
 ├── Company Profile
 ├── Services
 ├── Staff
 ├── Appointments
 ├── Calendar
 ├── Working Hours
 ├── Staff Availability
 ├── Blocked Time / Holidays
 └── Notifications
```

## Staff

Staff members can manage their own appointment-related activities.

```text
Staff
 ├── Dashboard
 ├── My Appointments
 ├── Calendar
 ├── Availability
 └── Profile
```

## Customer

Customers can:

```text
Customer
 ├── Browse Companies
 ├── View Services
 ├── View Staff
 ├── Book Appointment
 ├── Reschedule
 ├── Cancel
 ├── View Appointments
 └── View Receipts
```

---

# Models

The backend models are being created according to the database architecture.

Core models include:

```text
User
Company
CompanyAdmin
Staff
Customer
Service
Availability
Appointment
Payment
Receipt
Notification
```

Models use Laravel Eloquent for database interaction and relationships.

The model layer is being implemented alongside the migrations so that relationships remain consistent with the database design.

---

# Authorization Architecture

TIMEORA will use:

### Middleware

Used for broad access control such as:

```text
Is authenticated?
Is user a Company Admin?
Is user Staff?
Is user Customer?
Is user Super Admin?
```

### Policies

Used for resource-level authorization.

For example:

```text
Can this Company Admin update this service?

Can this Staff member view this appointment?

Can this Customer cancel this appointment?

Can this Company Admin view this company's staff?
```

This prevents users from accessing resources belonging to another company.

---

# API Structure

The API follows Laravel REST conventions.

Planned structure:

```text
/api
 ├── auth
 │    ├── register
 │    ├── verify
 │    ├── login
 │    ├── logout
 │    ├── forgot-password
 │    └── reset-password
 │
 ├── super-admin
 │
 ├── company
 │
 ├── staff
 │
 └── customer
```

Protected routes will use Sanctum authentication.

---

# Important TIMEORA Business Rules

## No Online Payment

TIMEORA V1 uses:

```text
Cash on Reception
```

There is no online payment gateway in V1.

---

## Receipt System

A digital receipt is generated when an appointment is booked.

```text
Appointment Booked
       ↓
Receipt Generated
       ↓
Payment Status = Pending
       ↓
Customer Pays at Reception
       ↓
Company Marks Receipt = Paid
```

---

## No Double Booking

The appointment system must prevent two bookings from occupying the same staff/time slot.

Availability will eventually consider:

* Company working hours
* Staff working hours
* Service duration
* Break times
* Days off
* Holidays
* Blocked time
* Existing appointments
* Timezone

---

# Planned Backend Modules

The remaining backend development will proceed approximately in this order:

```text
1. Project Setup                    ✓
2. Database Design                  ✓ / In Progress
3. Authentication                   ✓ / In Progress
4. Roles & Authorization            ✓ / In Progress
5. Company Management
6. Staff Management
7. Services
8. Availability
9. Appointment Engine
10. Customer Booking
11. Cross-Portal Synchronization
12. Payments
13. Receipts
14. Notifications
15. Super Admin
16. Reports
17. Testing
18. Deployment
```

---

# Development Principle

TIMEORA backend development is being implemented **step by step**.

The goal is not simply to generate code, but to understand:

```text
Why the table exists
        ↓
Why the relationship exists
        ↓
Why the model exists
        ↓
Why the route exists
        ↓
Why the controller exists
        ↓
Why middleware/policies are required
        ↓
How the request reaches the database
        ↓
How the response reaches React
```

This approach keeps the backend understandable and maintainable.

---

# Project Structure

The Laravel backend follows the standard Laravel structure.

```text
backend/
│
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   ├── Middleware/
│   │   └── Requests/
│   │
│   ├── Models/
│   ├── Notifications/
│   ├── Policies/
│   └── Services/
│
├── database/
│   ├── factories/
│   ├── migrations/
│   └── seeders/
│
├── routes/
│   ├── api.php
│   └── web.php
│
├── config/
├── resources/
├── storage/
├── tests/
├── .env
└── composer.json
```

---

# Environment

The backend uses environment variables for configuration.

Important configuration includes:

```text
APP_NAME
APP_URL

DB_CONNECTION
DB_HOST
DB_PORT
DB_DATABASE
DB_USERNAME
DB_PASSWORD

SANCTUM_STATEFUL_DOMAINS
```

Sensitive credentials should remain inside `.env` and should never be committed to Git.

---

# Current Status

### Completed / In Progress

* [x] Laravel backend setup
* [x] MySQL connection setup
* [x] API installation
* [x] Sanctum setup
* [x] CORS configuration
* [x] React ↔ Laravel API connection test
* [x] Initial database architecture
* [x] Core migration planning
* [x] Core model planning
* [x] Registration architecture
* [x] Company registration flow design
* [x] OTP/email verification flow design
* [x] Account/company status logic
* [x] Role architecture
* [x] Middleware authorization architecture
* [x] Policy-based authorization architecture
* [ ] Complete authentication implementation
* [ ] Complete authorization implementation
* [ ] Company management APIs
* [ ] Staff APIs
* [ ] Service APIs
* [ ] Availability engine
* [ ] Appointment engine
* [ ] Customer booking APIs
* [ ] Payment/receipt implementation
* [ ] Notifications
* [ ] Super Admin APIs
* [ ] Reports
* [ ] Full testing
* [ ] Production deployment

---

# V1 Scope

TIMEORA V1 intentionally excludes:

* AI features
* Online payment gateway
* Deposits
* Refunds
* Coupons
* Gift cards
* Packages
* Product selling
* Subscription revenue
* Revenue management in Super Admin
* No-show appointment status

The V1 focus is:

> **Company management + staff management + services + availability + appointment booking + customers + cash payments + digital receipts.**

---

# Development Status

**Current Phase:** Authentication, Registration & Role Authorization

**Next Major Phase:** Complete authentication/authorization foundation, then move into Company Management.

**Backend:** Laravel
**Frontend:** React
**Database:** MySQL
**Authentication:** Laravel Sanctum
**API:** REST API

---

## TIMEORA

**One Platform. Every Appointment.**

Built with Laravel + React + MySQL.
