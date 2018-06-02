import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import FirebaseService from "../services/Firebase.service";
import LocalizationService from "../services/Localization.service";
import { Permissions } from 'expo';

class RefreshButton extends React.Component {

  render() {
    return (
      <TouchableOpacity onPress={this.refresh} style={styles.button}/>
    );
  }

  async refresh() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    console.log(await LocalizationService.getLocationAsync());
    FirebaseService.storeCurrentCoordinates("marcin", {longitude:-73, latitude:40.76727216});
  }
}

export default RefreshButton;
const styles = StyleSheet.create({
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