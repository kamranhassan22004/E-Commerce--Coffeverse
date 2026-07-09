export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export function getImageUrl(image) {
  if (!image) return '/coffee/product-midnight-card.png';
  if (image.startsWith('http')) return image;
  if (image.startsWith('/coffee') || image.startsWith('/stitch') || image.startsWith('/assets')) return image;
  if (image.startsWith('/uploads')) return `${API_URL.replace('/api', '')}${image}`;
  return image;
}

export async function apiFetch(endpoint, options = {}) {
  const headers = { ...(options.headers || {}) };
  const isFormData = options.body instanceof FormData;

  if (!isFormData) headers['Content-Type'] = 'application/json';

  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('coffee_token');
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
    cache: 'no-store',
  });

  let data = null;
  try {
    data = await res.json();
  } catch (error) {
    data = null;
  }

  if (!res.ok) {
    throw new Error(data?.message || 'Something went wrong');
  }

  return data;
}

export function currency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: Number(value) % 1 === 0 ? 2 : 2,
    maximumFractionDigits: 2,
  }).format(value || 0);
}
