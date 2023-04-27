export function divideAndSpreadRemainder(amount) {
  const roundDown = Math.floor((+amount / 2) * 100) / 100;
  const roundUp = (+amount / 2 + 0.004).toFixed(2);

  return [+roundDown, +roundUp, +amount / 2];
}
