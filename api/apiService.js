import axios from 'axios';

const BASE_URL = 'https://api.stripe.com/v1';

const secretKey = 'sk_test_51OFgXoSH0WsKss1ljHjnrQeEaFvw2P0IQMkMvWe65XIAYaZGP1Oi1elxx2B1nrpteYbYpSJtJaciYSk0213MIm7e00chSirC3V';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Bearer ${secretKey}`,
    'Stripe-Version': '2023-10-16',
  },
});

export const getCustomer = async () => {
  return api.post('/customers');
};

export const getEphemeral = async (customer) => {
  return api.post('/ephemeral_keys', { customer });
};

export const getPaymentIntent = async (customer, amount = '10000', currency = 'inr', automatic = true) => {
  return api.post('/payment_intents', { customer, amount, currency, 'automatic_payment_methods[enabled]': automatic });
};
