import { useEffect, useRef, useState } from "react";
import { EMOJI_PAIRS } from "../../config/emoji-pairs";
import { useTranslation } from "react-i18next";

const EXTRA_IMAGES = [
  "emoji/emoji_u2714.svg", // check mark
  "emoji/emoji_u274c.svg", // cross mark
  "emoji/emoji_u26a1.svg", // lightning
  "emoji/emoji_u1f680.svg", // rocket
  "emoji/emoji_u1f507.svg", // mute
  "emoji/emoji_u1f3b5.svg", // music note
  "emoji/emoji_u23f8.svg", // pause
  "emoji/emoji_u25b6.svg", // play
  "emoji/emoji_u2699.svg", // settings gear
  "emoji/emoji_u1f3ac.svg" // movie emoji
];

function getAllImagePaths() {
  const set = new Set<string>();
  for (const pair of EMOJI_PAIRS) {
    set.add(pair.needle);
    set.add(pair.hay);
  }
  for (const img of EXTRA_IMAGES) set.add(img);
  return Array.from(set);
}

export function Preloader({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const images = getAllImagePaths();
    let loaded = 0;
    if (images.length === 0) {
      setDone(true);
      return;
    }
    images.forEach((src) => {
      const img = new window.Image();
      img.onload = img.onerror = () => {
        loaded++;
        setProgress(Math.round((loaded / images.length) * 100));
        if (loaded === images.length) setDone(true);
      };
      img.src = src;
    });
  }, []);

  // call ygames ready()
  const init = useRef(false);
  useEffect(() => {
    // @ts-ignore
    if (!init.current && done && window.ysdk) {
      init.current = true;
      // @ts-ignore
      window.ysdk.features.LoadingAPI.ready();
    }
  }, [init.current, done]);


  if (!done) {
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-800 text-white">
        <div className="text-2xl mb-4">{t("Loading images...")}</div>
        <div className="w-64 h-4 bg-gray-700 rounded overflow-hidden mb-2">
          <div
            className="bg-special-green h-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-lg">{progress}%</div>
      </div>
    );
  }
  return <>{children}</>;
} 