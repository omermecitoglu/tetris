type TetrominoShape = "I" | "O" | "T" | "J" | "L" | "S" | "Z";

export class Tetromino {
  position: number;
  rotation: number;
  shape: TetrominoShape;

  constructor(shape: TetrominoShape, position: number) {
    this.position = position;
    this.rotation = 0;
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
    return [
      this.position - 11,
      this.position - 1,
      this.position,
      this.position + 1,
    ];
  }

  pushLeft() {
    const min = Math.min(...this.blocks);
    if (min % 10 <= 0) return this;
    return new Tetromino(this.shape, this.position - 1);
  }

  pushRight() {
    const max = Math.max(...this.blocks);
    if (max % 10 > 8) return this;
    return new Tetromino(this.shape, this.position + 1);
  }
}
