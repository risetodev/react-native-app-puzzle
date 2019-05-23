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
//import Draggable from "../../components/Draggable.js";
import DragNDrop from "../../components/DragNDrop";
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
    board: [
      "qwe",
      "qwe",
      "qwe",
      "qwe",
      "qwe",
      "qwe",
      "qwe",
      "qwe",
      "qwe",
      "qwe",
      "qwe",
      "qwe"
    ],
    slices: Array.from(Array(12)),
    ready: false,
    image: null,

    isLoading: false,

    imageSource: "4.jpg",
    px: 0,
    py: 0
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

  buf = null;

  constructor(props) {
    super(props);
    this.buf = React.createRef();
  }

  render() {
    // this.buf.measure((fx, fy, width, height, px, py) => {
    //   console.log("Component width is: " + width);
    //   console.log("Component height is: " + height);
    //   console.log("X offset to frame: " + fx);
    //   console.log("Y offset to frame: " + fy);
    //   console.log("X offset to page: " + px);
    //   console.log("Y offset to page: " + py);
    // });

    return (
      <>
        <StatusBar hidden={true} />
        {!this.state.isLoading ? (
          <View style={styles.container}>
            <View style={styles.center}>
              <View style={styles.board}>
                <View style={styles.lineInBoard}>
                  <View style={styles.itemBoard} />
                  <View style={styles.itemBoard} />
                  <View style={styles.itemBoard} />
                </View>
                <View style={styles.lineInBoard}>
                  <View style={styles.itemBoard} />
                  <View style={styles.itemBoard} />
                  <View style={styles.itemBoard} />
                </View>
                <View style={styles.lineInBoard}>
                  <View style={styles.itemBoard} />
                  <View style={styles.itemBoard} />
                  <View style={styles.itemBoard} />
                </View>
                <View style={styles.lineInBoard}>
                  <View style={styles.itemBoard} />
                  <View style={styles.itemBoard} />
                  <View
                    ref={node => {
                      this.buf = node;
                    }}
                    onLayout={({ nativeEvent }) => {
                      if (this.buf) {
                        this.buf.measure((fx, fy, width, height, px, py) => {
                          console.log("Component width is: " + width);
                          console.log("Component height is: " + height);
                          console.log("X offset to frame: " + fx);
                          console.log("Y offset to frame: " + px);

                          console.log("Y offset to page: " + py);
                          this.setState({
                            px,
                            py
                          });
                        });
                      }
                    }}
                    style={styles.itemBoard}
                  />
                </View>
              </View>
              <View style={styles.sliders}>
                <View style={styles.lineInBoard}>
                  <DragNDrop px={this.state.px} py={this.state.py}>
                    <Image
                      style={styles.itemBoard}
                      source={{ uri: this.state.slices[0] }}
                    />
                  </DragNDrop>
                  <DragNDrop>
                    <Image
                      style={styles.itemBoard}
                      source={{ uri: this.state.slices[1] }}
                    />
                  </DragNDrop>
                  <DragNDrop>
                    <Image
                      style={styles.itemBoard}
                      source={{ uri: this.state.slices[2] }}
                    />
                  </DragNDrop>
                  <DragNDrop>
                    <Image
                      style={styles.itemBoard}
                      source={{ uri: this.state.slices[3] }}
                    />
                  </DragNDrop>
                  <DragNDrop>
                    <Image
                      style={styles.itemBoard}
                      source={{ uri: this.state.slices[4] }}
                    />
                  </DragNDrop>
                  <DragNDrop>
                    <Image
                      style={styles.itemBoard}
                      source={{ uri: this.state.slices[5] }}
                    />
                  </DragNDrop>
                </View>
                <View style={styles.lineInBoard}>
                  <DragNDrop>
                    <Image
                      style={styles.itemBoard}
                      source={{ uri: this.state.slices[6] }}
                    />
                  </DragNDrop>
                  <DragNDrop>
                    <Image
                      style={styles.itemBoard}
                      source={{ uri: this.state.slices[7] }}
                    />
                  </DragNDrop>
                  <DragNDrop>
                    <Image
                      style={styles.itemBoard}
                      source={{ uri: this.state.slices[8] }}
                    />
                  </DragNDrop>
                  <DragNDrop>
                    <Image
                      style={styles.itemBoard}
                      source={{ uri: this.state.slices[9] }}
                    />
                  </DragNDrop>
                  <DragNDrop>
                    <Image
                      style={styles.itemBoard}
                      source={{ uri: this.state.slices[10] }}
                    />
                  </DragNDrop>
                  <DragNDrop>
                    <Image
                      style={styles.itemBoard}
                      source={{ uri: this.state.slices[11] }}
                    />
                  </DragNDrop>
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
              <ProgressBarAndroid styleAttr="Horizontal" color="white" />
              <ProgressBarAndroid styleAttr="Horizontal" color="red" />
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
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around"
  },

  sliders: {
    flexDirection: "column"
  },
  item: {
    margin: 2,
    height: 90,
    width: 60
  },
  board: {
    // backgroundColor: "green",
    alignItems: "center",
    justifyContent: "space-around"
  },
  lineInBoard: {
    flexDirection: "row"
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
