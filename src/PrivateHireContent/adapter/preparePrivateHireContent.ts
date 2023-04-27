import PrivateHireContent from '../entity/PrivateHireContent';
import preparePage from '../../Page/adapter/preparePage';
import prepareMarketTrait from '../../Market/adapter/prepareMarketTrait';

export default function preparePrivateHireContent(instance: PrivateHireContent): any {
  return {
    ...preparePage(instance),
    ...prepareMarketTrait(instance),
  };
}
