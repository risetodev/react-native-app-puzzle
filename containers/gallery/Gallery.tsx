import React from "react";
import {
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableHighlight,
  BackHandler,
  Image,
  ImageRequireSource,
  StatusBar,
  View
} from "react-native";
import { Asset } from "expo-asset";

import { withRouter, RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import { IProps, IStateProps, IDispatchProps } from "./types";
import { IReducerType, onSelectImage } from "../../redux";
import * as actions from "../../redux";

class Gallery extends React.Component<IProps> {
  state = {
    imageToSlice: null,
    isLandscape: true,
    vertical: 2,
    horizontal: 3
  };

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", () =>
      this.hardwareBackPressHandler()
    );
    Dimensions.addEventListener("change", this.updateOrientation);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", () =>
      this.hardwareBackPressHandler()
    );
    this.updateOrientation();
    Dimensions.removeEventListener("change", this.updateOrientation);
  }

  updateOrientation = () => {
    this.setState({
      isLandscape:
        Dimensions.get("window").height < Dimensions.get("window").width
    });
  };

  hardwareBackPressHandler = () => {
    if (this.props.history.location.pathname === "/puzzle") {
      this.props.history.goBack();
      return true;
    }
    return false;
  };

  onSubmitImage = (image: ImageRequireSource) => () => {
    this.props.onSelectImage(image);
    this.props.history.push("/puzzle");
  };

  render() {
    return (
      <>
        <StatusBar hidden={true} />
        <View style={styles.container}>
          <View style={styles.center} />
          <FlatList
            data={this.props.images}
            keyExtractor={(buf, i) => i.toString()}
            //style={styles.container}
            renderItem={({ item, index }) => (
              <TouchableHighlight
                style={styles.item}
                onPress={this.onSubmitImage(item.source)}
              >
                <Image style={styles.item} source={item.source} />
              </TouchableHighlight>
            )}
            numColumns={this.state.isLandscape ? 3 : 2}
            key={this.state.isLandscape ? "h" : "v"}
          />
        </View>
      </>
    );
  }
}

export const GalleryConnected = withRouter<RouteComponentProps<{}>>(
  connect<IStateProps, IDispatchProps>(
    (state: IReducerType) => ({
      images: state.images
    }),
    dispatch => ({
      onSelectImage: uri => dispatch(onSelectImage(uri))
    })
  )(Gallery)
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black"
  },
  center: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around"
  },
  item: {
    marginBottom: 1,
    marginRight: 1,
    height: Dimensions.get("window").width / 2,
    width: Dimensions.get("window").width / 2
  }
});
