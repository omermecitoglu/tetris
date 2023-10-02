import React, { useCallback, useEffect, useRef, useState } from "react";
import { type Grid, clearRows, generateShuffledShapes, moveTetrominoDown, renderTetromino } from "~/core/game";
import { getGravity } from "~/core/gravity";
import { Tetromino, type TetrominoShape } from "~/core/tetromino";
import useAnimationFrame from "~/hooks/animation";
import { useArrowKeys, useSpaceKey } from "~/hooks/controls";
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
  const [isOver, setIsOver] = useState(false);
  const [clearedLines, setClearedLines] = useState(0);
  const level = Math.floor(clearedLines / 10);
  const [commitedGrid, setCommitedGrid] = useState<Grid>([]);
  const [renderedGrid, setRenderedGrid] = useState<Grid>([]);
  const [currentTetromino, setCurrentTetromino] = useState<Tetromino | null>(null);
  const [nextTetrominoes, setNextTetrominoes] = useState<TetrominoShape[]>([]);
  const totalFrames = useRef(0);
  const [left, right, up, down] = useArrowKeys();
  const space = useSpaceKey();

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
    setCommitedGrid(g => {
      return clearRows(width, renderTetromino(g, tetromino), addition => {
        return setClearedLines(oldScore => oldScore + addition);
      });
    });
    return fetchNextTetromino();
  };

  const updateTetromino = (getMutatedTetromino: (lastTetromino: Tetromino) => Tetromino) => {
    if (isOver || !commitedGrid.length || !currentTetromino) return;
    setCurrentTetromino(t => t && getMutatedTetromino(t));
  };

  useEffect(() => {
    const emptyGrid = Array(width * height).fill(null);
    const spawnPosition = Math.round(width * 1.5 - 1);
    const firstSet = generateShuffledShapes();
    setClearedLines(0);
    setCommitedGrid(emptyGrid);
    const firstTetromino = firstSet.shift();
    if (firstTetromino) {
      setCurrentTetromino(new Tetromino(firstTetromino, spawnPosition, 0, width, height));
    }
    setNextTetrominoes(firstSet);
    return () => {
      setClearedLines(0);
      setCommitedGrid([]);
      setRenderedGrid([]);
      setCurrentTetromino(null);
      setNextTetrominoes([]);
    };
  }, [width, height]);

  useEffect(() => {
    if (!commitedGrid.length || !currentTetromino) return ;
    setRenderedGrid(renderTetromino(commitedGrid, currentTetromino));
  }, [currentTetromino, commitedGrid]);

  useEffect(() => {
    if (up) {
      updateTetromino(t => t.rotate(commitedGrid));
    }
  }, [up]);

  useEffect(() => {
    if (space) {
      updateTetromino(t => t.getShadow(commitedGrid));
    }
  }, [space]);

  const animationCallback = useCallback(
    (frame: number) => {
      if (isOver) return;
      if (currentTetromino?.willCollide(0, commitedGrid)) {
        return setIsOver(true);
      }
      if (left && !right && frame % 6 === 0) {
        updateTetromino(t => t.pushLeft(commitedGrid));
      }
      if (right && !left && frame % 6 === 0) {
        updateTetromino(t => t.pushRight(commitedGrid));
      }
      totalFrames.current++;
      if (totalFrames.current % Math.min(getGravity(level), down ? 4 : 60) === 0) {
        updateTetromino(t => moveTetrominoDown(t, commitedGrid, width, height, commit));
      }
    },
    [left, right, down, commitedGrid, level, isOver],
  );

  useAnimationFrame(animationCallback);

  return (
    <>
      <div>
        <GameBoard columns={width} rows={height} size={32} grid={renderedGrid} />
      </div>
      <div>
        {isOver && <h1>GAME OVER</h1>}
        <div>Level: {level}</div>
        <div>Score: {clearedLines}</div>
        <PreviewBoard list={nextTetrominoes.slice(0, 3)} />
      </div>
    </>
  );
};

export default Game;
