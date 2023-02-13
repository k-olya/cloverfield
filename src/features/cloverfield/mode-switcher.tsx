import { useEffect } from "react";
import { useDispatch } from "app/hooks";
import { setModifiers, Modifier, isModifier } from "./slice";

export const ModeSwitcher = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const url = window?.location?.href && new URL(window.location.href);
    const modifiers = ((url && url.searchParams.get("modifiers")) || "").split(
      ","
    );
    dispatch(
      setModifiers(modifiers.filter((f) => isModifier(f)) as Modifier[])
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window?.location?.href]);

  return null;
};
