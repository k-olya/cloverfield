import { FC, MouseEvent } from "react";

interface Props {
  x: number;
  y: number;
  w: number;
  h: number;
  onClick: (e: MouseEvent) => void;
}

export const Clover: FC<Props> = ({ x, y, w, h, onClick }) => (
  <image
    transform-origin={`${x + w / 2} ${y + w / 2}`}
    className="hover:scale-110 active:scale-100 transition-transform"
    x={x}
    y={y}
    width={w}
    height={h}
    href="emoji_u1f340.svg"
    onClick={onClick}
  />
);
