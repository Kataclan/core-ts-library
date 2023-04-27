import UUID from '../../UUID/UUID';
import BaseEntity from '../entities/BaseEntity';

export function baseAdapter(id: string, instance: BaseEntity): BaseEntity {
  instance.id = id;
  instance.uuid = UUID.fromString(id);
  instance.created = true;

  return instance;
}
