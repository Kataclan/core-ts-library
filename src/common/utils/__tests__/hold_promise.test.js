import { debounce } from '../debounce';
import holdPromise from '../holdPromise';

jest.setTimeout(3000);

describe('Hold Promise', () => {
  it('Should hold a promise for at least 1 second', async () => {
    async function save() {
      const initial = +new Date();
      await holdPromise(async () => {
        await debounce(100);
      }, 1000);
      const final = +new Date();
      const promiseDuration = final - initial;

      // Depending on the machine that runs the test, the execution time may vary.
      expect(promiseDuration).toBeGreaterThanOrEqual(950);
      expect(promiseDuration).toBeLessThanOrEqual(1050);
    }

    await save();
  });
});
