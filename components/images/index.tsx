import React from "react";
import { Image, StyleSheet, Dimensions } from "react-native";
const styles = StyleSheet.create({
  item: {
    marginBottom: 1,
    marginRight: 1,
    height: Dimensions.get("window").width / 2,
    width: Dimensions.get("window").width / 2
  }
});
export const Image1: React.ReactNode = (
  <Image style={styles.item} source={require("../../assets/images/1.jpg")} />
);
export const Image2: React.ReactNode = (
  <Image style={styles.item} source={require("../../assets/images/2.jpg")} />
);
export const Image3: React.ReactNode = (
  <Image style={styles.item} source={require("../../assets/images/3.jpg")} />
);
export const Image4: React.ReactNode = (
  <Image style={styles.item} source={require("../../assets/images/4.jpg")} />
);
export const Image5: React.ReactNode = (
  <Image style={styles.item} source={require("../../assets/images/5.jpg")} />
);
export const Image6: React.ReactNode = (
  <Image style={styles.item} source={require("../../assets/images/6.jpg")} />
);
export const Image7: React.ReactNode = (
  <Image style={styles.item} source={require("../../assets/images/7.jpg")} />
);
export const Image8: React.ReactNode = (
  <Image style={styles.item} source={require("../../assets/images/8.jpg")} />
);
export const Image9: React.ReactNode = (
  <Image style={styles.item} source={require("../../assets/images/9.jpg")} />
);
export const Image10: React.ReactNode = (
  <Image style={styles.item} source={require("../../assets/images/10.jpg")} />
);
