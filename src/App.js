import React from "react";
import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreateCategory from "./pages/CreateCategory";
import CategoryDetails from './pages/CategoryDetails'
import Addproduct from './pages/Addproduct'
function App() {
  return (
    <Router>
    
      <Switch>
        <div className="App">
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/create_category">
            <CreateCategory/>
          </Route>
          <Route path="/category/:category" render={props => <CategoryDetails {...props.match.params} />} />
            <Route exact path="/addProduct">
              <Addproduct/>
          </Route>
        </div>
      </Switch>
    </Router>
  );
}

export default App;
