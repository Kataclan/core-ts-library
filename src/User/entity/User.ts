import BaseEntity from '../../common/entities/BaseEntity';
import RoleScopeType from '../../Authenticator/enums/RoleScopeType';
import PhoneNumber from '../../PhoneNumber/entity/PhoneNumber';
import Operator from '../../Operator/entity/Operator';
import Follower from '../../Follower/entity/Follower';
import LinkedRider from '../../LinkedRider/entity/LinkedRider';
import Permission from '../../Authenticator/enums/Permission';
import { removeFromList, setElementToList } from '../../common/utils/arrays';

export default class User extends BaseEntity {
  private _name: string;
  private _surname: string;
  private _email: string;
  private _password: string;
  private _role: Array<RoleScopeType>;
  private _phone: PhoneNumber = new PhoneNumber();
  private _bookings: number;
  private _authentication_provider: string;
  private _phone_number_verified: boolean;
  private _email_verified: boolean;
  private _impersonator_password: string;
  private _operators: Array<Operator> = [];
  private _followers: Array<Follower> = [];
  private _linked_riders: Array<LinkedRider> = [];
  mfaEnabled: boolean;
  roles: object = {};
  businessPermissions: object = {};
  globalPermissions: Array<Permission> = [];
  permissions: object = {};
  grantedMarketIds: string[] = [];
  allowPurchaseTickets: boolean;

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get surname(): string {
    return this._surname;
  }

  set surname(value: string) {
    this._surname = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get role(): Array<RoleScopeType> {
    return this._role;
  }

  set role(value: Array<RoleScopeType>) {
    this._role = value;
  }

  get phone(): PhoneNumber {
    return this._phone;
  }

  set phone(value: PhoneNumber) {
    this._phone = value;
  }

  get bookings(): number {
    return this._bookings;
  }

  set bookings(value: number) {
    this._bookings = value;
  }

  get authentication_provider(): string {
    return this._authentication_provider;
  }

  set authentication_provider(value: string) {
    this._authentication_provider = value;
  }

  get phone_number_verified(): boolean {
    return this._phone_number_verified;
  }

  set phone_number_verified(value: boolean) {
    this._phone_number_verified = value;
  }

  get email_verified(): boolean {
    return this._email_verified;
  }

  set email_verified(value: boolean) {
    this._email_verified = value;
  }

  get impersonator_password(): string {
    return this._impersonator_password;
  }

  set impersonator_password(value: string) {
    this._impersonator_password = value;
  }

  get operators(): Array<Operator> {
    return this._operators;
  }

  set operators(value: Array<Operator>) {
    this._operators = value;
  }

  get followers(): Array<Follower> {
    return this._followers;
  }

  set followers(value: Array<Follower>) {
    this._followers = value;
  }

  get linked_riders(): Array<LinkedRider> {
    return this._linked_riders;
  }

  set linked_riders(value: Array<LinkedRider>) {
    this._linked_riders = value;
  }

  isPhoneNumberVerified(): boolean {
    return this.phone_number_verified;
  }

  isEmailVerified(): boolean {
    return this.email_verified;
  }

  getFullName() {
    const arr = [];
    this.name && arr.push(this.name);
    this.surname && arr.push(this.surname);
    return arr.join(' ');
  }

  hasRole(role: RoleScopeType) {
    return this.role.indexOf(role) !== -1;
  }

  toggleRole(role: RoleScopeType) {
    const index = this.role.indexOf(role);

    if (index === -1) {
      this.role.push(role);
    } else {
      this.role.splice(index, 1);
    }
  }

  toggleOperator(operator: Operator) {
    const index = this.operators.indexOf(operator);

    if (index === -1) {
      this.operators.push(operator);
    } else {
      this.operators.splice(index, 1);
    }
  }

  getInitials(glue = '') {
    const pieces = [];
    pieces.push(this.name[0]);
    pieces.push(this.surname[0]);

    return pieces.join(glue);
  }

  setFollower(follower: Follower) {
    this.followers = <Follower[]>setElementToList(this.followers, follower);
  }

  removeFollower(follower: Follower) {
    this.followers = <Follower[]>removeFromList(this.followers, follower);
  }

  addLinkedRider(linkedRider: LinkedRider) {
    this.linked_riders.push(linkedRider);
  }

  setLinkedRider(linkedRider: LinkedRider) {
    this.linked_riders = <LinkedRider[]>setElementToList(this.linked_riders, linkedRider);
  }

  removeLinkedRider(linkedRider: LinkedRider) {
    this.linked_riders = <LinkedRider[]>removeFromList(this.linked_riders, linkedRider);
  }

  hasGlobalPermission(globalPermission: Permission): boolean {
    return this.globalPermissions.includes(globalPermission);
  }

  hasBusinessPermission(businessId: string, marketId: string, permission: Permission): boolean {
    return this.businessPermissions[businessId][marketId].includes(permission);
  }

  isAllowPurchaseTickets(): boolean {
    return this.allowPurchaseTickets;
  }

  isMfaEnabled(): boolean {
    return this.mfaEnabled;
  }

  isMfaDisabled(): boolean {
    return !this.mfaEnabled;
  }

  enableMfa(): void {
    this.mfaEnabled = true;
  }

  disableMfa(): void {
    this.mfaEnabled = false;
  }

  toggleMfa(): void {
    if (this.isMfaEnabled()) {
      this.disableMfa();
    } else {
      this.enableMfa();
    }
  }
}
