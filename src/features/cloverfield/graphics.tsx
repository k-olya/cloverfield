import { FC, MouseEvent } from "react"
import c from "classnames"

interface Props {
  x: number;
  y: number;
  w: number;
  h: number;
  picture: "clover" | "shamrock";
  onClick: (e: MouseEvent) => void;
}

export const Graphics: FC<Props> = ({ x, y, w, h, picture, onClick }) => (
  <image
    transform-origin={`${x + w / 2} ${y + w / 2}`}
    className={c("hover:scale-110 transition-transform", { 'pointer-events-none': picture === "shamrock" })}
    x={x}
    y={y}
    width={w}
    height={h}
    href={picture === "clover" ? "emoji_u1f340.svg" : "emoji_u2618.svg"}
    onClick={onClick}
  />
);
