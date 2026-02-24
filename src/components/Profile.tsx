import { useState } from 'react';
import twemoji from 'twemoji';
import { useLanyard } from '../hooks/useLanyard';
import { config } from '../utils/config';
import type { DiscordStatus } from '../hooks/useLanyard';
import './Profile.css';

const FALLBACK_AVATAR = 'https://api.dicebear.com/7.x/initials/svg?seed=Reve';

const LOCATION_HTML = twemoji.parse('İzmir / Türkiye 🇹🇷', {
  base: 'https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/',
  folder: 'svg',
  ext: '.svg',
});

function LocationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width={16}
      height={16}
      fill="currentColor"
      className="profile__location-icon"
      aria-hidden
    >
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
    </svg>
  );
}

const statusColors: Record<DiscordStatus, string> = {
  online: 'var(--color-online)',
  idle: 'var(--color-idle)',
  dnd: 'var(--color-dnd)',
  offline: 'var(--color-offline)',
};

export function Profile() {
  const { data } = useLanyard(config.discordUserId);
  const [imgError, setImgError] = useState(false);

  const avatarUrl =
    data?.discord_user?.avatar && data?.discord_user?.id
      ? `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.png?size=128`
      : null;
  const avatarSrc = imgError || !avatarUrl ? FALLBACK_AVATAR : avatarUrl;
  const status = data?.discord_status ?? 'offline';

  return (
    <section className="profile" aria-label="Profile">
      <div className="profile__avatar-wrapper">
        <img
          src={avatarSrc}
          alt="Reve"
          className="profile__avatar"
          width={120}
          height={120}
          onError={() => setImgError(true)}
        />
        {avatarUrl && !imgError && (
          <span
            className="profile__status"
            style={{ backgroundColor: statusColors[status] }}
            aria-label={status}
          />
        )}
      </div>
      <div className="profile__info">
        <p className="profile__nickname">Reve</p>
        <p className="profile__location">
        <LocationIcon />
        <span dangerouslySetInnerHTML={{ __html: LOCATION_HTML }} />
        </p>
      </div>
    </section>
  );
}
