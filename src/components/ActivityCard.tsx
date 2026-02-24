import { useState, useEffect } from 'react';
import { useLanyard, type LanyardSpotify } from '../hooks/useLanyard';
import { config } from '../utils/config';
import './ActivityCard.css';

export function ActivityCard() {
  const { data } = useLanyard(config.discordUserId);

  if (!data || config.discordUserId === 'YOUR_DISCORD_USER_ID') return null;

  const spotify = data.spotify;
  const gameActivity = data.activities?.find((a) => a.type === 0);

  if (spotify) {
    return <SpotifyCard spotify={spotify} />;
  }

  if (gameActivity) {
    return <GameCard activity={gameActivity} />;
  }

  return null;
}

function SpotifyCard({ spotify }: { spotify: LanyardSpotify }) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const progress = Math.min(100, ((now - spotify.timestamps.start) / (spotify.timestamps.end - spotify.timestamps.start)) * 100);

  const formatTime = (ms: number) => {
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    return `${m}:${String(s % 60).padStart(2, '0')}`;
  };

  return (
    <div className="activity-card">
      <div className="activity-card__header">
        <SpotifyIcon />
        <span>Listening</span>
      </div>
      <div className="activity-card__body">
        <img
          src={spotify.album_art_url || spotify.album_art}
          alt={spotify.album}
          className="activity-card__cover"
          width={80}
          height={80}
          referrerPolicy="no-referrer"
        />
        <div className="activity-card__info">
          <span className="activity-card__title">{spotify.song}</span>
          <span className="activity-card__subtitle">{spotify.album} · {spotify.artist}</span>
          <div className="activity-card__progress-wrap">
            <div className="activity-card__progress-bar" style={{ width: `${progress}%` }} />
          </div>
          <span className="activity-card__time">
            {formatTime(now - spotify.timestamps.start)} / {formatTime(spotify.timestamps.end - spotify.timestamps.start)}
          </span>
        </div>
      </div>
    </div>
  );
}

function GameCard({ activity }: { activity: { name: string; state?: string; details?: string } }) {
  const isLeague = activity.name.toLowerCase().includes('league');

  return (
    <div className="activity-card">
      <div className="activity-card__header">
        {isLeague ? <LeagueIcon /> : <GameIcon />}
        <span>Playing</span>
      </div>
      <div className="activity-card__body activity-card__body--game">
        <span className="activity-card__title">{activity.name}</span>
        {(activity.state || activity.details) && (
          <span className="activity-card__subtitle">{activity.state || activity.details}</span>
        )}
      </div>
    </div>
  );
}

function SpotifyIcon() {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} fill="currentColor" aria-hidden>
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

function LeagueIcon() {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} fill="currentColor" aria-hidden>
      <path d="M12.864 0L12.864 0c.063 0 .125.004.188.009l-.188-.009zm0 0c-1.988 0-3.87.46-5.53 1.263l-.001.001c-.166.081-.33.166-.492.254 2.884-.46 5.9-.46 8.782 0-.162-.088-.326-.173-.492-.254C16.734.46 14.852 0 12.864 0zM8.182 2.573c-.163.082-.325.166-.486.252-1.482.82-2.794 1.942-3.87 3.3-.107.136-.21.274-.31.415 1.302-.2 2.66-.3 4.058-.3 1.399 0 2.756.1 4.058.3-.1-.141-.203-.279-.31-.415-1.076-1.358-2.388-2.48-3.87-3.3-.161-.086-.323-.17-.486-.252-.29.072-.575.152-.856.24 1.14.276 2.237.634 3.287 1.068L12 4.5l-.862-.619c1.05-.434 2.147-.792 3.287-1.068-.281-.088-.566-.168-.856-.24zm-5.2 5.485c-.07.12-.138.242-.203.366-1.5 2.593-2.298 5.6-2.298 8.576 0 .084.002.168.005.252 1.22-1.604 2.82-2.954 4.68-3.94-.24-.31-.456-.638-.654-.98-.196-.34-.36-.69-.496-1.05-.136-.36-.24-.73-.31-1.11-.07-.38-.105-.76-.105-1.14 0-.38.035-.76.105-1.14.07-.38.174-.75.31-1.11.136-.36.3-.71.496-1.05.198-.342.414-.67.654-.98-1.86-.986-3.46-2.336-4.68-3.94-.003.084-.005.168-.005.252z" />
    </svg>
  );
}

function GameIcon() {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} fill="currentColor" aria-hidden>
      <path d="M21.58 16.09l-1.09-7.66A3.996 3.996 0 0 0 16.53 5H7.47C5.48 5 3.79 6.46 3.51 8.43l-1.09 7.66C2.2 17.63 3.39 19 4.94 19c0 .55.45 1 1 1h12.12c.55 0 1-.45 1-1 0 1.61 1.19 2.37 1.94 2.91.55.4 1.06.77 1.06 1.09 0 .55-.45 1-1 1H4.94c-1.55 0-2.74-1.37-2.36-2.91l1.09-7.66C3.79 7.46 5.48 6 7.47 6h9.06c2 0 3.68 1.46 3.97 3.43l1.09 7.66c.38 1.54-.81 2.91-2.36 2.91-.55 0-1-.45-1-1 0-.32.51-.69 1.06-1.09.75-.54 1.94-1.3 1.94-2.91z" />
    </svg>
  );
}
