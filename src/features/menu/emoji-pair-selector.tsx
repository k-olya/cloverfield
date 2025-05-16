import { useSelector, useDispatch } from "app/store";
import { setActivePairId, getActivePair } from "../game/slice";

export function EmojiPairSelector() {
  const dispatch = useDispatch();
  const { levels, activePairId } = useSelector((s) => s.haystack);
  const activePair = useSelector((s) => getActivePair(s.haystack));

  return (
    <div className="flex-1 overflow-y-auto p-6 pt-4">
      <div className="flex flex-col gap-6">
        {levels.map((levelSet) => (
          <div key={levelSet.name}>
            <div className="text-xl font-bold mb-2">{levelSet.name}</div>
            <div className="flex flex-col gap-2">
              {levelSet.levels.map((pair) => (
                <button
                  key={pair.id}
                  onClick={() => dispatch(setActivePairId(pair.id))}
                  className={`px-4 py-2 rounded ${
                    activePairId === pair.id
                      ? "bg-special-green text-white"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <img src={pair.needle} alt="" className="w-6 h-6" />
                    <img src={pair.hay} alt="" className="w-6 h-6" />
                    <span>{pair.name}</span>
                    <span className="text-sm opacity-50">
                      {Math.round(pair.difficulty * 100)}%
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 