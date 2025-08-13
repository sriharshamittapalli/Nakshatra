import { NextRequest, NextResponse } from 'next/server';
import { fetchApod } from '@/lib/nasa-api';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');

    const data = await fetchApod(date || undefined);
    
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error: unknown) {
    console.error('APOD API Error:', error);
    
    let message = 'Failed to fetch APOD data';
    let statusCode = 500;
    
    if (error instanceof Error) {
      message = error.message;
      if ('statusCode' in error && typeof error.statusCode === 'number') {
        statusCode = error.statusCode;
      }
    }
    
    return NextResponse.json(
      { 
        error: {
          message,
          code: statusCode
        }
      },
      { status: statusCode }
    );
  }
}