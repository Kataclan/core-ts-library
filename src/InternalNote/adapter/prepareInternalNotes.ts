import InternalNoteType from '../types/InternalNoteType';
import prepareInternalNote from './prepareInternalNote';

export default function prepareInternalNotes(instance: InternalNoteType | any): any {
  return {
    internal_notes: instance.internalNotes.map((each) => prepareInternalNote(each)),
  };
}
