import React from "react";

export default function useWindowSize() {
  const [windowSize, setWindowSize] = React.useState({
    width: undefined,
    height: undefined,
  });

  React.useEffect(() => {
    function changeWindowSize() {
      setWindowSize({ width: window?.innerWidth, height: window?.innerHeight });
    }
    changeWindowSize()
    window.addEventListener("resize", changeWindowSize);

    return () => {
      window.removeEventListener("resize", changeWindowSize);
    };
  }, []);

  return windowSize;
}