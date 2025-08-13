# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Nakshatra is a Next.js 15 application designed as "Your gateway to space data APIs". It's built with React 19, TypeScript, and Tailwind CSS v4.

## Development Commands

- **Development server**: `npm run dev` (starts on http://localhost:3000)
- **Production build**: `npm run build`
- **Start production server**: `npm run start`
- **Linting**: `npm run lint`

## Architecture

This is a modern Next.js application using the App Router architecture (src/app directory structure):

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict mode enabled
- **Styling**: Tailwind CSS v4 with PostCSS
- **Fonts**: Geist Sans and Geist Mono via next/font/google
- **Data fetching**: SWR and Axios configured
- **Icons**: Lucide React
- **Date handling**: date-fns

### Key Dependencies

- `axios`: HTTP client for API requests
- `swr`: Data fetching with caching
- `lucide-react`: Icon library
- `date-fns`: Date manipulation

### Project Structure

- `src/app/`: Next.js App Router pages and layouts
- `src/app/globals.css`: Global styles with Tailwind CSS v4 and custom CSS variables
- `src/app/layout.tsx`: Root layout with font configuration
- `src/app/page.tsx`: Homepage component

### Configuration

- **TypeScript**: Strict mode with path aliases (`@/*` -> `./src/*`)
- **ESLint**: Next.js recommended config with TypeScript support
- **Tailwind CSS**: v4 configuration via PostCSS plugin
- **Theme**: CSS variables for light/dark mode support

### Styling System

Uses Tailwind CSS v4 with custom CSS variables defined in globals.css:
- `--background` and `--foreground` for theme colors
- Font variables for Geist fonts
- Space-themed gradient background with animated starfield
- Automatic dark mode via `prefers-color-scheme`

## NASA APOD Integration

### Environment Variables
- `NASA_API_KEY`: Your NASA API key (stored in `.env.local`)
- Server-side only (not exposed to client for security)

### API Architecture
- **Server Route**: `/apod` - Proxy endpoint that securely calls NASA API
- **Client Service**: `src/lib/apod-client.ts` - Client-side API calls to internal endpoint
- **Server Service**: `src/lib/nasa-api.ts` - Direct NASA API integration (server-side only)

### Components
- **ApodCard**: Main component displaying NASA's Astronomy Picture of the Day
  - Date selector for browsing historical images
  - Simple responsive layout: image on left (2/3 width), content on right (1/3 width)
  - Loading states and error handling
  - HD image downloads and external viewing
  - Uses SWR for caching and data management

### Styling
- Clean, minimal design with light background
- Tailwind CSS for styling
- Responsive design that stacks on mobile
- Blue color scheme for NASA branding

### Testing API
```bash
# Test internal API endpoint
curl "http://localhost:3000/apod"
curl "http://localhost:3000/apod?date=2023-01-01"

# Test NASA API directly
curl "https://api.nasa.gov/planetary/apod?api_key=YOUR_API_KEY"
```