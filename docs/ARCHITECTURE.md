# Frontend Architecture Documentation

## Overview
The Amana Mart web frontend is built using Next.js and is fully decoupled from the backend.

## Decoupled Connectivity
The frontend communicates with the backend via REST API.
- **Base URL**: Configured via `NEXT_PUBLIC_API_URL` environment variable.
- **Authentication**: Uses NextAuth with JWT.

## Modules
- **Marketplace**: Dedicated routes for searching and viewing classified ads.
- **Bikroy-like Features**:
    - Ad posting flow with attribute selection.
    - Location-based search (Division -> District -> Area).
    - Image upload integration with Backend Media API.

## Performance
- **Server Side Rendering (SSR)**: Used for SEO-critical pages (Ad details, Categories).
- **Static Site Generation (SSG)**: Used for static content.
- **Client Side Fetching**: Used for user-specific data (Orders, Profile).

## Deployment
- Optimized for Vercel deployment.
- Environment variables managed via Vercel Dashboard.
