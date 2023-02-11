import { useState } from "react";

import { useSelector, useDispatch } from "app/hooks";
import { range } from "app/math";
import { increment } from "./slice";

import { Gradient } from "./gradient";
import { ThatsAllFolks } from "./thats-all-folks";
import { TicksConsumer } from "./ticks-consumer";
import { Graphics } from "./graphics";

export function Cloverfield() {
  const { w, h, x, y } = useSelector((x) => x.cloverfield);
  const dispatch = useDispatch();

  return <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-15 -3 286 276"
      className="landscape:h-full"
      role="img"
      aria-label="cloverfield"
    >
      <defs>
        <Gradient id="gradient" />
      </defs>
      <TicksConsumer />
      {range(w).map((i) =>
        range(h).map((j) => (
          <Graphics
            key={`${i}-${j}`}
            x={(i * 256) / w}
            y={(j * 256) / h}
            w={256 / w}
            h={256 / h}
            picture={i === x && j === y ? "clover" : "shamrock"}
            onClick={() => i === x && j === y && dispatch(increment())}
          />
        ))
      )}
    </svg>;
}
