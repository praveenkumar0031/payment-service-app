const express = require('express');
const app = express();

app.use(express.json());

// Root endpoint / Health check
app.get('/', (req, res) => {
    res.status(200).json({
        status: "up",
        service: "payment-service",
        message: "Payment Gateway API is running smoothly."
    });
});

app.get('/all', (req, res) => {
    res.status(200).json({
        status: "up",
        service: "all-payment-service",
        message: "all Payment Gateway API is running smoothly."
    });
});

// Sample Payment Endpoint
app.post('/api/payments', (req, res) => {
    const { amount, currency, orderId } = req.body;

    if (!amount || !currency || !orderId) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields: amount, currency, or orderId."
        });
    }

    res.status(201).json({
        success: true,
        transactionId: `tx_${Math.random().toString(36).substr(2, 9)}`,
        orderId: orderId,
        amount: amount,
        currency: currency,
        status: "COMPLETED",
        processedAt: new Date().toISOString()
    });
});

// Export app for testing
module.exports = app;

// Only start the server if this file is run directly (not imported by tests)
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Payment service listening on port ${PORT}`);
    });
}