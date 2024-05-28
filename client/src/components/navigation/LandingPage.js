import React, { useState } from "react"
import config from "../../config"
import Intro from "./Intro"
import SignInForm from "../authentication/SignInForm"
import RegistrationForm from "../registration/RegistrationForm"

const LandingPage = (props) => {
  const [landingDisplay, setLandingDisplay] = useState("landing")

  let mainContent
  if (landingDisplay === "landing") {
    mainContent = (
      <Intro setLandingDisplay={setLandingDisplay} user={props.user} />
    )
  }
  if (landingDisplay === "signin") {
    mainContent = <SignInForm />
  }
  if (landingDisplay === "signup") {
    mainContent = <RegistrationForm />
  }

  return (
    <div className="background-color grid-x">
      <img
        className="cell small-12 medium-5 landing-page-background-img"
        src={config.homeBackgroundUrl}
      />
      <div className="cell small-12 medium-6 landing-page-main">{mainContent}</div>
    </div>
  )
}

export default LandingPage
