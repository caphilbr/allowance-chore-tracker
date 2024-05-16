import React, { useState } from "react"
import SignOutButton from "./authentication/SignOutButton"

const ProfileDropdown = () => {

  const [shouldGoProfile, setShouldGoProfile] = useState(false)

  if (shouldGoProfile) {
    location.href = "/profile"
  }

  const goToProfile = () => {
    setShouldGoProfile(true)
  }
  
  return (
    <div className="dropdown">
      <p onClick={goToProfile}>Profile Page</p>
      <SignOutButton />      
    </div>
  )
}

export default ProfileDropdown