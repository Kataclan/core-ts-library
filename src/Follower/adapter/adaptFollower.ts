import Follower from '../entity/Follower';
import adaptPhoneNumber from '../../PhoneNumber/adapter/adaptPhoneNumber';

export default function adaptFollower(json: any, instance: Follower = new Follower()): Follower {
  instance.name = json.follower_name;
  instance.surname = json.follower_surname;
  instance.email = json.follower_email;
  instance.phone = adaptPhoneNumber(json.follower_phone);

  return instance;
}
