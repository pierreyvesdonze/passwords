import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Level13Navbar from "./Level13Navbar";
import TerminalGlitch from "../terminal/TerminalGlitch";

export default function Creepy() {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle"); // idle | ok | error
  const [glitchActive, setGlitchActive] = useState(false);
  const navigate = useNavigate();

  const FINAL_PASSWORD = "DP71K6-TG6-UR22";

  useEffect(() => {
    window.revealSecret = () => {
      document.body.classList.add("creepy-secret-revealed");
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === FINAL_PASSWORD) {
      setStatus("ok");
      setGlitchActive(true); // déclenche le glitch
    } else {
      setStatus("error");
    }
  };

  // Texte à glitcher
  const glitchText = [
    "// ---- INTERNAL ARCHIVE : LEVEL 13 ----",
    "// Date: 2019-2026",
    "// Access: RESTRICTED",
    "// -------------------------------------",
    "",
    "function initSession() { return false; }",
    "function cleanupMemory() { console.warn('memory leak ignored'); }",
    "function revealSecret() { document.body.classList.add('creepy-secret-revealed'); }",
    "// revealSecret();",
    "",
    "Archives privées TG6",
    "DP71K6- -UR22",
    "",
    "Le document classé confidentiel du parti -UR22",
    "doit automatiquement être revu et corrigé par un administrateur",
    "habilité avant toute tentative de diffusion ou d’archivage définitif.",
    "Toute anomalie, incohérence ou modification non consignée",
    "entraînera la suspension immédiate de l’accès au dossier concerné.",
    "Les versions précédentes seront conservées à des fins de traçabilité interne,",
    "même en cas de suppression apparente.",
    "",
    "Bienvenue dans le niveau 13 du jeu.",
    "Tout le contenu de cette page peut glitcher lorsqu’un mot de passe correct est trouvé.",
    "Soyez attentif aux indices cachés et fragments de mot de passe.",
    "Rappelez-vous : seul le mot de passe final DP71K6-TG6-UR22 vous fera passer.",
    "",
    "// Fin du texte glitchable."
  ];

  // Affiche le glitch si le mot de passe correct a été entré
  if (glitchActive) {
    return (
      <TerminalGlitch
        textLines={glitchText}
        duration={3000} // durée du glitch en ms
        onComplete={() => {
          localStorage.setItem("currentLevel", "14");
          navigate("/level14"); // passage au niveau suivant après glitch
        }}
      />
    );
  }

  // Affichage normal du Level13 avant le mot de passe correct
  return (
    <>
      <Level13Navbar />

      <div className="level13-container">
        <div className="creepy-page">
          <h1 className="creepy-title">
            Archives privées <span style={{ color: "red" }}>TG6</span>
          </h1>

          <pre className="creepy-log">
            <code>
              {`// ---- INTERNAL ARCHIVE : LEVEL 13 ----
// Date: 2019-2026
// Access: RESTRICTED
// -------------------------------------

/*
Les notes suivantes ont été récupérées sur une machine
dont le disque présentait de multiples secteurs corrompus.
Certaines lignes semblent se répéter sans raison.
D'autres ont été volontairement tronquées.
*/

function initSession() {
  return false;
}

// ⚠️ Ne pas exécuter sans autorisation
function cleanupMemory() {
  console.warn("memory leak ignored");
}

/*
Fragment retrouvé dans un dump mémoire.
La fonction semble incomplète.
*/

function revealSecret() {
  document.body.classList.add("creepy-secret-revealed");
}

/*
// revealSecret();
*/

/*
Fin du fichier.
*/`}
            </code>
          </pre>

          <div className="secret-block-creepy">
            <span className="creepy-secret-fragment">DP71K6-</span>
            <br />
            <p className="secret-creepy-blur">
              Le document classé confidentiel du parti{" "}
              <span className="secret-color-creepy">-UR22</span> doit
              automatiquement être revu et corrigé par un administrateur
              habilité avant toute tentative de diffusion ou d’archivage
              définitif. Toute anomalie, incohérence ou modification non
              consignée entraînera la suspension immédiate de l’accès au
              dossier concerné. Les versions précédentes seront conservées à
              des fins de traçabilité interne, même en cas de suppression
              apparente.
            </p>
          </div>
        </div>
      </div>

      <footer className="creepy-footer">
        <form className="creepy-password-form" onSubmit={handleSubmit}>
          <input
            type="password"
            className={`creepy-password-input creepy-${status}`}
            placeholder="Mot de passe final"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setStatus("idle");
            }}
          />
          <button className="creepy-password-btn" type="submit">
            Valider
          </button>
        </form>
      </footer>
    </>
  );
}
