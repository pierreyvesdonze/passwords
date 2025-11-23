import React, { useState, useRef } from "react";
import { Howl, Howler } from "howler";
import { useNavigate } from "react-router-dom";

export default function Level6() {
  const navigate = useNavigate();

  const [showPlayer, setShowPlayer] = useState(false);
  const [showInput, setShowInput]   = useState(false);
  const [showNotice, setShowNotice] = useState(false);
  const [userInput, setUserInput]   = useState("");

  // conserve l'instance Howl et l'audio natif en fallback
  const soundRef                  = useRef(null);
  const nativeAudioRef            = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // PLAY : crée et joue le son uniquement au clic
  const handlePlay = async () => {
    try {
      // 1) Si Howl déjà initialisé, toggle play/pause
      if (soundRef.current) {
        if (isPlaying) {
          soundRef.current.pause();
          setIsPlaying(false);
        } else {
          // resume audio context si suspendu (sécurité)
          try {
            if (Howler.ctx && Howler.ctx.state === "suspended") {
              await Howler.ctx.resume();
              console.log("Howler.ctx resumed");
            }
          } catch (e) {
            console.warn("Impossible de resume Howler.ctx :", e);
          }

          soundRef.current.play();
          setIsPlaying(true);
        }
        return;
      }

      // 2) première création : forcer html5 pour éviter certains blocages / gros fichiers
      const srcPath = process.env.PUBLIC_URL + "/sons/guerre-morse.wav"; // ou "/sons/guerre-morse.wav"
      console.log("Creating Howl with src:", srcPath);

      // Try to resume global AudioContext first (defensive)
      try {
        if (Howler.ctx && Howler.ctx.state === "suspended") {
          await Howler.ctx.resume();
          console.log("Howler.ctx resumed before creating Howl");
        }
      } catch (e) {
        console.warn("resume before creation failed:", e);
      }

      const h = new Howl({
        src: [srcPath],
        html5: true, // important for long files & stable playback
        onload: () => console.log("Howl loaded"),
        onplay: () => {
          console.log("Howl onplay");
          setIsPlaying(true);
        },
        onend: () => {
          console.log("Howl ended");
          setIsPlaying(false);
        },
        onloaderror: (id, err) => {
          console.error("Howl load error", id, err);
        },
        onplayerror: (id, err) => {
          console.error("Howl play error", id, err);
        },
      });

      soundRef.current = h;

      // attempt to play (should be allowed because this handler is a user gesture)
      h.play();
    } catch (err) {
      console.error("Erreur handlePlay (Howler) :", err);

      // fallback : essayer un <audio> natif (créé au clic)
      try {
        if (!nativeAudioRef.current) {
          const audio = new Audio(
            process.env.PUBLIC_URL + "/sons/guerre-morse.wav"
          );
          nativeAudioRef.current = audio;
        }
        await nativeAudioRef.current.play();
        setIsPlaying(true);
        console.log("Fallback native audio playing");
      } catch (err2) {
        console.error("Fallback audio failed:", err2);
        alert("Impossible de lire le son — regarde la console pour la raison.");
      }
    }
  };

  const handleValidate = () => {
    if (userInput.trim().toLowerCase() === "guerre") {
      navigate("/level7");
    } else {
      setUserInput("");
      // petit feedback visuel minimal
      alert("Non. Ce n'est pas le bon mot.");
    }
  };

  const dashboardStyle = {
    width: "90%",
    height: "60vh",
    background: "#111",
    margin: "auto",
    marginTop: "40px",
    borderRadius: "12px",
    border: "3px solid #333",
    display: "flex",
    padding: "20px",
    color: "white",
  };

  const leftPanelStyle = {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundImage: `url(${process.env.PUBLIC_URL}/images/level6-metal.png)`,
    justifyContent: "flex-start",
  };

  const rightPanelStyle = {
    width: "50%",
    padding: "20px",
    fontSize: "16px",
    lineHeight: "1.4",
    borderLeft: "2px solid #333",
  };

  const switchBarStyle = {
    display: "flex",
    gap: "20px",
    marginTop: "20px",
    justifyContent: "center",
  };

  const switchStyle = {
    padding: "10px 20px",
    background: "#444",
    borderRadius: "8px",
    cursor: "pointer",
    userSelect: "none",
  };

  function SwitchToggle({ isOn, onToggle, label }) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          cursor: "pointer",
          padding: "5px 10px",
        }}
        onClick={onToggle}
      >
        <span>{label}</span>

        <div
          style={{
            width: "50px",
            height: "26px",
            borderRadius: "20px",
            background: isOn ? "#4caf50" : "#555",
            position: "relative",
            transition: "0.2s",
          }}
        >
          <div
            style={{
              width: "22px",
              height: "22px",
              borderRadius: "50%",
              background: "white",
              position: "absolute",
              top: "2px",
              left: isOn ? "26px" : "2px",
              transition: "0.2s",
              boxShadow: "0 2px 5px rgba(0,0,0,0.4)",
            }}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: "40px", color: "white" }}>
      <h1 style={{ textAlign: "center" }}>Level 6 — Décode le mot</h1>

      {/* Tableau de bord */}
      <div style={dashboardStyle}>
        {/* Panel gauche */}
        <div style={leftPanelStyle}>
          {/* La barre de switch */}
          <div style={switchBarStyle}>
            <SwitchToggle
              label="Player"
              isOn={showPlayer}
              onToggle={() => setShowPlayer((v) => !v)}
            />

            <SwitchToggle
              label="Saisie"
              isOn={showInput}
              onToggle={() => setShowInput((v) => !v)}
            />

            <SwitchToggle
              label="Morse"
              isOn={showNotice}
              onToggle={() => setShowNotice((v) => !v)}
            />
          </div>

          {/* PLAYER AUDIO */}
          {showPlayer && (
            <div style={{ marginTop: "40px" }}>
              <button
                onClick={handlePlay}
                style={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  background: "#01bb48ff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                {isPlaying ? "⏸︎ Pause" : "▶︎ Play Morse"}
              </button>
            </div>
          )}

          {/* INPUT */}
          {showInput && (
            <div style={{ marginTop: "40px" }}>
              <input
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Mot de passe"
                style={{
                  padding: "10px",
                  fontSize: "16px",
                  width: "200px",
                  borderRadius: "8px",
                  marginRight: "10px",
                  border: "1px solid #555",
                  background: "#222",
                  color: "white",
                }}
              />
              <button
                onClick={handleValidate}
                style={{
                  padding: "10px 16px",
                  fontSize: "16px",
                  background: "#35c65d",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Valider
              </button>
            </div>
          )}
        </div>

        {/* Panel droit — NOTICE MORSE */}
        <div style={rightPanelStyle}>
          {showNotice && (
            <div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr 1fr",
                  gap: "10px 20px",
                  marginTop: "20px",
                  overflow: "auto",
                  height: "57vh",
                }}
              >
                <p>A : ● ▬</p>
                <p>B : ▬ ● ● ●</p>
                <p>C : ▬ ● ▬ ●</p>

                <p>D : ▬ ● ●</p>
                <p>E : ●</p>
                <p>F : ● ● ▬ ●</p>

                <p>G : ▬ ▬ ●</p>
                <p>H : ● ● ● ●</p>
                <p>I : ● ●</p>

                <p>J : ● ▬ ▬ ▬</p>
                <p>K : ▬ ● ▬</p>
                <p>L : ● ▬ ● ●</p>

                <p>M : ▬ ▬</p>
                <p>N : ▬ ●</p>
                <p>O : ▬ ▬ ▬</p>

                <p>P : ● ▬ ▬ ●</p>
                <p>Q : ▬ ▬ ● ▬</p>
                <p>R : ● ▬ ●</p>

                <p>S : ● ● ●</p>
                <p>T : ▬</p>
                <p>U : ● ● ▬</p>

                <p>V : ● ● ● ▬</p>
                <p>W : ● ▬ ▬</p>
                <p>X : ▬ ● ● ▬</p>

                <p>Y : ▬ ● ▬ ▬</p>
                <p>Z : ▬ ▬ ● ●</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
