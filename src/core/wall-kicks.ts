import { COLUMNS } from "./constants";
import { type Cells, checkCollision } from "./game";
import type { Tetromino } from "./tetromino";

export function checkWallKick(tetromino: Tetromino, cells: Cells) {
  switch (tetromino.shape) {
    case "I": {
      const row = tetromino.blocks[0] % COLUMNS;
      if (tetromino.rotation === 1) {
        if (row === 0 || checkCollision(tetromino.position + COLUMNS - 1, cells) || checkCollision(tetromino.position + COLUMNS, cells)) {
          return 2;
        }
        if (row === 1 || checkCollision(tetromino.position + COLUMNS, cells)) {
          return 1;
        }
        if (row === COLUMNS - 1 || checkCollision(tetromino.position + COLUMNS + 2, cells)) {
          return -1;
        }
      }
      if (tetromino.rotation === 3) {
        if (row === 0 || checkCollision(tetromino.position - 1, cells)) {
          return 1;
        }
        if (checkCollision(tetromino.position + 1, cells)) {
          return -1;
        }
        if (row === COLUMNS - 1 || checkCollision(tetromino.position + 2, cells) || checkCollision(tetromino.position + 1, cells)) {
          return -2;
        }
      }
      return 0;
    }
    case "T":
    case "J":
    case "L":
    case "S":
    case "Z": {
      const row = tetromino.position % COLUMNS;
      if (row === 0) {
        return 1;
      }
      if (row === COLUMNS - 1) {
        return -1;
      }
      if (tetromino.rotation === 1 && checkCollision(tetromino.position + COLUMNS - 1, cells)) {
        return 1;
      }
      if (tetromino.rotation === 3 && checkCollision(tetromino.position - COLUMNS + 1, cells)) {
        return -1;
      }
      return 0;
    }
    default: return 0;
  }
}
