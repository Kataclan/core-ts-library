import PrivateHireContent from '../entity/PrivateHireContent';
import adaptPage from '../../Page/adapter/adaptPage';
import adaptMarketTrait from '../../Market/adapter/adaptMarketTrait';

export default function adaptPrivateHireContent(
  json: any,
  instance: PrivateHireContent = new PrivateHireContent()
): PrivateHireContent {
  const instanceAdapted = <PrivateHireContent>adaptPage(json, instance);
  adaptMarketTrait(json, instanceAdapted);

  return instanceAdapted;
}
