import { useSelector } from "../../app/hooks";

export const Score = () => {
  const { count } = useSelector((x) => x.cloverfield);
  return count ? <div className="text-xl mt-2 mx-4">Score: <span className="text-2xl">{count}</span></div> : 
  <div className="text-xl mt-2 mx-4">Find 🍀</div>;
};
