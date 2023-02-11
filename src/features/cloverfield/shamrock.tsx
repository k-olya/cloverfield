import { FC } from "react";

interface Props {
  w: number;
  h: number;
  x: number;
  y: number;
}

export const Shamrock: FC<Props> = ({ w, h, x, y }) => (
  <>
    <mask id="shamrock_mask">
      <rect x="0" y="0" width="256" height="256" fill="#fff" />
      <rect x={x} y={y} width={w} height={h} fill="#000" />
    </mask>
    <pattern
      id="shamrock"
      viewBox="0,0,128,128"
      width={`${Math.round(10000 / (256 / w)) * 0.01}%`}
      height={`${Math.round(10000 / (256 / h)) * 0.01}%`}
    >
      <image x={0} y={0} width={128} height={128} href="emoji_u2618.svg" />
    </pattern>
  </>
);
