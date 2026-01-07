import { useEffect, useRef } from "react";
import { useHighlightStore } from "@/store/highlightStore";

export const useHighlight = (id: string) => {
  const ref = useRef<any>(null);
  const { activeHighlightId, clearHighlight } = useHighlightStore();

  useEffect(() => {
    if (activeHighlightId === id && ref.current) {
      // Scroll to the element
      ref.current.scrollIntoView({ behavior: "smooth", block: "center" });

      // Add highlight class
      ref.current.classList.add("highlight-pulse");

      // Remove highlight class and clear state after animation
      const timer = setTimeout(() => {
        if (ref.current) {
          ref.current.classList.remove("highlight-pulse");
        }
        clearHighlight();
      }, 3000); // 3 seconds duration

      return () => clearTimeout(timer);
    }
  }, [activeHighlightId, id, clearHighlight]);

  return ref;
};
