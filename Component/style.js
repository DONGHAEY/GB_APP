import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  tinyLogo: {
    width: 400,
    height: 400,
    marginTop: -75,
  },
  logo: {
    fontSize: 60,
    color: "#8BCF7A",
    fontWeight: "bold",
    marginBottom: 30,
    marginTop: -35,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    height: 30,
    width: 120,
    borderRadius: 25,
    elevation: 3,
    backgroundColor: "#91CF81",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  input: {
    height: 40,
    width: 300,
    backgroundColor: "#ECECEC",
    marginBottom: 10,
    padding: 10,
    borderRadius: 20,
  },
  parent: {
    flexDirection: "row",
    alignSelf: "flex-start",
  },
  parent2: {
    flexDirection: "row",
    alignSelf: "flex-end",
  },
  sort: {
    flexDirection: "row",
  },
});

module.exports = styles;
