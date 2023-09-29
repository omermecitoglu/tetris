import React, { useEffect, useState } from "react";
import { type Cells, clearRows, generateShuffledShapes, moveTetrominoDown, renderTetromino } from "~/core/game";
import { Tetromino, type TetrominoShape } from "~/core/tetromino";
import GameBoard from "./GameBoard";
import PreviewBoard from "./PreviewBoard";

type GameProps = {
  width: number,
  height: number,
};

const Game = ({
  width,
  height,
}: GameProps) => {
  const spawnPosition = Math.round(width * 1.5 - 1);
  const firstSet = generateShuffledShapes();
  const [isOver, setIsOver] = useState(false);
  const [score, setScore] = useState(0);
  const [nextTetrominoes, setNextTetrominoes] = useState<TetrominoShape[]>(firstSet.slice(1, 7));
  const [actualCells, setActualCells] = useState<Cells>(Array(width * height).fill(null));
  const [renderedCells, setRenderedCells] = useState<Cells>(Array(width * height).fill(null));
  const [currentTetromino, setCurrentTetromino] = useState<Tetromino>(new Tetromino(firstSet[0], spawnPosition, 0, width, height));

  const commit = (tetromino: Tetromino) => {
    setActualCells(cells => clearRows(width, renderTetromino(cells, tetromino), addition => setScore(oldScore => oldScore + addition)));
    const next = nextTetrominoes.shift();
    if (!next) throw new Error("Something went wrong!");
    if (nextTetrominoes.length <= 7) {
      setNextTetrominoes([...nextTetrominoes, ...generateShuffledShapes()]);
    } else {
      setNextTetrominoes([...nextTetrominoes]);
    }
    return next;
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
      setCurrentTetromino(t => moveTetrominoDown(t, actualCells, width, height, commit));
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
        <GameBoard columns={width} rows={height} size={32} cells={renderedCells} />
      </div>
      <div>
        <div>Score {score}</div>
        <PreviewBoard list={nextTetrominoes.slice(0, 3)} />
      </div>
    </>
  );
};

export default Game;
