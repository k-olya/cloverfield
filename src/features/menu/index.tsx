import { useState } from "react";
import { useSelector, useDispatch } from "app/store";
import { setModifiers, Modifier, increment, reset, getActivePair } from "../game/slice";
import { purchasePair } from "../save/slice";
import { MenuBackground } from "./background";
import { EmojiPairSelector } from "./emoji-pair-selector";
import { useTranslation } from "react-i18next";

export function Menu() {
  const dispatch = useDispatch();
  const { modifiers } = useSelector((s) => s.haystack);
  const activePair = useSelector(state => getActivePair(state.haystack));
  const { gold, purchasedPairIds } = useSelector((s) => s.save);
  const { t } = useTranslation();

  const isPurchased = purchasedPairIds.includes(activePair.id);
  const canAfford = gold >= activePair.price;

  const toggleModifier = (modifier: Modifier) => {
    const newModifiers = modifiers.includes(modifier)
      ? modifiers.filter((m) => m !== modifier)
      : [...modifiers, modifier];
    dispatch(setModifiers(newModifiers));
  };

  const handleMainButtonClick = () => {
    if (isPurchased) {
      dispatch(reset());
      dispatch(increment());
    } else if (canAfford) {
      dispatch(purchasePair({ id: activePair.id, price: activePair.price }));
    }
  };

  return (
    <>
      <MenuBackground /><div className="h-[100dvh] max-h-[100dvh] flex flex-col justify-center items-center pt-[48px] pb-[24px] w-full mx-4">
      <div className="flex flex-col bg-gray-800 rounded-lg shadow-lg max-w-md w-full h-full max-h-[100dvh] md:max-h-[70vh] md:mt-0">
        <div className="p-6 pb-0">
          <h1 className="text-3xl font-bold text-center mb-4">{t("Find emoji")}</h1>
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
            onClick={handleMainButtonClick}
            disabled={!isPurchased && !canAfford}
            className={`mt-4 w-full px-4 py-3 rounded text-lg font-bold transform transition-transform hover:scale-105 flex items-center justify-center gap-2 ${
              isPurchased
                ? "bg-special-green hover:bg-special-green/90 text-white"
                : canAfford
                ? "bg-gray-700 hover:bg-gray-600 text-special-green"
                : "bg-gray-700/30 text-red-400 cursor-not-allowed"
            }`}
          >
            {!isPurchased && (
              <>
                <img src="emoji/emoji_u1fa99.svg" alt="Price" className="w-6 h-6" />
                <span>{activePair.price}</span>
              </>
            )}
            <span>{isPurchased ? t("Start Game") : t("Buy")}</span>
          </button>
        </div>
      </div>

      </div>
    </>
  );
} 