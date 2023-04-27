import BaseEntity from '../../common/entities/BaseEntity';
import LinkedPass from './LinkedPass';
import { removeFromList, setElementToList } from '../../common/utils/arrays';

export default class LinkedRider extends BaseEntity {
  first_name: string;
  last_name: string;
  birthdate: string;
  linked_passes: LinkedPass[] = [];

  addLinkedPass(linkedPass: LinkedPass) {
    this.linked_passes.push(linkedPass);
  }

  removeLinkedPass(linkedPass: LinkedPass) {
    this.linked_passes = <LinkedPass[]>removeFromList(this.linked_passes, linkedPass);
  }

  setLinkedPass(linkedPass: LinkedPass) {
    this.linked_passes = <LinkedPass[]>setElementToList(this.linked_passes, linkedPass);
  }

  getFullName(): string {
    const pieces = [];
    this.first_name && pieces.push(this.first_name);
    this.last_name && pieces.push(this.last_name);

    return pieces.join(' ');
  }

  static createNew(firstName: string, lastName: string): LinkedRider {
    const linkedRider = new LinkedRider();
    linkedRider.first_name = firstName;
    linkedRider.last_name = lastName;
    return linkedRider;
  }
}
