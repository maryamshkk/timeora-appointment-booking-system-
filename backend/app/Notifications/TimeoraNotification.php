<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class TimeoraNotification extends Notification implements ShouldQueue
{
    use Queueable;

        public string $type;
        public string $title;
        public string $message;
        public array $data;

    /**
     * Create a new notification instance.
     */
    public function __construct(
        string $type,
        string $title,
        string $message,
        array $data = []
    ) {
        $this->type = $type;
        $this->title = $title;
        $this->message = $message;
        $this->data = $data;
    }
    

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database', 'mail'];
    }

    public function toDatabase(object $notifiable): array
    {
        return [
            'type' => $this->type,
            'title' => $this->title,
            'message' => $this->message,
            'data' => $this->data,
        ];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
       
        return (new MailMessage)
            ->subject($this->title)
            ->greeting('Hello ' . $notifiable->name . ',')
            ->line($this->message)

            ->line('Appointment Details')
            ->line('Appointment ID: ' . ($this->data['appointment_id'] ?? 'N/A'))
            ->line('Business: ' . ($this->data['company_name'] ?? 'N/A'))
            ->line('Staff: ' . ($this->data['staff_name'] ?? 'N/A'))
            ->line('Service: ' . ($this->data['service_name'] ?? 'N/A'))
            ->line('Date: ' . ($this->data['appointment_date'] ?? 'N/A'))
            ->line('Time: ' . ($this->data['start_time'] ?? 'N/A') . ' - ' . ($this->data['end_time'] ?? 'N/A'))
            ->line('Amount: Rs. ' . ($this->data['amount'] ?? '0'))
            ->line('Payment Method: ' . ucfirst($this->data['payment_method'] ?? 'N/A'))
            ->line('Payment Status: ' . ucfirst($this->data['payment_status'] ?? 'N/A'))
            ->line('Booking Status: ' . ucfirst($this->data['status'] ?? 'N/A'))
            
            ->salutation('Regards, TIMEORA');
        
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [ 
            'type' => $this->type, 
            'title' => $this->title, 
            'message' => $this->message, 
            'data' => $this->data, 
        ];
    }
}
