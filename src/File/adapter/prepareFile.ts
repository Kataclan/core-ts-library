import File from '../entity/File';

export default function prepare(instance: File): any {
  return {
    id: instance.id,
    url: instance.url,
    extension: instance.extension,
    file_size_in_bytes: instance.sizeInBytes,
  };
}
