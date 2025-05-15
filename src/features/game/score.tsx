import { useSelector } from "app/store";
import { MSCounter } from "./ms-counter";
import { MAX_SCORE } from "./slice";

const ScoreText = () => {
  const { count, gameState, modifiers } = useSelector((x) => x.haystack);
  if (gameState === "finished") return null;
  return count ? (
    <span className="text-xl">
      Score:{" "}
      <span className="text-2xl">
        {count}
        {modifiers.includes("speedrun") ? `/${MAX_SCORE + 1}` : ""}
      </span>
    </span>
  ) : (
    <span className="text-xl">Find {modifiers.includes("mask") ? <span className="inline-block transform -scale-x-100">👺</span> : "🍀"}</span>
  );
};

const TimeText = () => {
  const { start, finish, modifiers } = useSelector((x) => x.haystack);
  if (!modifiers.includes("speedrun") || typeof start !== "number") return null;
  return <MSCounter start={start} finish={finish} />;
};

export const Score = () => (
  <div className="text-2xl flex justify-between items-center mt-2 portrait:mb-2 mx-4 w-full">
    &nbsp;
    <ScoreText />
    <TimeText />
    &nbsp;
  </div>
);
