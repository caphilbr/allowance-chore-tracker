import React from "react";
import TopBar from "./layout/TopBar";
import ProfilePhoto from "./ProfilePhoto";


const UserProfile = (props) => {
  
  return (
    <>
      <TopBar user={props.user} />
      <div className="background-color grid-x grid-margin-x grid-padding-x align-center profile-page">
        <div className="cell small-12 medium-6 large-3 profile-pic-containter">
          <ProfilePhoto user={props.user} setCurrentUser={props.setCurrentUser} />
        </div>
        <div className="cell small-12 large-8 profile-page-details">
          <h4>Username: {props.user.name}</h4>
          <h4>Email: {props.user.email}</h4>
          <h4>User Type: {props.user.isParent ? "Parent" : "Child"}</h4>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
