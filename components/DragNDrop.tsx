import React from "react";
import {
  StyleSheet,
  Animated,
  PanResponder,
  View,
  Dimensions
} from "react-native";

export default class DragNDrop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY(),
      initX: 0,
      initY: 0
    };
  }

  componentWillMount() {
    this._animatedValueX = 0;
    this._animatedValueY = 0;
    this.state.pan.x.addListener(value => (this._animatedValueX = value.value));
    this.state.pan.y.addListener(value => (this._animatedValueY = value.value));

    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (e, gestureState) => {
        // console.log(e);
        // console.log("------------");

        // console.log(gestureState);
        this.setState({
          initX: gestureState.x0,
          initY: gestureState.y0
        });
        this.state.pan.setOffset({
          x: this._animatedValueX,
          y: this._animatedValueY
        });
        //this.state.pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([
        null,
        { dx: this.state.pan.x, dy: this.state.pan.y }
      ]),
      onPanResponderRelease: (e, gesture) => {
        console.log(e);
        console.log("------------");
        console.log(e["touchHistory"].touchBank[0].startPageX);

        //console.log(gesture);

        if (Math.abs(e.nativeEvent.pageX - gesture.moveX) <= 10) {
          console.log(e.nativeEvent.pageX);
          console.log("///////////////////////");

          console.log(gesture.moveX);
          // console.log(
          //   this.props.px,
          //   this.props.px - Dimensions.get("window").width
          // );
          // console.log(
          //   this.props.py,
          //   this.props.py - Dimensions.get("window").height
          // );

          Animated.spring(this.state.pan, {
            toValue: {
              x: e["touchHistory"].touchBank[0].startPageX,
              y: -100
            }
          }).start();
        } else
          Animated.spring(this.state.pan, {
            toValue: 0
          }).start();
      }
    });
  }
  componentWillUnmount() {
    this.state.pan.x.removeAllListeners();
    this.state.pan.y.removeAllListeners();
  }

  getStyle() {
    return [
      {
        transform: [
          {
            translateX: this.state.pan.x
          },
          {
            translateY: this.state.pan.y
          }
          // {
          //   rotate: this.state.pan.x.interpolate({
          //     inputRange: [-200, 0, 200],
          //     outputRange: ["-30deg", "0deg", "30deg"]
          //   })
          // }
        ]
      }
      // {
      //   opacity: this.state.pan.x.interpolate({
      //     inputRange: [-200, 0, 200],
      //     outputRange: [0.5, 1, 0.5]
      //   })
      // }
    ];
  }
  render() {
    return (
      <Animated.View
        style={this.getStyle()}
        {...this._panResponder.panHandlers}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}
