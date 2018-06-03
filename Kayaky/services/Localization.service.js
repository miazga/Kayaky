import { Constants, Location } from 'expo';

const LocalizationService = {
  getLocationAsync: async () => {
    return location = await Location.getCurrentPositionAsync({});
  },
  countDistance: function (lat1,lon1,lat2,lon2) {
    if (typeof(Number.prototype.toRad) === "undefined") {
      Number.prototype.toRad = function() {
        return this * Math.PI / 180;
      }
    }
    let R = 6371e3;
    let φ1 = lat1.toRad();
    let φ2 = lat2.toRad();
    let Δφ = (lat2-lat1).toRad();
    let Δλ = (lon2-lon1).toRad();

    let a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    let d = R * c;
    let metres = Math.round(d);
    if(metres/1000>=1)
      return `${metres/1000}km`
    else
      return `${metres}m`
  }
}
export default LocalizationService