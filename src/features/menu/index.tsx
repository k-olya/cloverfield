import { useState } from "react";
import { useSelector, useDispatch } from "app/store";
import { setModifiers, Modifier, increment } from "../game/slice";
import { Settings } from "./settings";
import { MenuBackground } from "./background";
import { EmojiPairSelector } from "./emoji-pair-selector";

export function Menu() {
  const dispatch = useDispatch();
  const { modifiers } = useSelector((s) => s.haystack);
  const [showSettings, setShowSettings] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

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
      <div className="fixed top-4 right-4 flex gap-2">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="w-10 h-10 flex items-center justify-center rounded bg-gray-800 hover:bg-gray-700"
        >
          <img 
            src={isMuted ? "emoji/emoji_u1f507.svg" : "emoji/emoji_u1f3b5.svg"} 
            alt={isMuted ? "Unmute" : "Mute"}
            className="w-6 h-6"
          />
        </button>
        <button
          onClick={() => setShowSettings(true)}
          className="w-10 h-10 flex items-center justify-center rounded bg-gray-800 hover:bg-gray-700"
        >
          <img 
            src="emoji/emoji_u2699.svg" 
            alt="Settings"
            className="w-6 h-6"
          />
        </button>
      </div>
      <div className="flex flex-col bg-gray-800 rounded-lg shadow-lg max-w-md w-full mx-4 max-h-[100dvh] md:max-h-[70vh]">
        <div className="p-6 pb-0">
          <h1 className="text-3xl font-bold text-center mb-4">Find emoji</h1>
        </div>

        <EmojiPairSelector />

        <div className="relative px-6 pb-6 bg-gray-800 rounded-b-lg">
      <div className="h-10 absolute -top-10 left-0 right-0 bg-gradient-to-t from-gray-800 to-gray-800/0 pointer-events-none"></div>
      <div className="border-t border-gray-700 -mx-6 mb-6"></div>
          <div className="text-base font-medium mb-2">Game Modifiers</div>
          <div className="flex gap-2">
            <button
              onClick={() => toggleModifier("speedrun")}
              className={`flex-1 px-4 py-2 rounded flex items-center justify-center gap-2 ${
                modifiers.includes("speedrun")
                  ? "bg-special-green text-white"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              <img src="emoji/emoji_u26a1.svg" alt="" className="w-6 h-6" />
              Speedrun
            </button>
            <button
              onClick={() => toggleModifier("headstart")}
              className={`flex-1 px-4 py-2 rounded flex items-center justify-center gap-2 ${
                modifiers.includes("headstart")
                  ? "bg-special-green text-white"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              <img src="emoji/emoji_u1f680.svg" alt="" className="w-6 h-6" />
              Headstart
            </button>
          </div>

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