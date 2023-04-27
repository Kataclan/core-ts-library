export default function prepareMarketHeader(filterBy = []) {
  return {
    MarketId: filterBy
      .filter((each) => each.groupBy === 'market')
      .map((each) => each.value)
      .join(','),
  };
}
