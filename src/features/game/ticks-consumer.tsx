import { useSelector, useDispatch } from "app/store";
import { clamp } from "app/math";
import { useInterval } from "app/use-interval";

import { WAIT_TICKS, TICK_T, tick } from "./slice";

export const TicksConsumer = () => {
  const { ticks } = useSelector((s) => s.haystack);
  const dispatch = useDispatch();
  useInterval(() => {
    dispatch(tick());
  }, TICK_T);

  return (
    <rect
      x="0"
      y="260"
      width="256"
      transform={`scale(${clamp(ticks / WAIT_TICKS, 0, 1)}, 1)`}
      height="6.5"
      stroke="none"
      fill="url(#gradient)"
    />
  );
};
