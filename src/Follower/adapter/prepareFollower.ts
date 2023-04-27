import Follower from '../entity/Follower';
import { preparePhoneNumberWithoutPhonePrefix } from '../../PhoneNumber/adapter/preparePhoneNumber';

export default function prepareFollower(follower: Follower): any {
  return {
    follower_name: follower.name,
    follower_surname: follower.surname,
    follower_email: follower.email,

    // It has to be this way because of Backend's inconsistent ways of working and doing things.
    follower_phone: preparePhoneNumberWithoutPhonePrefix(follower.phone),
  };
}
