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
    {grid.map((color, index) =>
      <rect
        key={index}
        fill={color ?? "black"}
        x={(index % columns) * size + 2}
        y={Math.floor(index / columns) * size + 2}
        width={size - 2}
        height={size - 2}
      />
    )}
  </svg>
);

export default GameBoard;
