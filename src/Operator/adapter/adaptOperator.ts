import Operator from '../entity/Operator';
import adaptMarket from '../../Market/adapter/adaptMarket';

export default function adaptOperator(json: any, instance: Operator = new Operator()): Operator {
  instance.identify(json.id);
  instance.name = json.name;
  instance.available_markets = (json.available_markets || []).map((eachMarket) => adaptMarket(eachMarket));

  return instance;
}
