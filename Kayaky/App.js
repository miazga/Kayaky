import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MapComponent from "./components/Map.component";
import RefreshButton from "./components/Refresh.component";

export default class App extends React.Component {
  
  render() {
    return (
      <View style={styles.container}>
        <MapComponent/>
        <View style={styles.button}>
          <RefreshButton/>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    alignItems:'center',
    justifyContent:'center',
  }
});