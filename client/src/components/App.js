import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import "../assets/scss/main.scss";
import getCurrentUser from "../services/getCurrentUser";
import LandingPage from "./LandingPage";
import TopBar from "./layout/TopBar";
import Dashboard from "./Dashboard";

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined)
  // const [shouldRedirect, setShouldRedirect] = useState(false)
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser();
      setCurrentUser(user)
    } catch (err) {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  let dashBoardContent = (
    <>
      <TopBar />
      <Dashboard user={currentUser} />
    </>
  )
  if (!currentUser) {
    dashBoardContent = <p>Loading...</p>
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <LandingPage user={currentUser} />
        </Route>
        <Route exact path="/dashboard">
          {dashBoardContent}
        </Route>  
      </Switch>
    </Router>
  );
};

export default hot(App);
