import { useEffect, useRef, useCallback } from 'react';

const DEBOUNCE_MS = 100;

export function useMouseGlow() {
  const glowRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | undefined>(undefined);
  const lastUpdate = useRef(0);

  const handleMove = useCallback((e: MouseEvent) => {
    const now = Date.now();
    if (now - lastUpdate.current < DEBOUNCE_MS) return;
    lastUpdate.current = now;

    rafRef.current = requestAnimationFrame(() => {
      const el = glowRef.current;
      if (!el) return;
      el.style.setProperty('--mouse-x', `${e.clientX}px`);
      el.style.setProperty('--mouse-y', `${e.clientY}px`);
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleMove]);

  return glowRef;
}
