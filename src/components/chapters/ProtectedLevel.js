import TerminalWrapper from "./terminal/TerminalWrapper";
import { useLevelProtection } from "../../utils/useLevelProtection";
import { useNavigate } from "react-router-dom";

export default function ProtectedLevel({ levelNumber, nextLevel }) {
  useLevelProtection(levelNumber);
  const navigate = useNavigate();

  const handleLevelComplete = () => {
    sessionStorage.setItem("currentLevel", nextLevel);
    navigate(`/level${nextLevel}`);
  };

  return (
    <TerminalWrapper levelNumber={levelNumber} onLevelComplete={handleLevelComplete} />
  );
}
