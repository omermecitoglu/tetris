import React, { useEffect, useMemo, useState } from "react";
import { renderTetromino } from "~/core/game";
import { Tetromino, type TetrominoShape } from "~/core/tetromino";
import GameBoard from "./GameBoard";

type PreviewProps = {
  shape: TetrominoShape,
};

const Preview = ({
  shape,
}: PreviewProps) => {
  const columns = useMemo(() => {
    switch (shape) {
      case "I": return 4;
      case "O": return 2;
      default: return 3;
    }
  }, [shape]);

  const rows = shape === "I" ? 1 : 2;

  const startPos = useMemo(() => {
    switch (shape) {
      case "I": return 1;
      case "O": return 2;
      default: return 4;
    }
  }, [shape]);

  const emptyGrid = Array(columns * 2).fill(null);
  const [grid, setGrid] = useState(emptyGrid);

  useEffect(() => {
    setGrid(renderTetromino(emptyGrid, new Tetromino(shape, startPos, 0, columns, rows)));
  }, [shape, columns]);

  return <GameBoard columns={columns} rows={rows} size={32} grid={grid} />;
};

export default Preview;
