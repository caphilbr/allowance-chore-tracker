import React, { useState } from "react"
import SignOutButton from "../authentication/SignOutButton"
import config from "../../config"
import InviteRegistrationForm from "./InviteRegistrationForm"
import InviteCodeForm from "./InviteCodeForm"

const Invite = (props) => {
  const [shouldDashboard, setShouldDashboard] = useState(false)
  const [isValidCode, setIsValidCode] = useState(false)
  const [invite, setInvite] = useState({})

  const goDashboard = () => {
    setShouldDashboard(true)
  }

  if (shouldDashboard) {
    location.href = "/dashboard"
  }

  return (
    <div className="background-color grid-x full-screen-landing">
      <img
        className="cell small-12 landing-page-background-img"
        src={config.homeBackgroundUrl}
      />
        <div className="cell small-12 landing-page-main">
          <img
            className="cell small-12 landing-title"
            src={config.titleFontUrl}
          />
          <span className="cell small-12 landing-slogan">
            Invitation to Join
          </span>
          {props.user ? (
            <>
              <p className="show-more-contents">
                You are already logged in on this computer. Please logout and
                follow the invite link again, or you can stay logged in and
                visit your Dashboard.
              </p>
              <div className="cell intro-button-container">
                <span className="landing-page-button" onClick={goDashboard}>
                  My Dashboard
                </span>
                <span className="landing-page-button">
                  <SignOutButton />
                </span>
              </div>
            </>
          ) : (
            <>
              {isValidCode ? (
                <InviteRegistrationForm invite={invite} />
              ) : (
                <InviteCodeForm
                  setInvite={setInvite}
                  setIsValidCode={setIsValidCode}
                />
              )}
            </>
          )}
        </div>
      {/* </div> */}
    </div>
  )
}

export default Invite
