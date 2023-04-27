export function isInteger(number) {
  if (number !== '' && number !== null && number !== undefined) {
    return Number.isInteger(Number(number));
  }

  return false;
}

export function isExactDivision(dividend, divisor) {
  if (divisor === 0) {
    throw new Error('Divisor cannot be 0');
  }

  if (dividend % divisor === 0) {
    return true;
  }

  const decimals = [];
  let remainder = dividend % divisor;
  while (remainder !== 0 && !decimals.includes(remainder)) {
    decimals.push(remainder);
    remainder = (remainder * 10) % divisor;
  }

  return remainder === 0;
}

export function divideAmountEqually(amount, nItems) {
  const remainder = ((amount * 100) % nItems) / 100;
  const eachItemWithoutDecimals = (amount - remainder) / nItems;
  const resultExactDivision = Array(nItems).fill(eachItemWithoutDecimals);

  if (remainder !== 0) {
    const decimals = Math.trunc((remainder * 100) / nItems / 100);

    let totalWithDecimals = 0.0;
    const resultUnExactDivision = resultExactDivision.map((eachItemWithoutDecimals) => {
      const floatItem = parseFloat((eachItemWithoutDecimals + decimals).toFixed(2));
      totalWithDecimals += floatItem;
      return floatItem;
    });

    const decimalReminder = parseFloat((amount - totalWithDecimals).toFixed(2));
    resultUnExactDivision[0] += decimalReminder;
    return resultUnExactDivision;
  }
  return resultExactDivision;
}
