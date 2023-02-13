import { Cloverfield } from "./features/cloverfield";
import { Score } from "./features/cloverfield/score";
import { ModeSwitcher } from "./features/cloverfield/mode-switcher";
import { ThatsAllFolks } from "./features/cloverfield/thats-all-folks";

const App = () => (
  <div className="bg-gray-700 text-white w-full h-screen flex flex-col justify-center items-center cursor-pointer">
    <ModeSwitcher />
    <Score />
    <Cloverfield />
    <ThatsAllFolks />
  </div>
);

export default App;
