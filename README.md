# Minimalist AI Web Application

A modern, minimalist black-and-white web application built with Next.js, React, and TailwindCSS.

## Features

- Clean, minimalist black-and-white design
- Responsive layout with sidebar navigation
- Built with modern React and TypeScript
- Powered by Next.js 14
- Styled with TailwindCSS

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd minimalist-ai-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
├── app/
│   ├── components/    # Reusable UI components
│   ├── globals.css    # Global styles
│   ├── layout.tsx    # Root layout
│   └── page.tsx      # Home page
├── public/           # Static assets
└── package.json     # Project dependencies
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Design System

### Colors
- Primary: #111 (Black)
- Secondary: #EEE (Light Grey)
- Background: #FFF (White)

### Typography
- Font: Inter (with Helvetica and Arial fallbacks)
- Base size: 16px
- Scale: 1.25 modular scale

### Components
- Buttons: Transparent with black border
- Inputs: White background with subtle border
- Cards: White background with border
- Sidebar: Fixed position with white background 