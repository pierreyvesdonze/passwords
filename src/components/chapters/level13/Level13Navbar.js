import { Link } from "react-router-dom";

export default function Level13Navbar() {
  return (
    <>
      <div style={{ color: "black", opacity: 0, height: "0" }}>
        N'oublions pas leurs noms
      </div>
      <div className="level13-navbar">
        <Link to="/level13">
          <div className="level13-home-icon"></div>
        </Link>
        <Link to="/level13/maison">
          <div className="nav-link">La Maison</div>
        </Link>
        <Link to="/level13/produits">
          <div className="nav-link">Produits</div>
        </Link>
        <Link to="/level13/mets">
          <div className="nav-link">Mets</div>
        </Link>
        <Link to="/level13/medias">
          <div className="nav-link">Médias</div>
        </Link>
      </div>
    </>
  );
}
