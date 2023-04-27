import StorageProvider from '../enums/StorageProvider';
import { baseAdapter } from '../../common/adapters/baseAdapter';
import Document from '../entity/Document';

interface documentType {
  id: string;
  url: string;
  filename: string;
  file_size_in_bytes: number;
  storage_provider: StorageProvider;
  extension: string;
  document_type: string;
}

export default function adaptDocument(json: documentType, instance: Document = new Document()): Document {
  baseAdapter(json.id, instance);
  instance.url = json.url;
  instance.name = json.filename;
  instance.extension = json.extension;
  instance.sizeInBytes = json.file_size_in_bytes;
  instance.storageProvider = json.storage_provider;
  instance.documentType = json.document_type;

  return instance;
}
