import { removeDuplicated } from '../../common/utils/arrays';
import DataLabelRepository from '../../DataLabel/repository/DataLabelRepository';
import promesify from '../../core/utils/promesify';
import requestGet from '../../core/api/requestGet';
import adaptRouteGroup from '../adapter/adaptRouteGroup';
import requestPost from '../../core/api/requestPost';
import prepareRouteGroup from '../adapter/prepareRouteGroup';
import requestPatch from '../../core/api/requestPatch';

export default {
  async findRouteGroupDataLabels(routeGroup) {
    const tagIds = routeGroup.routes.reduce((acc, eachRoute) => {
      acc.push(...eachRoute.tag_ids);

      return acc;
    }, []);

    const tags = await Promise.all(
      tagIds.filter(removeDuplicated).map((eachId) => DataLabelRepository.find(eachId).promise())
    );

    routeGroup.routes = routeGroup.routes.map((eachRoute) => {
      eachRoute.data_labels.setList(
        tags.map((eachTagDTO) => eachTagDTO.data).filter((eachTag) => eachRoute.tag_ids.includes(eachTag.id))
      );

      return eachRoute;
    });

    return routeGroup;
  },

  find(id, { includeTags = true } = {}) {
    return promesify(async () => {
      let { data: routeGroup, error, ...rest } = await requestGet(`/route-groups/${id}`, {
        adapt: adaptRouteGroup,
      }).promise();

      if (error) {
        return { error };
      }

      if (includeTags) {
        routeGroup = await this.findRouteGroupDataLabels(routeGroup);
      }

      return {
        data: routeGroup,
        ...rest,
      };
    });
  },

  findBy(qs) {
    return requestGet('/route-groups', {
      qs,
      adapt: adaptRouteGroup,
    });
  },

  create(routeGroup) {
    return requestPost('/route-groups', {
      data: prepareRouteGroup(routeGroup),
    });
  },

  update(routeGroup) {
    return requestPatch(`/route-groups/${routeGroup.id}`, {
      data: prepareRouteGroup(routeGroup),
    });
  },

  delete(id) {
    return requestPatch(`/route-groups/${id}/disable`);
  },

  findByRecurringProduct(routeGroupId, recurringProductId, { includeTags = true } = {}) {
    return promesify(async () => {
      let { data: routeGroup, error, ...rest } = await requestGet(
        `/recurring-products/${recurringProductId}/route-groups/${routeGroupId}`,
        {
          adapt: adaptRouteGroup,
        }
      ).promise();

      if (error) {
        return { error };
      }

      if (includeTags) {
        routeGroup = await this.findRouteGroupDataLabels(routeGroup);
      }

      return {
        data: routeGroup,
        ...rest,
      };
    });
  },
};
