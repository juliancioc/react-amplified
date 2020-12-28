import { useEffect, useState } from "react";

const useResizeHook = (callback) => {
  const [windowInnerHeight, setWindowInnerHeight] = useState(
    window.innerHeight
  );

  const updateDimensions = () => {
    setWindowInnerHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  useEffect(() => {
    callback();
  }, [windowInnerHeight, callback]);
};

export const useWindowSizeHook = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  useResizeHook(() => {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
  });
  return { width: width, height: height };
};
