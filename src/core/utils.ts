export function pickRandom<T>(arr: T[]): T {
  const random = Math.floor(Math.random() * arr.length);
  return arr[random];
}
