import { FC, useState } from "react";
import { createPortal } from "react-dom";
import c from "classnames";
import { useSelector } from "app/store";

interface Props {
  x: number;
  y: number;
  w: number;
  h: number;
}

export const NeedlePortal: FC<Props> = ({ x, y, w, h }) => {
  const [hide, setHide] = useState(false);
  const { activePair, emojiPairs } = useSelector(state => state.haystack);
  
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
    src={emojiPairs[activePair].needle}
  />, window.document.body);
}
