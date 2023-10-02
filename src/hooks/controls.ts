import { useEffect, useState } from "react";

export function useSpaceKey(): boolean {
  const [space, setSpace] = useState(false);

  useEffect(() => {
    const keyDownListener = (e: KeyboardEvent) => {
      if (e.key === " " && !e.repeat) {
        setSpace(true);
      }
    };

    const keyUpListener = (e: KeyboardEvent) => {
      if (e.key === " " && !e.repeat) {
        setSpace(false);
      }
    };

    document.body.addEventListener("keydown", keyDownListener);
    document.body.addEventListener("keyup", keyUpListener);

    return () => {
      document.body.removeEventListener("keydown", keyDownListener);
      document.body.removeEventListener("keyup", keyUpListener);
    };
  }, []);

  return space;
}

export function useArrowKeys(): [boolean, boolean, boolean, boolean] {
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(false);
  const [up, setUp] = useState(false);
  const [down, setDown] = useState(false);

  useEffect(() => {
    const keyDownListener = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && !e.repeat) {
        setLeft(true);
      }
      if (e.key === "ArrowRight" && !e.repeat) {
        setRight(true);
      }
      if (e.key === "ArrowUp" && !e.repeat) {
        setUp(true);
      }
      if (e.key === "ArrowDown" && !e.repeat) {
        setDown(true);
      }
    };

    const keyUpListener = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && !e.repeat) {
        setLeft(false);
      }
      if (e.key === "ArrowRight" && !e.repeat) {
        setRight(false);
      }
      if (e.key === "ArrowUp" && !e.repeat) {
        setUp(false);
      }
      if (e.key === "ArrowDown" && !e.repeat) {
        setDown(false);
      }
    };

    document.body.addEventListener("keydown", keyDownListener);
    document.body.addEventListener("keyup", keyUpListener);

    return () => {
      document.body.removeEventListener("keydown", keyDownListener);
      document.body.removeEventListener("keyup", keyUpListener);
    };
  }, []);

  return [left, right, up, down];
}
