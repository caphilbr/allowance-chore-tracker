import React, { useState } from "react"
import ProfileButtonPhoto from "./ProfileButtonPhoto"
import ProfileDropdown from "./ProfileDropdown"

const ProfileButton = (props) => {
  const [showDropdown, setShowDropdown] = useState(false)

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown)
  }

  let dropdown = null
  if (showDropdown) {
    dropdown = <ProfileDropdown />
  }

  return (
    <>
      <span onClick={toggleDropdown}>
        <ProfileButtonPhoto user={props.user} />
      </span>
      {dropdown}
    </>
  )
}

export default ProfileButton
