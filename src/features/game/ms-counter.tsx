import { FC, useRef } from "react";
import { useInterval } from "app/use-interval";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

interface Props {
  start?: number | null;
  finish?: number | null;
}

const DATE_FORMAT = "mm:ss.SSS";

dayjs.extend(utc);

export const MSCounter: FC<Props> = ({ start, finish }) => {
  const ref = useRef<HTMLElement>(null);
  useInterval(() => {
    if (ref.current && typeof start === "number") {
      if (typeof finish !== "number") {
        ref.current.innerText = dayjs
          .utc(Date.now() - start)
          .format(DATE_FORMAT);
      } else {
        const t = dayjs.utc(finish - start).format(DATE_FORMAT);
        if (ref.current.innerText !== t) ref.current.innerText = t;
      }
    }
  }, 8);

  return <span className="font-mono" ref={ref}></span>;
};
