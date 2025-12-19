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
import Level13Layout from "./components/chapters/level13/Level13Layout";
import Maison from "./components/chapters/level13/Maison";
import Produits from "./components/chapters/level13/Produits";
import Mets from "./components/chapters/level13/Mets";
import Medias from "./components/chapters/level13/Medias";
import Memo from "./components/chapters/level13/Memo";
import Creepy from "./components/chapters/level13/Creepy";
import Level14 from "./components/chapters/level14";

function App() {
  return (
    <Router>
      <ScreenGuard>
        <Routes>
          {/* / redirige vers le dernier niveau valide */}
          <Route path = "/" element                 = {<RedirectToCurrentLevel />} />
          <Route path = "/level1" element           = {<Level1 />} />
          <Route path = "/level2" element           = {<Level2 />} />
          <Route path = "/level3" element           = {<Level3 />} />
          <Route path = "/level4" element           = {<Level4 />} />
          <Route path = "/level5" element           = {<Level5Dashboard />} />
          <Route path = "/level6" element           = {<Level6 />} />
          <Route path = "/level7" element           = {<Level7 />} />
          <Route path = "/level8" element           = {<Level8 />} />
          <Route path = "/level9" element           = {<Level9 />} />
          <Route path = "/level10" element          = {<Level10 />} />
          <Route path = "/level11" element          = {<Level11 />} />
          <Route path = "/level12" element          = {<Level12 />} />
          <Route path = "/level13" element          = {<Level13Layout />} />
          <Route path = "/level13/maison" element   = {<Maison />} />
          <Route path = "/level13/produits" element = {<Produits />} />
          <Route path = "/level13/produits" element = {<Produits />} />
          <Route path = "/level13/mets" element     = {<Mets />} />
          <Route path = "/level13/medias" element   = {<Medias />} />
          <Route path = "/level13/memo" element     = {<Memo />} />
          <Route path = "/level13/creepy" element   = {<Creepy />} />
          <Route path = "/level14" element          = {<Level14 />} />
        </Routes>
      </ScreenGuard>
    </Router>
  );
}

export default App;
