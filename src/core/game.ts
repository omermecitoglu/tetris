import { Tetromino, type TetrominoShape } from "./tetromino";
import { shuffle } from "./utils";

export type Cells = Array<string | null>;

export function generateShuffledShapes(): TetrominoShape[] {
  return shuffle(["I", "O", "T", "J", "L", "S", "Z"]);
}

export function renderTetromino(cells: Cells, tetromino: Tetromino): Cells {
  return cells.map((cell, index) => tetromino.blocks.includes(index) ? tetromino.color : cell);
}

export function checkCollision(block: number, cells: Cells, columns: number, rows: number) {
  if (block >= rows * columns) return true;
  if (cells[block] !== null) return true;
  return false;
}

export function moveTetrominoDown(tetromino: Tetromino, cells: Cells, columns: number, rows: number, commit: (t: Tetromino) => TetrominoShape) {
  if (tetromino.willCollide(columns, cells)) {
    const spawnPosition = Math.round(columns * 1.5 - 1);
    const nextShape = commit(tetromino);
    return new Tetromino(nextShape, spawnPosition, 0, columns, rows);
  }
  return tetromino.goDown();
}

export function clearRows(columns: number, cells: Cells, addScore: (score: number) => void): Cells {
  let score = 0;
  const rows = [];
  while (cells.length) {
    const row = cells.splice(0, columns);
    const index = row.findIndex(cell => cell === null);
    if (index === -1) {
      score++;
      rows.unshift(Array(columns).fill(null));
    } else {
      rows.push(row);
    }
  }
  addScore(score);
  return rows.flat();
}
