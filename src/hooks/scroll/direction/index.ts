"use client";
import { useCallback, useEffect, useState } from "react";

// Enum to represent scroll directions
enum ScrollDirection {
  Up = "up",
  Down = "down",
}

export const useScrollDirection = (): ScrollDirection => {
  const [lastScrollTop, setLastScrollTop] = useState<number>(0); // State to store the last scroll position
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(
    ScrollDirection.Up
  ); // State to store the scroll direction

  // Function to handle scroll event and update scroll direction
  const handleScroll = useCallback(() => {
    const currentScrollTop =
      window.pageYOffset || document.documentElement.scrollTop;

    if (currentScrollTop > lastScrollTop) {
      setScrollDirection(ScrollDirection.Down); // If current scroll position is greater than last, set direction to down
    } else {
      setScrollDirection(ScrollDirection.Up); // Otherwise, set direction to up
    }

    setLastScrollTop(currentScrollTop); // Update last scroll position
  }, [lastScrollTop]);

  // Add event listener for scroll when component mounts
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll); // Remove event listener when component unmounts
    };
  }, [handleScroll]);

  return scrollDirection; // Return the current scroll direction
};
