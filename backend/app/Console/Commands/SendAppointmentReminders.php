<?php

namespace App\Console\Commands;

use App\Models\Appointment;
use App\Models\User;
use App\Notifications\TimeoraNotification;
use App\Notifications\NotificationType;
use Carbon\Carbon;
use Illuminate\Console\Command;

class SendAppointmentReminders extends Command
{
    protected $signature = 'appointments:send-reminders';

    protected $description = 'Send appointment reminders to customers and staff';

    public function handle()
    {
        $now = now();

        // 24-hour reminder
        $this->sendReminders(
            $now->copy()->addDay(),
            NotificationType::APPOINTMENT_REMINDER_24H,
            'Appointment Reminder',
            'You have an appointment scheduled in 24 hours.'
        );

        // 1-hour reminder
        $this->sendReminders(
            $now->copy()->addHour(),
            NotificationType::APPOINTMENT_REMINDER_1H,
            'Appointment Reminder',
            'You have an appointment scheduled in 1 hour.'
        );

        $this->info('Appointment reminders processed successfully.');

        return Command::SUCCESS;
    }

    private function sendReminders(
        Carbon $targetTime,
        string $type,
        string $title,
        string $message
    ): void {
        $appointments = Appointment::with([
            'company',
            'staff',
            'service',
            'payment',
        ])
            ->where('status', 'accepted')
            ->whereDate(
                'appointment_date',
                $targetTime->toDateString()
            )
            ->whereTime(
                'start_time',
                $targetTime->format('H:i')
            )
            ->get();

        foreach ($appointments as $appointment) {

            $customer = User::find($appointment->customer_id);

            $notificationData = [
                'appointment_id' => $appointment->id,

                'customer_name' => $customer?->name,

                'company_name' => $appointment->company?->name,

                'staff_name' => $appointment->staff
                    ? $appointment->staff->first_name . ' ' .
                      $appointment->staff->last_name
                    : null,

                'service_name' => $appointment->service?->name,

                'appointment_date' => $appointment->appointment_date,

                'start_time' => $appointment->start_time,

                'end_time' => $appointment->end_time,

                'amount' => $appointment->payment?->amount,

                'payment_method' => $appointment->payment?->method,

                'payment_status' => $appointment->payment?->status,

                'status' => $appointment->status,
            ];

            // Customer
            if ($customer) {
                $customer->notify(
                    new TimeoraNotification(
                        $type,
                        $title,
                        $message,
                        $notificationData
                    )
                );
            }

            // Staff
            $staff = $appointment->staff;

            if ($staff) {
                $staff->notify(
                    new TimeoraNotification(
                        $type,
                        $title,
                        $message,
                        $notificationData
                    )
                );
            }
        }
    }
}