import { useEffect } from 'react';
import { useLanyard } from '../hooks/useLanyard';
import { config } from '../utils/config';

const WHITE_DOT_SVG = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="16" cy="16" r="8" fill="white"/></svg>'
)}`;

export function Favicon() {
  const { data } = useLanyard(config.discordUserId);

  useEffect(() => {
    const link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (!link) return;

    const avatarUrl =
      data?.discord_user?.avatar && data?.discord_user?.id
        ? `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.png?size=32`
        : WHITE_DOT_SVG;

    link.href = avatarUrl;
    link.type = avatarUrl.startsWith('data:') ? 'image/svg+xml' : 'image/png';
  }, [data]);

  return null;
}
