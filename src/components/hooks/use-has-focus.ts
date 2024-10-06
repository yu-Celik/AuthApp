"use client";
import { useEffect, useState } from "react";

/** Hooks that determine if the application is in focus or not */
export const useHasFocus = (): boolean => {
  const [focus, setFocus] = useState<boolean>(document.hasFocus());

  useEffect(() => {
    const onFocus = () => setFocus(true);
    const onBlur = () => setFocus(false);

    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);

    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
    };
  }, []);

  return focus;
};
