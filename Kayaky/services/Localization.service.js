import { Constants, Location } from 'expo';

const LocalizationService = {
  getLocationAsync: async () => {
    return location = await Location.getCurrentPositionAsync({});
  },
  countDistance: function () {
    return '10km';
  }
}
export default LocalizationService