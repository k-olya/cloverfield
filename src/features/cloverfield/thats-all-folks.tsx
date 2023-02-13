import { useState, useEffect } from "react";
import c from "classnames";
import { useSelector, useDispatch } from "app/hooks";
import { reset, MAX_SCORE } from "./slice";

import { BiReset } from "react-icons/bi";

export const AWESOME_THRESHOLD = 90 * 1000

export const ThatsAllFolks = () => {
  const dispatch = useDispatch();
  const { gameState, count, modifiers, finish, start } = useSelector((s) => s.cloverfield);
  const [showPoints, setShowPoints] = useState<number | null>(null);
  useEffect(() => {
    if (gameState === "finished" && showPoints === null) setShowPoints(count);
    if (gameState !== "finished" && showPoints !== null)
      setTimeout(() => setShowPoints(null), 300);
  }, [gameState, count, showPoints, setShowPoints]);
  if (showPoints === null) return null;
  const speedrun = modifiers.includes("speedrun");
  const finished = showPoints >= MAX_SCORE + 1;
  const speedrunTime = (finish || 0) - (start || 0); 
  const awesome = speedrunTime > 0 && speedrunTime <= AWESOME_THRESHOLD;
  return (
    <div className="fixed w-screen h-screen p-5 flex items-center justify-center cursor-default">
      <div
        className={c(
          "text-center border-x-4 border-y-4 border-white rounded-xl bg-special-green w-max-full flex items-center justify-centerx-full h-max-full py-5 px-4 flex items-center justify-center flex-col shadow-lg",
          {
            "bounce-in-opacity": gameState === "finished",
            "bounce-out-opacity": gameState !== "finished",
          }
        )}
      >
        <div className="text-5xl">{speedrun && finished ? "Speedrun Finished!" :"Game Over!"}</div>
          <div className="text-2xl mt-4">
            You scored <span className="text-2xl">{showPoints}</span> point
            {showPoints !== 1 && "s"}
          </div>
        {!speedrun && showPoints <= MAX_SCORE / 4 && !modifiers.includes("reduced-motion") && (
          <div className="text-2xl mt-4">
            Try{" "}
            <a
              href="?modifiers=reduced-motion"
              className="text-2xl underline text-white hover:text-white active:text-white visited:text-white"
            >
              reduced motion mode
            </a>
          </div>
        )}
        {!speedrun && finished && (
          <div className="text-2xl mt-4">
            Try{" "}
            <a
              href="?modifiers=speedrun"
              className="text-2xl underline text-white hover:text-white active:text-white visited:text-white"
            >
              speedrun mode
            </a>
          </div>
        )}
        {speedrun && !finished && (
          <div className="text-2xl mt-4">
            Practice with{" "}
            <a
              href="?modifiers=headstart"
              className="text-2xl underline text-white hover:text-white active:text-white visited:text-white"
            >
              headstart mode
            </a>
          </div>
        )}
        {speedrun && finished && !awesome && (
          <div className="text-2xl mt-4">
            Try{" "}
            <a
              href="?modifiers=headstart,speedrun"
              className="text-2xl underline text-white hover:text-white active:text-white visited:text-white"
            >
              headstart speedruns
            </a>
          </div>
        )}
        {speedrun && finished && awesome && (
          <div className="text-2xl mt-4">
            You're very good!
          </div>)}
        {speedrun && finished && awesome && (
          <div className="text-2xl mt-4">
            Have fun with{" "}
            <a
              href="?modifiers=headstart,mask,speedrun"
              className="text-2xl underline text-white hover:text-white active:text-white visited:text-white"
            >
              the <span className="inline-block transform -scale-x-100">👺</span> secret mode
            </a>
          </div>
        )}

        <button
          className="mt-6 border-2 border-white bg-special-green-2 w-16 h-16 p-4 rounded-lg transform hover:scale-110 active:scale-100 transition-transform shadow"
          onClick={() => dispatch(reset())}
        >
          <BiReset
            className={c("w-full h-full transform transition-transform", {
              "-rotate-180": gameState !== "finished",
            })}
          />
        </button>
      </div>
    </div>
  );
};
