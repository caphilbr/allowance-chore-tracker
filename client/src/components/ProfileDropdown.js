import React, { useState } from "react"

const ProfileDropdown = () => {

  const [shouldGoProfile, setShouldGoProfile] = useState(false)
  const [shouldGoDashboard, setShouldGoDashboard] = useState(false)

  if (shouldGoProfile) {
    location.href = "/profile"
  }

  if (shouldGoDashboard) {
    location.href = "/dashboard"
  }

  const goToProfile = () => {
    setShouldGoProfile(true)
  }

  const goToDashboard = () => {
    setShouldGoDashboard(true)
  }
  
  return (
    <div className="dropdown">
      <p onClick={goToProfile}>Profile Page</p>
      <p onClick={goToDashboard}>My Dashboard</p>
      <p>TBD</p>      
    </div>

  )
}

export default ProfileDropdown