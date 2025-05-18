import { useState } from "react";
import { useSelector, useDispatch } from "app/store";
import { setModifiers, Modifier, setPaused, reset } from "../game/slice";
import { VolumeSlider } from "./volume-slider";
import { MenuBackground } from "./background";
import { setAudioVolume } from "../audio/slice";

interface SettingsProps {
  onClose: () => void;
  isPaused?: boolean;
}

export function Settings({ onClose, isPaused }: SettingsProps) {
  const dispatch = useDispatch();
  const { modifiers } = useSelector((s) => s.haystack);
  const volume = useSelector((s) => Math.round(s.audio.volume * 100));

  const toggleReducedMotion = () => {
    const newModifiers = modifiers.includes("reduced-motion")
      ? modifiers.filter((m) => m !== "reduced-motion")
      : [...modifiers, "reduced-motion" as Modifier];
    dispatch(setModifiers(newModifiers));
  };

  const handleContinue = () => {
    dispatch(setPaused(false));
    onClose();
  };

  const handleBackToMenu = () => {
    dispatch(reset());
    onClose();
  };

  const handleVolumeChange = (v: number) => {
    dispatch(setAudioVolume(v / 100));
  };

  return (
    <>
      <MenuBackground />
    <div className="flex flex-col gap-4 bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">Settings</div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span>Reduced Motion</span>
          <button
            onClick={toggleReducedMotion}
            className={`px-4 py-2 rounded flex items-center justify-center ${
              modifiers.includes("reduced-motion")
                ? "bg-special-green text-white"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            <img 
              src={modifiers.includes("reduced-motion") ? "emoji/emoji_u2714.svg" : "emoji/emoji_u274c.svg"} 
              alt={modifiers.includes("reduced-motion") ? "On" : "Off"}
              className="w-5 h-5" 
            />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span>Music Volume</span>
            <span className="text-sm text-gray-400">
              {volume}%
            </span>
          </div>
            <VolumeSlider value={volume} onChange={handleVolumeChange} />
          </div>

          {isPaused && (
            <div className="flex flex-col gap-2 mt-2">
              <button
                onClick={handleContinue}
                className="w-full px-4 py-2 rounded bg-special-green hover:bg-special-green/90 text-white font-bold"
              >
                Continue Game
              </button>
              <button
                onClick={handleBackToMenu}
                className="w-full px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 text-white"
              >
                Back to Main Menu
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
} 