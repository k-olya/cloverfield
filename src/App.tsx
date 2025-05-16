import { useSelector } from "app/store";
import { Game } from "./features/game";
import { Menu } from "./features/menu";

export default function App() {
  const { gameState } = useSelector((s) => s.haystack);
  const showMenu = gameState === "initial";

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center text-white">
      {showMenu ? <Menu /> : <Game />}
    </div>
  );
}
