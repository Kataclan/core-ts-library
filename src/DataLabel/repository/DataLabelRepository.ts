import requestGet from '../../core/api/requestGet';
import requestPost from '../../core/api/requestPost';
import requestPatch from '../../core/api/requestPatch';
import resolveAllPagesGet from '../../core/utils/resolveAllPagesGet';
import adaptTag from '../../Tag/adapter/adaptTag';
import prepareTag from '../../Tag/adapter/prepareTag';
import Tag from '../../Tag/entity/Tag';
import getNonGenericTagTypes from '../../Tag/utils/getNonGenericTagTypes';

function prepareNonGenericTagTypesQS(fromQS) {
  const finalQs = [...fromQS];

  const howManyFilterByTagTypes = fromQS.filter(([queryStringKey]) => {
    return queryStringKey === 'filter_by[tag_type][]';
  }).length;

  if (howManyFilterByTagTypes === 0) {
    getNonGenericTagTypes().forEach((eachNonGenericTagType) => {
      finalQs.push(['filter_by[tag_type][]', eachNonGenericTagType]);
    });
  }

  return finalQs;
}

export default {
  find(id: string) {
    return requestGet(`/data-labels/${id}`, { adapt: adaptTag });
  },

  findBy(qs: Array<Array<string>> = []) {
    return requestGet('/data-labels', {
      qs: prepareNonGenericTagTypesQS(qs),
      adapt: adaptTag,
    });
  },

  findAllBy(qs: Array<Array<string>> = []) {
    return resolveAllPagesGet('/data-labels', {
      qs: prepareNonGenericTagTypesQS(qs),
      adapt: adaptTag,
    });
  },

  create(dataLabel: Tag) {
    return requestPost('/data-labels', {
      data: prepareTag(dataLabel),
    });
  },

  update(dataLabel: Tag) {
    return requestPatch(`/data-labels/${dataLabel.uuid.id}`, {
      data: prepareTag(dataLabel),
    });
  },
};
