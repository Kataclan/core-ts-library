import requestGet from '../../core/api/requestGet';
import adaptTag from '../adapter/adaptTag';
import requestPost from '../../core/api/requestPost';
import prepareTag from '../adapter/prepareTag';
import requestPatch from '../../core/api/requestPatch';
import resolveAllPagesGet from '../../core/utils/resolveAllPagesGet';
import TagType from '../enums/TagType';

export default {
  find(id) {
    return requestGet(`/tags/${id}`, { adapt: adaptTag });
  },

  findBy(qs) {
    return requestGet('/tags', {
      qs: [...qs, ['filter_by[tag_type][]', TagType.GENERIC]],
      adapt: adaptTag,
    });
  },

  findAllBy(qs) {
    return resolveAllPagesGet('/tags', {
      qs,
      adapt: adaptTag,
    });
  },

  create(tag) {
    return requestPost('/tags', {
      data: prepareTag(tag),
    });
  },

  update(tag) {
    return requestPatch(`/tags/${tag.id}`, {
      data: prepareTag(tag),
    });
  },
};
