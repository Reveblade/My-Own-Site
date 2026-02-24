/**
 * Site configuration — single source for URLs, IDs, and feature flags
 */

export const config = {
  /** Discord User ID — required for Lanyard API */
  discordUserId: '829298395318714409',

  /** Social links */
  socials: {
    leagueOfLegends: 'https://lolpros.gg/player/reveblade',
    github: 'https://github.com/Reveblade',
    instagram: 'https://www.instagram.com/reveblade/',
    x: 'https://x.com/reveblade_',
    spotify: 'https://open.spotify.com/user/twazitem',
    twitch: 'https://www.twitch.tv/reveblade',
    steam: 'https://steamcommunity.com/id/reveblade/',
  },

  /** Godplay CTA */
  godplayUrl: 'https://godplay.gg',

  /** Asset paths (place in /public). Replace with your own. */
  assets: {
    profileImage: '/profile.jpg',
    backgroundVideo: '/background.mp4',
    backgroundImage: '/background.jpg',
    backgroundMusic: '/music.mp3',
    godplayLogo: '/godplay-logo.svg',
  },
} as const;
