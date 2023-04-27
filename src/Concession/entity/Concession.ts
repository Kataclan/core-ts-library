import BaseEntity from '../../common/entities/BaseEntity';
import PassengerType from '../../PassengerType/entity/PassengerType';
import Money from '../../Money/entity/Money';
import DiscountPercentage from '../../Discount/entity/DiscountPercentage';
import DiscountType from '../../Discount/enums/DiscountType';
import clone from '../../common/utils/clone';
import ConcessionValueModifier from '../enums/ConcessionValueModifier';

export default class Concession extends BaseEntity {
  protected _passenger_type: PassengerType;
  protected _passenger_type_id: string;
  protected _type: DiscountType;
  protected _amount: Money = new Money();
  protected _percentage: DiscountPercentage = new DiscountPercentage();
  protected _value: number;
  private _value_modifier: ConcessionValueModifier = ConcessionValueModifier.LESS_THAN_DEFAULT;

  get passenger_type(): PassengerType {
    return this._passenger_type;
  }

  set passenger_type(value: PassengerType) {
    this._passenger_type = value;
  }

  get passenger_type_id(): string {
    return this._passenger_type_id;
  }

  set passenger_type_id(value: string) {
    this._passenger_type_id = value;
  }

  get type(): DiscountType {
    return this._type;
  }

  set type(value: DiscountType) {
    this._type = value;
  }

  get amount(): Money {
    return this._amount;
  }

  set amount(value: Money) {
    this._amount = value;
  }

  get percentage(): DiscountPercentage {
    return this._percentage;
  }

  set percentage(value: DiscountPercentage) {
    this._percentage = value;
  }

  get value() {
    // this._value is the actual input value, regardless the type.
    return this._value;
  }

  set value(value: number) {
    // this._value is the actual input value, regardless the type.
    this._value = value;

    // Then we save that value in both types so the input can render a value regardless the type.
    // Then depending on the discount type the sent value will be one or the other.
    this.amount.amount = value;
    this.percentage.value = value;
  }

  get value_modifier(): ConcessionValueModifier {
    return this._value_modifier;
  }

  set value_modifier(value: ConcessionValueModifier) {
    this._value_modifier = value;
  }

  static fromPassengerType(passengerType: PassengerType): Concession {
    const concession = new Concession();
    concession._passenger_type = passengerType;
    concession._passenger_type_id = passengerType.uuid.id;
    return concession;
  }

  protected isFixedAmount() {
    return this.type === DiscountType.FIXED_AMOUNT;
  }

  protected isPercentageDiscount() {
    return this.type === DiscountType.PERCENTAGE;
  }

  calculateFinalPrice(money: Money): Money {
    const finalPrice = clone(money);

    const baseAmount = +money.amount;

    let priceModifier = 0;
    if (this.type === DiscountType.FIXED_AMOUNT) {
      priceModifier = this.value;
    } else if (this.type === DiscountType.PERCENTAGE) {
      priceModifier = (money.amount * Math.abs(this.value)) / 100;
    }

    if (this.value_modifier === ConcessionValueModifier.MORE_THAN_DEFAULT) {
      finalPrice.amount = baseAmount + Math.abs(priceModifier);
    } else {
      finalPrice.amount = baseAmount - priceModifier;
    }

    return finalPrice;
  }

  static upgradeConcessions(current: Array<Concession>, reference: Array<Concession>): Array<Concession> {
    return reference.map((eachInReference) => {
      const found = current.find(
        (eachInCurrent) => eachInCurrent.passenger_type_id === eachInReference.passenger_type_id
      );

      if (found) {
        return found;
      }

      const newConcession = clone(eachInReference);
      newConcession.value = 0;
      return newConcession;
    });
  }
}
