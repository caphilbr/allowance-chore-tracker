import React from "react";
import TopBar from "./layout/TopBar";
import ProfilePhoto from "./ProfilePhoto";
import EditNickname from "./EditNickname";
import EditEmail from "./EditEmail";


const UserProfile = (props) => {
  
  return (
    <>
      <TopBar user={props.user} />
      <div className="background-color grid-x grid-margin-x grid-padding-x align-center profile-page">
        <div className="cell small-12 medium-6 large-3 profile-pic-containter">
          <ProfilePhoto user={props.user} setCurrentUser={props.setCurrentUser} />
        </div>
        <div className="cell small-12 large-8 profile-page-details">
          <h4><span>Username: {props.user.username}</span></h4>
          <h4><EditNickname /><span>Nickname: {props.user.nickname}</span></h4>
          <h4><EditEmail /><span>Email: {props.user.email}</span></h4>
          <h4><span>User Type: {props.user.isParent ? "Parent" : "Child"}</span></h4>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
