import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import SorterApp from "./sorter/SorterApp";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App-nav">
          <Link to="/algorithms" className="link">
            Home
          </Link>
          <Link to="/algorithms/sorter" className="link">
            Sorter
          </Link>
          <Link to="/algorithms/pathfinder" className="link">
            Pathfinder
          </Link>
        </div>
        <Switch>
          <Route exact path="/algorithms">
            <div>
              <h2>Home</h2>
            </div>
          </Route>
          <Route path="/algorithms/sorter">
            <SorterApp />
          </Route>
          <Route path="/algorithms/pathfinder">
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
