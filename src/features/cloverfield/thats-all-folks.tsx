import { useSelector, useDispatch } from "app/hooks"
import { reset } from "./slice"

import { BiReset } from "react-icons/bi"

export const ThatsAllFolks = () => {
  const dispatch = useDispatch();
  const { gameState, count } = useSelector(s => s.cloverfield);
  if (gameState !== 'finished')
    return null;
  return <div className="fixed w-screen h-screen p-5 flex items-center justify-center cursor-default">
  <div className="border-x-4 border-y-4 border-white rounded-xl bg-special-green w-max-full flex items-center justify-centerx-full h-max-full py-5 px-4 flex items-center justify-center flex-col">
  <div className="text-5xl mb-4">
  Game Over!
  </div>
  <div className="text-2xl mb-6">
    You scored <span className="text-2xl">{count}</span> point{count !== 1 && "s"}
  </div>
  <button className="border-2 border-white bg-special-green-2 w-16 h-16 p-4 rounded-lg transform hover:scale-110 transition-transform" onClick={() => dispatch(reset())}><BiReset className="w-full h-full" /></button>
  </div>
  </div>
}
