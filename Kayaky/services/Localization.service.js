import { Constants, Location } from 'expo';

const LocalizationService = {
  getLocationAsync:  async () => {
    let location = await Location.getCurrentPositionAsync({});
    return JSON.stringify(location)
  }
}
export default LocalizationService