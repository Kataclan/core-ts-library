export function filterFullReturnCombinations(data) {
  return data
    .filter((eachInData) => {
      return eachInData.origin_stop_id !== eachInData.destination_stop_id;
    })
    .filter((eachInData) => {
      return findMirrorCombination(
        data,
        eachInData.origin_stop_id,
        eachInData.destination_stop_id,
        eachInData.route_id
      );
    });
}

export function findMirrorCombination(data, originId, destinationId, routeId) {
  return data.find(
    (each) =>
      each.origin_stop_id === destinationId && each.destination_stop_id === originId && each.route_id === routeId
  );
}
