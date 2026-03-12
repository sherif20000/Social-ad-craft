# AdVantage Studio — Vercel Deployment Guide

## Prerequisites
- GitHub account with the repo pushed
- Vercel account (free tier works)
- MongoDB Atlas account (free M0 cluster)

---

## Step 1 — Set up MongoDB Atlas

1. Go to [https://cloud.mongodb.com](https://cloud.mongodb.com) → create a free M0 cluster
2. Create a database user (username + password)
3. Allow access from anywhere: Network Access → Add IP → `0.0.0.0/0`
4. Get your connection string:
   ```
   mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/advantage_studio?retryWrites=true&w=majority
   ```

---

## Step 2 — Deploy on Vercel

1. Go to [https://vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Vercel will auto-detect the `vercel.json` config
4. **Do NOT change** the build settings — they are already in `vercel.json`

---

## Step 3 — Set Environment Variables in Vercel

In your Vercel project → **Settings → Environment Variables**, add:

| Variable | Value |
|---|---|
| `REACT_APP_BACKEND_URL` | *(leave empty — uses relative URLs)* |
| `MONGO_URL` | Your MongoDB Atlas connection string |
| `DB_NAME` | `advantage_studio` |
| `CORS_ORIGINS` | `*` |
| `STORAGE_BASE_URL` | Your Vercel deployment URL (e.g. `https://your-app.vercel.app`) |

> **Important:** Set `REACT_APP_BACKEND_URL` to an empty string `""` so that API calls
> use relative paths (`/api/...`) which work correctly on Vercel.

---

## Step 4 — Redeploy

After adding environment variables, trigger a redeploy:
- Vercel Dashboard → Deployments → **Redeploy**

---

## File Structure for Vercel

```
/ (repo root)
├── vercel.json          ← Vercel config (routing + build)
├── api/
│   ├── index.py         ← FastAPI entry point for Vercel serverless
│   └── requirements.txt ← Python dependencies
├── frontend/            ← React app (built by Vercel)
│   ├── package.json
│   └── src/
└── backend/
    └── server.py        ← FastAPI app (imported by api/index.py)
```

---

## Notes on Media Uploads

The current app uses **Emergent Object Storage** for image/video uploads.
This is an Emergent-platform-specific service and **will not work** outside of Emergent.

For Vercel deployment, you have two options:
1. **AWS S3** — Replace the object storage integration with `boto3` + S3 bucket
2. **Cloudinary** — Easy media hosting with a generous free tier

If you need help migrating the storage integration, let the agent know.

---

## Routes

| Route | Handled By |
|---|---|
| `/api/*` | FastAPI (Python serverless at `api/index.py`) |
| `/share/:id` | React Router (served via `index.html`) |
| `/*` | React SPA (static files from `frontend/build`) |
