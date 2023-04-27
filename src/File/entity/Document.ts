import File from './File';

export default class Document extends File {
  documentType: string;

  static fromPhysicalFile(physicalFile): Document {
    const document = new Document();
    document.name = physicalFile.name;
    document.sizeInBytes = physicalFile.size;
    document.type = physicalFile.type;

    const physicalFileNamePieces = physicalFile.name.split('.');
    document.extension = physicalFileNamePieces[physicalFileNamePieces.length - 1];

    return document;
  }
}
