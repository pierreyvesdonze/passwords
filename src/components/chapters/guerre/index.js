import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Howl, Howler } from "howler";

import Level6Player from "./Level6Player";
import Level6Input from "./Level6Input";
import Level6Notice from "./Level6Notice";
import Level6Toggles from "./Level6Toggles";
import Oscilloscope from "./Oscilloscope";

export default function Level6() {
  const navigate = useNavigate();

  // states principaux
  const [showPlayer, setShowPlayer] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [showNotice, setShowNotice] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [isSynced, setIsSynced] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // refs audio
  const soundRef = useRef(null);
  const nativeAudioRef = useRef(null);

  const handlePlay = async () => {
    try {
      if (soundRef.current) {
        if (isPlaying) {
          soundRef.current.pause();
          setIsPlaying(false);
        } else {
          if (Howler.ctx?.state === "suspended") await Howler.ctx.resume();
          soundRef.current.play();
          setIsPlaying(true);
        }
        return;
      }

      const srcPath = process.env.PUBLIC_URL + "/sons/guerre-morse.wav";
      if (Howler.ctx?.state === "suspended") await Howler.ctx.resume();

      const h = new Howl({
        src: [srcPath],
        html5: true,
        onplay: () => setIsPlaying(true),
        onend: () => setIsPlaying(false),
      });

      soundRef.current = h;
      h.play();
    } catch {
      try {
        if (!nativeAudioRef.current) {
          nativeAudioRef.current = new Audio(
            process.env.PUBLIC_URL + "/sons/guerre-morse.wav"
          );
        }
        await nativeAudioRef.current.play();
        setIsPlaying(true);
      } catch {
        alert("Impossible de lire le son.");
      }
    }
  };

  const handleValidate = () => {
    if (userInput.trim().toLowerCase() === "guerre") {
      sessionStorage.setItem("currentLevel", "7");
      navigate("/level7");
    } else {
      setUserInput("");
      alert("Mot de passe incorrect");
    }
  };

  return (
    <div className="guerre-container">
      <h1 className="guerre-title">Level 6</h1>
      <div className="guerre-dashboard">
        <div
          className="guerre-left-panel"
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/images/level6-metal.png)`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <Level6Toggles
            showPlayer={showPlayer}
            setShowPlayer={setShowPlayer}
            showInput={showInput}
            setShowInput={setShowInput}
            showNotice={showNotice}
            setShowNotice={setShowNotice}
          />

          <Level6Player
            show={showPlayer}
            isPlaying={isPlaying}
            onPlayClick={handlePlay}
          />

          <Level6Input
            show={showInput}
            userInput={userInput}
            onChange={setUserInput}
            onValidate={handleValidate}
          />

          <Oscilloscope onSyncChange={setIsSynced} />
        </div>

        <Level6Notice show={showNotice} isSynced={isSynced} />
      </div>
    </div>
  );
}
