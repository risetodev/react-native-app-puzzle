import React from "react";
import { createStore } from "redux";
import { reducer } from "./redux";
import { Provider } from "react-redux";
import { NativeRouter, Switch, Route } from "react-router-native";
import { Gallery, Puzzle } from "./containers";
import { ScreenOrientation } from "expo";

const store = createStore(reducer);

ScreenOrientation.allowAsync(ScreenOrientation.Orientation.ALL_BUT_UPSIDE_DOWN);
class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <NativeRouter>
          <Switch>
            <Route exact path="/" component={Gallery} />
            <Route path="/puzzle" component={Puzzle} />
          </Switch>
        </NativeRouter>
      </Provider>
    );
  }
}

export default App;
