import React from "react"

const ProfileButtonPhoto = (props) => {

  return (
    <>
      <img className="top-bar-pic" src={props.user.imageUrl} />
    </>
  )
}

export default ProfileButtonPhoto