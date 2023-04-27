import User from '../entity/User';
import UUID from '../../UUID/UUID';
import adaptPhoneNumber from '../../PhoneNumber/adapter/adaptPhoneNumber';
import adaptFollower from '../../Follower/adapter/adaptFollower';
import adaptLinkedRider from '../../LinkedRider/adapter/adaptLinkedRider';
import Operator from '../../Operator/entity/Operator';
import adaptRole from './adaptRole';

export default function adaptUser(json: any, instance: User = new User()): User {
  instance.id = json.id;
  instance.uuid = UUID.fromString(json.id);
  instance.name = json.name || json.customer_name;
  instance.surname = json.surname || json.customer_surname;
  instance.email = json.email;
  instance.email_verified = json.email_verified;
  instance.password = null;
  instance.role = json.roles ? json.roles.split(',') : [];
  instance.impersonator_password = json.impersonation_pw;
  instance.allowPurchaseTickets = json.allow_purchases;
  instance.mfaEnabled = json.mfa_enabled;

  // phone || phoneNumber, because backend can't send consistent keys.
  instance.phone = adaptPhoneNumber(json.phone || json.phoneNumber);
  instance.phone_number_verified = json.phone_number_verified;
  instance.bookings = json.bookings;
  instance.authentication_provider = json.authentication_provider;
  instance.followers = (json.followers || []).map((eachFollower) => {
    return adaptFollower(eachFollower);
  });

  instance.linked_riders = (json.riders || []).map((eachLinkedRider) => {
    return adaptLinkedRider(eachLinkedRider);
  });

  instance.operators = (json.operators || []).map((eachOperatorId) => {
    return new Operator(eachOperatorId);
  });

  // There will be some places where the user info will be minimal and this will note come.
  instance.permissions = json.permissions ? adaptRole(json.permissions) : {};

  return instance;
}
