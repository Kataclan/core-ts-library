import promesify from '../../core/utils/promesify';
import { removeDuplicated } from '../../common/utils/arrays';
import PassengerTypeRepository from '../../PassengerType/repository/PassengerTypeRepository';

export default {
  resolveWithPassengerType(concessions = []) {
    return promesify(async () => {
      const passengerTypesDto = await Promise.all(
        concessions
          .map((eachConcession) => eachConcession.passenger_type_id)
          .filter(removeDuplicated)
          .map((eachPassengerTypeId) => {
            return PassengerTypeRepository.find(eachPassengerTypeId).promise();
          })
      );

      const passengerTypes = passengerTypesDto.map((each) => each.data);

      return {
        data: concessions.map((eachConcession) => {
          eachConcession.passenger_type = passengerTypes.find((eachPassengerType) => {
            return eachPassengerType.id === eachConcession.passenger_type_id;
          });

          return eachConcession;
        }),
      };
    });
  },
};
