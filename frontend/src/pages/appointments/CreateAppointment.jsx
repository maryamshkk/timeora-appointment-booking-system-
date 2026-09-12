import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Briefcase,
    CalendarClock,
    Check,
    ChevronRight,
    IdCard,
    Phone,
    Search,
    User,
    X,
} from "lucide-react";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";

function CreateAppointment() {
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [customerQuery, setCustomerQuery] = useState("");
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [selectedServiceId, setSelectedServiceId] = useState(null);
    const [selectedStaffId, setSelectedStaffId] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);

    const customers = [
        {
            id: "CUS-0001",
            name: "Eleanor Astor",
            phone: "+92 300 1234567",
            email: "eleanor@example.com",
            initials: "EA",
            avatarColor: "bg-gold",
        },
        {
            id: "CUS-0002",
            name: "Charles Harrington",
            phone: "+92 301 9876543",
            email: "charles@example.com",
            initials: "CH",
            avatarColor: "bg-beige",
        },
        {
            id: "CUS-0003",
            name: "Sarah Williams",
            phone: "+92 302 4567890",
            email: "sarah@example.com",
            initials: "SW",
            avatarColor: "bg-gray",
        },
        {
            id: "CUS-0004",
            name: "Ahmed Raza",
            phone: "+92 303 7654321",
            email: "ahmed@example.com",
            initials: "AR",
            avatarColor: "bg-gold",
        },
    ];

    const services = [
        {
            id: "consultation",
            name: "Consultation",
            duration: "1 hour",
            price: "Rs. 3,000",
        },
        {
            id: "followup",
            name: "Follow-up",
            duration: "30 mins",
            price: "Rs. 1,500",
        },
    ];

    const staffMembers = [
        {
            id: "sara",
            name: "Dr. Sara Ahmed",
            role: "Senior Specialist",
            services: ["consultation", "followup"],
            initials: "SA",
        },
        {
            id: "ali",
            name: "Dr. Ali Raza",
            role: "Specialist",
            services: ["consultation"],
            initials: "AR",
        },
    ];

    function formatDateKey(date) {
        return date.toISOString().split("T")[0];
    }

    function formatDateLabel(date) {
        return date.toLocaleDateString("en-US", {
            weekday: "short",
            day: "numeric",
        });
    }

    function getNextSevenDays() {
        const days = [];
        const today = new Date();

        for (let index = 0; index < 7; index++) {
            const date = new Date(today);
            date.setDate(today.getDate() + index);

            days.push({
                key: formatDateKey(date),
                label: formatDateLabel(date),
            });
        }

        return days;
    }

    const availableDates = getNextSevenDays();

    const filteredCustomers = customers.filter((customer) => {
        const query = customerQuery.toLowerCase().trim();

        if (!query) {
            return false;
        }

        return (
            customer.name.toLowerCase().includes(query) ||
            customer.phone.toLowerCase().includes(query) ||
            customer.email.toLowerCase().includes(query)
        );
    });

    const eligibleStaff = staffMembers.filter((member) => {
        if (!selectedServiceId) {
            return false;
        }

        return member.services.includes(selectedServiceId);
    });

    const selectedService = services.find(
        (service) => service.id === selectedServiceId
    );

    const selectedStaff = staffMembers.find(
        (member) => member.id === selectedStaffId
    );

    const isFormComplete =
        selectedCustomer &&
        selectedService &&
        selectedStaff &&
        selectedDate &&
        selectedSlot;

    useEffect(() => {
        if (!selectedStaffId) {
            return;
        }

        const isStaffEligible = eligibleStaff.some(
            (member) => member.id === selectedStaffId
        );

        if (!isStaffEligible) {
            setSelectedStaffId(null);
        }
    }, [selectedServiceId, selectedStaffId, eligibleStaff]);

    function handleCustomerSelect(customer) {
        setSelectedCustomer(customer);
        setCustomerQuery("");
    }

    function clearCustomer() {
        setSelectedCustomer(null);
        setCustomerQuery("");
    }

    function generateSlotsForDay() {
        const slots = [];

        for (let hour = 9; hour < 17; hour++) {
            const startHour = hour > 12 ? hour - 12 : hour;
            const period = hour >= 12 ? "PM" : "AM";

            const formattedHour = String(startHour).padStart(2, "0");

            slots.push({
                value: `${hour}:00`,
                label: `${formattedHour}:00 ${period}`,
                unavailable: hour === 11 || hour === 14,
            });
        }

        return slots;
    }

    const timeSlots = generateSlotsForDay();

    function getEndTime(slot) {
        if (!slot) {
            return "";
        }

        const [hourValue] = slot.split(":");
        const hour = Number(hourValue);
        const endHour = hour + 1;

        const displayHour = endHour > 12 ? endHour - 12 : endHour;
        const period = endHour >= 12 ? "PM" : "AM";

        return `${String(displayHour).padStart(2, "0")}:00 ${period}`;
    }

    function formatSelectedDate(dateKey) {
        if (!dateKey) {
            return "";
        }

        const date = new Date(`${dateKey}T00:00:00`);

        return date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (!isFormComplete) {
            return;
        }

        // TODO: axios POST /api/company/appointments
        // Send customer, service, staff, date, time and payment details.
    }

    return (
        <div className="flex min-h-screen bg-beige/30">

            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
                <Sidebar
                    companyName="Shifa Clinic"
                    activeItem="Appointments"
                    ctaLabel="Book Appointment"
                />
            </div>

            {/* Mobile Sidebar */}
            {sidebarOpen && (
                <>
                    <button
                        type="button"
                        onClick={() => setSidebarOpen(false)}
                        className="fixed inset-0 z-30 bg-navy/50 lg:hidden"
                        aria-label="Close menu"
                    />

                    <div className="fixed left-0 top-0 z-40 h-screen lg:hidden">
                        <Sidebar
                            companyName="Shifa Clinic"
                            activeItem="Appointments"
                            ctaLabel="Book Appointment"
                        />
                    </div>
                </>
            )}

            {/* Main Area */}
            <div className="flex min-w-0 flex-1 flex-col">

                <Topbar
                    onMenuClick={() => setSidebarOpen(true)}
                    showBell
                    hasNotification
                    profileInfo={{ name: "Company Profile" }}
                    searchPlaceholder="Search..."
                />

                <main className="bg-beige px-4 py-5 md:px-8 md:py-6">

                    {/* Breadcrumb */}
                    <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide">
                        <Link
                            to="/company/appointments"
                            className="text-slate transition hover:text-navy"
                        >
                            Appointments
                        </Link>

                        <ChevronRight className="h-3 w-3 text-gray" />

                        <span className="text-navy">
                            Create Appointment
                        </span>
                    </div>

                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="font-serif text-2xl text-navy">
                            Create Appointment
                        </h1>

                        <p className="mt-1 text-sm text-slate">
                            Schedule a new appointment for a customer.
                        </p>
                    </div>

                    {/* Main Grid */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

                        {/* Left Column */}
                        <div className="space-y-6 lg:col-span-2">

                            {/* Step 1 — Customer */}
                            <div className="rounded-xl border border-gray/20 bg-white p-6 shadow-sm md:p-7">

                                <div className="flex items-center gap-2.5">
                                    <User className="h-[18px] w-[18px] text-navy" />

                                    <h2 className="font-serif text-xl text-navy">
                                        1. Customer
                                    </h2>
                                </div>

                                <div className="mt-3 border-b border-gray/20" />

                                {!selectedCustomer && (
                                    <div className="mt-5">
                                        <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-navy">
                                            Search Customer
                                        </label>

                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />

                                            <input
                                                type="text"
                                                value={customerQuery}
                                                onChange={(event) =>
                                                    setCustomerQuery(event.target.value)
                                                }
                                                placeholder="Search by name, phone, or email..."
                                                className="w-full rounded-lg border border-gray/30 bg-beige/30 py-3 pl-9 pr-4 text-sm text-navy outline-none transition placeholder:text-slate focus:border-navy focus:ring-2 focus:ring-gold"
                                            />
                                        </div>

                                        {customerQuery.trim() && (
                                            <div className="mt-2 overflow-hidden rounded-lg border border-gray/30 bg-white">
                                                {filteredCustomers.length > 0 ? (
                                                    <div className="divide-y divide-gray/20">
                                                        {filteredCustomers.map((customer) => (
                                                            <button
                                                                key={customer.id}
                                                                type="button"
                                                                onClick={() =>
                                                                    handleCustomerSelect(customer)
                                                                }
                                                                className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-beige/40"
                                                            >
                                                                <div
                                                                    className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${customer.avatarColor}`}
                                                                >
                                                                    <span className="text-xs font-bold text-navy">
                                                                        {customer.initials}
                                                                    </span>
                                                                </div>

                                                                <div className="min-w-0">
                                                                    <p className="text-sm font-bold text-navy">
                                                                        {customer.name}
                                                                    </p>

                                                                    <p className="mt-0.5 text-xs text-slate">
                                                                        {customer.phone}
                                                                    </p>
                                                                </div>
                                                            </button>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="px-4 py-5 text-center">
                                                        <p className="text-sm font-bold text-navy">
                                                            No customers found
                                                        </p>

                                                        <p className="mt-1 text-xs text-slate">
                                                            Try another name, phone, or email.
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {selectedCustomer && (
                                    <div className="mt-5 rounded-lg border border-gray/30 bg-beige/40 p-4">
                                        <div className="flex items-center justify-between gap-4">
                                            <div className="flex min-w-0 items-center gap-3">
                                                <div
                                                    className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full ${selectedCustomer.avatarColor}`}
                                                >
                                                    <span className="text-sm font-bold text-navy">
                                                        {selectedCustomer.initials}
                                                    </span>
                                                </div>

                                                <div className="min-w-0">
                                                    <p className="text-base font-bold text-navy">
                                                        {selectedCustomer.name}
                                                    </p>

                                                    <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate">
                                                        <span className="flex items-center gap-1.5">
                                                            <Phone className="h-[13px] w-[13px]" />
                                                            {selectedCustomer.phone}
                                                        </span>

                                                        <span className="flex items-center gap-1.5">
                                                            <IdCard className="h-[13px] w-[13px]" />
                                                            {selectedCustomer.id}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={clearCustomer}
                                                className="flex-shrink-0 text-gray transition hover:text-red-500"
                                                aria-label="Remove selected customer"
                                            >
                                                <X className="h-[18px] w-[18px]" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Step 2 — Service */}
                            <div className="rounded-xl border border-gray/20 bg-white p-6 shadow-sm md:p-7">
                                <div className="mb-4 flex items-center gap-2.5">
                                    <Briefcase className="h-[18px] w-[18px] text-navy" />

                                    <h2 className="font-serif text-xl text-navy">
                                        2. Service
                                    </h2>
                                </div>

                                <div className="border-b border-gray/20" />

                                <div className="grid grid-cols-1 gap-4 pt-5 sm:grid-cols-2">
                                    {services.map((service) => {
                                        const isSelected = selectedServiceId === service.id;

                                        return (
                                            <button
                                                key={service.id}
                                                type="button"
                                                onClick={function () {
                                                    setSelectedServiceId(service.id);
                                                }}
                                                className={`relative cursor-pointer rounded-lg border-2 p-[18px] text-left transition ${
                                                    isSelected
                                                        ? "border-navy"
                                                        : "border-gray/30 hover:border-navy/50"
                                                }`}
                                            >
                                                {isSelected && (
                                                    <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-navy">
                                                        <Check className="h-3.5 w-3.5 text-white" />
                                                    </span>
                                                )}

                                                <p className="mb-8 pr-8 text-base font-bold text-navy">
                                                    {service.name}
                                                </p>

                                                <div className="flex items-center justify-between gap-3">
                                                    <span className="text-sm text-slate">
                                                        {service.duration}
                                                    </span>

                                                    <span className="text-sm font-bold text-navy">
                                                        {service.price}
                                                    </span>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Step 3 — Staff */}
                            <div className="rounded-xl border border-gray/20 bg-white p-6 shadow-sm md:p-7">
                                <div className="mb-4 flex items-center gap-2.5">
                                    <Briefcase className="h-[18px] w-[18px] text-navy" />

                                    <h2 className="font-serif text-xl text-navy">
                                        3. Staff
                                    </h2>
                                </div>

                                <div className="border-b border-gray/20" />

                                {!selectedServiceId ? (
                                    <div className="py-8 text-center">
                                        <p className="text-sm font-bold text-navy">
                                            Select a service first
                                        </p>

                                        <p className="mt-1 text-xs text-slate">
                                            Available staff will appear based on the selected service.
                                        </p>
                                    </div>
                                ) : eligibleStaff.length > 0 ? (
                                    <div className="grid grid-cols-2 gap-4 pt-5 sm:grid-cols-3">
                                        {eligibleStaff.map((member) => {
                                            const isSelected = selectedStaffId === member.id;

                                            return (
                                                <button
                                                    key={member.id}
                                                    type="button"
                                                    onClick={function () {
                                                        setSelectedStaffId(member.id);
                                                    }}
                                                    className={`relative cursor-pointer rounded-lg border-2 p-3 text-center transition ${
                                                        isSelected
                                                            ? "border-navy"
                                                            : "border-gray/30 hover:border-navy/50"
                                                    }`}
                                                >
                                                    {isSelected && (
                                                        <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-navy bg-white">
                                                            <Check className="h-3.5 w-3.5 text-navy" />
                                                        </span>
                                                    )}

                                                    <div className="mx-auto mb-2.5 flex h-16 w-16 items-center justify-center overflow-hidden rounded-lg bg-beige">
                                                        <span className="text-sm font-bold text-navy">
                                                            {member.initials}
                                                        </span>
                                                    </div>

                                                    <p className="text-sm font-bold text-navy">
                                                        {member.name}
                                                    </p>

                                                    <p className="mt-0.5 text-xs text-slate">
                                                        {member.role}
                                                    </p>
                                                </button>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="py-8 text-center">
                                        <p className="text-sm font-bold text-navy">
                                            No eligible staff
                                        </p>

                                        <p className="mt-1 text-xs text-slate">
                                            No staff member is assigned to this service.
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Step 4 — Date & Time */}
                            <div className="rounded-xl border border-gray/20 bg-white p-6 shadow-sm md:p-7">
                                <div className="mb-4 flex items-center gap-2.5">
                                    <CalendarClock className="h-[18px] w-[18px] text-navy" />

                                    <h2 className="font-serif text-xl text-navy">
                                        4. Date & Time
                                    </h2>
                                </div>

                                <div className="border-b border-gray/20" />

                                {!selectedStaffId ? (
                                    <div className="py-8 text-center">
                                        <p className="text-sm font-bold text-navy">
                                            Select a staff member first
                                        </p>

                                        <p className="mt-1 text-xs text-slate">
                                            Available dates and time slots will appear here.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="pt-5">
                                        <label className="mb-2.5 block text-xs font-bold uppercase tracking-wide text-navy">
                                            Select Date
                                        </label>

                                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
                                            {availableDates.map((date) => {
                                                const isSelected = selectedDate === date.key;

                                                return (
                                                    <button
                                                        key={date.key}
                                                        type="button"
                                                        onClick={function () {
                                                            setSelectedDate(date.key);
                                                            setSelectedSlot(null);
                                                        }}
                                                        className={`rounded-lg border px-3 py-2.5 text-sm font-bold transition ${
                                                            isSelected
                                                                ? "border-navy bg-navy text-white"
                                                                : "border-gray/30 bg-white text-navy hover:border-navy"
                                                        }`}
                                                    >
                                                        {date.label}
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        {selectedDate && (
                                            <div className="mt-6">
                                                <label className="mb-2.5 block text-xs font-bold uppercase tracking-wide text-navy">
                                                    Available Time Slots
                                                </label>

                                                <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                                                    {timeSlots.map((slot) => {
                                                        const isSelected = selectedSlot === slot.value;

                                                        return (
                                                            <button
                                                                key={slot.value}
                                                                type="button"
                                                                disabled={slot.unavailable}
                                                                onClick={function () {
                                                                    if (!slot.unavailable) {
                                                                        setSelectedSlot(slot.value);
                                                                    }
                                                                }}
                                                                className={`rounded-lg border py-2.5 text-center text-sm font-bold transition ${
                                                                    slot.unavailable
                                                                        ? "cursor-not-allowed border-gray/20 bg-gray/10 text-gray"
                                                                        : isSelected
                                                                        ? "border-navy bg-navy text-white"
                                                                        : "cursor-pointer border-gray/30 text-navy hover:border-navy"
                                                                }`}
                                                            >
                                                                {slot.label}
                                                            </button>
                                                        );
                                                    })}
                                                </div>

                                                <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate">
                                                    <div className="flex items-center gap-2">
                                                        <span className="h-2.5 w-2.5 rounded-full bg-navy" />
                                                        Selected
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        <span className="h-2.5 w-2.5 rounded-full bg-gray" />
                                                        Unavailable
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column — Live Summary */}
                        <div className="lg:sticky lg:top-6 lg:self-start">
                            <div className="rounded-xl border border-gray/20 bg-white p-6 shadow-sm md:p-7">

                                <h2 className="font-serif text-xl text-navy">
                                    Appointment Summary
                                </h2>

                                <div className="mt-4 border-b border-gray/20" />

                                {/* Customer */}
                                <div className="mt-5 mb-4 flex items-start justify-between gap-4">
                                    <span className="text-xs font-bold uppercase tracking-wide text-gray">
                                        Customer
                                    </span>

                                    <span
                                        className={`max-w-[60%] text-right text-sm font-bold ${
                                            selectedCustomer ? "text-navy" : "text-gray"
                                        }`}
                                    >
                                        {selectedCustomer
                                            ? selectedCustomer.name
                                            : "Not selected"}
                                    </span>
                                </div>

                                {/* Service */}
                                <div className="mb-4 flex items-start justify-between gap-4">
                                    <span className="text-xs font-bold uppercase tracking-wide text-gray">
                                        Service
                                    </span>

                                    <div className="max-w-[60%] text-right">
                                        <p
                                            className={`text-sm font-bold ${
                                                selectedService ? "text-navy" : "text-gray"
                                            }`}
                                        >
                                            {selectedService
                                                ? selectedService.name
                                                : "Not selected"}
                                        </p>

                                        {selectedService && (
                                            <p className="mt-0.5 text-xs text-slate">
                                                {selectedService.duration}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Staff */}
                                <div className="mb-4 flex items-start justify-between gap-4">
                                    <span className="text-xs font-bold uppercase tracking-wide text-gray">
                                        Staff
                                    </span>

                                    <span
                                        className={`max-w-[60%] text-right text-sm font-bold ${
                                            selectedStaff ? "text-navy" : "text-gray"
                                        }`}
                                    >
                                        {selectedStaff
                                            ? selectedStaff.name
                                            : "Not selected"}
                                    </span>
                                </div>

                                {/* Date & Time */}
                                <div className="flex items-start justify-between gap-4">
                                    <span className="text-xs font-bold uppercase tracking-wide text-gray">
                                        Date & Time
                                    </span>

                                    <div className="max-w-[60%] text-right">
                                        {selectedDate ? (
                                            <p className="text-sm font-bold text-navy">
                                                {formatSelectedDate(selectedDate)}
                                            </p>
                                        ) : (
                                            <p className="text-sm font-bold text-gray">
                                                Not selected
                                            </p>
                                        )}

                                        {selectedSlot && (
                                            <p className="mt-0.5 text-xs text-slate">
                                                {selectedSlot} - {getEndTime(selectedSlot)}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="my-5 border-b border-gray/20" />

                                {/* Total */}
                                <div className="flex items-center justify-between gap-4">
                                    <span className="text-xs font-bold uppercase tracking-wide text-gray">
                                        Total Amount
                                    </span>

                                    <span className="text-lg font-bold text-navy">
                                        {selectedService ? selectedService.price : "Rs. 0"}
                                    </span>
                                </div>

                                {/* Payment */}
                                <div className="mt-4 flex items-center justify-between gap-4">
                                    <span className="text-xs font-bold uppercase tracking-wide text-gray">
                                        Payment
                                    </span>

                                    <span className="rounded bg-gray/10 px-2.5 py-1 text-xs font-bold text-slate">
                                        Cash on Reception
                                    </span>
                                </div>

                                {/* Actions */}
                                <div className="mt-6">
                                    <button
                                        type="button"
                                        disabled={!isFormComplete}
                                        onClick={handleSubmit}
                                        className={`w-full rounded-lg py-3.5 text-sm font-bold uppercase tracking-wide transition ${
                                            isFormComplete
                                                ? "bg-navy text-white hover:bg-gold hover:text-navy"
                                                : "cursor-not-allowed bg-gray/30 text-slate"
                                        }`}
                                    >
                                        Create Appointment
                                    </button>

                                    <button
                                        type="button"
                                        onClick={function () {
                                            navigate(-1);
                                        }}
                                        className="mt-2.5 w-full rounded-lg border-2 border-navy bg-white py-3.5 text-sm font-bold text-navy transition hover:bg-beige"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default CreateAppointment;