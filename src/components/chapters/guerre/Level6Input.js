import React from "react";

export default function Level6Input({ show, userInput, onChange, onValidate }) {
  return (
    <div
      className={`guerre-input ${show ? "guerre-visible" : "guerre-hidden"}`}
    >
      <input
        value={userInput}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Mot de passe"
        className="guerre-input-field"
      />
      <button className="guerre-btn-validate" onClick={onValidate}>
        Valider
      </button>
    </div>
  );
}
