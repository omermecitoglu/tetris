import { useEffect, useRef } from "react";

export default function useAnimationFrame(callback: (frame : number) => void) {
  const lastTimestamp = useRef(0);
  const frames = useRef(0);
  const animation = useRef(0);

  useEffect(() => {

    const requestCallback = (timestamp: number) => {
      const elapsedTime = timestamp - lastTimestamp.current;
      if (elapsedTime > 1000) {
        lastTimestamp.current = timestamp;
        frames.current = 0;
      } else {
        frames.current++;
      }
      callback(frames.current);
      animation.current = requestAnimationFrame(requestCallback);
    };

    animation.current = requestAnimationFrame(requestCallback);
    return () => {
      if (animation.current) {
        cancelAnimationFrame(animation.current);
      }
    };
  }, [callback]);
}
