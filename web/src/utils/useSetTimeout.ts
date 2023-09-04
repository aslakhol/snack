import React from "react";

// from https://www.joshwcomeau.com/snippets/react-hooks/use-timeout/ with ts from me
export default function useTimeout(callback: () => void, delay: number | null) {
  const timeoutRef = React.useRef<number | undefined>(undefined);
  const savedCallback = React.useRef<() => void | undefined>(callback);

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    const tick = () => savedCallback.current();
    if (typeof delay === "number") {
      timeoutRef.current = window.setTimeout(tick, delay);
      return () => window.clearTimeout(timeoutRef.current);
    }
  }, [delay]);
  return timeoutRef;
}
