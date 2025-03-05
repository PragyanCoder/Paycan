import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import CryptoJS from 'crypto-js';

const MERCHANT_ID = '8SKBAV-VYF86F-7VP1MZ-LXEEG2';
const PAYOUT_API_KEY = 'G9PXG9-XB1W57-NB794S-D8S5CH';
const API_URL = 'https://api.oxapay.com';

// Types
interface CreatePaymentParams {
  amount: number;
  currency: string;
  order_id: string;
  email: string;
  description?: string;
}

interface CreateStaticWalletParams {
  currency: string;
  callback_url: string;
}

interface CreateWhiteLabelParams extends CreatePaymentParams {
  design?: {
    theme?: 'light' | 'dark';
    color?: string;
  };
}

interface PayoutParams {
  currency: string;
  amount: number;
  address: string;
  network?: string;
}

// Helper Functions
function generateSignature(data: Record<string, any>, apiKey: string): string {
  const sortedParams = Object.keys(data)
    .sort()
    .map((key) => `${key}:${data[key]}`)
    .join('|');

  return CryptoJS.HmacSHA256(sortedParams, apiKey).toString();
}

function generateNonce(): string {
  return uuidv4();
}

function getBaseUrl(): string {
  return 'https://paycan.vercel.app';
}

// **1️⃣ Create Payment**
export async function createPayment(params: CreatePaymentParams) {
  try {
    const baseUrl = getBaseUrl();
    const data = {
      merchant: MERCHANT_ID,
      amount: params.amount.toFixed(2),
      currency: params.currency,
      order_id: params.order_id,
      email: params.email,
      description: params.description || `Payment for Order #${params.order_id}`,
      callback_url: `${baseUrl}/api/payment/callback`,
      success_url: `${baseUrl}/payment/success`,
      fail_url: `${baseUrl}/payment/failed`,
      timestamp: Math.floor(Date.now() / 1000),
      nonce: generateNonce(),
    };

    data['sign'] = generateSignature(data, API_KEY);

    const response = await axios.post(`${API_URL}/merchant/payment/create`, data);

    if (response.data?.status !== 'success') {
      throw new Error(response.data?.message || 'Payment creation failed');
    }

    return response.data;
  } catch (error: any) {
    console.error('Payment creation error:', error.response?.data || error.message);
    throw new Error('Failed to create payment');
  }
}

// **2️⃣ Create Static Wallet**
export async function createStaticWallet(params: CreateStaticWalletParams) {
  try {
    const data = {
      merchant: MERCHANT_ID,
      currency: params.currency,
      callback_url: params.callback_url,
      timestamp: Math.floor(Date.now() / 1000),
      nonce: generateNonce(),
    };

    data['sign'] = generateSignature(data, API_KEY);

    const response = await axios.post(`${API_URL}/merchant/wallet/static`, data);

    return response.data;
  } catch (error: any) {
    console.error('Static wallet creation error:', error.response?.data || error.message);
    throw new Error('Failed to create static wallet');
  }
}

// **3️⃣ Create White-Label Payment**
export async function createWhiteLabel(params: CreateWhiteLabelParams) {
  try {
    const data = {
      merchant: MERCHANT_ID,
      amount: params.amount.toFixed(2),
      currency: params.currency,
      order_id: params.order_id,
      email: params.email,
      description: params.description,
      callback_url: `${getBaseUrl()}/api/payment/callback`,
      success_url: `${getBaseUrl()}/payment/success`,
      fail_url: `${getBaseUrl()}/payment/failed`,
      timestamp: Math.floor(Date.now() / 1000),
      nonce: generateNonce(),
      design: params.design,
    };

    data['sign'] = generateSignature(data, API_KEY);

    const response = await axios.post(`${API_URL}/merchant/payment/whitelabel`, data);

    return response.data;
  } catch (error: any) {
    console.error('White-label payment error:', error.response?.data || error.message);
    throw new Error('Failed to create white-label payment');
  }
}

// **4️⃣ Create Payout**
export async function createPayout(params: PayoutParams) {
  try {
    const data = {
      merchant: MERCHANT_ID,
      currency: params.currency,
      amount: params.amount.toFixed(8),
      address: params.address,
      network: params.network,
      timestamp: Math.floor(Date.now() / 1000),
      nonce: generateNonce(),
    };

    data['sign'] = generateSignature(data, API_KEY);

    const response = await axios.post(`${API_URL}/payout/send`, data);

    return response.data;
  } catch (error: any) {
    console.error('Payout creation error:', error.response?.data || error.message);
    throw new Error('Failed to create payout');
  }
}

// **5️⃣ Get Payout Info**
export async function getPayoutInfo(txid: string) {
  try {
    const data = {
      merchant: MERCHANT_ID,
      txid,
      timestamp: Math.floor(Date.now() / 1000),
      nonce: generateNonce(),
    };

    data['sign'] = generateSignature(data, API_KEY);

    const response = await axios.post(`${API_URL}/payout/info`, data);

    return response.data;
  } catch (error: any) {
    console.error('Payout info error:', error.response?.data || error.message);
    throw new Error('Failed to get payout info');
  }
}

// **6️⃣ Get Payout History**
export async function getPayoutHistory() {
  try {
    const data = {
      merchant: MERCHANT_ID,
      timestamp: Math.floor(Date.now() / 1000),
      nonce: generateNonce(),
    };

    data['sign'] = generateSignature(data, API_KEY);

    const response = await axios.post(`${API_URL}/payout/history`, data);

    return response.data;
  } catch (error: any) {
    console.error('Payout history error:', error.response?.data || error.message);
    throw new Error('Failed to get payout history');
  }
}

// **7️⃣ Get Server IP**
export async function getServerIP() {
  try {
    const response = await axios.get(`${API_URL}/system/ip`);
    return response.data;
  } catch (error: any) {
    console.error('Get IP error:', error.response?.data || error.message);
    throw new Error('Failed to get server IP');
  }
}

// **8️⃣ Generate Unique Order ID**
export function generateOrderId(): string {
  return uuidv4().substring(0, 8).toUpperCase();
}
