import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import Home from "./pages/Home.js";
import About from "./pages/About.js";
import Profile from "./pages/Profile.js";
import { Alert } from "./components/Alert.js";
import { AlertState } from "./context/alert/AlertState.js";
import { GithubState } from "./context/github/GithubState.js";

function App() {
  return (
    <GithubState>
      <AlertState>
        <BrowserRouter>
          <Navbar />
          <div className="container pt-4">
            <Alert alert={{ text: "Test alert" }} />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/about" component={About} />
              <Route path="/profile/:name" component={Profile} />
            </Switch>
          </div>
        </BrowserRouter>
      </AlertState>
    </GithubState>
  );
}

export default App;
