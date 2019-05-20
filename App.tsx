import React from "react";
import { createStore } from "redux";
import { reducer } from "./redux";
import { Provider } from "react-redux";
import { NativeRouter, Switch, Route } from "react-router-native";
import { Gallery, Puzzle } from "./containers";

//import { ROOT_INITIAL_STATE } from "./modules";

const store = createStore(reducer);

// store.subscribe(() => {
//   console.log(store.getState());
// });

// console.log(store.getState());

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
