import BaseEntity from '../../common/entities/BaseEntity';
import Market from '../../Market/entity/Market';

export default class FleetOption extends BaseEntity {
  market: Market;
  name: string;
}
