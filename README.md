# V H Tax Solutions

Modern Web-based Indian Income Tax Return Filing Software.

## Features

- Secure Login/Signup (Supabase Auth)
- Multi-Assessee (Client) Management: Add/Edit/Delete
- Prefilled JSON Import
- AIS/TIS/26AS Import
- Return Filing (All ITRs, all AYs)
- Computation of Income, P&L, Balance Sheet
- Modern UI with Navigation and Branding

## Setup

1. **Clone the repository**
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Add `.env.local` with your Supabase credentials (already provided above)**
4. **Run the dev server:**
   ```bash
   npm run dev
   ```
5. **Upload your logo to `public/logo.png`**

## Supabase

- Use the provided SQL schema for your database in Supabase.
- Make sure your tables match the code.

## Folder Structure

- `/src/pages` - All routes and UI pages
- `/src/components` - UI components
- `/src/utils` - Auth utilities
- `/public` - Static files (logo, etc.)

## Next Steps

- Add business logic, validations, and government portal automation as needed.
- Extend forms for full ITR schemas and validation.
