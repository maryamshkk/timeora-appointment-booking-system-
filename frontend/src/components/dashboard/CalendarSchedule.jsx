import React from "react";

const START_HOUR = 8;
const END_HOUR = 18;
const SLOT_HEIGHT = 60;

const appointments = [
    {
        id: "o1",
        day: "Mon",
        startTime: "09:00",
        endTime: "10:00",
        customer: "Ayesha Khan",
        service: "Consultation",
        staff: "Dr. Sara",
        status: "confirmed",
    },
    {
        id: "o2",
        day: "Mon",
        startTime: "10:30",
        endTime: "11:30",
        customer: "Hina Malik",
        service: "Follow-up",
        staff: "Ali",
        status: "pending",
    },
    {
        id: "o3",
        day: "Thu",
        startTime: "14:00",
        endTime: "14:30",
        customer: "Zaina I.",
        service: "Consultation",
        staff: "",
        status: "completed",
    },
    {
        id: "o4",
        day: "Thu",
        startTime: "15:00",
        endTime: "16:00",
        customer: "Omar T.",
        service: "Consultation",
        staff: "Hassan",
        status: "confirmed",
    },
    {
        id: "o5",
        day: "Fri",
        startTime: "09:00",
        endTime: "09:30",
        customer: "S. Ahmad",
        service: "",
        staff: "",
        status: "cancelled",
    },
];

function getStartOfWeek(date) {
    const result = new Date(date);
    const day = result.getDay();

    result.setDate(result.getDate() - day);
    result.setHours(0, 0, 0, 0);

    return result;
}

function getMinutes(time) {
    const [hours, minutes] = time.split(":").map(Number);

    return hours * 60 + minutes;
}

function getBlockStyle(startTime, endTime) {
    const startMinutes = getMinutes(startTime);
    const endMinutes = getMinutes(endTime);

    const calendarStartMinutes = START_HOUR * 60;

    const top =
        ((startMinutes - calendarStartMinutes) / 60) * SLOT_HEIGHT;

    const height =
        ((endMinutes - startMinutes) / 60) * SLOT_HEIGHT;

    return {
        top: `${top}px`,
        height: `${height}px`,
    };
}

function getStatusColor(status) {
    if (status === "confirmed") {
        return "border-l-navy bg-navy/5";
    }

    if (status === "pending") {
        return "border-l-gold bg-gold/15";
    }

    if (status === "completed") {
        return "border-l-gray bg-gray/15";
    }

    if (status === "cancelled") {
        return "border-l-red-500 bg-red-50";
    }

    return "border-l-gray bg-gray/10";
}

function getCurrentTimePosition() {
    const now = new Date();

    const minutes = now.getHours() * 60 + now.getMinutes();
    const calendarStartMinutes = START_HOUR * 60;

    if (
        minutes < calendarStartMinutes ||
        minutes > END_HOUR * 60
    ) {
        return null;
    }

    return (
        ((minutes - calendarStartMinutes) / 60) *
        SLOT_HEIGHT
    );
}

function formatDateRange(startDate, endDate) {
    const start = startDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
    });

    const end = endDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    return `${start} – ${end}`;
}

function formatDayDate(date) {
    return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
    });
}

function isToday(date) {
    const today = new Date();

    return (
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate()
    );
}

function CalendarScheduleView() {
    return (
        <div>
            Calendar Schedule View
        </div>
    );
}

export default CalendarScheduleView;