import React, { useEffect, useState } from "react";
import { COLUMNS, ROWS, SPAWN_POSITION } from "~/core/constants";
import { type Cells, clearRows, moveTetrominoDown, renderTetromino } from "~/core/game";
import { Tetromino } from "~/core/tetromino";
import GameBoard from "./GameBoard";

type GameProps = {
  setScore: React.Dispatch<React.SetStateAction<number>>,
};

const Game = ({
  setScore,
}: GameProps) => {
  const [isOver, setIsOver] = useState(false);
  const [actualCells, setActualCells] = useState<Cells>(Array(COLUMNS * ROWS).fill(null));
  const [renderedCells, setRenderedCells] = useState<Cells>(Array(COLUMNS * ROWS).fill(null));
  const [currentTetromino, setCurrentTetromino] = useState<Tetromino>(new Tetromino("J", SPAWN_POSITION));

  const commit = (tetromino: Tetromino) => {
    setActualCells(cells => clearRows(renderTetromino(cells, tetromino), score => setScore(oldScore => oldScore + score)));
  };

  useEffect(() => {
    if (currentTetromino.willCollide(0, actualCells)) {
      setIsOver(true);
    } else {
      setRenderedCells(renderTetromino(actualCells, currentTetromino));
    }
  }, [currentTetromino, actualCells]);

  useEffect(() => {
    if (isOver) return alert("Game Over");

    const timer = setInterval(() => {
      setCurrentTetromino(t => moveTetrominoDown(t, actualCells, commit));
    }, 250);

    const listener = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setCurrentTetromino(t => t.pushLeft(actualCells));
      }
      if (e.key === "ArrowRight") {
        setCurrentTetromino(t => t.pushRight(actualCells));
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
  }, [isOver, actualCells]);

  return <GameBoard columns={COLUMNS} rows={ROWS} size={32} cells={renderedCells} />;
};

export default Game;
