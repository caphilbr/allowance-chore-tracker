import React from "react"

const ProfileButtonPhoto = (props) => {
  console.log(props)
  return (
    <>
      <img className="top-bar-pic" src={props.user.imageUrl} />
    </>
  )
}

export default ProfileButtonPhoto