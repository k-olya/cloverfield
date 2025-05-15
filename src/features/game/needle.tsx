import { FC, MouseEvent, useRef } from "react";
import c from "classnames";
import { isTouch } from "app/touch";
import { NeedlePortal } from "./needle-portal";
import { useSelector } from "app/store";

interface Props {
  x: number;
  y: number;
  w: number;
  h: number;
  showPortal?: boolean;
  reducedMotion?: boolean;
  onClick: (e: MouseEvent) => void;
}

export const Needle: FC<Props> = ({ x, y, w, h, showPortal, reducedMotion, onClick }) => {
  const ref = useRef<SVGImageElement>(null);
  const { activePair, emojiPairs } = useSelector(state => state.haystack);
  let bounds: DOMRect = new DOMRect();
  if (ref.current) {
    bounds = ref.current.getBoundingClientRect();
  }

  return (
  <><image
    ref={ref}
    transform-origin={`${x + w / 2} ${y + w / 2}`}
    className={c({"hover:scale-110 active:scale-100 transition-transform": !reducedMotion && !isTouch()})}
    x={x}
    y={y}
    width={w}
    height={h}
    href={emojiPairs[activePair].needle}
    onClick={onClick}
  />
 {!!showPortal && <NeedlePortal x={bounds.x} y={bounds.y} w={bounds.width} h={bounds.height} />}
  </>
);
}
