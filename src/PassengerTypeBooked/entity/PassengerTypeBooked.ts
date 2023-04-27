import BaseEntity from '../../common/entities/BaseEntity';
import PassengerType from '../../PassengerType/entity/PassengerType';

export default class PassengerTypesBooked extends BaseEntity {
  private _passenger_type: PassengerType;
  private _seats: number;

  get passenger_type(): PassengerType {
    return this._passenger_type;
  }

  set passenger_type(value: PassengerType) {
    this._passenger_type = value;
  }

  get seats(): number {
    return this._seats;
  }

  set seats(value: number) {
    this._seats = value;
  }
}
