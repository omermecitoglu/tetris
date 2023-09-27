import { COLUMNS } from "./constants";
import type { TetrominoShape } from "./tetromino";

const rotations = (p: number, c: number): Record<TetrominoShape, number[][]> => ({
  "I": [
    [p - 1, p, p + 1, p + 2],
    [p - c + 1, p + 1, p + c + 1, p + 2 * c + 1],
    [p + c - 1, p + c, p + c + 1, p + c + 2],
    [p - c, p, p + c, p + 2 * c],
  ],
  "O": [
    [p - c, p - c + 1, p, p + 1],
    [p - c, p - c + 1, p, p + 1],
    [p - c, p - c + 1, p, p + 1],
    [p - c, p - c + 1, p, p + 1],
  ],
  "T": [
    [p - c, p - 1, p, p + 1],
    [p - c, p, p + 1, p + c],
    [p - 1, p, p + 1, p + c],
    [p - c, p - 1, p, p + c],
  ],
  "J": [
    [p - c - 1, p - 1, p, p + 1],
    [p - c, p - c + 1, p, p + c],
    [p - 1, p, p + 1, p + c + 1],
    [p - c, p, p + c - 1, p + c],
  ],
  "L": [
    [p - c + 1, p - 1, p, p + 1],
    [p - c, p, p + c, p + c + 1],
    [p - 1, p, p + 1, p + c - 1],
    [p - c - 1, p - c, p, p + c],
  ],
  "S": [
    [p - c, p - c + 1, p - 1, p],
    [p - c, p, p + 1, p + c + 1],
    [p, p + 1, p + c - 1, p + c],
    [p - c - 1, p - 1, p, p + c],
  ],
  "Z": [
    [p - c - 1, p - c, p, p + 1],
    [p - c + 1, p, p + 1, p + c],
    [p - 1, p, p + c, p + c + 1],
    [p - c, p - 1, p, p + c - 1],
  ],
});

export function getBlocks(shape: TetrominoShape, position: number, rotation: number) {
  return rotations(position, COLUMNS)[shape][rotation];
}
