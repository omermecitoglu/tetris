import { type Cells, checkCollision } from "./game";
import { getBlocks } from "./rotations";
import { checkWallKick } from "./wall-kicks";

export type TetrominoShape = "I" | "O" | "T" | "J" | "L" | "S" | "Z";

export class Tetromino {
  position: number;
  rotation: number;
  shape: TetrominoShape;
  boardWidth: number;
  boardHeight: number;

  constructor(shape: TetrominoShape, position: number, rotation: number, boardWidth: number, boardHeight: number) {
    this.position = position;
    this.rotation = rotation;
    this.shape = shape;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
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
    return getBlocks(this.shape, this.position, this.rotation, this.boardWidth);
  }

  clone() {
    return new Tetromino(this.shape, this.position, this.rotation, this.boardWidth, this.boardHeight);
  }

  pushLeft(cells: Cells) {
    const min = Math.min(...this.blocks.map(b => b % this.boardWidth));
    if (min % this.boardWidth <= 0) return this;
    const clone = this.clone();
    clone.position--;
    return clone.willCollide(0, cells) ? this : clone;
  }

  pushRight(cells: Cells) {
    const max = Math.max(...this.blocks.map(b => b % this.boardWidth));
    if (max % this.boardWidth >= this.boardWidth - 1) return this;
    const clone = this.clone();
    clone.position++;
    return clone.willCollide(0, cells) ? this : clone;
  }

  rotate(cells: Cells) {
    const wallKick = checkWallKick(this, cells, this.boardWidth, this.boardHeight);
    const clone = this.clone();
    clone.position += wallKick;
    clone.rotation = (this.rotation + 1) % 4;
    return clone.willCollide(0, cells) ? this : clone;
  }

  goDown() {
    const clone = this.clone();
    clone.position += clone.boardWidth;
    return clone;
  }

  willCollide(movement: number, cells: Cells) {
    const clone = this.clone();
    clone.position += movement;
    return clone.blocks.find(b => checkCollision(b, cells, clone.boardWidth, clone.boardHeight));
  }
}
