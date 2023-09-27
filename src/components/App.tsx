import React, { useEffect, useState } from "react";
import { COLUMNS, ROWS, SPAWN_POSITION } from "~/core/constants";
import { type Cells, moveTetrominoDown, renderTetromino } from "~/core/game";
import { Tetromino } from "~/core/tetromino";
import GameBoard from "./GameBoard";

const App = () => {
  const [actualCells, setActualCells] = useState<Cells>(Array(COLUMNS * ROWS).fill(null));
  const [renderedCells, setRenderedCells] = useState<Cells>(Array(COLUMNS * ROWS).fill(null));
  const [currentTetromino, setCurrentTetromino] = useState<Tetromino>(new Tetromino("J", SPAWN_POSITION));

  const commit = (tetromino: Tetromino) => {
    setActualCells(cells => renderTetromino(cells, tetromino));
  };

  useEffect(() => {
    setRenderedCells(renderTetromino(actualCells, currentTetromino));
  }, [currentTetromino]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTetromino(t => moveTetrominoDown(t, actualCells, commit));
    }, 100);

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
      clearInterval(timer);
      document.body.removeEventListener("keydown", listener);
    };
  }, [actualCells]);

  return <GameBoard columns={COLUMNS} rows={ROWS} size={32} cells={renderedCells} />;
};

export default App;
