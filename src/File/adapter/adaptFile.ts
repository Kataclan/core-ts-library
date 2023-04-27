import File from '../entity/File';

export default function adaptFile(json: any, instance: File): File {
  instance.id = json.id;
  instance.url = json.url;
  instance.extension = json.extension;
  instance.sizeInBytes = json.file_size_in_bytes;

  return instance;
}
