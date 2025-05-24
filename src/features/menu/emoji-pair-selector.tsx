import { useSelector, useDispatch } from "app/store";
import { setActivePairId, getActivePair } from "../game/slice";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";
import { useTranslation } from "react-i18next";

export function EmojiPairSelector() {
  const dispatch = useDispatch();
  const { levels, activePairId } = useSelector((s) => s.haystack);
  const { gold, purchasedPairIds } = useSelector((s) => s.save);
  const activePair = useSelector((s) => getActivePair(s.haystack));
  const { t } = useTranslation();

  return (<>
    <OverlayScrollbarsComponent
      className="flex-1 p-2 sm:p-6 pt-2 sm:pt-2"
      options={{
        scrollbars: {
          visibility: "auto",
          autoHide: "scroll",
          autoHideDelay: 1300,
          dragScroll: true,
          clickScroll: true,
          theme: "os-theme-dark"
        }
      }}
    >
      <div className="flex flex-col gap-6">
        {levels.map((levelSet) => (
          <div key={levelSet.name}>
            <div className="text-xl font-bold mb-2">{t(levelSet.name)}</div>
            <div className="flex flex-col gap-2">
              {levelSet.levels.map((pair) => {
                const isPurchased = purchasedPairIds.includes(pair.id);
                const canAfford = gold >= pair.price;
                const isActive = activePairId === pair.id;

                return (
                  <button
                    key={pair.id}
                    onClick={() => dispatch(setActivePairId(pair.id))}
                    className={`px-4 py-2 rounded ${
                      isActive
                        ? "bg-special-green text-white"
                        : "bg-gray-700 hover:bg-gray-600"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src={pair.needle} alt="" className="w-6 h-6" />
                        <img src={pair.hay} alt="" className="w-6 h-6" />
                        <span className="text-left">{t(pair.name)}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        {!isPurchased && (
                          <div className="flex items-center gap-1">
                            <img src="emoji/emoji_u1fa99.svg" alt="Price" className="w-4 h-4" />
                            <span className={canAfford ? "text-special-green" : "text-red-400"}>
                              {pair.price}
                            </span>
                          </div>
                        )}
                        <span className="opacity-50 ml-1">
                          {Math.round(pair.difficulty * 100)}%
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </OverlayScrollbarsComponent>
  </>);
} 