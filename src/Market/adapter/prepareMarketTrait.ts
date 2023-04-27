export default function prepareMarketTrait(instance: any): any {
  // For those market-agnostic entities, like Partner Data Label.
  if (!instance.market) {
    // Return {} because we use this method with the spread operator.
    return {};
  }

  return {
    market_id: instance.market.uuid.id,
  };
}
