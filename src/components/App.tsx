import React, { useEffect, useState } from "react";
import { type Cells, renderTetromino } from "~/core/game";
import { Tetromino } from "~/core/tetromino";
import GameBoard from "./GameBoard";

const App = () => {
  const [actualCells, setActualCells] = useState<Cells>(Array(200).fill(null));
  const [renderedCells, setRenderedCells] = useState<Cells>(Array(200).fill(null));
  const [currentTetromino, setCurrentTetromino] = useState<Tetromino>(new Tetromino("J", 14));

  useEffect(() => {
    setRenderedCells(renderTetromino(actualCells, currentTetromino));
  }, [currentTetromino]);

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setCurrentTetromino(t => t.pushLeft());
      }
      if (e.key === "ArrowRight") {
        setCurrentTetromino(t => t.pushRight());
      }
    };

    document.body.addEventListener("keydown", listener);
    return () => {
      document.body.removeEventListener("keydown", listener);
    };
  }, []);

  return <GameBoard columns={10} rows={20} size={32} cells={renderedCells} />;
};

export default App;
