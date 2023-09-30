import React, { useEffect, useState } from "react";
import { type Grid, clearRows, generateShuffledShapes, moveTetrominoDown, renderTetromino } from "~/core/game";
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
  const level = 1;
  const speed = (0.8 - ((level - 1) * 0.007)) * 1000;
  const [isOver, setIsOver] = useState(false);
  const [score, setScore] = useState(0);
  const [turbo, setTurbo] = useState(false);
  const [commitedGrid, setCommitedGrid] = useState<Grid | null>(null);
  const [renderedGrid, setRenderedGrid] = useState<Grid | null>(null);
  const [currentTetromino, setCurrentTetromino] = useState<Tetromino | null>(null);
  const [nextTetrominoes, setNextTetrominoes] = useState<TetrominoShape[]>([]);

  const fetchNextTetromino = () => {
    const next = nextTetrominoes.shift();
    if (!next) throw new Error("Something went wrong!");
    if (nextTetrominoes.length <= 7) {
      setNextTetrominoes([...nextTetrominoes, ...generateShuffledShapes()]);
    } else {
      setNextTetrominoes([...nextTetrominoes]);
    }
    return next;
  };

  const commit = (tetromino: Tetromino) => {
    setCommitedGrid(g => g && clearRows(width, renderTetromino(g, tetromino), addition => setScore(oldScore => oldScore + addition)));
    return fetchNextTetromino();
  };

  useEffect(() => {
    const emptyGrid = Array(width * height).fill(null);
    const spawnPosition = Math.round(width * 1.5 - 1);
    const firstSet = generateShuffledShapes();
    setScore(0);
    setCommitedGrid(emptyGrid);
    const firstTetromino = firstSet.shift();
    if (firstTetromino) {
      setCurrentTetromino(new Tetromino(firstTetromino, spawnPosition, 0, width, height));
    }
    setNextTetrominoes(firstSet);
    return () => {
      setScore(0);
      setCommitedGrid(null);
      setRenderedGrid(null);
      setCurrentTetromino(null);
      setNextTetrominoes([]);
    };
  }, [width, height]);

  useEffect(() => {
    if (!commitedGrid || !currentTetromino) return ;
    setRenderedGrid(renderTetromino(commitedGrid, currentTetromino));
  }, [currentTetromino, commitedGrid]);

  useEffect(() => {
    if (isOver) return alert("Game Over");
    if (!commitedGrid || !currentTetromino) return;

    if (currentTetromino.willCollide(0, commitedGrid)) {
      return setIsOver(true);
    }

    const timer = setInterval(() => {
      setCurrentTetromino(t => t && moveTetrominoDown(t, commitedGrid, width, height, commit));
    }, turbo ? 50 : speed);

    const keyDownListener = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setCurrentTetromino(t => t && t.pushLeft(commitedGrid));
      }
      if (e.key === "ArrowRight") {
        setCurrentTetromino(t => t && t.pushRight(commitedGrid));
      }
      if (e.key === "ArrowUp" && !e.repeat) {
        setCurrentTetromino(t => t && t.rotate(commitedGrid));
      }
      if (e.key === "ArrowDown" && !e.repeat) {
        setTurbo(true);
      }
      if (e.key === " " && !e.repeat) {
        setCurrentTetromino(t => t && t.getShadow(commitedGrid));
      }
    };
    document.body.addEventListener("keydown", keyDownListener);

    const keyUpListener = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" && !e.repeat) {
        setTurbo(false);
      }
    };
    document.body.addEventListener("keyup", keyUpListener);

    return () => {
      clearInterval(timer);
      document.body.removeEventListener("keydown", keyDownListener);
      document.body.removeEventListener("keyup", keyUpListener);
    };
  }, [isOver, commitedGrid, turbo]);

  return (
    <>
      <div>
        {commitedGrid &&
          <GameBoard columns={width} rows={height} size={32} grid={renderedGrid ?? commitedGrid} />
        }
      </div>
      <div>
        <div>Score {score}</div>
        <PreviewBoard list={nextTetrominoes.slice(0, 3)} />
      </div>
    </>
  );
};

export default Game;
