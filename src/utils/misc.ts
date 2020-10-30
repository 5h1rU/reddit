/**
 * Converts numbers e.g. 1000 -> 1k
 */
export function kFormatter(num: number): string | number {
  if (Math.abs(num) > 999) {
    let n = Math.sign(num) * (Math.abs(num) / 1000);
    return n.toFixed(1) + "k";
  } else {
    return Math.sign(num) * Math.abs(num);
  }
}
