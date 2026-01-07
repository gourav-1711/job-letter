# Job Letter Creator

## Overview
A Next.js 16 application for generating professional job appointment letters with PDF export functionality.

## Project Structure
- `app/` - Next.js App Router pages and components
  - `components/` - React components (JobLetterForm, LetterPreview)
  - `types/` - TypeScript type definitions
  - `utils/` - Utility functions (PDF generation, number to words conversion)
- `public/` - Static assets

## Tech Stack
- Next.js 16.0.10 with Turbopack
- React 19.2.1
- TypeScript 5
- Tailwind CSS 4
- jsPDF for PDF generation

## Development
- Run: `npm run dev -- -p 5000 -H 0.0.0.0`
- Build: `npm run build`
- Production: `npm run start -- -p 5000 -H 0.0.0.0`

## Configuration
- Port 5000 is used for both development and production
- Host is set to 0.0.0.0 for Replit compatibility
- All dev origins allowed for iframe preview support

## Recent Changes
- 2026-01-07: Initial Replit environment setup, configured Next.js for port 5000 and allowed all hosts
