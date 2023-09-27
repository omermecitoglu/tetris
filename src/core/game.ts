import type { Tetromino } from "./tetromino";

export type Cells = Array<string | null>;

export function renderTetromino(cells: Cells, tetromino: Tetromino): Cells {
  return cells.map((cell, index) => tetromino.blocks.includes(index) ? tetromino.color : cell);
}
