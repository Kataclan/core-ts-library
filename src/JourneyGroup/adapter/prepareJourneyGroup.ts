import JourneyGroup from '../entity/JourneyGroup';
import Journey from '../../Journey/entity/Journey';
import prepareConcession from '../../Concession/adapter/prepareConcession';
import prepareJourney from '../../Journey/adapter/prepareJourney';
import prepareMarketTrait from '../../Market/adapter/prepareMarketTrait';

export default function prepareJourneyGroup(instance: JourneyGroup | any): any {
  const filteredEnabledJourneys = instance.journeys.filter((each) => each.enabled);

  return {
    id: instance.id,
    travel_id: instance.travel_id,
    name: instance.name,
    journeys: filteredEnabledJourneys.map((each: Journey, index) => {
      let instancePrepared = prepareJourney(each);

      if (filteredEnabledJourneys.length === 2) {
        if (index === 0) {
          instancePrepared.is_outbound_of = filteredEnabledJourneys[1].id;
          instancePrepared.is_return_of = filteredEnabledJourneys[0].id;
        } else {
          instancePrepared.is_outbound_of = filteredEnabledJourneys[0].id;
          instancePrepared.is_return_of = filteredEnabledJourneys[1].id;
        }
      }

      // Needed.
      instancePrepared.type = each.type;

      return instancePrepared;
    }),
    concessions:
      instance.concessions && instance.has_concessions_edited
        ? instance.concessions.map((each) => prepareConcession(each))
        : void 0,
    sales_options: {
      outbound_only: instance.settings.allow_outbound_only,
      return_only: instance.settings.allow_return_only,
      return_and_outbound: instance.settings.allow_return,
    },
    ...prepareMarketTrait(instance),
  };
}
