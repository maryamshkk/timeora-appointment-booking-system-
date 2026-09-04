<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">

    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 14px;
        }

        h2 {
            text-align: center;
        }

        .receipt {
            width: 100%;
        }

        .row {
            padding: 6px 0;
        }

        .label {
            font-weight: bold;
        }
    </style>
</head>

<body>

    <h2>TIMEORA</h2>

    <h3>Receipt</h3>

    <div class="receipt">

        <div class="row">
            <span class="label">Receipt Number:</span>
            {{ $receipt->receipt_number }}
        </div>

        <div class="row">
            <span class="label">Company:</span>
            {{ $receipt->appointment->company->name }}
        </div>

        <div class="row">
            <span class="label">Customer:</span>
            {{ $receipt->appointment->customer->name }}
        </div>

        <div class="row">
            <span class="label">Staff:</span>
            {{ $receipt->appointment->staff->first_name }}
        </div>

        <div class="row">
            <span class="label">Service:</span>
            {{ $receipt->appointment->service->name }}
        </div>

        <div class="row">
            <span class="label">Date:</span>
            {{ $receipt->appointment->created_at }}
        </div>

        <div class="row">
            <span class="label">Time:</span>
            {{ $receipt->appointment->start_time }}
        </div>

        <div class="row">
            <span class="label">Amount:</span>
            {{ $receipt->payment->amount }}
        </div>

        <div class="row">
            <span class="label">Payment Method:</span>
            {{ $receipt->payment->method }}
        </div>

        <div class="row">
            <span class="label">Payment Status:</span>
            {{ $receipt->payment->status }}
        </div>

    </div>

</body>
</html>