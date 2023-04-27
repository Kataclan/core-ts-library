import Money from 'src/Money/entity/Money';
import Currency from 'src/Currency/entity/Currency';
import Concession from 'src/Concession/entity/Concession';
import DiscountType from 'src/Discount/enums/DiscountType';
import clone from 'src/common/utils/clone';
import ConcessionValueModifier from '../enums/ConcessionValueModifier';

describe('Concessions', () => {
  it('Should calculate x fixed amount more', () => {
    const value = Money.getNew(10, Currency.getNew('GBP', 'GBP', 'L', 2, 'gb'));

    const concession = new Concession();
    concession.type = DiscountType.FIXED_AMOUNT;
    concession.value = 5;
    concession.value_modifier = ConcessionValueModifier.LESS_THAN_DEFAULT;
    expect(concession.calculateFinalPrice(value).amount).toBe(5);
  });

  it('Should calculate x fixed amount less', () => {
    const value = Money.getNew(10, Currency.getNew('GBP', 'GBP', 'L', 2, 'gb'));

    const concession = new Concession();
    concession.type = DiscountType.FIXED_AMOUNT;
    concession.value = 5;
    concession.value_modifier = ConcessionValueModifier.MORE_THAN_DEFAULT;
    expect(concession.calculateFinalPrice(value).amount).toBe(15);
  });

  it('Should calculate x percentage more', () => {
    const value = Money.getNew(10, Currency.getNew('GBP', 'GBP', 'L', 2, 'gb'));

    const concession = new Concession();
    concession.type = DiscountType.PERCENTAGE;
    concession.value = 5;
    concession.value_modifier = ConcessionValueModifier.LESS_THAN_DEFAULT;
    expect(concession.calculateFinalPrice(value).amount).toBe(9.5);
  });

  it('Should calculate x percentage less', () => {
    const value = Money.getNew(10, Currency.getNew('GBP', 'GBP', 'L', 2, 'gb'));

    const concession = new Concession();
    concession.type = DiscountType.PERCENTAGE;
    concession.value = 5;
    concession.value_modifier = ConcessionValueModifier.MORE_THAN_DEFAULT;
    expect(concession.calculateFinalPrice(value).amount).toBe(10.5);
  });

  it('Should return upgraded concessions based on reference', () => {
    const concession1 = new Concession();
    concession1.passenger_type_id = 1;
    concession1.value = 15;
    concession1.value_modifier = ConcessionValueModifier.LESS_THAN_DEFAULT;

    const concession2 = new Concession();
    concession2.passenger_type_id = 2;
    concession2.value = 2;
    concession2.value_modifier = ConcessionValueModifier.MORE_THAN_DEFAULT;

    const concession3 = new Concession();
    concession3.passenger_type_id = 3;
    concession3.value = 12;
    concession3.value_modifier = ConcessionValueModifier.MORE_THAN_DEFAULT;

    const reference = [concession1, concession2];
    const current = [concession3];

    const expectedConcession1 = clone(concession1);
    expectedConcession1.passenger_type_id = 1;
    expectedConcession1.value = 0;

    const expectedConcession2 = clone(concession2);
    expectedConcession2.passenger_type_id = 2;
    expectedConcession2.value = 0;

    expect(Concession.upgradeConcessions(current, reference)).toMatchObject([expectedConcession1, expectedConcession2]);
  });
});
