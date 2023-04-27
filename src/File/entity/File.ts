import BaseEntity from '../../common/entities/BaseEntity';
import StorageProvider from '../enums/StorageProvider';

export default abstract class File extends BaseEntity {
  url: string;
  name: string;
  type: string;
  extension: string;
  sizeInBytes: number;
  storageProvider: StorageProvider;
}
