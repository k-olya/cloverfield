import { useState, useEffect } from "react";
import c from "classnames";
import { useSelector, useDispatch } from "app/store";
import { reset, MAX_SCORE, increment, revive, getActivePair, toMenu } from "./slice";
import { BiReset } from "react-icons/bi";
import { MenuBackground } from "../menu/background";
import { useTranslation } from "react-i18next";
import { MSCounter } from "./ms-counter";

export const AWESOME_THRESHOLD = 90 * 1000

export const ThatsAllFolks = () => {
  const dispatch = useDispatch();
  const { gameState, count, modifiers, finish, start, toMenuClicks } = useSelector((s) => s.haystack);
  const activePair = useSelector(state => getActivePair(state.haystack));
  const [showPoints, setShowPoints] = useState<number | null>(null);
  useEffect(() => {
    if (gameState === "finished" && showPoints === null) setShowPoints(count);
    if (gameState !== "finished" && showPoints !== null)
      setTimeout(() => setShowPoints(null), 300);
  }, [gameState, count, showPoints, setShowPoints]);

  // set leaderboard score
  useEffect(() => {
    if (gameState === "finished" && showPoints !== null) {
      // @ts-ignore
      const ysdk = window.ysdk;
      // @ts-ignore
      if (ysdk) {
        // @ts-ignore
        ysdk.isAvailableMethod('leaderboards.getLeaderboardPlayerEntry').then(result => {
          if (result) {
            ysdk.getLeaderboards()
              // @ts-ignore
              .then(lb => {
                // @ts-ignore
                lb.setLeaderboardScore('highscore', Math.ceil(showPoints * activePair.difficulty));
              });
          }
        });
      }
    }
  }, [gameState, showPoints]);

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
            </div> : <><div className="text-xl mb-6">
              <span>{t("Score")}:&nbsp;</span><span className="font-bold">{showPoints}</span>
            </div>
              <div className="text-xl mb-6">
                <span>{t("Adjusted for difficulty")}:&nbsp;</span><span className="font-bold">{Math.ceil(showPoints * activePair.difficulty)}</span><span className="opacity-75">({activePair.difficulty * 100}%)</span>
              </div>
            </>
            }
          </div>

          <div className="border-t border-gray-700 -mx-6 my-4"></div>
          {!speedrun && revives > 0 ? <button
            className="w-full px-4 py-3 rounded bg-special-green hover:bg-special-green/90 text-white text-lg font-bold transform transition-transform hover:scale-105 flex items-center justify-center gap-2"
            onClick={() => {
              // revive the player if they watch an ad
              // @ts-ignore
              if (window.ysdk) {
                // @ts-ignore
                window.ysdk.adv.showRewardedVideo({
                  callbacks: {
                    onOpen: () => {
                      console.log('Video ad open.');
                    },
                    onRewarded: () => {
                      console.log('Rewarded!');
                      dispatch(revive());
                    },
                    onClose: () => {
                      console.log('Video ad closed.');
                    },
                    onError: (e: any) => {
                      console.log('Error while open video ad:', e);
                    }
                  }
                })
              } else {
                dispatch(revive());
              }
            }}
          >
            <img src="emoji/emoji_u1f3ac.svg" className="w-6 h-6" />
            {t("Revive for an ad")} ({revives})
          </button> : <></>}
          <button
            className="mt-4 w-full px-4 py-3 rounded rounded bg-gray-700 hover:bg-gray-600 text-white text-lg font-bold transform transition-transform hover:scale-105 flex items-center justify-center gap-2"
            onClick={() => {
              dispatch(reset());
              dispatch(toMenu());
              // show ad every 3 end-game clicks
              // @ts-ignore
              if (window.ysdk && ((toMenuClicks % 3) === 2)) {
                // @ts-ignore
                window.ysdk.adv.showFullscreenAdv({ callbacks: {} });
              }
            }}
          >
            {t("To the menu")}
          </button>
          <button
            className="mt-4 w-full px-4 py-3 rounded bg-gray-700 hover:bg-gray-600 text-white text-lg font-bold transform transition-transform hover:scale-105 flex items-center justify-center gap-2"
            onClick={() => { dispatch(reset()); dispatch(increment()); }}
          >
            <BiReset className="w-6 h-6" />
            {t("Try again")}
          </button>
        </div>
      </div>
    </>
  );
};
