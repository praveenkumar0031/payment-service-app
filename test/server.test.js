const request = require('supertest');
const app = require('../prod/server'); // Path to your server file

describe('Payment API Endpoints', () => {
    
    // Test the root GET endpoint
    describe('GET /', () => {
        it('should return a 200 status and health info', async () => {
            const res = await request(app).get('/');
            
            expect(res.statusCode).toBe(200);//test fails
            expect(res.body).toHaveProperty('status', 'up');
            expect(res.body.service).toBe('payment-service');
        });
    });

    // Test the POST payment endpoint (Success case)
    describe('POST /api/payments', () => {
        it('should successfully process a valid payment request', async () => {
            const paymentPayload = {
                amount: 150.00,
                currency: 'USD',
                orderId: 'order_12345'
            };

            const res = await request(app)
                .post('/api/payments')
                .send(paymentPayload);

            expect(res.statusCode).toBe(201);
            expect(res.body.success).toBe(true);
            expect(res.body).toHaveProperty('transactionId');
            expect(res.body.orderId).toBe('order_12345');
            expect(res.body.status).toBe('COMPLETED');
        });

        // Test the POST payment endpoint (Failure case)
        it('should return 400 if required fields are missing', async () => {
            const incompletePayload = {
                amount: 150.00
                // missing currency and orderId
            };

            const res = await request(app)
                .post('/api/payments')
                .send(incompletePayload);

            expect(res.statusCode).toBe(400);
            expect(res.body.success).toBe(false);
            expect(res.body.message).toContain('Missing required fields');
        });
    });
});