# VHSOFRWARE.GITHUB.IO

This is a Next.js app for Indian Income Tax Return software, ready for deployment on Vercel.

## Deploy to Vercel

1. Push all your code to GitHub.
2. Go to https://vercel.com/import and select your repo.
3. Set these environment variables in Vercel dashboard:
    - `NEXT_PUBLIC_SUPABASE_URL`
    - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Click Deploy.

**No further config is needed—Vercel auto-detects Next.js.**

## Database

Use the provided SQL (`supabase_schema.sql`) in your Supabase SQL editor to create tables.

## Folders

- `src/pages/` — all your app pages (routes)
- `src/components/` — reusable UI (navigation, logout)
- `src/utils/` — helper (auth wrapper)
- `src/supabaseClient.js` — Supabase config
- `public/` — static files (logo, etc.)

## Features

- Auth (Signup, Login, Logout)
- Multi-Assessee CRUD
- P&L, Balance Sheet, Statement/Computation
- Import Prefilled JSON, AIS/TIS/26AS (UI)
- File Return (UI)