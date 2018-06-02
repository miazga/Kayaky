import React from "react";
import { Dimensions, TouchableOpacity, StyleSheet, Text, View } from "react-native";
import {Constants, MapView, Permissions } from "expo";
import LocalizationService from "../services/Localization.service";
import FirebaseService from "../services/Firebase.service";

class MapComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {isLoading: false, markers: [{longitude: 19.94, latitude: 50.06}], currentLocation: null};
  }
  componentDidMount() {
    this.fetchMarkerData();
  }
  fetchMarkerData() {
    let array = FirebaseService.getAllCoordinates();
    console.log(array);
    this.setState({isLoading:false, markers: [], currentLocation: null});
  }

  async refresh() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    //this.fetchMarkerData();
    console.log(FirebaseService.getAllCoordinates());
    let location = await LocalizationService.getLocationAsync();
    FirebaseService.storeCurrentCoordinates(Constants.deviceId, {longitude: location.coords.longitude, latitude:location.coords.latitude});
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

                  const metadata = `Status: ${"marker.index"}`;

                  return (
                    <MapView.Marker
                      key={"index"}
                      coordinate={coords}
                      title={"marker.index"}
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