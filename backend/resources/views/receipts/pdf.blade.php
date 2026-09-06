<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">

    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: DejaVu Sans, Arial, sans-serif;
            font-size: 13px;
            color: #000C1E;
            background: #ffffff;
        }

        .container {
            width: 100%;
            padding: 25px;
        }

        /* HEADER */
        .header {
            width: 100%;
            border-bottom: 2px solid #000C1E;
            padding-bottom: 15px;
            margin-bottom: 20px;
        }

        .brand {
            font-size: 28px;
            font-weight: bold;
            letter-spacing: 2px;
            color: #000C1E;
        }

        .tagline {
            font-size: 10px;
            color: #666666;
            margin-top: 4px;
        }

        .receipt-title {
            text-align: right;
            font-size: 22px;
            font-weight: bold;
            margin-top: -35px;
        }

        /* INFO */
        .info-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }

        .info-table td {
            width: 50%;
            padding: 6px 0;
            vertical-align: top;
        }

        .label {
            font-weight: bold;
            color: #555555;
        }

        /* SECTION */
        .section-title {
            background: #000C1E;
            color: #ffffff;
            padding: 8px 10px;
            font-size: 13px;
            font-weight: bold;
            margin-bottom: 0;
        }

        /* DETAILS */
        .details-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }

        .details-table td {
            border: 1px solid #dddddd;
            padding: 9px;
        }

        .details-table .label-cell {
            width: 35%;
            font-weight: bold;
            background: #f5f5f5;
        }

        /* PAYMENT */
        .payment-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }

        .payment-table td {
            padding: 8px 5px;
            border-bottom: 1px solid #dddddd;
        }

        .payment-table .amount {
            text-align: right;
            font-weight: bold;
        }

        .total-row td {
            border-top: 2px solid #000C1E;
            border-bottom: none;
            padding-top: 12px;
            font-size: 16px;
            font-weight: bold;
        }

        /* FOOTER */
        .footer {
            margin-top: 30px;
            padding-top: 15px;
            border-top: 1px solid #dddddd;
            text-align: center;
            font-size: 10px;
            color: #666666;
        }

        .footer strong {
            color: #000C1E;
        }
    </style>
</head>

<body>

<div class="container">

    <!-- HEADER -->
    <div class="header">

        <div class="brand">
            TIMEORA
        </div>

        <div class="tagline">
            One Platform. Every Appointment.
        </div>

        <div class="receipt-title">
            RECEIPT
        </div>

    </div>


    <!-- RECEIPT / BUSINESS INFO -->
    <table class="info-table">

        <tr>
            <td>
                <span class="label">Receipt Number:</span><br>
                {{ $receipt->receipt_number }}
            </td>

            <td style="text-align: right;">
                <span class="label">Receipt Date:</span><br>
                {{ $receipt->created_at }}
            </td>
        </tr>

        <tr>
            <td>
                <span class="label">Business:</span><br>
                {{ $receipt->appointment->company->name }}
            </td>

            <td style="text-align: right;">
                <span class="label">Customer:</span><br>
                {{ $receipt->appointment->customer->name }}
            </td>
        </tr>

    </table>


    <!-- APPOINTMENT DETAILS -->
    <div class="section-title">
        APPOINTMENT DETAILS
    </div>

    <table class="details-table">

        <tr>
            <td class="label-cell">Service</td>
            <td>
                {{ $receipt->appointment->service->name }}
            </td>
        </tr>

        <tr>
            <td class="label-cell">Staff</td>
            <td>
                {{ $receipt->appointment->staff->first_name }}
                {{ $receipt->appointment->staff->last_name }}
            </td>
        </tr>

        <tr>
            <td class="label-cell">Appointment Date</td>
            <td>
                {{ $receipt->appointment->appointment_date }}
            </td>
        </tr>

        <tr>
            <td class="label-cell">Appointment Time</td>
            <td>
                {{ $receipt->appointment->start_time }}
                -
                {{ $receipt->appointment->end_time }}
            </td>
        </tr>

    </table>


    <!-- PAYMENT DETAILS -->
    <div class="section-title">
        PAYMENT DETAILS
    </div>

    <table class="payment-table">

        <tr>
            <td>
                Service Amount
            </td>

            <td class="amount">
                Rs. {{ number_format($receipt->payment->amount, 2) }}
            </td>
        </tr>

        <tr>
            <td>
                Payment Method
            </td>

            <td class="amount">
                {{ ucfirst($receipt->payment->method) }}
            </td>
        </tr>

        <tr>
            <td>
                Payment Status
            </td>

            <td class="amount">
                {{ ucfirst($receipt->payment->status) }}
            </td>
        </tr>

        <tr class="total-row">

            <td>
                TOTAL
            </td>

            <td class="amount">
                Rs. {{ number_format($receipt->payment->amount, 2) }}
            </td>

        </tr>

    </table>


    <!-- FOOTER -->
    <div class="footer">

        <strong>Thank you for choosing TIMEORA.</strong>

        <br><br>

        This is a digitally generated receipt.
        No signature is required.

        <br><br>

        TIMEORA — One Platform. Every Appointment.

    </div>

</div>

</body>
</html>
