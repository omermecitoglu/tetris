export class Tetromino {
  position: number;
  rotation: number;
  color: string;

  constructor(position: number) {
    this.position = position;
    this.rotation = 0;
    this.color = "red";
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
    return new Tetromino(this.position - 1);
  }

  pushRight() {
    const max = Math.max(...this.blocks);
    if (max % 10 > 8) return this;
    return new Tetromino(this.position + 1);
  }
}
