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
}
