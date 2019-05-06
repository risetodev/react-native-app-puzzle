import React from "react";
import {
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  TouchableHighlight,
  View
} from "react-native";

import { connect } from "react-redux";
import { IDispatchProps, IProps, IStateProps } from "./types";
import { IRootReducer } from "../../modules";

class Gallery extends React.Component<IProps> {
  render() {
    return (
      <>
        <FlatList
          data={this.props.images}
          keyExtractor={(buf, i) => i.toString()}
          style={styles.container}
          renderItem={({ item, index }) => (
            <TouchableHighlight style={styles.item} onPress={() => {}}>
              <View>{item}</View>
            </TouchableHighlight>
          )}
          numColumns={2}
        />
      </>
    );
  }
}

export const GalleryConnected = connect<IStateProps, IDispatchProps>(
  (state: IRootReducer) => ({
    images: state.gallery.images
  }),
  dispatch => ({})
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
