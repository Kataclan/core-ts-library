import findCurrencyByIsoCode from 'src/Currency/utils/findCurrencyByIsoCode';
import prepareMoney from 'src/Money/adapters/prepareMoney';
import Money from 'src/Money/entity/Money';

describe('Money', () => {
  it('Should prepare a Money with "" amount into null', () => {
    const money = Money.getNew('', findCurrencyByIsoCode('GBP'));
    expect(prepareMoney(money)).toBeNull();
  });

  it('Should prepare a Money with null amount into null', () => {
    const money = Money.getNew(null, findCurrencyByIsoCode('GBP'));
    expect(prepareMoney(money)).toBeNull();
  });

  it('Should prepare a Money as null into null', () => {
    expect(prepareMoney(null)).toBeNull();
  });

  it('Should prepare a Money as null into null', () => {
    expect(prepareMoney(null)).toBeNull();
  });

  it('Should prepare a Money with 0 amount into JSON', () => {
    const money = Money.getNew(0, findCurrencyByIsoCode('GBP'));
    expect(prepareMoney(money)).toMatchObject({
      amount: 0,
      currency: 'GBP',
      currency_iso: 'GBP',
      currency_name: 'GBP',
    });
  });
});
