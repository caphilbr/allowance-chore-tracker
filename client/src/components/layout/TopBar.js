import React from "react";
import { Link } from "react-router-dom";
import ProfileButton from "./ProfileButton";

const TopBar = (props) => {

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <Link className="button-styling" to="/">Home</Link>
        <Link className="button-styling" to="/dashboard">My Dashboard</Link>
      </div>
      <div className="top-bar-right">
        <ProfileButton user={props.user} />
      </div>
    </div>
  );
};

export default TopBar;
