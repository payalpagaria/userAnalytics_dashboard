# CausalFunnel Analytics Dashboard

A React-based analytics dashboard for tracking user sessions, events, and click heatmaps.

## Features

- **Dashboard** - Overview of session metrics and recent activity
- **Sessions** - View and manage all user sessions with event details
- **Heatmap** - Visualize click patterns across different pages

## Tech Stack

- React + Vite
- Redux Toolkit
- React Router

## Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Deployment

Configured for Netlify with API proxy to backend. Just push to your connected repo.

## API

Backend: `https://useranalytics-1gzm.onrender.com`

Endpoints:
- `GET /api/events/sessions` - List sessions
- `GET /api/events/sessions/:id` - Session events
- `GET /api/clicks/pages` - Heatmap pages
- `GET /api/clicks/heatmap` - Click coordinates
