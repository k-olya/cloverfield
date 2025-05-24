import { useSelector } from "app/store";
import { MSCounter } from "./ms-counter";
import { getActivePair, MAX_SCORE } from "./slice";
import { useTranslation } from "react-i18next";

const ScoreText = () => {
  const { count, gameState, modifiers } = useSelector((x) => x.haystack);
  const activePair = useSelector(state => getActivePair(state.haystack));
  const { t } = useTranslation();

  if (["initial", "finished"].includes(gameState)) return null;
  return count ? (
    <span className="">
      {t("Score_short")}:{" "}
      <span className="">
        {count}
        {modifiers.includes("speedrun") ? `/${MAX_SCORE + 1}` : ""}
      </span>
    </span>
  ) : (
    <span className="flex items-center">
      <span>{t("Find")}</span><img src={activePair?.needle} className="w-6 h-6 ml-1" />
    </span>
  );
};

const TimeText = () => {
  const { start, finish, modifiers } = useSelector((x) => x.haystack);
  if (!modifiers.includes("speedrun") || typeof start !== "number") return null;
  return <MSCounter start={start} finish={finish} />;
};

export const Score = () => (
  <div className="flex justify-between items-baseline mt-2 portrait:mb-2 w-full text-sm">
    <ScoreText />
    &nbsp;
    <TimeText />
  </div>
);
