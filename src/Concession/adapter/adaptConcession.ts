import Concession from '../entity/Concession';
import adaptMoney from '../../Money/adapters/adaptMoney';
import DiscountType from '../../Discount/enums/DiscountType';
import PassengerType from '../../PassengerType/entity/PassengerType';
import UUID from '../../UUID/UUID';
import ConcessionValueModifier from '../enums/ConcessionValueModifier';

export default function adaptConcession(json: any, instance: Concession = new Concession()): Concession {
  // Conditionals because the object GIVEN by backend has different format for each
  if (json.amount) {
    instance.type = DiscountType.FIXED_AMOUNT;
    instance.amount = adaptMoney(json.amount);
    instance.value = Math.abs(instance.amount.amount);
    instance.value_modifier =
      json.amount.amount < 0 ? ConcessionValueModifier.MORE_THAN_DEFAULT : ConcessionValueModifier.LESS_THAN_DEFAULT;
  } else if (json.percentage) {
    instance.type = DiscountType.PERCENTAGE;
    instance.percentage.precision = json.percentage.precision;
    instance.value = Math.abs(json.percentage.value / Math.pow(10, json.percentage.precision));
    instance.value_modifier =
      json.percentage.value < 0 ? ConcessionValueModifier.MORE_THAN_DEFAULT : ConcessionValueModifier.LESS_THAN_DEFAULT;
  }

  instance.passenger_type_id = json.passenger_type_id;
  instance.passenger_type = new PassengerType();
  instance.passenger_type.id = json.passenger_type_id;
  instance.passenger_type.uuid = UUID.fromString(json.passenger_type_id);
  return instance;
}
