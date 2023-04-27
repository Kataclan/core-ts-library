import { resolvePromiseAllSequentially } from 'src/common/utils/resolvePromises';

const debounce = (ms) => {
  return new Promise((res) => {
    setTimeout(() => {
      // eslint-disable-next-line no-console
      console.log(`Resolved in ${ms}ms`);
      res(ms);
    }, ms);
  });
};

jest.setTimeout(20000);

describe('Resolve Promises Sequentially', () => {
  it('Should successfully resolve all the promises', async () => {
    async function save() {
      const promises = [];

      promises.push(async () => debounce(100));
      promises.push(async () => debounce(200));
      promises.push(async () => debounce(150));
      promises.push(async () => debounce(300));

      // Parallel
      // await Promise.all(promises.map(each => each.promise()));

      // Sequence
      const responses = await resolvePromiseAllSequentially(promises);
      expect(responses[0]).toBe(100);
      expect(responses[1]).toBe(200);
      expect(responses[2]).toBe(150);
      expect(responses[3]).toBe(300);
    }

    await save();
  });

  it('Should successfully resolve all the promises but 1 and return all messages', async () => {
    async function save() {
      const promises = [];

      promises.push(async () => debounce(100));
      promises.push(async () => debounce(200));
      promises.push(async () => ({ error: 'Unknown' }));
      promises.push(async () => debounce(300));

      // Parallel
      // await Promise.all(promises.map(each => each.promise()));

      // Sequence
      const responses = await resolvePromiseAllSequentially(promises);
      expect(responses[0]).toBe(100);
      expect(responses[1]).toBe(200);
      expect(responses[2]).toMatchObject({ error: 'Unknown' });
      expect(responses[3]).toBe(300);
    }

    await save();
  });

  it('Should return error after successfully resolving 2 promises and seeing the 3rd fail', async () => {
    async function save() {
      const promises = [];

      promises.push(async () => debounce(100));
      promises.push(async () => debounce(200));
      promises.push(async () => ({ error: 'Unknown' }));
      promises.push(async () => debounce(300));

      // Parallel
      // await Promise.all(promises.map(each => each.promise()));

      // Sequence
      const responses = await resolvePromiseAllSequentially(promises, true);
      expect(responses[0]).toMatchObject({ error: 'Unknown' });
    }

    await save();
  });
});
