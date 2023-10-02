export function getGravity(level: number): number {
  switch (true) {
    case (level === 0): return 48;
    case (level === 1): return 43;
    case (level === 2): return 38;
    case (level === 3): return 33;
    case (level === 4): return 28;
    case (level === 5): return 23;
    case (level === 6): return 18;
    case (level === 7): return 13;
    case (level === 8): return 8;
    case (level === 9): return 6;
    case (level < 13): return 5;
    case (level < 16): return 4;
    case (level < 19): return 3;
    case (level < 29): return 2;
    default: return 1;
  }
}
