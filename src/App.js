import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import SorterApp from "./sorter/SorterApp";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div class="App-nav">
          <Link to="/" class="link">
            Home
          </Link>
          <Link to="/sorter" class="link">
            Sorter
          </Link>
          <Link to="/pathfinder" class="link">
            Pathfinder
          </Link>
        </div>
        <Switch>
          <Route exact path="/">
            <div>
              <h2>Home</h2>
            </div>
          </Route>
          <Route path="/sorter">
            <SorterApp />
          </Route>
          <Route path="/pathfinder">
            <div>
              <h2>Pathfinder</h2>
            </div>
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
