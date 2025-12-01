import React from "react";

export default function Cell({ r, c, letter, onClick, selected, found, showPassword, isPassword }) {
  let cls = "power-cell";
  if (found) cls += " power-cell-found";
  else if (selected) cls += " power-cell-selected";
  if (isPassword && showPassword) cls += " power-cell-password";

  return (
    <div
      className={cls}
      onClick={() => onClick(r, c)}
      data-r={r}
      data-c={c}
    >
      {letter}
    </div>
  );
}
