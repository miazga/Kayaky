import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCisLxtRHL9DbTAYhmAFpRgW0Wdn1UsWr8",
  authDomain: "kayaky-1527865238593.firebaseapp.com",
  databaseURL: "https://kayaky-1527865238593.firebaseio.com",
  storageBucket: "kayaky-1527865238593.appspot.com"
};

firebase.initializeApp(firebaseConfig);

const FirebaseService = {
  coordinatesDb: function() {
    return firebase.database().ref('coordinates');
  },
  storeCurrentCoordinates: function(userId, { longitude, latitude }) {
    firebase.database().ref('coordinates/' + userId).set({
      longitude: longitude,
      latitude: latitude
    });
  }
}
export default FirebaseService