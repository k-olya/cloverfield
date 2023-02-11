import { useState, useEffect } from "react";
import c from "classnames";
import { useSelector, useDispatch } from "app/hooks";
import { reset } from "./slice";

import { BiReset } from "react-icons/bi";

export const ThatsAllFolks = () => {
  const dispatch = useDispatch();
  const { gameState, count } = useSelector((s) => s.cloverfield);
  const [showPoints, setShowPoints] = useState<number | null>(null);
  useEffect(() => {
    if (gameState === "finished" && showPoints === null) setShowPoints(count);
    if (gameState !== "finished" && showPoints !== null)
      setTimeout(() => setShowPoints(null), 300);
  }, [gameState, count, showPoints, setShowPoints]);
  if (showPoints === null) return null;
  return (
    <div className="fixed w-screen h-screen p-5 flex items-center justify-center cursor-default">
      <div
        className={c(
          "border-x-4 border-y-4 border-white rounded-xl bg-special-green w-max-full flex items-center justify-centerx-full h-max-full py-5 px-4 flex items-center justify-center flex-col shadow-lg",
          {
            "bounce-in-opacity": gameState === "finished",
            "bounce-out-opacity": gameState !== "finished",
          }
        )}
      >
        <div className="text-5xl mb-4">Game Over!</div>
        <div className="text-2xl mb-6">
          You scored <span className="text-2xl">{showPoints}</span> point
          {showPoints !== 1 && "s"}
        </div>
        <button
          className="border-2 border-white bg-special-green-2 w-16 h-16 p-4 rounded-lg transform hover:scale-110 active:scale-100 transition-transform shadow"
          onClick={() => dispatch(reset())}
        >
          <BiReset className="w-full h-full" />
        </button>
      </div>
    </div>
  );
};
