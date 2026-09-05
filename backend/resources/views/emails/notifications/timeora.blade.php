```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>{{ $title }}</title>
</head>

<body style="
    margin: 0;
    padding: 0;
    background-color: #f4f5f7;
    font-family: Arial, Helvetica, sans-serif;
    color: #1f2937;
">

<table width="100%" cellpadding="0" cellspacing="0" border="0"
       style="background-color: #f4f5f7; padding: 40px 15px;">

    <tr>
        <td align="center">

            <!-- Main Container -->
            <table width="600" cellpadding="0" cellspacing="0" border="0"
                   style="
                       max-width: 600px;
                       width: 100%;
                       background-color: #ffffff;
                       border-radius: 12px;
                       overflow: hidden;
                   ">

                <!-- Header -->
                <tr>
                    <td align="center"
                        style="
                            padding: 30px 25px;
                            background-color: #111827;
                        ">

                        <div style="
                            font-size: 30px;
                            font-weight: bold;
                            letter-spacing: 2px;
                            color: #ffffff;
                        ">
                            TIMEORA
                        </div>

                        <div style="
                            margin-top: 7px;
                            font-size: 13px;
                            color: #d1d5db;
                        ">
                            One Platform. Every Appointment.
                        </div>

                    </td>
                </tr>

                <!-- Content -->
                <tr>
                    <td style="padding: 35px 35px 25px;">

                        <!-- Title -->
                        <h1 style="
                            margin: 0 0 15px;
                            font-size: 24px;
                            line-height: 1.3;
                            color: #111827;
                        ">
                            {{ $title }}
                        </h1>

                        <!-- Greeting -->
                        <p style="
                            margin: 0 0 12px;
                            font-size: 15px;
                            line-height: 1.7;
                            color: #374151;
                        ">
                            Hello {{ $notifiable->name ?? 'User' }},
                        </p>

                        <!-- Message -->
                        <p style="
                            margin: 0 0 25px;
                            font-size: 15px;
                            line-height: 1.7;
                            color: #4b5563;
                        ">
                            {{ $message }}
                        </p>

                        <!-- Appointment Details -->
                        <table width="100%" cellpadding="0" cellspacing="0" border="0"
                               style="
                                   border: 1px solid #e5e7eb;
                                   border-radius: 10px;
                                   overflow: hidden;
                               ">

                            <!-- Section Heading -->
                            <tr>
                                <td colspan="2"
                                    style="
                                        padding: 15px 18px;
                                        background-color: #f9fafb;
                                        border-bottom: 1px solid #e5e7eb;
                                        font-size: 14px;
                                        font-weight: bold;
                                        color: #111827;
                                    ">
                                    APPOINTMENT DETAILS
                                </td>
                            </tr>

                            @if(isset($data['appointment_id']))
                            <tr>
                                <td style="padding: 11px 18px; color: #6b7280; font-size: 14px;">
                                    Appointment ID
                                </td>
                                <td align="right" style="padding: 11px 18px; font-weight: 600; font-size: 14px;">
                                    #{{ $data['appointment_id'] }}
                                </td>
                            </tr>
                            @endif

                            @if(isset($data['company_name']))
                            <tr>
                                <td style="padding: 11px 18px; color: #6b7280; font-size: 14px;">
                                    Business
                                </td>
                                <td align="right" style="padding: 11px 18px; font-size: 14px;">
                                    {{ $data['company_name'] }}
                                </td>
                            </tr>
                            @endif

                            @if(isset($data['staff_name']))
                            <tr>
                                <td style="padding: 11px 18px; color: #6b7280; font-size: 14px;">
                                    Staff
                                </td>
                                <td align="right" style="padding: 11px 18px; font-size: 14px;">
                                    {{ $data['staff_name'] }}
                                </td>
                            </tr>
                            @endif

                            @if(isset($data['service_name']))
                            <tr>
                                <td style="padding: 11px 18px; color: #6b7280; font-size: 14px;">
                                    Service
                                </td>
                                <td align="right" style="padding: 11px 18px; font-size: 14px;">
                                    {{ $data['service_name'] }}
                                </td>
                            </tr>
                            @endif

                            @if(isset($data['appointment_date']))
                            <tr>
                                <td style="padding: 11px 18px; color: #6b7280; font-size: 14px;">
                                    Date
                                </td>
                                <td align="right" style="padding: 11px 18px; font-size: 14px;">
                                    {{ $data['appointment_date'] }}
                                </td>
                            </tr>
                            @endif

                            @if(isset($data['start_time']))
                            <tr>
                                <td style="padding: 11px 18px; color: #6b7280; font-size: 14px;">
                                    Time
                                </td>
                                <td align="right" style="padding: 11px 18px; font-size: 14px;">
                                    {{ $data['start_time'] }}
                                    @if(isset($data['end_time']))
                                        - {{ $data['end_time'] }}
                                    @endif
                                </td>
                            </tr>
                            @endif

                            @if(isset($data['amount']))
                            <tr>
                                <td style="padding: 11px 18px; color: #6b7280; font-size: 14px;">
                                    Amount
                                </td>
                                <td align="right" style="padding: 11px 18px; font-weight: 600; font-size: 14px;">
                                    Rs. {{ $data['amount'] }}
                                </td>
                            </tr>
                            @endif

                            @if(isset($data['payment_method']))
                            <tr>
                                <td style="padding: 11px 18px; color: #6b7280; font-size: 14px;">
                                    Payment Method
                                </td>
                                <td align="right" style="padding: 11px 18px; font-size: 14px;">
                                    {{ ucfirst($data['payment_method']) }}
                                </td>
                            </tr>
                            @endif

                            @if(isset($data['payment_status']))
                            <tr>
                                <td style="padding: 11px 18px; color: #6b7280; font-size: 14px;">
                                    Payment Status
                                </td>
                                <td align="right" style="padding: 11px 18px; font-size: 14px;">
                                    {{ ucfirst($data['payment_status']) }}
                                </td>
                            </tr>
                            @endif

                            @if(isset($data['status']))
                            <tr>
                                <td style="padding: 11px 18px; color: #6b7280; font-size: 14px;">
                                    Booking Status
                                </td>
                                <td align="right" style="padding: 11px 18px; font-weight: 600; font-size: 14px;">
                                    {{ ucfirst($data['status']) }}
                                </td>
                            </tr>
                            @endif

                        </table>

                        <!-- Footer Message -->
                        <p style="
                            margin: 25px 0 0;
                            font-size: 13px;
                            line-height: 1.6;
                            color: #6b7280;
                        ">
                            Thank you for using TIMEORA. We look forward to making
                            your appointment experience simple and seamless.
                        </p>

                    </td>
                </tr>

                <!-- Footer -->
                <tr>
                    <td align="center"
                        style="
                            padding: 25px;
                            background-color: #f9fafb;
                            border-top: 1px solid #e5e7eb;
                        ">

                        <div style="
                            font-size: 14px;
                            font-weight: bold;
                            color: #111827;
                        ">
                            TIMEORA
                        </div>

                        <div style="
                            margin-top: 6px;
                            font-size: 12px;
                            color: #6b7280;
                        ">
                            One Platform. Every Appointment.
                        </div>

                        <div style="
                            margin-top: 12px;
                            font-size: 11px;
                            color: #9ca3af;
                        ">
                            © {{ date('Y') }} TIMEORA. All rights reserved.
                        </div>

                    </td>
                </tr>

            </table>

        </td>
    </tr>

</table>

</body>
</html>
```
