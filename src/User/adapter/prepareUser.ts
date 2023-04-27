import User from '../entity/User';
import preparePhoneNumber from '../../PhoneNumber/adapter/preparePhoneNumber';
import prepareFollower from '../../Follower/adapter/prepareFollower';

export default function prepareUser(user: User): any {
  return {
    id: user.id,
    name: user.name,
    surname: user.surname,
    email: user.email,
    authentication_provider: user.authentication_provider,
    followers: user.followers.map((eachFollower) => prepareFollower(eachFollower)),
    ...preparePhoneNumber(user.phone),
  };
}
