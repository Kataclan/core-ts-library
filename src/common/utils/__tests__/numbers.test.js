import { divideAmountEqually, isInteger } from '../numbers';

describe('Number utils', () => {
  describe('isInteger()', () => {
    it('should return whether it is a number or not', () => {
      expect(isInteger(0)).toBeTruthy();
      expect(isInteger('0')).toBeTruthy();

      expect(isInteger(1)).toBeTruthy();
      expect(isInteger('1')).toBeTruthy();

      expect(isInteger(2)).toBeTruthy();
      expect(isInteger('2')).toBeTruthy();

      expect(isInteger(null)).toBeFalsy();
      expect(isInteger(undefined)).toBeFalsy();
      expect(isInteger('')).toBeFalsy();
      expect(isInteger('hola')).toBeFalsy();
      expect(isInteger('h0l4')).toBeFalsy();
    });

    it('should validate with Number.methods', () => {
      expect(Number(null)).toBe(0);
      expect(Number(undefined)).toBeNaN();
      expect(Number('')).toBe(0);
      expect(Number('hola')).toBeNaN();
      expect(Number('h0l4')).toBeNaN();
      expect(Number(NaN)).toBeNaN();
    });

    it('should validate with Number.isNumber', () => {
      expect(Number.isInteger(0)).toBeTruthy();
      expect(Number.isInteger(1)).toBeTruthy();
      expect(Number.isInteger(2)).toBeTruthy();
      expect(Number.isInteger('')).toBeFalsy();
      expect(Number.isInteger('hola')).toBeFalsy();
      expect(Number.isInteger('h0l4')).toBeFalsy();
      expect(Number.isInteger(null)).toBeFalsy();
      expect(Number.isInteger(undefined)).toBeFalsy();
      expect(Number.isInteger(NaN)).toBeFalsy();
    });
  });

  describe('divideAmountEqually()', () => {
    it('should split value correctly for an exact division', () => {
      const value = 33.34;
      const nItems = 2;

      const result = divideAmountEqually(value, nItems);
      let total1 = 0;
      result.forEach((item) => {
        expect(item).toBe(16.67);
        total1 += item;
      });
      expect(total1).toBe(value);

      const value2 = 10;
      const nItems2 = 5;
      let total2 = 0;

      const result2 = divideAmountEqually(value2, nItems2);
      result2.forEach((item) => {
        expect(item).toBe(2);
        total2 += item;
      });
      expect(total2).toBe(value2);
    });

    it('should split value correctly for an non exact division', () => {
      const value = 3200;
      const nItems = 3;
      const result = divideAmountEqually(value, nItems);

      result.forEach((item, i) => {
        if (i === 0) {
          expect(item).toBe(1066.68);
        } else {
          expect(item).toBe(1066.66);
        }
      });

      const value2 = 100;
      const nItems2 = 6;
      const result2 = divideAmountEqually(value2, nItems2);

      result2.forEach((item, i) => {
        if (i === 0) {
          expect(item).toBe(16.7);
        } else {
          expect(item).toBe(16.66);
        }
      });
      const value3 = 100;
      const nItems3 = 12;
      const result3 = divideAmountEqually(value3, nItems3);
      result3.forEach((item, i) => {
        if (i === 0) {
          expect(item).toBe(8.37);
        } else {
          expect(item).toBe(8.33);
        }
      });
    });
  });
});
