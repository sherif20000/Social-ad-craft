# AdVantage Studio - PRD

## Original Problem Statement
Build a web-based Ad Preview & Visualization Dashboard with campaign objectives and ad format awareness. Different objectives (awareness/reach, traffic, sales, leads, etc.) change the preview — e.g. reach ads hide CTA buttons. Different formats (carousel, story, video, single image) render completely different preview layouts. Supports 9 platforms.

## Architecture
- **Frontend**: React + Tailwind CSS + shadcn/ui + react-icons, html-to-image/jsPDF for export
- **Backend**: FastAPI + MongoDB + Emergent Object Storage
- **No Authentication**: Open tool

## What's Been Implemented (2026-03-06)
### Phase 1 (MVP)
- Full backend with file upload/serve/list/delete endpoints
- Emergent Object Storage integration
- Dashboard with sidebar + preview canvas
- 9 platform previews with phone/browser frames
- Mobile/Desktop toggle, PNG/PDF export

### Phase 2 (Campaign Objectives + Formats)
- 7 campaign objectives: Traffic, Sales, Leads, Awareness/Reach, Engagement, App Installs, Video Views
- Objective-aware previews: CTA hidden for awareness/engagement, amber warnings shown
- Platform-specific ad formats:
  - Facebook/Instagram: Single Image, Carousel, Video, Story
  - Twitter/X: Single Image, Carousel, Video
  - LinkedIn: Single Image, Carousel (Document), Video
  - TikTok: In-Feed Video, Spark Ad, TopView
  - YouTube: In-Stream (Skip), In-Feed, Shorts, Bumper (6s)
  - Pinterest: Standard Pin, Carousel, Video Pin
  - Snapchat: Single, Story, Collection
  - Google Ads: Search, Display, Shopping
- Carousel card editor (add/remove cards, per-card image upload, headlines)
- Preview indicator showing current format + objective

## Prioritized Backlog
### P1: Campaign save/load, batch export all platforms, template library
### P2: A/B testing preview (side-by-side), video playback controls, custom dimensions
### P3: AI caption suggestions, share preview links, color palette extractor
