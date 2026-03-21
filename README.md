# ChessIQ Frontend

Vite + React landing page for ChessIQ Summer Chess Camp 2026.

## Requirements

- Node.js 20.x

## Local Development

1. Install dependencies with `npm install`.
2. Create a `.env` file from `.env.example` if you need to point the frontend to a different backend.
3. Start the dev server with `npm run dev`.

## Environment Variables

- `VITE_API_BASE_URL`: Base URL for the backend API. Example: `https://api.example.com`

If this variable is not set, the app falls back to `https://chess-backend-ijaq.onrender.com`.

## Production Build

- Build with `npm run build`
- Preview locally with `npm run preview`

The deploy output is the `dist/` directory.

## Deployment Notes

- Set the Node version to `20.x`.
- Set `VITE_API_BASE_URL` in your hosting platform to the backend you want the form to use.
- This frontend is a static Vite app, so it can be deployed to Vercel, Netlify, Render Static Sites, GitHub Pages, or any static host that serves the `dist/` folder.
