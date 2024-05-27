import React from "react"
import SignOutButton from "../authentication/SignOutButton"

const ProfileDropdown = () => {

  const goToProfile = () => {
    location.href = "/profile"
  }

  return (
    <div className="dropdown">
      <p onClick={goToProfile}>Profile Page</p>
      <SignOutButton />
    </div>
  )
}

export default ProfileDropdown
