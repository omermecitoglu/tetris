import React, { useEffect, useState } from "react";
import { type Cells, renderTetromino } from "~/core/game";
import { Tetromino } from "~/core/tetromino";
import GameBoard from "./GameBoard";

const App = () => {
  const [actualCells, setActualCells] = useState<Cells>(Array(200).fill(null));
  const [renderedCells, setRenderedCells] = useState<Cells>(Array(200).fill(null));
  const [currentTetromino, setCurrentTetromino] = useState<Tetromino>(new Tetromino(14));

  useEffect(() => {
    setRenderedCells(renderTetromino(actualCells, currentTetromino));
  }, [currentTetromino]);

  return <GameBoard columns={10} rows={20} size={32} cells={renderedCells} />;
};

export default App;
