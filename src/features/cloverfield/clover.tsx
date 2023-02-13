import { FC, MouseEvent, useRef } from "react";
import c from "classnames";
import { CloverPortal } from "./clover-portal";

interface Props {
  x: number;
  y: number;
  w: number;
  h: number;
  picture: "clover" | "mask";
  showPortal?: boolean;
  reducedMotion?: boolean;
  onClick: (e: MouseEvent) => void;
}

export const Clover: FC<Props> = ({ x, y, w, h, picture, showPortal, reducedMotion, onClick }) => {
  const ref = useRef<SVGImageElement>(null);
  let bounds: DOMRect = new DOMRect();
  if (ref.current) {
    bounds = ref.current.getBoundingClientRect();
  }

  return (
  <><image
    ref={ref}
    transform-origin={`${x + w / 2} ${y + w / 2}`}
    className={c({"landscape:hover:scale-110 landscape:active:scale-100 transition-transform": !reducedMotion})}
    x={x}
    y={y}
    width={w}
    height={h}
    href={picture === "mask" ? "emoji_u1f47a.svg" : "emoji_u1f340.svg"}
    onClick={onClick}
  />
 {!!showPortal && <CloverPortal picture={picture} x={bounds.x} y={bounds.y} w={bounds.width} h={bounds.height} />}
  </>
);
}
