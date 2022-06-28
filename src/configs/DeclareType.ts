import {BUILD_DEV_CONFIG, BUILD_RELEASE_CONFIG} from './Constants';

export type BuildConfigProps =
  | typeof BUILD_DEV_CONFIG
  | typeof BUILD_RELEASE_CONFIG;
