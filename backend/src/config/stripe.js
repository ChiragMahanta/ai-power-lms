// Mock Stripe - No real API key needed! Perfect for testing logic!
export const stripe = {
    paymentIntents: {
        create: async (params) => {
            return {
                id: "pi_mock_" + Date.now(),
                amount: params.amount,
                currency: params.currency || "inr",
                status: "requires_payment_method",
                client_secret: "mock_secret_" + Date.now()
            };
        }
    },
    checkout: {
        sessions: {
            create: async (params) => {
                return {
                    id: "cs_mock_" + Date.now(),
                    url: "https://mock-checkout-url.com/session_" + Date.now(),
                    payment_status: "unpaid"
                };
            }
        }
    }
};