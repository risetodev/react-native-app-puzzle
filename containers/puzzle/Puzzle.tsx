import React from "react";
import { ImageManipulator, Asset } from "expo";
import {
  View,
  FlatList,
  TouchableHighlight,
  Dimensions,
  StyleSheet,
  Image,
  PanResponder,
  Animated
} from "react-native";
import { FlatGrid } from "react-native-super-grid";
import { IDispatchProps, IStateProps, IProps } from "./types";
import { connect } from "react-redux";
import { IReducerType } from "../../redux/types";

class Puzzle extends React.Component<IProps> {
  state = {
    images: [
      { img: require("../../assets/images/1.jpg") },
      { img: require("../../assets/images/2.jpg") },
      { img: require("../../assets/images/3.jpg") },
      { img: require("../../assets/images/4.jpg") },
      { img: require("../../assets/images/5.jpg") },
      { img: require("../../assets/images/6.jpg") },
      { img: require("../../assets/images/7.jpg") },
      { img: require("../../assets/images/8.jpg") },
      { img: require("../../assets/images/9.jpg") },
      { img: require("../../assets/images/10.jpg") },
      { img: require("../../assets/images/11.jpg") },
      { img: require("../../assets/images/12.jpg") },
      { img: require("../../assets/images/13.jpg") },
      { img: require("../../assets/images/14.jpg") },
      { img: require("../../assets/images/15.jpg") }
    ],
    board: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    slices: Array.from(Array(12)),
    ready: false,
    image: null,
    imageSize: {
      width: null,
      height: null
    },
    isLoading: false,
    pan: new Animated.ValueXY(),
    scale: new Animated.Value(1),
    imageSource: "4.jpg"
  };

  cropImage = async (originX, originY) => {
    const manipResult = await ImageManipulator.manipulateAsync(
      this.state.image.uri,
      [
        {
          crop: {
            originX: originX,
            originY: originY,
            width: 360,
            height: 480
          }
        }
      ],
      { format: "jpeg", base64: false }
    );
    return manipResult.uri;
  };

  getSlices = () => {
    return this.state.slices.map(async (item, index) => {
      if (index < 3) {
        return this.cropImage(index * 360, 0);
      } else if (index >= 3 && index < 6) {
        return this.cropImage((index - 3) * 360, 480);
      } else if (index >= 6 && index < 9) {
        return this.cropImage((index - 6) * 360, 960);
      } else if (index >= 9 && index < 12) {
        return this.cropImage((index - 9) * 360, 1440);
      }
    });
  };

  componentDidMount() {
    console.log(this.props.selectedImage);

    (async () => {
      await this.setState({ isLoading: true });
      const image = await Asset.fromModule(this.props.selectedImage);
      // console.log(image);
      // await Image.getSize(
      //   image.uri,
      //   (width, height) => {
      //     console.log("width " + width);
      //     console.log("height " + height);
      //     this.setState({
      //       imageSize: {
      //         width,
      //         height
      //       }
      //     });
      //   },
      //   error => {
      //     console.log("Image size: " + error);
      //   }
      // );
      this.setState({
        ready: true,
        image
      });
      Promise.all(this.getSlices()).then(res => {
        this.setState({ slices: res, isLoading: false });
        console.log(this.state.slices);
      });
    })();
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, gestureState) => {
        // Set the initial value to the current state
        this.state.pan.setOffset({
          x: this.state.pan.x._value,
          y: this.state.pan.y._value
        });
        this.state.pan.setValue({ x: 0, y: 0 });
        Animated.spring(this.state.scale, {
          toValue: 1.1,
          friction: 3
        }).start();
      },

      // When we drag/pan the object, set the delate to the states pan position
      onPanResponderMove: Animated.event([
        null,
        { dx: this.state.pan.x, dy: this.state.pan.y }
      ]),

      onPanResponderRelease: (e, { vx, vy }) => {
        // Flatten the offset to avoid erratic behavior
        this.state.pan.flattenOffset();
        Animated.spring(this.state.scale, { toValue: 1, friction: 3 }).start();
      }
    });
  }

  render() {
    // Destructure the value of pan from the state
    let { pan, scale } = this.state;

    // Calculate the x and y transform from the pan value
    let [translateX, translateY] = [pan.x, pan.y];

    let rotate = "0deg";

    // Calculate the transform property and set it as a value for our style which we add below to the Animated.View component
    let imageStyle = {
      transform: [{ translateX }, { translateY }, { rotate }, { scale }]
    };

    return (
      <>
        {/* <View style={styles.container}>
          <Animated.View style={imageStyle} {...this._panResponder.panHandlers}>
            <Image source={require("../../assets/images/4.jpg")} />
          </Animated.View>
        </View> */}
        <View style={styles.container}>
          {!this.state.isLoading && (
            <View style={styles.board}>
              <FlatGrid
                itemContainerStyle={styles.item}
                // fixed={true}
                // spacing={1}
                // itemDimension={100}
                items={this.state.slices}
                renderItem={({ item }) => (
                  <Animated.View
                    style={imageStyle}
                    {...this._panResponder.panHandlers}
                  >
                    <Image style={styles.itemBoard} source={{ uri: item }} />
                  </Animated.View>
                )}
              />
            </View>
          )}
          <View style={styles.sliders}>
            <FlatList
              data={this.state.images}
              keyExtractor={(buf, i) => i.toString()}
              //style={{ backgroundColor: "red" }}
              renderItem={({ item }) => (
                // <TouchableHighlight style={styles.item}>
                <Animated.View
                  style={imageStyle}
                  {...this._panResponder.panHandlers}
                >
                  <Image style={styles.item} source={item.img} />
                </Animated.View>
                // </TouchableHighlight>
              )}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
            <FlatList
              inverted={true}
              data={this.state.images}
              keyExtractor={(buf, i) => i.toString()}
              //style={{ backgroundColor: "green" }}
              renderItem={({ item }) => (
                // <TouchableHighlight style={styles.item}>
                <Animated.View
                  style={imageStyle}
                  {...this._panResponder.panHandlers}
                >
                  <Image style={styles.item} source={item.img} />
                </Animated.View>
                // </TouchableHighlight>
              )}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
      </>
    );
  }
}

export const PuzzleConnected = connect<IStateProps, IDispatchProps>(
  (state: IReducerType) => ({
    selectedImage: state.selectedImage
  }),
  dispatch => ({})
)(Puzzle);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black"
  },
  board: {
    marginTop: Dimensions.get("window").height / 27,
    height: Dimensions.get("window").height / 1.5
  },
  sliders: {
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 50
  },
  item: {
    marginRight: 1,
    marginLeft: 1,
    marginBottom: 1,
    marginTop: 1,
    height: 100,
    width: 100
  },
  row: {
    flex: 1,
    flexDirection: "row"
  },
  itemBoard: {
    height: "100%",

    resizeMode: "contain"
  }
});
