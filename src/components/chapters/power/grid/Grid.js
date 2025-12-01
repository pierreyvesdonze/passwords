import React from "react";

export default function Grid({
  grid,
  gridSize,
  onCellClick,
  isCellSelected,
  isCellFound,
  passwordCoords,
  showPassword,
}) {
  return (
    <div
      className="power-grid"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${gridSize}, 40px)`,
        gridTemplateRows: `repeat(${gridSize}, 40px)`,
        gap: "2px",
      }}
    >
      {grid.flatMap((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const isSelected = isCellSelected(rowIndex, colIndex);
          const isFound = isCellFound(rowIndex, colIndex);
          const isPassword =
            showPassword &&
            passwordCoords.some(
              ([r, c]) => r === rowIndex && c === colIndex
            );

          const cellClass = [
            "power-cell",
            isSelected ? "power-cell-selected" : "",
            isFound ? "power-cell-found" : "",
            isPassword ? "power-cell-password" : "",
          ]
            .join(" ")
            .trim();

          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={cellClass}
              onClick={() => onCellClick(rowIndex, colIndex)}
            >
              {cell.toUpperCase()}
            </div>
          );
        })
      )}
    </div>
  );
}