# TIMEORA — Backend

**by Tiemio** — One Platform. Every Appointment.

TIMEORA is an appointment booking and management platform connecting businesses, staff, and customers through a centralized system. This repository contains the **Laravel REST API backend**, consumed by the React frontend.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Laravel 13 |
| Database | MySQL (Eloquent ORM) |
| Authentication | Laravel Sanctum |
| Authorization | Middleware + Policies |
| Notifications | Laravel Mail / Notifications |
| Queue / Scheduler | Laravel Queues + Scheduler |
| PDF | Laravel PDF generation |
| Testing | Pest / PHPUnit |

## Architecture

```text
Super Admin
    └── Companies
            ├── Company Admin
            ├── Staff
            ├── Services
            ├── Availability
            ├── Customers
            └── Appointments
                    ├── Payments
                    └── Receipts
```

Registration is dual-sided — a **Company** and a **Customer** each register independently from the landing page. Customers are global users, not nested under any single company.

```text
React + Axios → Laravel REST API → Controllers → Models → MySQL
```

## Roles

| Role | Access |
|---|---|
| **Super Admin** | Companies, users, appointments, receipts, platform reports |
| **Company Admin** | Company profile, services, staff, calendar, availability |
| **Staff** | Own appointments, calendar, availability, profile |
| **Customer** | Browse, book, reschedule, cancel, view receipts |

Access is enforced via **Middleware** (role checks) and **Policies** (resource-level, e.g. a Company Admin can't touch another company's data).

## Authentication Flow

```text
Register → Enter Email/Password → OTP Sent → Verify OTP →
Account/Company Status Check → Login → Dashboard
```

Companies don't need manual Super Admin approval — verification alone grants access.

## Business Rules

- **Payments:** Cash on Reception only (no online gateway in V1)
- **Receipts:** Auto-generated on booking, marked "Paid" by company after cash received
- **No double booking:** availability checked against staff hours, service duration, breaks, holidays, and existing appointments

## API Structure

```text
/api/auth        → register, verify, login, logout, password reset
/api/super-admin
/api/company
/api/staff
/api/customer
```

## Project Structure

```text
backend/
├── app/
│   ├── Http/{Controllers, Middleware, Requests}/
│   ├── Models/
│   ├── Notifications/
│   ├── Policies/
│   └── Services/
├── database/{migrations, seeders, factories}/
├── routes/api.php
└── .env
```

## Environment Variables

```text
APP_NAME, APP_URL
DB_CONNECTION, DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD
SANCTUM_STATEFUL_DOMAINS
```
⚠️ Never commit `.env` to Git.

## Development Status

**Current phase:** Authentication, registration & role authorization
**Next phase:** Company Management APIs

Roadmap: Setup ✓ → DB Design ✓ → Auth (in progress) → Company Mgmt → Staff → Services → Availability → Appointments → Booking → Payments/Receipts → Notifications → Super Admin → Reports → Testing → Deployment

## V1 Scope

Excluded from V1: AI features, online payments, deposits/refunds, coupons/gift cards, subscriptions.
**Included:** company & staff management, services, availability, appointment booking, cash payments, digital receipts.

---

## Author

**Maryam Sheikh**
✉️ [maryamsheikh5245@gmail.com](mailto:maryamsheikh5245@gmail.com) · 💻 [@maryamshkk](https://github.com/maryamshkk) · 🔗 [LinkedIn](https://www.linkedin.com/in/maryamsheikh45/)
📦 [Repository](https://github.com/maryamshkk/timeora-appointment-booking-system-)

<p align="center">TIMEORA by Tiemio — "One Platform. Every Appointment."</p>
