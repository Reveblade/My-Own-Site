import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useMouseGlow } from '../hooks/useMouseGlow';
import backgroundIcon from '../icons/background-icon.svg';
import arcaneVideo from '../assets/arcane.mp4';
import arcaneMusic from '../assets/arcane.MP3';
import './Background.css';

export function Background() {
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [audioMuted, setAudioMuted] = useState(false);
  const audioUnlockedRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const glowRef = useMouseGlow();
  const VOLUME = 0.05;

  // Unlock audio and video on first user interaction (browsers block autoplay otherwise)
  useEffect(() => {
    const unlock = () => {
      if (audioUnlockedRef.current) return;
      audioUnlockedRef.current = true;
      const audio = audioRef.current;
      if (audio && !audioMuted) {
        audio.volume = VOLUME;
        audio.play().catch(() => {});
      }
      const video = videoRef.current;
      if (video && videoEnabled && !videoError) {
        video.play().catch(() => {});
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
  }, [audioMuted, videoEnabled, videoError]);

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

  // Play/pause video when toggled (only after first user interaction)
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !audioUnlockedRef.current) return;
    if (videoEnabled && !videoError) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [videoEnabled, videoError]);

  const handleVideoToggle = () => {
    setVideoEnabled((v) => !v);
  };

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

  const showVideo = videoEnabled && !videoError;

  return (
    <div className="background" ref={glowRef}>
      <div className={`background__layer ${!showVideo ? 'background__layer--stopped' : ''}`}>
        {/* Video (muted) or black background when stopped */}
        <video
          ref={videoRef}
          className="background__video"
          src={arcaneVideo}
          muted
          loop
          playsInline
          onError={() => setVideoError(true)}
          style={{ opacity: showVideo ? 1 : 0 }}
        />
        <div
          className="background__fallback"
          style={{ opacity: showVideo ? 0 : 1 }}
          aria-hidden
        />

        {/* Black transparent overlay for content visibility */}
        <div className="background__overlay" />

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

      {/* Background music - arcane.MP3 (video stays muted) */}
      <audio ref={audioRef} src={arcaneMusic} loop preload="auto" />

      {/* Control buttons - portal to body so they're above all content */}
      {typeof document !== 'undefined' &&
        createPortal(
          <div className="background__controls">
            <button
              type="button"
              className="background__control"
              onClick={handleVideoToggle}
              title={videoEnabled ? 'Stop video' : 'Play video'}
              aria-label={videoEnabled ? 'Stop video' : 'Play video'}
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
