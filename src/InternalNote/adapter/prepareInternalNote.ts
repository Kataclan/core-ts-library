import InternalNote from '../entity/InternalNote';
import prepareTimestamp from '../../DateTimeZone/adapter/prepareTimestamp';

export default function prepareInternalNote(instance: InternalNote): any {
  return {
    internal_note: instance.text,
    created_at: prepareTimestamp(instance.datetime)
  };
}
