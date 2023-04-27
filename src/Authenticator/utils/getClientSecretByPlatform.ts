import Platform from '../enums/Platform';

export function getClientSecretByPlatform(platform: Platform): string {
  switch (platform) {
    case Platform.MISSION_CONTROL:
      return '2cQRUseGngtHMgRlzyj89FTTj06QdVZ7H4Pn6vD9';

    case Platform.CONSUMERS:
      return 'v2ypGh7xl1909tFV6feO5d5yP2wZbcO10fSeRD3p';

    case Platform.RINA_UI:
      return 'gc9p8b5rn5s3092f4glvcs8dqo2ojokrtz4tairu';
  }
}
