<?php

namespace App\Notifications;

class NotificationType
{
    public const EMAIL_VERIFICATION = 'email_verification';

    public const BOOKING_CREATED = 'booking_created';

    public const BOOKING_ACCEPTED = 'booking_accepted';

    public const BOOKING_REJECTED = 'booking_rejected';

    public const BOOKING_CANCELLED = 'booking_cancelled';

    public const APPOINTMENT_RESCHEDULED = 'appointment_rescheduled';

    public const APPOINTMENT_COMPLETED = 'appointment_completed';

    public const APPOINTMENT_REMINDER_24H = 'appointment_reminder_24h';

    public const APPOINTMENT_REMINDER_1H = 'appointment_reminder_1h';
}