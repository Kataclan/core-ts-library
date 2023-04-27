import PhoneNumber from '../../PhoneNumber/entity/PhoneNumber';
import BaseEntity from '../../common/entities/BaseEntity';

export default class Follower extends BaseEntity {
  private _name: string;
  private _surname: string;
  private _email: string;
  private _phone: PhoneNumber;

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get surname(): string {
    return this._surname;
  }

  set surname(value: string) {
    this._surname = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get phone(): PhoneNumber {
    return this._phone;
  }

  set phone(value: PhoneNumber) {
    this._phone = value;
  }

  getFullName() {
    const arr = [];
    this.name && arr.push(this.name);
    this.surname && arr.push(this.surname);
    return arr.join(' ');
  }

  getInitials(glue: string = '') {
    const pieces = [];
    pieces.push(this.name[0]);
    pieces.push(this.surname[0]);

    return pieces.join(glue);
  }
}
