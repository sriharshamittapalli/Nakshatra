import axios from 'axios';
import { ApodData, ApodError } from '@/types/apod';

const NASA_API_BASE = 'https://api.nasa.gov/planetary';

export const NASA_APIS = [
  { name: 'APOD', href: '/apod', fullName: 'Astronomy Picture of the Day' },
  { name: 'Earth', href: '/earth', fullName: 'Earth Imagery' },
  { name: 'Mars', href: '/mars', fullName: 'Mars Rover Photos' },
  { name: 'Neo', href: '/neo', fullName: 'Near Earth Objects' },
  { name: 'EPIC', href: '/epic', fullName: 'Earth Polychromatic Imaging Camera' },
  { name: 'Exoplanets', href: '/exoplanets', fullName: 'Exoplanet Archive' },
  { name: 'Insight', href: '/insight', fullName: 'Mars InSight Weather' },
  { name: 'EONET', href: '/eonet', fullName: 'Earth Observatory Natural Event Tracker' },
  { name: 'DONKI', href: '/donki', fullName: 'Space Weather Database' },
  { name: 'GeneLab', href: '/genelab', fullName: 'GeneLab Data' },
  { name: 'Techport', href: '/techport', fullName: 'NASA TechPort' },
  { name: 'Patents', href: '/patents', fullName: 'NASA Patents' }
];

class NasaApiError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'NasaApiError';
  }
}

export async function fetchApod(date?: string): Promise<ApodData> {
  try {
    const apiKey = process.env.NASA_API_KEY || process.env.NEXT_PUBLIC_NASA_API_KEY;
    
    if (!apiKey) {
      throw new NasaApiError('NASA API key is not configured', 500);
    }

    const params = new URLSearchParams({
      api_key: apiKey,
      ...(date && { date })
    });

    const response = await axios.get<ApodData | ApodError>(
      `${NASA_API_BASE}/apod?${params.toString()}`,
      {
        timeout: 10000,
        headers: {
          'Accept': 'application/json',
        }
      }
    );

    if ('error' in response.data) {
      throw new NasaApiError(
        response.data.error.message || 'NASA API returned an error',
        response.status
      );
    }

    return response.data as ApodData;
  } catch (error) {
    if (error instanceof NasaApiError) {
      throw error;
    }

    if (axios.isAxiosError(error)) {
      if (error.response?.status === 403) {
        throw new NasaApiError('Invalid NASA API key', 403);
      }
      if (error.response?.status === 429) {
        throw new NasaApiError('NASA API rate limit exceeded', 429);
      }
      if (error.code === 'ECONNABORTED') {
        throw new NasaApiError('Request timeout - NASA API is not responding', 408);
      }
      if (!error.response) {
        throw new NasaApiError('Network error - Unable to reach NASA API', 503);
      }
    }

    throw new NasaApiError('An unexpected error occurred while fetching APOD data');
  }
}