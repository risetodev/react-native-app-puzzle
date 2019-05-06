import React from "react";
import {
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  TouchableHighlight,
  View
} from "react-native";

import { Provider } from "react-redux";
import { createStore } from "redux";
import puzzleReducer from "../../modules/gallery/reducer";

const store = createStore(puzzleReducer);

class Main extends React.Component {
  state = {
    images: [
      { img: require("../assets/images/1.jpg") },
      { img: require("../assets/images/2.jpg") },
      { img: require("../assets/images/3.jpg") },
      { img: require("../assets/images/3.jpg") },
      { img: require("../assets/images/4.jpg") },
      { img: require("../assets/images/5.jpg") },
      { img: require("../assets/images/6.jpg") },
      { img: require("../assets/images/7.jpg") },
      { img: require("../assets/images/8.jpg") },
      { img: require("../assets/images/9.jpg") },
      { img: require("../assets/images/10.jpg") }
    ]
  };

  selectImage = image => {};

  componentDidMount() {}

  render() {
    return (
      <Provider store={store}>
        <>
          <FlatList
            data={this.state.images}
            keyExtractor={(item, i) => i}
            style={styles.container}
            renderItem={({ item, index }) => (
              <TouchableHighlight
                style={styles.item}
                onPress={() => {
                  this.setState({ selectedImage: item.img });
                }}
              >
                <View>
                  <Image style={styles.item} source={item.img} />
                </View>
              </TouchableHighlight>
            )}
            numColumns={3}
          />
        </>
      </Provider>
    );
  }
}

export default Main;

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
