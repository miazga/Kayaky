import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MapComponent from "./components/Map.component";

export default class App extends React.Component {
  
  render() {
    return (
      <View>
        <MapComponent/>
      </View>
    );
  }
}