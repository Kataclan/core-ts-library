import { getClientSecretByPlatform } from '../utils/getClientSecretByPlatform';

export default function prepareLoginRequest({
  username,
  password,
  oneTimePasscode,
  scope = ['REGULAR_USER', 'ADMIN'],
  platform,
}) {
  return {
    username,
    password,
    mfa_code: oneTimePasscode,
    scope: scope.join(','),
    authentication_provider: 'ZEELO',
    client_id: platform,
    client_secret: getClientSecretByPlatform(platform),
    grant_type: 'password',
  };
}
