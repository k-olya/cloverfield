import { useState, useEffect } from "react";
import c from "classnames";
import { useSelector, useDispatch } from "app/store";
import { reset, MAX_SCORE, increment, revive } from "./slice";
import { BiReset } from "react-icons/bi";
import { MenuBackground } from "../menu/background";
import { useTranslation } from "react-i18next";
import { MSCounter } from "./ms-counter";

export const AWESOME_THRESHOLD = 90 * 1000

export const ThatsAllFolks = () => {
  const dispatch = useDispatch();
  const { gameState, count, modifiers, finish, start } = useSelector((s) => s.haystack);
  const [showPoints, setShowPoints] = useState<number | null>(null);
  useEffect(() => {
    if (gameState === "finished" && showPoints === null) setShowPoints(count);
    if (gameState !== "finished" && showPoints !== null)
      setTimeout(() => setShowPoints(null), 300);
  }, [gameState, count, showPoints, setShowPoints]);
  const revives = useSelector((s) => s.haystack.revives);
  const { t } = useTranslation();
  if (showPoints === null) return null;
  const speedrun = modifiers.includes("speedrun");
  const finished = showPoints >= MAX_SCORE + 1;
  const speedrunTime = (finish || 0) - (start || 0); 

  return (
    <>
      <div className="fixed w-screen h-screen p-5 flex items-center justify-center cursor-default">
        <div
          className={c(
            "flex flex-col bg-gray-800 rounded-lg shadow-lg max-w-md w-full mx-4 p-6",
            {
              "bounce-in-opacity": gameState === "finished",
              "bounce-out-opacity": gameState !== "finished",
            }
          )}
        >
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">
              {speedrun && finished ? t("Speedrun Finished!") : t("Game Over!")}
            </h1>
            {speedrun && finished ? <div className="text-xl mb-6">
              <span>{t("Time")}:&nbsp;</span><span className="font-bold"><MSCounter start={start} finish={finish} /></span>
            </div> : <div className="text-xl mb-6">
              <span>{t("Score")}:&nbsp;</span><span className="font-bold">{showPoints}</span>
            </div>
            }
          </div>

          <div className="border-t border-gray-700 -mx-6 my-4"></div>
        {!speedrun && revives > 0 ? <button
            className="w-full px-4 py-3 rounded bg-special-green hover:bg-special-green/90 text-white text-lg font-bold transform transition-transform hover:scale-105 flex items-center justify-center gap-2"
            onClick={() => dispatch(revive())}
          >
            <img src="emoji/emoji_u1f3ac.svg" className="w-6 h-6" />
            {t("Revive for an ad")} ({revives})
          </button> : <></>}
          <button
            className="mt-4 w-full px-4 py-3 rounded rounded bg-gray-700 hover:bg-gray-600 text-white text-lg font-bold transform transition-transform hover:scale-105 flex items-center justify-center gap-2"
            onClick={() => dispatch(reset())}
          >
            {t("To the menu")}
          </button>
<button
            className="mt-4 w-full px-4 py-3 rounded bg-gray-700 hover:bg-gray-600 text-white text-lg font-bold transform transition-transform hover:scale-105 flex items-center justify-center gap-2"
            onClick={() => {dispatch(reset()); dispatch(increment()); }}
          >
            <BiReset className="w-6 h-6" />
            {t("Try again")}
          </button>
        </div>
      </div>
    </>
  );
};
