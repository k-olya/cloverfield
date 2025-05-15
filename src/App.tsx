import { Haystack } from "./features/game";
import { Score } from "./features/game/score";
import { ModeSwitcher } from "./features/game/mode-switcher";
import { ThatsAllFolks } from "./features/game/thats-all-folks";

export default function App() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-700 text-white">
      <Score />
      <Haystack />
      <ModeSwitcher />
      <ThatsAllFolks />
    </div>
  );
}
