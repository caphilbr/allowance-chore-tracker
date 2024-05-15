import React from "react";
import { Link } from "react-router-dom";
import ProfileButton from "../ProfileButton";

import SignOutButton from "../authentication/SignOutButton";

const TopBar = (props) => {

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <Link className="button-styling" to="/">Home</Link>
      </div>
      <div className="top-bar-right">
        <SignOutButton className="button-styling" />
        <ProfileButton user={props.user} />
      </div>
    </div>
  );
};

export default TopBar;
