import React from "react";
import { Link } from "react-router-dom";

import SignOutButton from "../authentication/SignOutButton";

const TopBar = () => {

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <Link className="button-styling" to="/">Home</Link>
      </div>
      <div className="top-bar-right">
        <SignOutButton className="button-styling" />
      </div>
    </div>
  );
};

export default TopBar;
