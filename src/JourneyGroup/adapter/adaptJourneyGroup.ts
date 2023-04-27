import moment from 'moment';

import JourneyGroup from '../entity/JourneyGroup';
import adaptConcession from '../../Concession/adapter/adaptConcession';
import JourneyGroupType from '../enums/JourneyGroupType';
import adaptJourney from '../../Journey/adapter/adaptJourney';
import adaptMarketTrait from '../../Market/adapter/adaptMarketTrait';

export default function adaptJourneyGroup(json: any, instance: JourneyGroup = new JourneyGroup()): JourneyGroup {
  instance.created = true;
  instance.id = json.journey_group_id || json.id; // TODO: This should be ID.
  instance.travel_id = json.travel_id;
  instance.name = json.name;

  if (json.journeys[0]) {
    instance.date = moment(json.journeys[0].start_date).format('YYYY-MM-DD');
  }

  instance.journeys = (json.journeys || []).map((each) => adaptJourney(each));
  // TODO: Revert this back to without instanceof because currently backend is sending concessions as "[]" instead of [].
  instance.concessions = ((json.concessions instanceof Array ? json.concessions : []) || []).map((each) =>
    adaptConcession(each)
  );
  instance.type = (json.journeys || []).length === 2 ? JourneyGroupType.RETURN : JourneyGroupType.ONE_WAY;
  instance.has_concessions_edited = json.concessions_overwritten;
  instance.settings = {
    allow_outbound_only: json.sales_options.only_outbound,
    allow_return_only: json.sales_options.only_return,
    allow_return: json.sales_options.return_and_outbound,
  };
  adaptMarketTrait(json, instance);

  return instance;
}
