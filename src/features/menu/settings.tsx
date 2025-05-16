import { useState } from "react";
import { useSelector, useDispatch } from "app/store";
import { setModifiers, Modifier } from "../game/slice";

interface SettingsProps {
  onClose: () => void;
}

export function Settings({ onClose }: SettingsProps) {
  const dispatch = useDispatch();
  const { modifiers } = useSelector((s) => s.haystack);
  const [volume, setVolume] = useState(50);

  const toggleReducedMotion = () => {
    const newModifiers = modifiers.includes("reduced-motion")
      ? modifiers.filter((m) => m !== "reduced-motion")
      : [...modifiers, "reduced-motion" as Modifier];
    dispatch(setModifiers(newModifiers));
  };

  return (
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
            className={`px-4 py-2 rounded ${
              modifiers.includes("reduced-motion")
                ? "bg-special-green text-white"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            {modifiers.includes("reduced-motion") ? "On" : "Off"}
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <span>Music Volume</span>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-right text-sm text-gray-400">
            {volume}%
          </div>
        </div>
      </div>
    </div>
  );
} 