import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import deleteUserSession from "../../services/fetch/deleteUserSession"

const SignOutButton = () => {

  const signOut = async () => {
    const response = await deleteUserSession()
    if (response.ok) {
      location.href = "/"
    }
  }

  const handleSignOut = () => {
    signOut()
  }
  
  return <p onClick={handleSignOut}><span><FontAwesomeIcon icon="fas fa-sign-out-alt" /> </span>Sign Out</p>
}

export default SignOutButton
