import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import SorterApp from "./sorter/SorterApp";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App-nav">
          <Link to="/" className="link">
            Home
          </Link>
          <Link to="/sorter" className="link">
            Sorter
          </Link>
          <Link to="/pathfinder" className="link">
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
