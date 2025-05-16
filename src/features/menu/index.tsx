import { useState } from "react";
import { useSelector, useDispatch } from "app/store";
import { setModifiers, setActivePair, Modifier, increment } from "../game/slice";
import { Settings } from "./settings";
import { MenuBackground } from "./background";

export function Menu() {
  const dispatch = useDispatch();
  const { emojiPairs, modifiers, activePair } = useSelector((s) => s.haystack);
  const [showSettings, setShowSettings] = useState(false);

  const toggleModifier = (modifier: Modifier) => {
    const newModifiers = modifiers.includes(modifier)
      ? modifiers.filter((m) => m !== modifier)
      : [...modifiers, modifier];
    dispatch(setModifiers(newModifiers));
  };

  const startGame = () => {
    dispatch(increment());
  };

  if (showSettings) {
    return (
      <>
        <MenuBackground />
        <Settings onClose={() => setShowSettings(false)} />
      </>
    );
  }

  return (
    <>
      <MenuBackground />
      <div className="flex flex-col bg-gray-800 rounded-lg shadow-lg max-w-md w-full mx-4 max-h-screen">
        <div className="p-6 pb-0">
          <h1 className="text-3xl font-bold text-center mb-4">Clover</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-6 pt-4">
          <div className="text-xl font-bold mb-2">Levels</div>
          <div className="flex flex-col gap-2">
            {emojiPairs.map((pair, index) => (
              <button
                key={pair.name}
                onClick={() => dispatch(setActivePair(index))}
                className={`px-4 py-2 rounded ${
                  activePair === index
                    ? "bg-special-green text-white"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                <div className="flex items-center gap-2">
                  <img src={pair.needle} alt="" className="w-6 h-6" />
                  <span>{pair.name}</span>
                  <span className="text-sm opacity-50">
                    (Difficulty: {Math.round(pair.difficulty * 100)}%)
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-700 bg-gray-800 p-6 rounded-b-lg">
          <div className="text-xl font-bold mb-2">Game Modifiers</div>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => toggleModifier("speedrun")}
              className={`px-4 py-2 rounded ${
                modifiers.includes("speedrun")
                  ? "bg-special-green text-white"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              Speedrun Mode
            </button>
            <button
              onClick={() => toggleModifier("headstart")}
              className={`px-4 py-2 rounded ${
                modifiers.includes("headstart")
                  ? "bg-special-green text-white"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              Headstart Mode
            </button>
          </div>

          <button
            onClick={() => setShowSettings(true)}
            className="mt-4 w-full px-4 py-2 rounded bg-gray-700 hover:bg-gray-600"
          >
            Settings
          </button>

          <button
            onClick={startGame}
            className="mt-4 w-full px-4 py-3 rounded bg-special-green hover:bg-special-green/90 text-white text-lg font-bold transform transition-transform hover:scale-105"
          >
            Start Game
          </button>
        </div>
      </div>
    </>
  );
} 