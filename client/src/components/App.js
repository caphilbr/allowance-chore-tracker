import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import "../assets/scss/main.scss";
import getCurrentUser from "../services/getCurrentUser";
import LandingPage from "./LandingPage";
import TopBar from "./layout/TopBar";
import Dashboard from "./Dashboard";
import AuthenticatedRoute from "./authentication/AuthenticatedRoute"
import UserProfile from "./UserProfile";
import Invite from "./authentication/Invite";

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined)
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
      <TopBar user={currentUser} />
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
        <Route exact path="/invite">
          <Invite user={currentUser} />
        </Route>
        <AuthenticatedRoute
          exact path="/profile"
          component={UserProfile}
          user={currentUser}
          setCurrentUser={setCurrentUser}
        />
      </Switch>
    </Router>
  );
};

export default hot(App);
