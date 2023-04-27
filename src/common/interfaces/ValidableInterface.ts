export default interface ValidableInterface {
  isValid(): boolean;

  invalidFields(prefix: string): Array<string>;
}
