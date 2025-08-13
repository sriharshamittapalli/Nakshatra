import axios from 'axios';
import { ApodData } from '@/types/apod';

class ApodClientError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'ApodClientError';
  }
}

export async function fetchApodClient(date?: string): Promise<ApodData> {
  try {
    const params = new URLSearchParams();
    if (date) {
      params.set('date', date);
    }

    const url = `/api/apod${params.toString() ? `?${params.toString()}` : ''}`;
    
    const response = await axios.get<ApodData>(url, {
      timeout: 15000,
      headers: {
        'Accept': 'application/json',
      }
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.data?.error) {
        throw new ApodClientError(
          error.response.data.error.message || 'Failed to fetch APOD data',
          error.response.status
        );
      }
      
      if (error.code === 'ECONNABORTED') {
        throw new ApodClientError('Request timeout', 408);
      }
      
      if (!error.response) {
        throw new ApodClientError('Network error - Unable to reach the server', 503);
      }
    }

    throw new ApodClientError('An unexpected error occurred while fetching APOD data');
  }
}