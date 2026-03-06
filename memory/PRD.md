# AdVantage Studio - PRD

## Original Problem Statement
Build a web-based Ad Preview & Visualization Dashboard that enables users to add visuals (images, videos), captions, CTAs, buttons, and links, then preview ads across multiple social media platforms on both mobile and web. Supports downloading previews as PNG/PDF.

## Architecture
- **Frontend**: React + Tailwind CSS + shadcn/ui, html-to-image for PNG export, jsPDF for PDF export
- **Backend**: FastAPI + MongoDB + Emergent Object Storage for file uploads
- **No Authentication**: Open tool, no sign-in required

## User Personas
- Digital marketers creating multi-platform ad campaigns
- Social media managers previewing ad creatives
- Ad agencies building client presentations
- Small business owners designing their own ads

## Core Requirements
- Upload images/videos via drag & drop
- Edit ad content (brand name, handle, caption, headline, description, CTA)
- Preview ads on 9 platforms: Facebook, Instagram, Twitter/X, LinkedIn, TikTok, YouTube, Pinterest, Snapchat, Google Ads
- Toggle between mobile and desktop preview modes
- Export previews as PNG or PDF

## What's Been Implemented (2026-03-06)
- Full backend with file upload/serve/list/delete endpoints
- Emergent Object Storage integration for media files
- Dashboard with left sidebar (ad editor) + right panel (preview canvas)
- 9 realistic platform preview components with phone/browser frames
- Mobile/Desktop device toggle
- PNG/PDF export via html-to-image + jsPDF
- All tests passing (100% backend + frontend)

## Prioritized Backlog
### P0 (Critical)
- All implemented

### P1 (High)
- Campaign save/load to MongoDB
- Multiple ad creatives per campaign
- Batch export all platforms at once

### P2 (Medium)
- Ad format variations per platform (feed vs story vs reel)
- Custom dimensions/aspect ratios
- Video preview with playback controls
- Template library with pre-made ad layouts

### P3 (Nice to have)
- AI-powered caption suggestions
- A/B testing preview (compare two versions side by side)
- Color palette extractor from uploaded images
- Share preview links with clients
- Campaign analytics integration
