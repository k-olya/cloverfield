import { useSelector } from "app/store";
import { getActivePair } from "../game/slice";

export function MenuBackground() {
  const activePair = useSelector((s) => getActivePair(s.haystack));

  return (
    <svg
      className="fixed top-0 left-0 w-screen h-screen -z-10"
      viewBox="0 0 32 32"
      style={{
        // transform: "rotate(45deg)",
        transformOrigin: "center"
      }}
    ><defs>
        <pattern
          id="menu_background"
          viewBox="0,0,128,128"
          width="10%"
          height="10%"
        >
          <image
            x={0}
            y={0}
            width={32}
            height={32}
            href={activePair.needle}
          />
          <image
            x={64}
            y={64}
            width={32}
            height={32}
            href={activePair.hay}
          />
        </pattern>
    </defs>
    <rect
        x="-32"
        y="-32"
        width="128"
        height="128"
        fill="url(#menu_background)"
        className="animate-float"
        style={{transformOrigin: "center"}}
      />
    </svg>
  );
} 