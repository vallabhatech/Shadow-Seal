# Shadow Seal

Shadow Seal is a client-side encryption dashboard built with React, TypeScript, and Vite. It demonstrates secure file sealing, password-based decryption flows, and security logging in a polished single-page interface that is ready to build and deploy on Vercel.

## Project Overview

The app provides three main areas:

- A file sealing workflow that encrypts data in the browser.
- A decrypt workflow with a mock encrypted vault.
- A security dashboard that visualizes activity and logs.

The current workspace is a frontend-only Vite application. The repository now builds successfully in production and is suitable for static deployment on Vercel.

## Features

- Client-side AES-GCM encryption.
- PBKDF2 key derivation.
- Encrypt and decrypt dashboard panels.
- Security activity charts and logs.
- Responsive layout for desktop and mobile.
- Production-ready Vite build.

## Tech Stack

- React 19
- TypeScript
- Vite 6
- Lucide React
- Recharts

## Folder Structure

```text
Shadow-Seal-
├─ App.tsx
├─ components/
│  ├─ Dashboard.tsx
│  ├─ EncryptPanel.tsx
│  ├─ DecryptPanel.tsx
│  ├─ LogsPanel.tsx
│  └─ ui/
│     ├─ Button.tsx
│     └─ Card.tsx
├─ constants.ts
├─ index.css
├─ index.html
├─ index.tsx
├─ services/
│  └─ crypto.ts
├─ types.ts
├─ vite.config.ts
├─ .env.example
└─ package.json
```

## Prerequisites

- Node.js 18 or later
- npm 9 or later

## Installation

```bash
git clone <repository-url>
cd Shadow-Seal-
npm install
```

## Environment Variables

The app currently does not require environment variables to build. A placeholder file is provided for compatibility with the original scaffold.

`.env.example`

```bash
GEMINI_API_KEY=PLACEHOLDER_API_KEY
```

If you add real backend or AI integration later, copy `.env.example` to `.env` and fill in the values.

## Development Setup

```bash
npm run dev
```

Vite serves the app locally, usually at `http://localhost:3000`.

## Build Instructions

```bash
npm run build
```

## Running Locally

```bash
npm run dev
npm run preview
```

## Production Deployment on Vercel

This repository is compatible with Vercel as a static Vite app.

Recommended Vercel settings:

- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

If you configure environment variables in Vercel, mirror the names from `.env.example`.

## Backend Setup

The current workspace does not include a backend folder. If you add one later, document it here and include its install and start commands.

## API Endpoints

No live backend API endpoints are currently shipped in this workspace.

## Security Features

- PBKDF2-based key derivation.
- AES-GCM encryption for authenticated encryption.
- Browser-side file handling before any simulated storage step.
- Security logging and anomaly-style reporting in the UI.

## Troubleshooting

- If imports fail, verify the `components/` and `services/` folders exist and that the casing matches the import path.
- If the build fails, rerun `npm install` and `npm run build` from the repository root.
- If Vercel shows a deployment error, confirm the output directory is `dist`.
- If fonts or global styles do not load, ensure `index.css` is present and linked from `index.html`.

## License

No license has been specified for this project.
