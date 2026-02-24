# Reve — Personal Website

A modern, dark-themed, animated personal website. Static monolith built with Vite + React + TypeScript.

## Features

- **Dark theme** — Centralized design system with cyan accents
- **Background** — Video with fallback image, floating particles, mouse-tracking glow
- **Profile** — Centered avatar, nickname "Reve", full name "Mert YILDIZ"
- **Discord integration** — Real-time presence via Lanyard API (status, activity, Spotify)
- **Socials** — GitHub, Instagram, X, Discord, Spotify, League of Legends
- **Quote** — "Ben ezelden beridir hür yaşadım. Hür yaşarım."
- **Activity card** — Formatted Spotify/League activity display
- **Godplay CTA** — Link to godplay.gg
- **Animations** — Scroll reveal, hover effects, GPU-friendly transitions

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Add assets to `/public`

| File | Description |
|------|-------------|
| `profile.jpg` | Profile picture (120×120 recommended) |
| `background.mp4` | Background video (muted autoplay) |
| `background.jpg` | Fallback background image |
| `music.mp3` | Background music track |

### 3. Update social links

Edit `src/utils/config.ts` and set your social URLs.

### 4. Enable Lanyard (optional)

Add your Discord ID to [Lanyard](https://lanyard.eggsy.xyz/) to enable presence. No API key required.

## Docker

```bash
docker compose up --build
```

## Scripts

- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run preview` — Preview production build

## Tech Stack

- Vite 7
- React 19
- TypeScript
- CSS custom properties (theme)
- Lanyard API (Discord presence)

## Structure

```
/public          — Static assets
/src
  /components    — UI components
  /hooks         — useLanyard, useMouseGlow, useScrollReveal
  /styles        — theme.css, reset.css
  /utils         — config.ts
DEVLOG.md        — Architecture & implementation log
```
