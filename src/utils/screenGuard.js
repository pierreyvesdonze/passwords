import React from "react";
import NoSmallScreen from "./NoSmallScreen";

export default function screenGuard({ children }) {
  const isSmallScreen = window.innerWidth < 1200;

  if (isSmallScreen) return <NoSmallScreen />;
  return children;
}
