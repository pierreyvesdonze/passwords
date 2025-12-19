import { useState, useEffect } from "react";
import Level13Navbar from "./Level13Navbar";

export default function Memo() {
  const [password, setPassword] = useState("");
  const [accessGranted, setAccessGranted] = useState(false);
  const [error, setError] = useState(false);

  /* Le mot de passe */
  const correctPassword = "paulomarsimonesebfranckluc";
  const storageKey = "level13_memo_access_granted";

  // debug
  /*   localStorage.setItem("level13_memo_access_granted", "false"); */

  // Vérifie si l'accès est déjà sauvegardé au chargement de la page
  useEffect(() => {
    const storedAccess = localStorage.getItem(storageKey);
    if (storedAccess === "true") {
      setAccessGranted(true);
    }

    window.revealMemo = () => {
      document.body.classList.add("memo-revealed");
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Normalisation : minuscules + suppression de tout sauf a-z
    const normalizedInput = password.toLowerCase().replace(/[^a-z]/g, "");

    if (normalizedInput === correctPassword) {
      setAccessGranted(true);
      setError(false);
      localStorage.setItem(storageKey, "true"); // Sauvegarde l'accès
    } else {
      setError(true);
      setAccessGranted(false);
    }
  };

  return (
    <>
      <Level13Navbar />
      <div
        className="level13-container"
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#111",
          color: "#fff",
          flexDirection: "column",
          padding: "20px",
        }}
      >
        {!accessGranted && (
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "15px",
              width: "100%",
              maxWidth: "400px",
            }}
          >
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="**** **** ****** *** ****** ***"
              style={{
                width: "100%",
                padding: "12px 15px",
                borderRadius: "8px",
                border: error ? "2px solid #ff4d4f" : "2px solid #555",
                background: "#222",
                color: "#fff",
                fontSize: "16px",
                transition: "all 0.3s",
              }}
            />
            {error && (
              <span style={{ color: "#ff4d4f", fontWeight: "bold" }}>
                Mot de passe incorrect
              </span>
            )}
            <button
              type="submit"
              style={{
                padding: "10px 20px",
                borderRadius: "8px",
                border: "none",
                background: "#ff4d4f",
                color: "#fff",
                cursor: "pointer",
                fontWeight: "bold",
                transition: "background 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#ff1a1a")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#ff4d4f")
              }
            >
              Valider
            </button>
          </form>
        )}

        {accessGranted && (
          <div
            className="level13-memo-container"
            style={{
              marginTop: "20px",
              maxWidth: "80%",
              height: "60vh",

              overflowY: "auto",
              padding: "30px",
              background: "#1c1c1c",
              borderRadius: "12px",
              boxShadow: "0 0 20px rgba(101, 252, 0, 0.94)",
              textAlign: "center",
              color: "#fff",
              fontSize: "18px",
            }}
          >
            <h1>Notes</h1>
            <p>
              Parfois, la vérité est ailleurs. Ces quelques notes vous
              rappelleront qu’il faut savoir regarder au-delà des apparences. La
              console du navigateur (non loin de l’inspecteur) peut être utile
              pour hacker. Simple hack pour tester : entrer dans la console :
              revealMemo()
            </p>

            <br />

            <div className="secret-block">
              <span style={{ fontStyle: "italic" }}>
                Hacked !
              </span>
              Dans cette phrase, le mot
              <span className="secret-opacity"> "Opacité"</span> et le mot
              <span className="secret-color-memo"> "Couleur"</span> sont masqués
              par des propriétés CSS, que l'on peut changer dans l'inspecteur.
              Un mot a une opacité à 0, l'autre a une couleur invisible. Changer
              ces paramètres pour afficher la phrase en entier.
            </div>

            <br />

            <p className="secret-inverted">
              Pour des raisons de sécurité, tous les hacks ne peuvent être
              dévoilés. Explorez, inspectez, testez.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
