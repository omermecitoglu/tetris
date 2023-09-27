import { COLUMNS, ROWS, SPAWN_POSITION } from "./constants";
import { Tetromino, type TetrominoShape } from "./tetromino";
import { pickRandom } from "./utils";

export type Cells = Array<string | null>;

const shapes: TetrominoShape[] = ["I", "O", "T", "J", "L", "S", "Z"];

export function renderTetromino(cells: Cells, tetromino: Tetromino): Cells {
  return cells.map((cell, index) => tetromino.blocks.includes(index) ? tetromino.color : cell);
}

export function checkCollision(block: number, cells: Cells) {
  if (block >= ROWS * COLUMNS) return true;
  if (cells[block] !== null) return true;
  return false;
}

export function moveTetrominoDown(tetromino: Tetromino, cells: Cells, commit: (t: Tetromino) => void) {
  if (tetromino.willCollide(COLUMNS, cells)) {
    commit(tetromino);
    return new Tetromino(pickRandom(shapes), SPAWN_POSITION);
  }
  return tetromino.goDown();
}

export function clearRows(cells: Cells, addScore: (score: number) => void): Cells {
  let score = 0;
  const rows = [];
  while (cells.length) {
    const row = cells.splice(0, COLUMNS);
    const index = row.findIndex(cell => cell === null);
    if (index === -1) {
      score++;
      rows.unshift(Array(COLUMNS).fill(null));
    } else {
      rows.push(row);
    }
  }
  addScore(score);
  return rows.flat();
}
