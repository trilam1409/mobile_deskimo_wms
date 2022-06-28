import {
  check,
  PERMISSIONS,
  RESULTS,
  request,
  checkNotifications,
  requestNotifications,
} from 'react-native-permissions';
import {Platform} from 'react-native';

const PLATFORM_LOCATION_PERMISSIONS = {
  ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
};

const PLATFORM_BACKGROUND_LOCATION_PERMISSIONS = {
  ios: PERMISSIONS.IOS.LOCATION_ALWAYS,
  android: PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
};

const REQUEST_PERMISSIONS_TYPE: {[key: string]: any} = {
  location: PLATFORM_LOCATION_PERMISSIONS,
  backgroundLocation: PLATFORM_BACKGROUND_LOCATION_PERMISSIONS,
};

const PERMISSION_TYPE = {
  location: 'location',
  backgroundLocation: 'backgroundLocation',
};

class AppPermission {
  checkPermission = async (type: any) => {
    const permissions = REQUEST_PERMISSIONS_TYPE[type][Platform.OS];
    if (!permissions) {
      return false;
    }
    try {
      const result = await check(permissions);
      if (result === RESULTS.GRANTED) {
        return true;
      }
      return this.requestPermission(permissions);
    } catch (error) {
      return false;
    }
  };

  requestPermission = async (permissions: any) => {
    try {
      const result = await request(permissions);

      return result === RESULTS.GRANTED;
    } catch (error) {
      return false;
    }
  };

  checkNotificationsPermission = async () => {
    try {
      const {status} = await checkNotifications();
      if (status === RESULTS.GRANTED) {
        return true;
      }
      return this.requestNotificationsPermission();
    } catch (error) {
      return false;
    }
  };

  requestNotificationsPermission = async () => {
    try {
      const {status} = await requestNotifications([
        'alert',
        'badge',
        'sound',
        'carPlay',
        'criticalAlert',
        'provisional',
      ]);
      return status === RESULTS.GRANTED;
    } catch (error) {
      return false;
    }
  };
}

const Permission = new AppPermission();
export {Permission, PERMISSION_TYPE};
