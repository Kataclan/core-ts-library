import Concession from '../entity/Concession';
import prepareMoney from '../../Money/adapters/prepareMoney';
import DiscountType from '../../Discount/enums/DiscountType';
import Money from '../../Money/entity/Money';
import ConcessionValueModifier from '../enums/ConcessionValueModifier';

export default function prepareConcession(instance: Concession): any {
  let concessionPricePrepared;

  if (instance.type === DiscountType.PERCENTAGE) {
    concessionPricePrepared = {
      percentage: {
        value:
          Math.abs(instance.percentage.value) *
          (instance.value_modifier === ConcessionValueModifier.LESS_THAN_DEFAULT ? 1 : -1) *
          Math.pow(10, instance.percentage.precision),
        precision: instance.percentage.precision,
      },
    };
  } else if (instance.type === DiscountType.FIXED_AMOUNT) {
    concessionPricePrepared = {
      amount: prepareMoney(
        Money.getNew(
          Math.abs(instance.amount.amount) *
            (instance.value_modifier === ConcessionValueModifier.LESS_THAN_DEFAULT ? 1 : -1),
          instance.amount.currency
        )
      ),
    };
  }

  return {
    passenger_type_id: instance.passenger_type ? instance.passenger_type.id : instance.passenger_type_id,
    ...concessionPricePrepared,
  };
}
