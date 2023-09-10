import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "app/hooks";
import { increment, reset } from "./slice";

import { Gradient } from "./gradient";
import { TicksConsumer } from "./ticks-consumer";
import { Clover } from "./clover";
import { Shamrock } from "./shamrock";

export function Cloverfield() {
  const { w, h, x, y, gameState, modifiers } = useSelector(x => x.cloverfield);
  const reducedMotion =
    modifiers.includes("speedrun") || modifiers.includes("reduced-motion");
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
    dispatch(reset());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // on-screen coordinates derived from the state
  const _w = 256 / w;
  const _h = 256 / h;
  const _x = x * _w;
  const _y = y * _h;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-15 -3 286 276"
      className="landscape:h-full origin-top"
      role="img"
      aria-label="cloverfield"
      ref={ref}
    >
      <defs>
        <Gradient id="gradient" />
        <Shamrock w={_w} h={_h} x={_x} y={_y} />
      </defs>
      <TicksConsumer />
      <rect
        x="0"
        y="0"
        width="256"
        height="256"
        fill="url(#shamrock)"
        mask="url(#shamrock_mask)"
      />
      <Clover
        x={_x}
        y={_y}
        w={_w}
        h={_h}
        picture={modifiers.includes("mask") ? "mask" : "clover"}
        showPortal={gameState === "finished"}
        reducedMotion={reducedMotion}
        onClick={() => dispatch(increment())}
      />
    </svg>
  );
}
