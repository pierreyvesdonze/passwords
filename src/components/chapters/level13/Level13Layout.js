import Level13Navbar from "./Level13Navbar";
import { Link } from "react-router-dom";

export default function Level13Layout() {
  return (
    <div>
      <Level13Navbar />

      <div className="level13-container">
        <div className="level13-grid">
          <Link to="/level13/maison" className="level13-card">
            <div className="level13-card-title">La Maison</div>
          </Link>

          <Link to="/level13/produits" className="level13-card">
            <div className="level13-card-title">Produits</div>
          </Link>

          <Link to="/level13/mets" className="level13-card">
            <div className="level13-card-title">Mets</div>
          </Link>

          <Link to="/level13/memo" className="level13-card">
            <div className="level13-card-title">Mémo</div>
          </Link>

          <Link to="/level13/creepy" className="level13-card">
            <div className="level13-card-title">*****</div>
          </Link>

          <Link to="/level13/medias" className="level13-card">
            <div className="level13-card-title">Médias</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
