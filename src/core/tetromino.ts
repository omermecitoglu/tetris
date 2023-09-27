import { COLUMNS } from "./constants";
import { type Cells, checkCollision } from "./game";
import { getBlocks } from "./rotations";
import { checkWallKick } from "./wall-kicks";

export type TetrominoShape = "I" | "O" | "T" | "J" | "L" | "S" | "Z";

export class Tetromino {
  position: number;
  rotation: number;
  shape: TetrominoShape;

  constructor(shape: TetrominoShape, position: number, rotation: number = 0) {
    this.position = position;
    this.rotation = rotation;
    this.shape = shape;
  }

  get color() {
    switch (this.shape) {
      case "I": return "cyan";
      case "O": return "yellow";
      case "T": return "purple";
      case "J": return "blue";
      case "L": return "orange";
      case "S": return "green";
      case "Z": return "red";
    }
  }

  get blocks() {
    return getBlocks(this.shape, this.position, this.rotation);
  }

  pushLeft(cells: Cells) {
    const min = Math.min(...this.blocks.map(b => b % COLUMNS));
    if (min % COLUMNS <= 0) return this;
    const next = new Tetromino(this.shape, this.position - 1, this.rotation);
    return next.willCollide(0, cells) ? this : next;
  }

  pushRight(cells: Cells) {
    const max = Math.max(...this.blocks.map(b => b % COLUMNS));
    if (max % COLUMNS >= COLUMNS - 1) return this;
    const next = new Tetromino(this.shape, this.position + 1, this.rotation);
    return next.willCollide(0, cells) ? this : next;
  }

  rotate(cells: Cells) {
    const wallKick = checkWallKick(this, cells);
    const next = new Tetromino(this.shape, this.position + wallKick, (this.rotation + 1) % 4);
    return next.willCollide(0, cells) ? this : next;
  }

  goDown() {
    return new Tetromino(this.shape, this.position + COLUMNS, this.rotation);
  }

  willCollide(movement: number, cells: Cells) {
    const next = new Tetromino(this.shape, this.position + movement, this.rotation);
    const collision = next.blocks.find(b => checkCollision(b, cells));
    return collision;
  }
}
