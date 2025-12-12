import React from "react";
import NoSmallScreen from "./NoSmallScreen";

export default function ScreenGuard({ children }) {
  const isSmallScreen = window.innerWidth < 1200;

  if (isSmallScreen) return <NoSmallScreen />;
  return children;
}