export default interface TransformerInterface<T> {
  // TODO: Refactor namings.
  transformToPayload(instance: T): any;
  
  transformToEntity(json: any): T;
}