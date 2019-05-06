import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStore, Store } from "redux";
import { rootReducer, IRootReducer } from "./modules";
import { Provider } from "react-redux";
import { NativeRouter, Switch, Route } from "react-router-native";
import { Gallery } from "./containers";
//import { ROOT_INITIAL_STATE } from "./modules";

const store = createStore(rootReducer);

store.subscribe(() => {
  console.log(store.getState());
});
console.log(store.getState());
class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <NativeRouter>
          <Switch>
            <Route path="/" component={Gallery} />
            <Route path="/puzzle" component={null} />
          </Switch>
        </NativeRouter>
      </Provider>
    );
  }
}

export default App;
