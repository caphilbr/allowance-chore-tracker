import React, { useState } from "react"
import { Link } from "react-router-dom"
import ProfileButton from "./ProfileButton"
import ProfileDropdown from "./ProfileDropdown"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const TopBar = (props) => {
  
  const [showDropdown, setShowDropdown] = useState(false)

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown)
  }

  let dropdown = null
  if (showDropdown) {
    dropdown = <ProfileDropdown />
  }
  
  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <Link className="button-styling" to="/">
          Home
        </Link>
        <Link className="button-styling" to="/dashboard">
          My Dashboard
        </Link>
      </div>
      <div className="top-bar-right" onClick={toggleDropdown}>
        <ProfileButton user={props.user} />
        <FontAwesomeIcon icon="fas fa-angle-down" />
        {dropdown}
      </div>
    </div>
  )
}

export default TopBar
