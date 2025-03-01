// lib/paystack.ts
import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'https://api.paystack.co',
});

// Response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized access. Please check your API key.');
    }
    return Promise.reject(error);
  }
);

interface PaystackPaymentProps {
  email: string;
  amount: number;
  metadata: {
    custom_fields: Array<{
      display_name: string;
      variable_name: string;
      value: string;
    }>;
  };
  publicKey: string;
}

export const processPaystackPayment = async (props: PaystackPaymentProps) => {
  const { email, amount, metadata, publicKey } = props;

  try {
    const response = await axiosInstance.post('/transaction/initialize', {
      email,
      amount,
      metadata,
    }, {
      headers: {
        Authorization: `Bearer ${publicKey}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Paystack payment error:', error);
    throw error;
  }
};