# DEVLOG — Personal Website

## Architecture Decisions

### Tech Stack
- **Vite + React + TypeScript** — Fast build, excellent DX, static export via `vite build`
- **CSS Variables** — Centralized theme, no runtime CSS-in-JS overhead
- **Lanyard API** — Discord presence (no API key, uses Discord user ID)
- **No heavy animation libs** — CSS transforms + `requestAnimationFrame` for performance

### Rationale
- Static-first: Vite produces optimized static assets
- Component structure: Natural React composition
- Theme: CSS custom properties = single source of truth, GPU-friendly
- Lanyard: Free, real-time Discord presence via WebSocket

---

## APIs Used
- **Lanyard WebSocket** — `wss://api.lanyard.rest/socket` (real-time presence)
- **Lanyard REST** — `https://api.lanyard.rest/v1/users/{discord_id}` (fallback / initial fetch)

---

## Theme System
- Dark base (#0a0a0f)
- Accent: cyan/teal glow (#00d4ff)
- Secondary: purple (#8b5cf6)
- Borders: subtle rgba
- Typography: Inter (Google Fonts)

---

## Components Implemented
- [x] Theme system (`src/styles/theme.css`, `reset.css`)
- [x] Background (video + fallback image + overlay + particles + mouse glow)
- [x] Profile section (avatar, nickname, full name)
- [x] Discord integration (DiscordPresence component)
- [x] Socials (6 icons with hover tooltips)
- [x] Quote section
- [x] Activity card (Spotify / League formatted)
- [x] Godplay CTA button
- [x] Footer
- [x] Scroll reveal animation
- [x] Mouse tracking glow (debounced 100ms)

---

## Milestone 1 — Scaffolding & Theme
- Vite React TS project initialized
- Theme variables in `theme.css`
- Config in `src/utils/config.ts`

## Milestone 2 — Layout & Background
- Background component with video/image toggle
- Audio mute toggle for background music
- Gradient overlay, floating particles (20), mouse glow
- Graceful fallback when video/image missing

## Milestone 3 — Profile, Socials, Quote
- Profile with fallback avatar (DiceBear) on image error
- Socials: 6 brand icons, hover glow
- Quote with fade-in animation

## Milestone 4 — Discord & Activity
- `useLanyard` hook: WebSocket + REST fallback
- DiscordPresence: status dot, avatar, custom status, Spotify block
- ActivityCard: Spotify (cover, song, album, progress) / League

## Milestone 5 — CTA, Footer, Polish
- Godplay button with glow hover
- Footer "Made by Reve."
- ScrollReveal with IntersectionObserver

---

## Pending / Future
- [ ] Add real assets (profile.jpg, background.mp4, background.jpg, music.mp3)
- [ ] Set `VITE_DISCORD_USER_ID` in .env
- [ ] Update social URLs in config
- [ ] Register Discord ID with Lanyard for presence
- [ ] Lighthouse audit (target 90+)
- [ ] Optional: Godplay logo SVG asset

---

## Performance Notes
- Mouse tracking debounced 100ms
- `requestAnimationFrame` for glow position updates
- Passive event listeners for mousemove
- No `will-change` on static elements
- CSS transforms for animations (GPU-friendly)

---

## Compromises
- **Profile fallback**: Uses DiceBear API when profile.jpg missing — consider self-hosted placeholder
- **Background**: When both video and image 404, shows solid dark + gradient
- **Lanyard**: Requires Discord ID in Lanyard registry for presence; REST works without

---

*Last updated: Implementation complete*
