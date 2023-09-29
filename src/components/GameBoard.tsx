import React from "react";
import type { Grid } from "~/core/game";

type GameBoardProps = {
  columns: number,
  rows: number,
  size: number,
  grid: Grid,
};

const GameBoard = ({
  columns,
  rows,
  size,
  grid,
}: GameBoardProps) => (
  <svg width={columns * size + 2} height={rows * size + 2}>
    {grid.map((cell, index) =>
      <rect
        key={index}
        fill={(cell && !cell.isShadow && cell.color) || "black"}
        stroke={(cell && cell.isShadow && cell.color) || undefined}
        x={(index % columns) * size + (cell?.isShadow === true ? 3 : 2)}
        y={Math.floor(index / columns) * size + (cell?.isShadow === true ? 3 : 2)}
        width={size - (cell?.isShadow === true ? 4 : 2)}
        height={size - (cell?.isShadow === true ? 4 : 2)}
      />
    )}
  </svg>
);

export default GameBoard;
