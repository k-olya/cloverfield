export const lerp = (start: number, end: number, t: number) =>
  start * (1 - t) + end * t;

export const clamp = (num: number, min = 0, max = 1) =>
  num < min ? min : num > max ? max : num;

// random in range
export const rand = (a: number, b: number) => lerp(a, b, Math.random());
// random integer
export const irand = (x: number) => Math.floor(Math.random() * x);

export const range = (x: number) => Array.from(Array(x).keys());
