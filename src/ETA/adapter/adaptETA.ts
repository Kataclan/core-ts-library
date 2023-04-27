import ETA from '../entity/ETA';

export default function adaptETA(json: any, instance: ETA = new ETA()): ETA {
  if (!json) return null;

  instance.travel_time = json.travel_time;
  instance.distance = json.distance;

  return instance;
}
