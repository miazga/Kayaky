import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCisLxtRHL9DbTAYhmAFpRgW0Wdn1UsWr8",
  authDomain: "kayaky-1527865238593.firebaseapp.com",
  databaseURL: "https://kayaky-1527865238593.firebaseio.com",
  storageBucket: "kayaky-1527865238593.appspot.com"
};

firebase.initializeApp(firebaseConfig);

const FirebaseService = {

  getAllCoordinates: () => {
    let data = []
    firebase.database().ref('coordinates').on('value', (response) => {
      data = response.val();
    });
    return data;
  },

  storeCurrentCoordinates: function(userId, { longitude, latitude }) {
    firebase.database().ref('coordinates/' + userId).set({
      longitude: longitude,
      latitude: latitude
    });
  }
}
export default FirebaseService