import React from "react";

export default function Level6Toggles({
  showPlayer,
  setShowPlayer,
  showInput,
  setShowInput,
  showNotice,
  setShowNotice,
}) {
  const Toggle = ({ isOn, onToggle, label }) => (
    <div className="guerre-toggle" onClick={onToggle}>
      <span>{label}</span>
      <div className={`guerre-toggle-switch ${isOn ? "guerre-on" : ""}`}>
        <div className="guerre-toggle-knob"></div>
      </div>
    </div>
  );

  return (
    <div className="guerre-toggle-bar">
      <Toggle label="Player" isOn={showPlayer} onToggle={() => setShowPlayer(v => !v)} />
      <Toggle label="Saisie" isOn={showInput} onToggle={() => setShowInput(v => !v)} />
      <Toggle label="Morse" isOn={showNotice} onToggle={() => setShowNotice(v => !v)} />
    </div>
  );
}
