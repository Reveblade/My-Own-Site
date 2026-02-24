import { config } from '../utils/config';
import godplayIcon from '../icons/pfp-default.png';
import './GodplayButton.css';

export function GodplayButton() {
  return (
    <a
      href={config.godplayUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="godplay-button"
    >
      <span className="godplay-button__logo">
        <img src={godplayIcon} alt="" width={32} height={32} className="godplay-button__icon" />
      </span>
      <span className="godplay-button__content">
        <span className="godplay-button__title">Godplay</span>
        <span className="godplay-button__subtitle">Play with the Gods.</span>
      </span>
      <span className="godplay-button__arrow" aria-hidden>
        <ArrowIcon />
      </span>
    </a>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} fill="currentColor" aria-hidden>
      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
    </svg>
  );
}
