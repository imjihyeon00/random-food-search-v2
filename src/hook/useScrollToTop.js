// src/hooks/useScrollToTop.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function useScrollToTop({ smooth = true } = {}) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (smooth) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, smooth]);
}
