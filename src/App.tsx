import { useSelector } from "app/store";
import { Game } from "./features/game";
import { Menu } from "./features/menu";
import { SettingsPanel } from "./features/menu/settings-panel";
import { Preloader } from "features/menu/preloader";
import { VisibilityHandler } from "./features/visibility/visibility-handler";
import { DisableContextMenu } from "./features/menu/disable-context-menu";

export default function App() {
  const { gameState } = useSelector((s) => s.haystack);
  const showMenu = gameState === "initial";

  return (<>
    <DisableContextMenu />
    <Preloader>
      <VisibilityHandler />
      <div className="w-screen h-screen flex flex-col items-center justify-center text-white">
        <SettingsPanel>
          {showMenu ? <Menu /> : <Game />}
        </SettingsPanel>
      </div>
    </Preloader>
    </>
  );
}
