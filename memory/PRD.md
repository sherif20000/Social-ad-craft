# AdVantage Studio — PRD

## Problem Statement
A web-based application to visualize ad previews across various social media platforms. Helps users create high-converting and engaging ads by allowing them to customize every aspect and see a live preview.

## Target Users
Marketers, social media managers, ad agencies, and solo creators who need to preview how their ads will look before publishing.

## Core Requirements
- **Platforms**: Facebook, Instagram, Twitter/X, LinkedIn, TikTok, YouTube, Pinterest, Snapchat, Google Ads
- **Inputs**: Brand identity (name, handle, profile image), ad copy (caption, headline, description), CTA, media (image/video)
- **Dynamic Previews**: Adapt based on campaign objective (e.g., no CTA for Awareness) and format (Single Image, Carousel, Story, Video)
- **Formats per platform**: Carousel, Single Image/Video, Story, platform-specific formats
- **File Upload**: Drag & drop for images and videos
- **Validation**: Button to validate all required fields
- **Character Counter**: Platform-specific limits for caption, headline, description
- **Shareable Link**: Generate a link to share the ad preview (read-only)
- **Download**: Export preview as PNG or PDF
- **No login required**: Open access tool
- **No AI features** at this stage

## Tech Stack
- **Frontend**: React, Tailwind CSS, Shadcn UI, react-icons, html-to-image, jsPDF
- **Backend**: FastAPI
- **Storage**: Emergent Object Storage (media uploads)
- **Database**: MongoDB (shares collection)

## Architecture
```
/app
├── backend
│   ├── .env
│   ├── requirements.txt
│   └── server.py           # FastAPI: upload, file serve, share CRUD
└── frontend
    ├── .env
    ├── src
    │   ├── App.js           # Routes: / and /share/:shareId
    │   ├── lib/constants.js # PLATFORMS, OBJECTIVES, PLATFORM_FORMATS, PLATFORM_SPECS, DEFAULT_AD_DATA
    │   ├── pages
    │   │   ├── Dashboard.js         # Main orchestration page
    │   │   └── SharePreview.js      # Read-only shared preview page
    │   └── components
    │       ├── AdSidebar.js         # All input controls + validation
    │       ├── PreviewCanvas.js     # Platform tabs + device toggle + preview frame
    │       ├── CharacterCounter.js  # Character count with platform-specific limits
    │       ├── ShareButton.js       # Generate & copy shareable link
    │       ├── ExportButton.js      # Download as PNG/PDF
    │       ├── MediaUploader.js     # Drag & drop media upload
    │       ├── AutoPlayVideo.js     # Autoplay video wrapper
    │       └── previews/            # 9 platform-specific preview components
```

## Key API Endpoints
- `POST /api/upload` — Upload media to object storage
- `GET /api/files/{path}` — Serve uploaded media
- `GET /api/media` — List all uploaded media
- `DELETE /api/media/{id}` — Soft delete media
- `POST /api/share` — Save ad config, return share ID
- `GET /api/share/{share_id}` — Retrieve saved ad config

## DB Schema
- **media_files**: `{ id, storage_path, original_filename, content_type, size, is_deleted, created_at }`
- **shares**: `{ id (8-char uuid), ad_data (full adData + platform), created_at }`

---

## What's Been Implemented

### Phase 1 — MVP (completed)
- Full multi-platform dashboard (9 platforms)
- Dynamic previews based on campaign objective and ad format
- Media upload (images + videos) via Emergent Object Storage
- Carousel ad format with per-card editors
- Campaign objective awareness (hide CTA for Awareness/Engagement)
- "Validate Ad" button with error/warning/pass breakdown
- AutoPlayVideo component for correct video rendering

### Phase 2 — Feature Enrichment (completed Feb 2026)
- **Character Counter**: Below each text field (caption, headline, description) with platform-specific recommended/max limits. Color-coded: amber at 85%, red at 100%+.
- **Share Button**: Generates shareable link via `/api/share`, copies to clipboard with toast notification
- **Share Preview Page**: Read-only page at `/share/:shareId` with banner and full preview
- **Platform Logo Badge**: Colored pill with icon + name in preview bar for clear platform identification
- **Download (Export)**: PNG and PDF via `html-to-image` + `jsPDF` (ExportButton in toolbar)

---

## Prioritized Backlog

### P0 (Critical)
- None currently

### P1 (High Value)
- Ad specs reference panel — show recommended dimensions per platform/format inline

### P2 (Nice to Have)
- Analytics Dashboard — track which platform previews are viewed most
- A/B Testing view — compare two ad variations side-by-side
- Dark mode support
- Export all platforms at once (batch export)

---

## Testing Status
- Test reports: `/app/test_reports/iteration_5.json`
- Backend tests: `/app/backend/tests/test_advantage_studio.py`
- Last test: 100% pass rate (10/10 frontend, 8/8 backend) — Feb 2026
