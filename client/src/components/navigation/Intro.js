import React, { useState } from "react"
import config from "../../config"
import { Redirect } from "react-router-dom"
import SignOutButton from "../authentication/SignOutButton"

const Intro = (props) => {
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [showMore, setShowMore] = useState(false)

  const showSignIn = () => props.setLandingDisplay("signin")
  const showSignUp = () => props.setLandingDisplay("signup")
  const showDashboard = () => setShouldRedirect(true)
  const showInvite = () => (location.href = "/invite")
  const toggleShowMore = () => setShowMore(!showMore)

  let buttonsToShow
  if (props.user) {
    buttonsToShow = (
      <div className="cell intro-button-container">
        <span className="landing-page-button" onClick={showDashboard}>
          Show My Dashboard
        </span>
        <span className="landing-page-button">
          <SignOutButton />
        </span>
      </div>
    )
  } else {
    buttonsToShow = (
      <div className="cell intro-button-container">
        <span className="landing-page-button" onClick={showSignIn}>
          Sign In
        </span>
        <span className="landing-page-button" onClick={showSignUp}>
          Create A New Family
        </span>
        <span className="landing-page-button" onClick={showInvite}>
          I Have An Invite
        </span>
      </div>
    )
  }

  let moreToShow = (
    <span className="cell show-more-button" onClick={toggleShowMore}>
      ▼ SHOW MORE ▼
    </span>
  )
  if (showMore) {
    moreToShow = (
      <div className="cell show-more-contents">
        <ul className="more-list">
          <li>Automatic recurring allowance payments</li>
          <li>Assign chores to children, with payment when completed</li>
          <li>Keep track of balances over time</li>
          <li>Children have their own login and dashboard</li>
          <li>Add as many children and spouses as you need</li>
        </ul>
        <span className="show-more-button" onClick={toggleShowMore}>
          ▲ SHOW LESS ▲
        </span>
      </div>
    )
  }

  if (shouldRedirect) {
    return <Redirect push to="/dashboard" />
  }

  return (
    <div className="grid-x full-screen-intro">
      <img className="cell small-12 landing-title" src={config.titleFontUrl} />
      <span className="cell small-12 landing-slogan">
        The easy way to manage <br /> chores and allowances
      </span>
      {moreToShow}
      {buttonsToShow}
    </div>
  )
}

export default Intro
