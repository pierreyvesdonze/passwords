import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RedirectToCurrentLevel from "./components/chapters/RedirectToCurrentLevel";
import Level1 from "./components/chapters/terminal/level1";
import Level2 from "./components/chapters/terminal/level2";
import Level3 from "./components/chapters/terminal/level3";
import Level4 from "./components/chapters/terminal/level4";
import Level5Dashboard from "./components/chapters/croyance/level5/Level5Dashboard";
import Level6 from "./components/chapters/guerre";

function App() {
  return (
    <Router>
      <Routes>
        {/* / redirige vers le dernier niveau valide */}
        <Route path="/" element={<RedirectToCurrentLevel />} />
        <Route path="/level1" element={<Level1 />} />
        <Route path="/level2" element={<Level2 />} />
        <Route path="/level3" element={<Level3 />} />
        <Route path="/level4" element={<Level4 />} />
        <Route path="/level5" element={<Level5Dashboard />} />
        <Route path="/level6" element={<Level6 />} />
      </Routes>
    </Router>
  );
}

export default App;
