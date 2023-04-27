import requestPost from '../../core/api/requestPost';
import Document from '../entity/Document';

export default {
  async upload(physicalFile, marketId) {
    const document = Document.fromPhysicalFile(physicalFile);

    const formData = new FormData();
    formData.append('file', physicalFile, physicalFile.name);
    formData.append(
      'data',
      JSON.stringify({
        id: document.uuid.id,
      })
    );

    const { error } = await requestPost('/files', {
      data: formData,
      headers: {
        MarketId: marketId,
      },
    }).promise();

    if (error) {
      return { error };
    }

    return { data: document };
  },
};
