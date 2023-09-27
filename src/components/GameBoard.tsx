import React from "react";
import type { Cells } from "~/core/game";

type GameBoardProps = {
  columns: number,
  rows: number,
  size: number,
  cells: Cells,
};

const GameBoard = ({
  columns,
  rows,
  size,
  cells,
}: GameBoardProps) => (
  <svg width={columns * size + 2} height={rows * size + 2}>
    {cells.map((color, index) =>
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
