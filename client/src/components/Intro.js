import React from "react"
import config from "../config"

const Intro = (props) => {
  
  const showSignIn = () => props.setLandingDisplay('signin')
  const showSignUp = () => props.setLandingDisplay('signup')
  
  return (
    <>
      <img
        className="landing-title"
        src={config.titleFontUrl}
      />
      <span className="landing-slogan">The easy way to manage <br/> chores and allowances</span>
      <div>
        <span className="landing-page-button" onClick={showSignIn} >Sign In</span>
        <span className="landing-page-button" onClick={showSignUp} >Sign Up</span>
      </div>
    </>
  )
}

export default Intro
