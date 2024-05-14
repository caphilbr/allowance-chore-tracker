import React, { useState } from "react"
import config from "../config"
import { Redirect } from "react-router-dom"
import SignOutButton from "./authentication/SignOutButton"

const Intro = (props) => {
  
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const showSignIn = () => props.setLandingDisplay('signin')
  const showSignUp = () => props.setLandingDisplay('signup')
  const showDashboard = () => setShouldRedirect(true)
  
  let buttonsToShow
  if (props.user) {
    buttonsToShow = (
      <div>
        <span className="landing-page-button" onClick={showDashboard} >Show My Dashboard</span>
        <span><SignOutButton button-styling="landing-page-button" /></span>
      </div>
    )
  } else {
    buttonsToShow = (
      <div>
        <span className="landing-page-button" onClick={showSignIn} >Sign In</span>
        <span className="landing-page-button" onClick={showSignUp} >Sign Up</span>
      </div>
    )
  }

  if (shouldRedirect) {
    return <Redirect push to="/dashboard" />
  }

  return (
    <>
      <img
        className="landing-title"
        src={config.titleFontUrl}
      />
      <span className="landing-slogan">The easy way to manage <br/> chores and allowances</span>
      {buttonsToShow}
    </>
  )
}

export default Intro
