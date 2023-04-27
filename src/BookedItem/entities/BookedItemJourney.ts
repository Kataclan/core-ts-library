import BookedItem from './BookedItem';
import JourneyStop from '../../JourneyStop/entity/JourneyStop';

export default class BookedItemJourney extends BookedItem {
  private _journey_stop_pickup: JourneyStop;
  private _journey_stop_dropoff: JourneyStop;

  get journey_stop_pickup(): JourneyStop {
    return this._journey_stop_pickup;
  }

  set journey_stop_pickup(value: JourneyStop) {
    this._journey_stop_pickup = value;
  }

  get journey_stop_dropoff(): JourneyStop {
    return this._journey_stop_dropoff;
  }

  set journey_stop_dropoff(value: JourneyStop) {
    this._journey_stop_dropoff = value;
  }
}
