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
  const size = useMemo(() => {
    switch (shape) {
      case "I": return 4;
      case "O": return 2;
      default: return 3;
    }
  }, [shape]);

  const startPos = useMemo(() => {
    switch (shape) {
      case "I": return 1;
      case "O": return 2;
      default: return 4;
    }
  }, [shape]);

  const emptyCells = Array(size * 2).fill(null);
  const [cells, setCells] = useState(emptyCells);

  useEffect(() => {
    setCells(renderTetromino(emptyCells, new Tetromino(shape, startPos, 0, size)));
  }, [shape, size]);

  return <GameBoard columns={size} rows={shape === "I" ? 1 : 2} size={32} cells={cells} />;
};

export default Preview;
