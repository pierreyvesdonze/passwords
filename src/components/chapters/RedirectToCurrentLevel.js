import { Navigate } from "react-router-dom";

export default function RedirectToCurrentLevel() {
  const currentLevel = parseInt(sessionStorage.getItem("currentLevel") || "1");
  return <Navigate to={`/level${currentLevel}`} replace />;
}