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
//import DragNDrop from "../../components/DragNDrop";

import _ from "underscore";

import DragSortableView from "react-native-drag-sort";
import Icon from "react-native-vector-icons/Ionicons";

const childrenWidth = 108;
const childrenHeight = 162;
class Puzzle extends React.Component<IProps> {
  state = {
    slices: Array.from(Array(12)),
    checkSlices: Array.from(Array(12)),
    isWin: true,
    ready: false,
    image: null,
    isLoading: false,
    startTime: 0,
    endTime: 0,
    px: 0,
    py: 0,
    scrollEnabled: true,
    isEnterEdit: false
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
        this.setState({
          checkSlices: res
        });
        this.setState({
          slices: this.state.checkSlices
            .slice()
            .sort(() => Math.random() - 0.5),
          isLoading: false
        });
      });
    })();
  }

  getGameTime = () => {
    return;
  };

  buf = null;

  constructor(props) {
    super(props);
    this.buf = React.createRef();
  }

  render() {
    return (
      <>
        <StatusBar hidden={true} />
        {!this.state.isLoading ? (
          <View style={styles.container}>
            <View style={styles.center}>
              <View style={styles.board}>
                {this.state.isWin ? (
                  <View
                    style={{
                      backgroundColor: "black",
                      flex: 1,
                      alignItems: "center",
                      flexDirection: "column",
                      justifyContent: "space-around"
                    }}
                  >
                    <View>
                      <Text style={{ fontSize: 50, color: "white" }}>
                        Well done!
                      </Text>
                    </View>

                    <View>
                      <Text style={{ fontSize: 50, color: "white" }}>
                        {this.state.endTime - this.state.startTime} seconds
                      </Text>
                    </View>
                  </View>
                ) : (
                  <DragSortableView
                    dataSource={this.state.slices}
                    parentWidth={(childrenWidth + 3) * 3}
                    childrenWidth={childrenWidth + 3}
                    childrenHeight={childrenHeight + 3}
                    onDragStart={(startIndex, endIndex) => {
                      if (!this.state.isEnterEdit) {
                        this.setState({
                          isEnterEdit: true
                        });
                      }
                    }}
                    onDataChange={slices => {
                      _.isEqual(slices, this.state.checkSlices) &&
                        this.setState({
                          isWin: true,
                          endTime: new Date().getSeconds()
                        });

                      // delete or add data to refresh
                      // if (slices.length != this.state.slices.length) {
                      //   this.setState({
                      //     slices
                      //   });
                      // }
                    }}
                    renderItem={(item, index) => {
                      // console.log(item, index);

                      return (
                        <View style={styles.itemBoard}>
                          <Image
                            style={styles.itemBoardImage}
                            source={{ uri: item }}
                          />
                        </View>
                      );
                    }}
                    {...this.setState({
                      startTime: new Date().getSeconds()
                    })}
                  />
                )}
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
  // item: {
  //   margin: 2,
  //   height: 90,
  //   width: 60
  // },
  board: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-around"
  },
  lineInBoard: {
    flexDirection: "row"
  },
  itemBoard: {
    // margin: 2,
    // height: 90,
    // width: 60,
    //backgroundColor: "grey"
  },
  itemBoardImage: {
    height: childrenHeight,
    width: childrenWidth
  }
});
