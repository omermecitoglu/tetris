import React, { useEffect, useState } from "react";
import { COLUMNS, ROWS } from "~/core/constants";
import { type Cells, renderTetromino } from "~/core/game";
import { Tetromino } from "~/core/tetromino";
import GameBoard from "./GameBoard";

const App = () => {
  const [actualCells, setActualCells] = useState<Cells>(Array(COLUMNS * ROWS).fill(null));
  const [renderedCells, setRenderedCells] = useState<Cells>(Array(COLUMNS * ROWS).fill(null));
  const [currentTetromino, setCurrentTetromino] = useState<Tetromino>(new Tetromino("J", Math.round(COLUMNS * 1.5 - 1)));

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
      if (e.key === "ArrowUp" && !e.repeat) {
        setCurrentTetromino(t => t.rotate());
      }
    };

    document.body.addEventListener("keydown", listener);
    return () => {
      document.body.removeEventListener("keydown", listener);
    };
  }, []);

  return <GameBoard columns={COLUMNS} rows={ROWS} size={32} cells={renderedCells} />;
};

export default App;
