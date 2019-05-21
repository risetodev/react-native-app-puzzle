import React from "react";
import {
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableHighlight,
  BackHandler,
  Image,
  ImageRequireSource,
  StatusBar
} from "react-native";
import { Asset } from "expo-asset";

import { withRouter, RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import { IProps, IStateProps, IDispatchProps } from "./types";
import { IReducerType, onSelectImage } from "../../redux";
import * as actions from "../../redux";

class Gallery extends React.Component<IProps> {
  state = {
    imageToSlice: null
  };

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", () =>
      this.hardwareBackPressHandler()
    );

    // setTimeout(() => {
    //   this.props.history.push("/puzzle");
    // }, 0);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", () =>
      this.hardwareBackPressHandler()
    );
  }

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
        <FlatList
          data={this.props.images}
          keyExtractor={(buf, i) => i.toString()}
          style={styles.container}
          renderItem={({ item, index }) => (
            <TouchableHighlight
              style={styles.item}
              onPress={this.onSubmitImage(item.source)}
            >
              <Image style={styles.item} source={item.source} />
            </TouchableHighlight>
          )}
          numColumns={2}
        />
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
    backgroundColor: "black"
  },
  item: {
    marginBottom: 1,
    marginRight: 1,
    height: Dimensions.get("window").width / 2,
    width: Dimensions.get("window").width / 2
  }
});
