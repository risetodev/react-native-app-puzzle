import React from "react";
import {
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableHighlight,
  View
} from "react-native";

import { connect } from "react-redux";
import { IDispatchProps, IProps, IStateProps } from "./types";
import { IReducerType, IImage } from "../../redux";
import * as actions from "../../redux";

class Gallery extends React.Component<IProps> {
  render() {
    return (
      <>
        <FlatList
          data={this.props.images}
          keyExtractor={(buf, i) => i.toString()}
          style={styles.container}
          renderItem={({ item, index }) => (
            <TouchableHighlight
              style={styles.item}
              onPress={() => this.props.onSelectImage(item.source)}
            >
              <View>{item.imageComponent}</View>
            </TouchableHighlight>
          )}
          numColumns={2}
        />
      </>
    );
  }
}

export const GalleryConnected = connect<IStateProps, IDispatchProps>(
  (state: IReducerType) => ({
    images: state.images
  }),
  dispatch => ({
    onSelectImage: (image: string) => dispatch(actions.onSelectImage(image))
  })
)(Gallery);

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
