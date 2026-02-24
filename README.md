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

### 2. Configure environment

Create `.env` in project root:

```
VITE_DISCORD_USER_ID=your_discord_user_id
```

Get your Discord User ID: [Discord Developer Mode](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-) → Right-click your avatar → Copy User ID.

### 3. Add assets to `/public`

| File | Description |
|------|-------------|
| `profile.jpg` | Profile picture (120×120 recommended) |
| `background.mp4` | Background video (muted autoplay) |
| `background.jpg` | Fallback background image |
| `music.mp3` | Background music track |

### 4. Update social links

Edit `src/utils/config.ts` and set your social URLs.

### 5. Enable Lanyard (optional)

Add your Discord ID to [Lanyard](https://lanyard.eggsy.xyz/) to enable presence. No API key required.

## Docker

Discord (Lanyard) özelliklerinin çalışması için `VITE_DISCORD_USER_ID` build argümanı gereklidir.

**Docker Compose** (`.env` dosyasından okur):

```bash
docker compose up --build
```

**Sadece Docker**:

```bash
docker build --build-arg VITE_DISCORD_USER_ID=your_discord_id -t my-site .
docker run -p 3000:80 my-site
```

Deploy platformunda (Railway, Fly.io, vb.) build argümanını ayarlayın: `VITE_DISCORD_USER_ID=829298395318714409`

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
