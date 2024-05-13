import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import "../assets/scss/main.scss";
import getCurrentUser from "../services/getCurrentUser";
import LandingPage from "./LandingPage";
import TopBar from "./layout/TopBar";
import Dashboard from "./Dashboard";

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser();
      setCurrentUser(user);
    } catch (err) {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);
  
  let isLoggedIn = true
  if (currentUser === null || currentUser === undefined) {
    isLoggedIn = false
  }

  const dashboard = (
    <>
      <TopBar />
      <Switch>
        <Route exact path="/" component={Dashboard} />
      </Switch>
    </>
  )

  const landingPage = (
    <>
      <Switch>
        <Route exact path="/" component={LandingPage} />
      </Switch>
    </>
  )

  return (
    <Router>
      {isLoggedIn ? dashboard : landingPage}
    </Router>
  );
};

export default hot(App);
