import BaseEntity from '../../common/entities/BaseEntity';
import PhoneNumber from '../../PhoneNumber/entity/PhoneNumber';
import Vehicle from '../../Vehicle/entity/Vehicle';
import Driver from '../../Driver/entity/Driver';
import Market from '../../Market/entity/Market';
import InternalNote from '../../InternalNote/entity/InternalNote';
import Document from '../../File/entity/Document';

export default class Supplier extends BaseEntity {
  market: Market;
  internalNotes: Array<InternalNote> = [];

  name = '';
  phones: Array<PhoneNumber> = [];
  address_line_1 = '';
  address_line_2 = '';
  address_line_3 = '';
  postcode = '';
  vehicles: Array<Vehicle> = [];
  drivers: Array<Driver> = [];

  mpocName = '';
  mpocEmail = '';
  mpocPhone: PhoneNumber = new PhoneNumber();

  mpocQuotesName = '';
  mpocQuotesEmail = '';
  mpocQuotesPhone: PhoneNumber = new PhoneNumber();

  files: Document[] = [];

  addInternalNote(internalNote: InternalNote) {
    this.internalNotes.push(internalNote);
  }

  removeInternalNote(internalNoteId: string) {
    const index = this.internalNotes.findIndex((eachInternalNote) => {
      return eachInternalNote.uuid.id === internalNoteId;
    });

    this.internalNotes.splice(index, 1);
  }

  hasInternalNotes(): boolean {
    return this.internalNotes.length > 0;
  }

  getCertificateOfInsuranceDocument(): Document {
    return this.files.find((each: Document) => each.documentType === 'certificate_of_insurance');
  }
}
