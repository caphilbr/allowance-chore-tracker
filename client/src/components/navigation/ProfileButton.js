import React from "react"
import ProfileButtonPhoto from "./ProfileButtonPhoto"

const ProfileButton = (props) => {
  
  return (
    <>
      <span >
        <ProfileButtonPhoto user={props.user} />
      </span>
      
    </>
  )
}

export default ProfileButton
