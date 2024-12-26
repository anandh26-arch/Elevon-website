import { JSONBIN_CONFIG } from './config';
import { APIError, NetworkError } from './errors';

const headers = {
  'Content-Type': 'application/json',
  'X-Master-Key': JSONBIN_CONFIG.API_KEY,
  'X-Bin-Meta': 'false',
  'X-Access-Key': JSONBIN_CONFIG.API_KEY
};

async function fetchWithTimeout(url: string, options: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), JSONBIN_CONFIG.TIMEOUT);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    return response;
  } finally {
    clearTimeout(timeout);
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new APIError(`API request failed: ${response.statusText}`, response.status);
  }

  try {
    const data = await response.json();
    return data;
  } catch (error) {
    throw new APIError('Invalid JSON response');
  }
}

export async function apiGet<T>(): Promise<T> {
  try {
    const response = await fetchWithTimeout(
      `${JSONBIN_CONFIG.BASE_URL}/${JSONBIN_CONFIG.BIN_ID}`, 
      {
        method: 'GET',
        headers,
        mode: 'cors',
        credentials: 'omit'
      }
    );
    return handleResponse<T>(response);
  } catch (error) {
    if (error instanceof APIError) throw error;
    if (error.name === 'AbortError') {
      throw new NetworkError('Request timeout');
    }
    throw new NetworkError('Failed to connect to the server');
  }
}

export async function apiPut<T>(data: T): Promise<void> {
  try {
    const response = await fetchWithTimeout(
      `${JSONBIN_CONFIG.BASE_URL}/${JSONBIN_CONFIG.BIN_ID}`,
      {
        method: 'PUT',
        headers,
        mode: 'cors',
        credentials: 'omit',
        body: JSON.stringify(data)
      }
    );
    await handleResponse<T>(response);
  } catch (error) {
    if (error instanceof APIError) throw error;
    if (error.name === 'AbortError') {
      throw new NetworkError('Request timeout');
    }
    throw new NetworkError('Failed to connect to the server');
  }
}