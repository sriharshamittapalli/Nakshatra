'use client';

import { useState } from 'react';
import Image from 'next/image';
import useSWR from 'swr';
import { ApodData } from '@/types/apod';
import { fetchApodClient } from '@/lib/apod-client';

export default function ApodCard() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const { data, error, isLoading } = useSWR<ApodData>(
    selectedDate,
    fetchApodClient,
    { revalidateOnFocus: false }
  );

  const handleImageClick = () => {
    if (data) {
      window.open(data.hdurl || data.url, '_blank');
    }
  };

  if (isLoading) {
    return (
      <div className="lg:flex lg:h-[calc(100vh-64px)]">
        <div className="lg:flex-[2] bg-black flex items-center justify-center h-[50vh] lg:h-full">
          <div className="text-white text-center">
            <div className="animate-pulse bg-gray-700 rounded-lg w-96 h-64 mb-4"></div>
            <p>Loading image...</p>
          </div>
        </div>
        <div className="lg:w-[480px] bg-white border-t lg:border-t-0 lg:border-l lg:flex lg:flex-col lg:h-full">
          <div className="p-6 lg:flex-1 lg:overflow-y-auto lg:min-h-0">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center p-6">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-bold text-red-800 mb-2">Error Loading Data</h3>
          <p className="text-red-600">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="lg:flex lg:h-[calc(100vh-64px)]">
      {/* Image Section */}
      <div className="lg:flex-[2] flex items-center justify-center bg-black cursor-pointer h-[50vh] lg:h-full" onClick={handleImageClick}>
        {data.media_type === 'image' ? (
          <Image
            src={data.hdurl || data.url}
            alt={data.title}
            width={1600}
            height={1200}
            className="max-w-full max-h-full object-contain hover:opacity-90 transition-opacity"
            unoptimized
            priority
          />
        ) : (
          <div className="h-full bg-gray-900 flex items-center justify-center">
            <div className="text-center text-white">
              <p className="text-xl mb-4">Video content - click to view</p>
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="lg:w-[480px] bg-white border-t lg:border-t-0 lg:border-l lg:flex lg:flex-col lg:h-full">
        {/* Date Selector */}
        <div className="p-4 border-b bg-white lg:shrink-0">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
          />
        </div>

        {/* Content - Mobile: normal flow, Desktop: scrollable */}
        <div className="p-6 space-y-6 lg:flex-1 lg:overflow-y-auto lg:min-h-0" style={{ WebkitOverflowScrolling: 'touch' }}>
          {/* Date Display */}
          <div className="text-gray-600">
            {new Date(data.date).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>

          {/* Title */}
          <div className="text-2xl font-bold text-gray-800 leading-tight">
            {data.title}
          </div>

          {/* Credit */}
          {data.copyright && (
            <div className="text-gray-600 italic">
              Credit: {data.copyright}
            </div>
          )}

          {/* Description */}
          <div className="text-gray-700 leading-relaxed">
            {data.explanation}
          </div>
        </div>
      </div>
    </div>
  );
}