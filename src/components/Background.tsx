import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useMouseGlow } from '../hooks/useMouseGlow';
import { config } from '../utils/config';
import backgroundIcon from '../icons/background-icon.svg';
import backgroundMusic from '../assets/Love Me.mp3';
import './Background.css';

export function Background() {
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [audioMuted, setAudioMuted] = useState(false);
  const audioUnlockedRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const glowRef = useMouseGlow();
  const VOLUME = 0.05;

  // Unlock audio on first user interaction (browsers block autoplay otherwise)
  useEffect(() => {
    const unlock = () => {
      if (audioUnlockedRef.current) return;
      audioUnlockedRef.current = true;
      const audio = audioRef.current;
      if (audio && !audioMuted) {
        audio.volume = VOLUME;
        audio.play().catch(() => {});
      }
      document.removeEventListener('click', unlock);
      document.removeEventListener('touchstart', unlock);
      document.removeEventListener('keydown', unlock);
    };
    document.addEventListener('click', unlock, { once: true });
    document.addEventListener('touchstart', unlock, { once: true });
    document.addEventListener('keydown', unlock, { once: true });
    return () => {
      document.removeEventListener('click', unlock);
      document.removeEventListener('touchstart', unlock);
      document.removeEventListener('keydown', unlock);
    };
  }, [audioMuted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = VOLUME;
    if (audioMuted) {
      audio.pause();
    } else if (audioUnlockedRef.current) {
      audio.play().catch(() => {});
    }
  }, [audioMuted]);

  const handleAudioToggle = () => {
    const nextMuted = !audioMuted;
    setAudioMuted(nextMuted);
    if (!nextMuted) {
      audioUnlockedRef.current = true;
      const audio = audioRef.current;
      if (audio) {
        audio.volume = VOLUME;
        audio.play().catch(() => {});
      }
    }
  };

  return (
    <div className="background" ref={glowRef}>
      <div className="background__layer">
        {/* Video or static image */}
        {videoEnabled && !videoError ? (
          <video
            className="background__video"
            src={config.assets.backgroundVideo}
            autoPlay
            muted
            loop
            playsInline
            onError={() => setVideoError(true)}
          />
        ) : (
          <div
            className="background__image"
            style={{
              backgroundImage: `url(${config.assets.backgroundImage})`,
              backgroundColor: 'var(--color-bg)',
            }}
          />
        )}

        {/* Gradient overlay */}
        <div className="background__gradient" />

        {/* Floating particles */}
        <div className="background__particles" aria-hidden>
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="background__particle" style={{ '--i': i } as React.CSSProperties} />
          ))}
        </div>

        {/* Mouse glow overlay */}
        <div className="background__glow" aria-hidden />
      </div>

      {/* Background music (hidden) */}
      <audio ref={audioRef} src={backgroundMusic} loop preload="auto" />

      {/* Control buttons - portal to body so they're above all content */}
      {typeof document !== 'undefined' &&
        createPortal(
          <div className="background__controls">
            <button
              type="button"
              className="background__control"
              onClick={() => setVideoEnabled((v) => !v)}
              title={videoEnabled ? 'Switch to image' : 'Switch to video'}
              aria-label={videoEnabled ? 'Switch to image' : 'Switch to video'}
            >
              <img src={backgroundIcon} alt="" width={20} height={20} className="background__control-icon" />
            </button>
            <button
              type="button"
              className="background__control"
              onClick={handleAudioToggle}
              title={audioMuted ? 'Unmute music' : 'Mute music'}
              aria-label={audioMuted ? 'Unmute music' : 'Mute music'}
            >
              {audioMuted ? '🔇' : '🔊'}
            </button>
          </div>,
          document.body
        )}
    </div>
  );
}
