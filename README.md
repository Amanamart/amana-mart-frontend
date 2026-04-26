# Amana Mart Frontend

Main customer-facing web application for the Amana Mart Super App.

## Features
- **Multi-Module Navigation**: Floating module dock for seamless switching between business types.
- **8 Core Modules**: Grocery, Pharmacy, Food, Shop, Courier, Ride, Service, and Classified.
- **Dynamic Storefront**: Next.js 14 based high-performance storefront.
- **Mobile Responsive**: Fully optimized for mobile browsers.

## Technologies
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **State Management**: Zustand (Module Store)
- **Icons**: Lucide React
- **Animations**: Framer Motion

## Setup
1. Clone the repository.
2. Run `npm install`.
3. Create a `.env` file from `.env.example`.
4. Start development server: `npm run dev`.

## Module Navigation
The frontend features a premium floating sidebar (Desktop) and bottom dock (Mobile) for switching between the 8 core business modules. This logic is managed by `useModuleStore` and `ModuleContext`.

---
© 2026 Amana Mart. All rights reserved.
