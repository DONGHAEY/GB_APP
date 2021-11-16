import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const CButton = ({ text, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "gray",
    borderRadius: 30,
    width: 30,
    height: 30,
  },
  text: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
});

export default CButton;
