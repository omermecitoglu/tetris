import { type Grid, checkCollision } from "./game";
import type { Tetromino } from "./tetromino";

export function checkWallKick(tetromino: Tetromino, grid: Grid, columns: number, rows: number) {
  switch (tetromino.shape) {
    case "I": {
      const row = tetromino.blocks[0] % columns;
      if (tetromino.rotation === 1) {
        if (row === 0 || checkCollision(tetromino.position + columns - 1, grid, columns, rows) || checkCollision(tetromino.position + columns, grid, columns, rows)) {
          return 2;
        }
        if (row === 1 || checkCollision(tetromino.position + columns, grid, columns, rows)) {
          return 1;
        }
        if (row === columns - 1 || checkCollision(tetromino.position + columns + 2, grid, columns, rows)) {
          return -1;
        }
      }
      if (tetromino.rotation === 3) {
        if (row === 0 || checkCollision(tetromino.position - 1, grid, columns, rows)) {
          return 1;
        }
        if (checkCollision(tetromino.position + 1, grid, columns, rows)) {
          return -1;
        }
        if (row === columns - 1 || checkCollision(tetromino.position + 2, grid, columns, rows) || checkCollision(tetromino.position + 1, grid, columns, rows)) {
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
      const row = tetromino.position % columns;
      if (row === 0) {
        return 1;
      }
      if (row === columns - 1) {
        return -1;
      }
      if (tetromino.rotation === 1 && checkCollision(tetromino.position + columns - 1, grid, columns, rows)) {
        return 1;
      }
      if (tetromino.rotation === 3 && checkCollision(tetromino.position - columns + 1, grid, columns, rows)) {
        return -1;
      }
      return 0;
    }
    default: return 0;
  }
}
