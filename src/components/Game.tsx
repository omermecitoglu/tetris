import React, { useEffect, useState } from "react";
import { COLUMNS, ROWS, SPAWN_POSITION } from "~/core/constants";
import { type Cells, clearRows, moveTetrominoDown, renderTetromino } from "~/core/game";
import { Tetromino } from "~/core/tetromino";
import GameBoard from "./GameBoard";

// eslint-disable-next-line @typescript-eslint/ban-types
type GameProps = {
};

// eslint-disable-next-line no-empty-pattern
const Game = ({
}: GameProps) => {
  const [isOver, setIsOver] = useState(false);
  const [score, setScore] = useState(0);
  const [actualCells, setActualCells] = useState<Cells>(Array(COLUMNS * ROWS).fill(null));
  const [renderedCells, setRenderedCells] = useState<Cells>(Array(COLUMNS * ROWS).fill(null));
  const [currentTetromino, setCurrentTetromino] = useState<Tetromino>(new Tetromino("I", SPAWN_POSITION));

  const commit = (tetromino: Tetromino) => {
    setActualCells(cells => clearRows(renderTetromino(cells, tetromino), addition => setScore(oldScore => oldScore + addition)));
  };

  useEffect(() => {
    if (currentTetromino.willCollide(0, actualCells)) {
      setIsOver(true);
    }
    setRenderedCells(renderTetromino(actualCells, currentTetromino));
  }, [currentTetromino, actualCells]);

  useEffect(() => {
    if (isOver) return alert("Game Over");

    const timer = setInterval(() => {
      setCurrentTetromino(t => moveTetrominoDown(t, actualCells, commit));
    }, 200);

    const listener = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setCurrentTetromino(t => t.pushLeft(actualCells));
      }
      if (e.key === "ArrowRight") {
        setCurrentTetromino(t => t.pushRight(actualCells));
      }
      if (e.key === "ArrowUp" && !e.repeat) {
        setCurrentTetromino(t => t.rotate(actualCells));
      }
    };

    document.body.addEventListener("keydown", listener);
    return () => {
      clearInterval(timer);
      document.body.removeEventListener("keydown", listener);
    };
  }, [isOver, actualCells]);

  return (
    <>
      <div>
        <GameBoard columns={COLUMNS} rows={ROWS} size={32} cells={renderedCells} />
      </div>
      <div>
        <div>Score {score}</div>
      </div>
    </>
  );
};

export default Game;
