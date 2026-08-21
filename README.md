# TIMEORA

**by Tiemio** — One Platform. Every Appointment.

TIMEORA is a dual-sided appointment booking and business management platform. It combines full business booking/management software (in the spirit of SimplyBook.me) with a customer-facing discovery experience, so businesses can manage their operations while customers can discover and book professionals across companies from one place.

> **Positioning:**  TIMEORA is intentionally dual-sided: **Business side** — "Manage my appointments," and **Customer side** — "Find and book an appointment."

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [System Architecture](#system-architecture)
- [User Roles](#user-roles)
- [Booking & Scheduling Model](#booking--scheduling-model)
- [Payments & Receipts](#payments--receipts)
- [Notifications](#notifications)
- [Tech Stack](#tech-stack)
- [Project Status](#project-status)
- [Roadmap / Out of Scope for V1](#roadmap--out-of-scope-for-v1)
- [Documentation](#documentation)
- [Author](#author)

---

## Overview

TIMEORA follows a clear system hierarchy. Registration on the landing page branches into two independent paths — a business registers as a Company, while a Customer registers separately to discover and book services:

                        Super Admin
                             │
                Landing Page Registration
                 ┌───────────┴───────────┐
              Company                 Customer
                 │                       │
               Staff                     │
                 │                       │
              Services                   │
                 └───────────┬───────────┘
                        Appointments
Every company on TIMEORA gets its own public booking page (e.g. timeora.com/company/city-care), supports multi-channel booking (TIMEORA page, business website, social media, and eventually a customer app), and funnels every booking into a single, centralized company calendar.

Registration is open to both sides from the landing page — a single Register page lets a user choose Register as Company (to manage a business) or Register as Customer (to find and book appointments), each routing into its own registration flow and portal.

## Key Features

- **Online Booking** — Customers can book appointments 24/7.
- **Staff Management** — Manage staff members, schedules, and availability.
- **Services Management** — Create services with pricing, duration, and availability.
- **Multiple Locations** — Manage multiple branches, each with its own staff, services, and hours.
- **Smart Scheduling** — Real-time availability calculated from staff schedules, breaks, buffers, holidays, and existing bookings, with double-booking prevention.
- **Book Anywhere** — One booking engine accessible from multiple channels (TIMEORA page, business website, social, Google), all feeding into one calendar.
- **Customer Management** — Full customer profiles with appointment history, cancellations, no-shows, and notes.
- **Automated Reminders & Notifications** — Booking confirmations, reminders (24h and 1h), rescheduling, and cancellation alerts.
- **Payments (V1: Cash on Reception)** — Invoice and pay-at-appointment options with receipt generation.
- **Reviews & Feedback** — Post-appointment ratings and reviews.
- **Reports & Analytics** — Appointment, customer, staff, and business performance dashboards.
- **Role-Based Portals** — Dedicated, isolated portals for Super Admin, Company Admin, Staff, and Customer.

## System Architecture

```
TIMEORA
├── FRONTEND — React.js / Tailwind CSS / React Router / Axios
└── BACKEND  — Laravel / PHP + Eloquent ORM / REST API / Sanctum
        ↓
      MySQL
```

Every appointment is a single centralized record tied to a customer, company, professional, and service — the same record surfaces automatically across the Customer, Company, and Staff portals:

```
Appointment
├── customer_id
├── company_id
├── professional_id
├── service_id
├── date / time / duration
├── appointment_status
└── payment_status
```

## User Roles

| Role | Responsibility |
|---|---|
| **Super Admin** | Manages the TIMEORA platform: companies, global categories, platform settings, audit logs, and platform-wide analytics. Does not operate individual companies. |
| **Company Admin** | Manages their own company — services, staff, customers, appointments, availability, and business analytics. |
| **Staff / Professional** | Manages their own profile, schedule, and assigned appointments only. |
| **Customer** | A global TIMEORA user (not tied to one company) who discovers professionals and requests/manages their own appointments. |

Role separation is strictly enforced — a Company Admin cannot access another company's data, Staff cannot see the full company customer base by default, and Super Admin does not manage day-to-day company operations.

## Booking & Scheduling Model

- **Fixed 1-hour slots** — every appointment in V1 occupies exactly one hour; no variable-duration scheduling.
- **Request-based booking** — a customer's slot selection creates a *Pending* request; the assigned professional must Accept or Reject it before it becomes *Confirmed*.
- **Availability calculation** combines company working hours, professional working hours, recurring schedules, exceptions, breaks, blocked time, and existing/pending appointments.
- **Appointment lifecycle:** `Pending → Confirmed → Checked-in → In Progress → Completed`, with alternate states `Rejected`, `Cancelled`, and `No-show`.

## Payments & Receipts

TIMEORA V1 uses **Cash on Reception** — there is no online payment gateway.

```
Appointment Confirmed → Payment = Unpaid → Customer Arrives
→ Cash Received → Authorized User Marks Paid → Receipt Generated
```

Receipts can be viewed, downloaded, and printed by the customer, and payment history is tracked at the company level.

## Notifications

Notifications are delivered via **in-app** and **email** channels, following a controlled matrix rather than notifying every role about every event:

- Operational activity (booking, confirmation, rescheduling, cancellation, reminders) → In-app + selected email
- Account/security actions (verification, password reset) → Email
- System-wide announcements → In-app, with email reserved for important announcements

## Tech Stack

Layer	                Technology
Frontend	            React.js, Tailwind CSS, React Router, Axios Context API
Backend	              Laravel (PHP), REST API, Eloquent ORM
Database	            MySQL
Authentication	      Laravel Sanctum
Authorization	        Laravel Middleware
Notifications	        Laravel Notifications + Mail
Receipts	            Laravel PDF generation
Calendar UI	          React Calendar library
Version Control	      Git + GitHub

## Project Status

📄 **Documentation:** Finalized functional & system specification (V1)
🚧 **Implementation:** In progress

This repository accompanies the finalized TIMEORA V1 specification, covering the Landing Page, Registration, Authentication, Company Admin, Staff, Customer, Super Admin, Availability & Scheduling, Payments & Receipts, Notifications, and Permissions modules.

## Roadmap / Out of Scope for V1

The following are intentionally excluded from V1 and may be introduced in future versions:

- Online payment gateways (Stripe, PayPal, JazzCash, Easypaisa)
- Deposits, refunds, cancellation charges
- Coupons, gift cards, packages, and service add-ons
- Variable-duration appointment slots
- AI-powered features
- Two-factor authentication (architecture supports adding it later)

## Documentation

Full product and system documentation — including detailed flows for every module — is maintained in `TIMEORA-Documentation.docx`.

## Author

**Maryam Sheikh**

- ✉️ Email: [maryamsheikh5245@gmail.com](mailto:maryamsheikh5245@gmail.com)
- 💻 GitHub: [@maryamshkk](https://github.com/maryamshkk)
- 🔗 LinkedIn: [maryamsheikh45](https://www.linkedin.com/in/maryamsheikh45/)
- 📦 Project Repository: [timeora-appointment-booking-system](https://github.com/maryamshkk/timeora-appointment-booking-system-)

---

<p align="center">TIMEORA by Tiemio — "One Platform. Every Appointment."</p>
