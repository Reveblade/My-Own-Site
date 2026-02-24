import { useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import './EnterOverlay.css';

export function EnterOverlay() {
  const [exiting, setExiting] = useState(false);

  const handleClick = useCallback(() => {
    setExiting(true);
  }, []);

  return typeof document !== 'undefined'
    ? createPortal(
        <div
          className={`enter-overlay ${exiting ? 'enter-overlay--exiting' : ''}`}
          onClick={handleClick}
          onKeyDown={(e) => e.key === 'Enter' && handleClick()}
          role="button"
          tabIndex={0}
          aria-label="Click to enter"
        >
          <div className="enter-overlay__content">
            <span className="enter-overlay__title">CLICK TO ENTER</span>
            <span className="enter-overlay__handle">@reveblade</span>
          </div>
        </div>,
        document.body
      )
    : null;
}
