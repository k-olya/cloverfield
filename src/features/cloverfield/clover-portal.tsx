import { FC, useState } from "react";
import { createPortal } from "react-dom";
import c from "classnames";

interface Props {
  x: number;
  y: number;
  w: number;
  h: number;
  picture: "clover" | "mask";
}

export const CloverPortal: FC<Props> = ({ x, y, w, h, picture }) => {
  const [hide, setHide] = useState(false);
  return createPortal(
  <img
    alt="hint"
    className={c("fixed rounded-full bg-white cursor-pointer transform transition-all", { "opacity-0 scale-0": hide })}
    onClick={() => setHide(true)}
    style={{
      top: y,
      left: x,
      width: w,
      height: h,
      filter: "drop-shadow(0px 0px 25px #ffffff)"
    }}
    src={picture === "mask" ? "emoji_u1f47a.svg" : "emoji_u1f340.svg"}
  />, window.document.body);
}
