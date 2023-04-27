import prepareImage from '../adapter/prepareImage';
import requestPost from '../../core/api/requestPost';
import promesify from '../../core/utils/promesify';
import requestGet from '../../core/api/requestGet';
import adaptImage from '../adapter/adaptImage';
import Image from '../entity/Image';

function uploadImage(file, market, instance = new Image()) {
  const formData = new FormData();
  formData.append('file', file, file.name);
  formData.append('data', JSON.stringify(prepareImage(instance)));

  return requestPost('/images', {
    data: formData,
    headers: {
      MarketId: market.id,
    },
  });
}

function uploadAndRetrieveImage(file, market, imageSize = Image.SIZE_SMALL, instance = new Image()) {
  return promesify(async () => {
    const { error: errorUploading } = await this.uploadImage(file, market, instance).promise();
    if (errorUploading) {
      return { errorUploading };
    }

    const { data: image, error: errorFinding } = await this.find(instance.id, imageSize).promise();
    if (errorFinding) {
      return { errorFinding };
    }

    return { data: image };
  });
}

function find(id, imageSize = Image.SIZE_SMALL) {
  return requestGet(`/images/${id}`, {
    qs: [['size', imageSize]],
    adapt: adaptImage,
  });
}

export default {
  uploadImage,
  uploadAndRetrieveImage,
  find,
};
