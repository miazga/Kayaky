import React from "react";
import { Dimensions, TouchableOpacity, StyleSheet, Text, View } from "react-native";
import {Constants, MapView, Permissions } from "expo";
import LocalizationService from "../services/Localization.service";
import FirebaseService from "../services/Firebase.service";
import * as firebase from 'firebase';

class MapComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {isLoading: true, markers: [], currentLocation: null};
  }

  componentDidMount() {
    this.fetchMarkers();
    this.getLocation();
  }

  getLocation() {
    LocalizationService.getLocationAsync().then(location => {
      this.setState({currentLocation: location});
    }).then(() => {
      FirebaseService.storeCurrentCoordinates(Constants.deviceId,
        {longitude: this.state.currentLocation.coords.longitude, latitude: this.state.currentLocation.coords.latitude});
    });
  }

  fetchMarkers() {
    firebase.database().ref('coordinates').once('value').then(itemFiltered => {
      let data = [];
      itemFiltered.forEach(x => {
        let item = {
          key: x.key, 
          longitude: x.val().longitude, 
          latitude: x.val().latitude
        }
        data.push(item);
        this.setState({isLoading: false, markers: data});
      });
    });
  }

  refresh = () => {
    this.getLocation();
    this.fetchMarkers();
  }

  render() {
    const width = Dimensions.get('window').width
    const height = Dimensions.get('window').height
    return (
      <View>
        <View style={{width, height}}>
          <MapView
            style={{ flex: 1 }}
            region={{
              latitude: this.state.currentLocation? this.state.currentLocation.coords.latitude: 50.0646501,
              longitude: this.state.currentLocation? this.state.currentLocation.coords.longitude: 19.9449799,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}>
              {this.state.isLoading? null: this.state.markers.map((marker) => {
                  const coords = {
                    latitude: marker.latitude,
                    longitude: marker.longitude
                  };

                  const metadata = `Distance: ${LocalizationService.countDistance(
                    this.state.currentLocation.coords.latitude,
                    this.state.currentLocation.coords.longitude,
                    coords.latitude,
                    coords.longitude
                  )}`;

                  return (
                    <MapView.Marker
                      key={marker.key}
                      coordinate={coords}
                      title={marker.key}
                      description={metadata}
                    />
                  );
              })}
          </MapView>
        </View>
      <View style={styles.buttoncontainer}>
        <TouchableOpacity onPress={this.refresh} style={styles.button}/>
      </View>
    </View>
    );
  }
}
export default MapComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttoncontainer: {
    alignItems:'center',
    justifyContent:'center',
  },
  button: {
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:100,
    height:100,
    bottom:50,
    backgroundColor:'#fff',
    borderRadius:100,
    position: 'absolute'
  }
});