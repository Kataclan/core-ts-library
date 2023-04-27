import initCore from 'src/core/utils/initCore';

describe('Testing rebuild', () => {
  it('should init', async () => {
    initCore({
      hostname: 'https://staging4-newapi.zeelo.co'
    });
  });
});
