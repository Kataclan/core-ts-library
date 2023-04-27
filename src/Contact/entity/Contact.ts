import PhoneNumber from '../../PhoneNumber/entity/PhoneNumber';

export default class Contact {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: PhoneNumber = new PhoneNumber();

  getFullName(): string {
    const pieces = [];

    this.firstName && pieces.push(this.firstName);
    this.lastName && pieces.push(this.lastName);

    return pieces.join(' ');
  }
}
