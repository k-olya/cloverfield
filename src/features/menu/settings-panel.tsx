import { useState, ReactNode } from "react";
import { useSelector, useDispatch } from "app/store";
import { setPaused } from "../game/slice";
import { Settings } from "./settings";
import { Score } from "../game/score";
import { initializeAudio, playAudio, muteAudio, unmuteAudio } from "../audio/slice";

interface SettingsPanelProps {
  children: ReactNode;
}

export function SettingsPanel({ children }: SettingsPanelProps) {
  const dispatch = useDispatch();
  const { gameState } = useSelector((s) => s.haystack);
  const isMuted = useSelector((s) => s.audio.muted);
  const audioInitialized = useSelector((s) => s.audio.initialized);
  const [showSettings, setShowSettings] = useState(false);

  const isPlaying = gameState === "playing";
  const isPaused = gameState === "paused";
  const showPauseControls = isPlaying || isPaused;

  const handlePauseClick = () => {
    if (isPlaying) {
      dispatch(setPaused(true));
      setShowSettings(true);
    } else if (isPaused) {
      dispatch(setPaused(false));
      setShowSettings(false);
    }
  };

  const handleMuteClick = async () => {
    if (!audioInitialized) {
      await dispatch(initializeAudio());
      await dispatch(playAudio());
    } else {
      if (isMuted) {
        dispatch(unmuteAudio());
      } else {
        dispatch(muteAudio());
      }
    }
  };

  if (showSettings) {
    return <Settings onClose={() => setShowSettings(false)} isPaused={isPaused} />;
  }

  return (
    <>
      { ["playing", "paused", "initial"].includes(gameState) ? <div className="fixed top-0 left-0 right-0 w-full px-2 flex items-center justify-between">
        <div className="scale-75 origin-left">
          <Score />
        </div>
        <div className="flex gap-1.5">
          <button
            onClick={handleMuteClick}
            className="w-6 h-6 flex items-center justify-center rounded bg-gray-800/80 hover:bg-gray-700/80"
          >
            <img 
              src={isMuted ? "emoji/emoji_u1f507.svg" : "emoji/emoji_u1f3b5.svg"} 
              alt={isMuted ? "Unmute" : "Mute"}
              className="w-4 h-4"
            />
          </button>
          {showPauseControls ? (
            <button
              onClick={handlePauseClick}
              className="w-6 h-6 flex items-center justify-center rounded bg-gray-800/80 hover:bg-gray-700/80"
            >
              <img 
                src={isPlaying ? "emoji/emoji_u23f8.svg" : "emoji/emoji_u25b6.svg"}
                alt={isPlaying ? "Pause" : "Play"}
                className="w-4 h-4"
              />
            </button>
          ) : (
            <button
              onClick={() => setShowSettings(true)}
              className="w-6 h-6 flex items-center justify-center rounded bg-gray-800/80 hover:bg-gray-700/80"
            >
              <img 
                src="emoji/emoji_u2699.svg" 
                alt="Settings"
                className="w-4 h-4"
              />
            </button>
          )}
        </div>
      </div> : <></> }
      {children}
    </>
  );
} 