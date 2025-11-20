import TerminalWrapper from "../TerminalWrapper";
import { useNavigate } from "react-router-dom";

export default function Level1Page() {
  const navigate = useNavigate();

  const handleLevelComplete = (levelNum) => {
    navigate(`/level${levelNum + 1}`);
  };

  return <TerminalWrapper levelNumber={2} onLevelComplete={handleLevelComplete} />;
}