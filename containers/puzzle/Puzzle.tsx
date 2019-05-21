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
  Animated,
  Text,
  ProgressBarAndroid,
  StatusBar
} from "react-native";
import { FlatGrid } from "react-native-super-grid";
import { IDispatchProps, IStateProps, IProps } from "./types";
import { connect } from "react-redux";
import { IReducerType } from "../../redux/types";
import { shuffle } from "shuffle-array";
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
    board: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    slices: Array.from(Array(12)),
    ready: false,
    image: null,
    imageSize: {
      width: null,
      height: null
    },
    isLoading: false,

    imageSource: "4.jpg",

    pan: new Animated.ValueXY(),
    scale: new Animated.Value(1)
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
    (async () => {
      await this.setState({ isLoading: true });
      const image = await Asset.fromModule(this.props.selectedImage);
      this.setState({
        image
      });
      Promise.all(this.getSlices()).then(res => {
        this.setState({ slices: res, isLoading: false });
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

        <StatusBar hidden={true} />
        {!this.state.isLoading ? (
          <View style={styles.container}>
            <View style={styles.center}>
              <View style={styles.board}>
                <View style={{ flexDirection: "row" }}>
                  <FlatList
                    data={this.state.board}
                    keyExtractor={(slices, index: number) => index.toString()}
                    //style={{ backgroundColor: "red" }}
                    renderItem={({ item, index }) => (
                      <Animated.View
                        style={imageStyle}
                        {...this._panResponder.panHandlers}
                      >
                        <Image style={styles.item} source={item} />
                      </Animated.View>
                    )}
                    numColumns={3}
                    // horizontal={true}
                    //showsHorizontalScrollIndicator={false}
                  />
                </View>
              </View>
              <View style={styles.sliders}>
                <View>
                  <FlatList
                    data={this.state.slices}
                    keyExtractor={(slices, index: number) => index.toString()}
                    //style={{ backgroundColor: "red" }}
                    renderItem={({ item, index }) => (
                      <Image style={styles.item} source={{ uri: item }} />
                    )}
                    numColumns={6}
                    // horizontal={true}
                    //showsHorizontalScrollIndicator={false}
                  />
                  {/* <FlatList
                    inverted={true}
                    data={this.state.slices}
                    keyExtractor={(buf, i) => i.toString()}
                    //style={{ backgroundColor: "green" }}
                    renderItem={({ item }) => (
                      <TouchableHighlight style={styles.item}>
                        <Image style={styles.item} source={{ uri: item }} />
                      </TouchableHighlight>
                    )}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  /> */}
                </View>
              </View>
            </View>
          </View>
        ) : (
          <View
            style={{ flex: 1, alignItems: "stretch", backgroundColor: "black" }}
          >
            <View
              style={{
                paddingTop: Dimensions.get("window").height / 2,
                paddingBottom: Dimensions.get("window").height / 2
              }}
            >
              <ProgressBarAndroid styleAttr="Horizontal" color="blue" />
              <ProgressBarAndroid styleAttr="Horizontal" color="yellow" />
            </View>
          </View>
        )}
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black"
  },
  center: {
    // backgroundColor: "yellow",
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around"
  },

  sliders: {
    // backgroundColor: "red",
    flexDirection: "row"
  },
  item: {
    margin: 2,
    height: 90,
    width: 60
  },
  board: {
    alignItems: "center",
    justifyContent: "space-around"
  },
  itemBoard: {
    margin: 2,
    height: 90,
    width: 60,
    backgroundColor: "white"
  },
  itemBoardImage: {
    height: 90,
    width: 60
  }
});
