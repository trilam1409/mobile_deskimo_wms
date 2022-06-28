import {BUILD_DEV_CONFIG, BUILD_MODE_CONFIG} from './Constants';

export const API_DOMAIN =
  BUILD_MODE_CONFIG === BUILD_DEV_CONFIG
    ? 'http://staging-api.deskimo.com'
    : 'https://api.deskimo.com';

export const DOMAIN =
  BUILD_MODE_CONFIG === BUILD_DEV_CONFIG
    ? 'https://staging-workplace.deskimo.com'
    : 'https://workplace.deskimo.com';
