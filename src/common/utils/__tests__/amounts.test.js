import { divideAndSpreadRemainder } from 'src/common/utils/amounts';

describe('Amount utils', () => {
  it('Should round down and up a number divided by 2, returning 2 different amounts for both outbound and inbound.', () => {
    const [down, up, actual] = divideAndSpreadRemainder(1.75);
    expect(down).toBe(0.87);
    expect(up).toBe(0.88);
    expect(actual).toBe(0.875);
  });
});
