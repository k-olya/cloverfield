import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "app/store";
import { increment, reset, getActivePair } from "./slice";
import { addGold } from "../save/slice";

import { Gradient } from "./gradient";
import { TicksConsumer } from "./ticks-consumer";
import { Needle } from "./needle";
import { Hay } from "./hay";
import { ThatsAllFolks } from "./thats-all-folks";

export function Haystack() {
  const { w, h, x, y, gameState, modifiers } = useSelector(x => x.haystack);
  const activePair = useSelector(state => getActivePair(state.haystack));
  const reducedMotion = modifiers.includes("reduced-motion");
  const dispatch = useDispatch();
  const ref = useRef(null);

  // commented out bouncy animation because i don't like it anymore
  // useEffect(() => {
  //   if (ref.current && !reducedMotion) {
  //     const sas = ref.current as unknown as SVGElement;
  //     sas.classList.add("bounce-in");
  //     setTimeout(() => sas.classList.remove("bounce-in"), 300);
  //   }
  // }, [w, h, x, y, modifiers, reducedMotion]);

  useEffect(() => {
    //dispatch(reset());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // on-screen coordinates derived from the state
  const _w = 256 / w;
  const _h = 256 / h;
  const _x = x * _w;
  const _y = y * _h;

  const handleNeedleClick = () => {
    // Calculate gold reward based on grid width and difficulty
    const goldReward = Math.ceil((w - 1) * Math.pow(activePair.difficulty, 1) * 2);
    dispatch(addGold(goldReward));
    dispatch(increment());
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-15 -3 286 276"
      className="landscape:h-full origin-top landscape:mt-10"
      role="img"
      aria-label="haystack"
      ref={ref}
    >
      <defs>
        <Gradient id="gradient" />
        <Hay w={_w} h={_h} x={_x} y={_y} />
      </defs>
      <TicksConsumer />
      <rect
        x="0"
        y="0"
        width="256"
        height="256"
        fill="url(#hay)"
        mask="url(#hay_mask)"
      />
      <Needle
        x={_x}
        y={_y}
        w={_w}
        h={_h}
        showPortal={gameState === "finished"}
        reducedMotion={reducedMotion}
        onClick={handleNeedleClick}
      />
    </svg>
  );
}

export function Game() {
  return (
    <>
      <Haystack />
      <ThatsAllFolks />
    </>
  );
}
