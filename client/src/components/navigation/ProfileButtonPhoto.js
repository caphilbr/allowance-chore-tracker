import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const ProfileButtonPhoto = (props) => {
  
  let photo = <FontAwesomeIcon icon="fas fa-user" className="fa-2x"/>
  if (props.user.imageUrl != null && props.user.imageUrl != "") {
    photo = <img className="top-bar-pic" src={props.user.imageUrl} />
  }

  return (
    <>
      {photo}
    </>
  )
}

export default ProfileButtonPhoto
