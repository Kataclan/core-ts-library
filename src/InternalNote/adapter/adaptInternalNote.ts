import InternalNote from '../entity/InternalNote';
import adaptTimestamp from '../../DateTimeZone/adapter/adaptTimestamp';
import { baseAdapter } from '../../common/adapters/baseAdapter';

export default function adaptInternalNote(json: any, instance: InternalNote = new InternalNote()): InternalNote {
  baseAdapter(json.id, instance);
  instance.text = json.internal_note;
  instance.datetime = adaptTimestamp(json.created_at);
  return instance;
}
