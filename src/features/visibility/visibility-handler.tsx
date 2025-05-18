import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'app/store';
import { setPaused } from '../game/slice';
import { muteAudio, unmuteAudio } from '../audio/slice';

export function VisibilityHandler() {
  const dispatch = useDispatch();
  const { gameState } = useSelector((s) => s.haystack);
  const { muted } = useSelector((s) => s.audio);
  const wasPlayingRef = useRef(false);
  const wasMutedRef = useRef(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Store current states before hiding
        wasPlayingRef.current = gameState === 'playing';
        wasMutedRef.current = muted;

        // Pause game and mute audio
        if (gameState === 'playing') {
          dispatch(setPaused(true));
        }
        if (!muted) {
          dispatch(muteAudio());
        }
      } else {
        // When returning to the tab
        // Only unmute if it was muted by the visibility change
        if (!wasMutedRef.current) {
          dispatch(unmuteAudio());
        }
        // Do not unpause the game automatically
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [dispatch, gameState, muted]);

  return null;
} 