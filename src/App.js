import { HashRouter as Router, Routes, Route } from "react-router-dom";
import RedirectToCurrentLevel from "./components/chapters/RedirectToCurrentLevel";
import Level1 from "./components/chapters/terminal/level1";
import Level2 from "./components/chapters/terminal/level2";
import Level3 from "./components/chapters/terminal/level3";
import Level4 from "./components/chapters/terminal/level4";
import Level5Dashboard from "./components/chapters/croyance/level5/Level5Dashboard";
import Level6 from "./components/chapters/guerre";
import ScreenGuard from "./utils/screenGuard";
import Level7 from "./components/chapters/power";
import Level8 from "./components/chapters/art";
import Level9 from "./components/chapters/terminal/level9";
import Level10 from "./components/chapters/terminal/level10";
import Level11 from "./components/chapters/oubli";
import Level12 from "./components/chapters/level12";

function App() {
  return (
    <Router>
      <Routes>
        {/* / redirige vers le dernier niveau valide */}
        <Route path="/" element={<RedirectToCurrentLevel />} />

        <Route
          path="/level1"
          element={
            <ScreenGuard>
              <Level1 />
            </ScreenGuard>
          }
        />

        <Route
          path="/level2"
          element={
            <ScreenGuard>
              <Level2 />
            </ScreenGuard>
          }
        />

        <Route
          path="/level3"
          element={
            <ScreenGuard>
              <Level3 />
            </ScreenGuard>
          }
        />

        <Route
          path="/level4"
          element={
            <ScreenGuard>
              <Level4 />
            </ScreenGuard>
          }
        />

        <Route
          path="/level5"
          element={
            <ScreenGuard>
              <Level5Dashboard />
            </ScreenGuard>
          }
        />

        <Route
          path="/level6"
          element={
            <ScreenGuard>
              <Level6 />
            </ScreenGuard>
          }
        />

        <Route
          path="/level7"
          element={
            <ScreenGuard>
              <Level7 />
            </ScreenGuard>
          }
        />

        <Route
          path="/level8"
          element={
            <ScreenGuard>
              <Level8 />
            </ScreenGuard>
          }
        />

        <Route
          path="/level9"
          element={
            <ScreenGuard>
              <Level9 />
            </ScreenGuard>
          }
        />

        <Route
          path="/level10"
          element={
            <ScreenGuard>
              <Level10 />
            </ScreenGuard>
          }
        />

        <Route
          path="/level11"
          element={
            <ScreenGuard>
              <Level11 />
            </ScreenGuard>
          }
        />

         <Route
          path="/level12"
          element={
            <ScreenGuard>
              <Level12 />
            </ScreenGuard>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
