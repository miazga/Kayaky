import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MapView } from "expo";

export default class App extends React.Component {
  render() {
    return (
      <MapView
        style={{
          flex: 1
        }}
        initialRegion={{
          latitude: 50.0646501,
          longitude: 19.9449799,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      />
    );
  }
}