import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import CryptoJS from 'crypto-js';

const MERCHANT_ID = '8SKBAV-VYF86F-7VP1MZ-LXEEG2';
const PAYOUT_API_KEY = 'G9PXG9-XB1W57-NB794S-D8S5CH';
const API_URL = 'https://api.oxapay.com';

// Interfaces
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
function generateSignature(data: any, apiKey: string): string {
  const sortedParams = Object.keys(data)
    .sort()
    .reduce((acc, key) => {
      if (data[key] !== undefined && data[key] !== null) {
        acc[key] = data[key];
      }
      return acc;
    }, {} as any);

  const signString = Object.entries(sortedParams)
    .map(([key, value]) => `${key}:${value}`)
    .join('|');

  return CryptoJS.HmacSHA256(signString, apiKey).toString();
}

function generateNonce(): string {
  return Math.random().toString(36).substring(7);
}

function getBaseUrl(): string {
  // Check if we're in production (custom domain)
  if (window.location.hostname === 'quycan.software') {
    return 'https://quycan.software';
  }
  return window.location.origin;
}

// Main API Functions
export async function createPayment({
  amount,
  currency = 'USD',
  order_id,
  email,
  description
}: CreatePaymentParams) {
  try {
    const baseUrl = getBaseUrl();
    const data = {
      merchant: MERCHANT_ID,
      amount: amount.toFixed(2),
      currency,
      order_id,
      email,
      description: description || `Payment for Order #${order_id}`,
      callback_url: `${baseUrl}/payment/callback`,
      success_url: `${baseUrl}/payment/success`,
      fail_url: `${baseUrl}/payment/failed`,
      timestamp: Math.floor(Date.now() / 1000),
      nonce: generateNonce()
    };

    const sign = generateSignature(data, MERCHANT_ID);
    
    const response = await axios.post(`${API_URL}/merchants/request`, {
      ...data,
      sign
    });

    if (response.data.status === 'error') {
      throw new Error(response.data.message || 'Payment creation failed');
    }

    return response.data;
  } catch (error: any) {
    console.error('Oxapay payment creation error:', error);
    throw new Error(error.response?.data?.message || 'Failed to create payment');
  }
}

export async function createStaticWallet({
  currency,
  callback_url
}: CreateStaticWalletParams) {
  try {
    const data = {
      merchant: MERCHANT_ID,
      currency,
      callback_url,
      timestamp: Math.floor(Date.now() / 1000),
      nonce: generateNonce()
    };

    const response = await axios.post(`${API_URL}/merchants/request/staticaddress`, {
      ...data,
      sign: generateSignature(data, MERCHANT_ID)
    });

    return response.data;
  } catch (error: any) {
    console.error('Static wallet creation error:', error);
    throw new Error(error.response?.data?.message || 'Failed to create static wallet');
  }
}

export async function createWhiteLabel(params: CreateWhiteLabelParams) {
  try {
    const data = {
      merchant: MERCHANT_ID,
      amount: params.amount.toFixed(2),
      currency: params.currency,
      order_id: params.order_id,
      email: params.email,
      description: params.description,
      callback_url: `${window.location.origin}/payment/callback`,
      success_url: `${window.location.origin}/payment/success`,
      fail_url: `${window.location.origin}/payment/failed`,
      timestamp: Math.floor(Date.now() / 1000),
      nonce: generateNonce(),
      design: params.design
    };

    const response = await axios.post(`${API_URL}/merchants/request/whitelabel`, {
      ...data,
      sign: generateSignature(data, MERCHANT_ID)
    });

    return response.data;
  } catch (error: any) {
    console.error('White label payment creation error:', error);
    throw new Error(error.response?.data?.message || 'Failed to create white label payment');
  }
}

export async function createPayout({
  currency,
  amount,
  address,
  network
}: PayoutParams) {
  try {
    const data = {
      currency,
      amount: amount.toFixed(8),
      address,
      network,
      timestamp: Math.floor(Date.now() / 1000),
      nonce: generateNonce()
    };

    const response = await axios.post(`${API_URL}/api/send`, {
      ...data,
      sign: generateSignature(data, PAYOUT_API_KEY)
    });

    return response.data;
  } catch (error: any) {
    console.error('Payout creation error:', error);
    throw new Error(error.response?.data?.message || 'Failed to create payout');
  }
}

export async function getPayoutInfo(txid: string) {
  try {
    const data = {
      txid,
      timestamp: Math.floor(Date.now() / 1000),
      nonce: generateNonce()
    };

    const response = await axios.post(`${API_URL}/api/inquiry`, {
      ...data,
      sign: generateSignature(data, PAYOUT_API_KEY)
    });

    return response.data;
  } catch (error: any) {
    console.error('Payout info error:', error);
    throw new Error(error.response?.data?.message || 'Failed to get payout information');
  }
}

export async function getPayoutHistory() {
  try {
    const data = {
      timestamp: Math.floor(Date.now() / 1000),
      nonce: generateNonce()
    };

    const response = await axios.post(`${API_URL}/api/list`, {
      ...data,
      sign: generateSignature(data, PAYOUT_API_KEY)
    });

    return response.data;
  } catch (error: any) {
    console.error('Payout history error:', error);
    throw new Error(error.response?.data?.message || 'Failed to get payout history');
  }
}

export async function getServerIP() {
  try {
    const response = await axios.get(`${API_URL}/api/myip`);
    return response.data;
  } catch (error: any) {
    console.error('Get IP error:', error);
    throw new Error(error.response?.data?.message || 'Failed to get server IP');
  }
}

export function generateOrderId(): string {
  return uuidv4().substring(0, 8).toUpperCase();
}