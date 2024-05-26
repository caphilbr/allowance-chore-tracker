import React, { useState } from "react"
import FormError from "../shared/FormError"
import config from "../../config"

const InviteCodeForm = (props) => {
  const [inputCode, setInputCode] = useState("")
  const [error, setError] = useState("")
  const [shouldGoHome, setShouldGoHome] = useState(false)

  const onInputChange = (event) => {
    setInputCode(event.currentTarget.value)
  }

  const goHome = () => {
    setShouldGoHome(true)
  }

  const validateInput = (codeEntry) => {
    setError("")
    const codeRegexp = config.validation.code.regexp.codeRegex
    if (!codeEntry.match(codeRegexp)) {
      setError("Code must be 4 digits between 0 and 9")
    }
    if (error == "") return true
    return false
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    if (validateInput(inputCode)) {
      try {
        const response = await fetch(`/api/v1/invite/${inputCode}`)
        const parsedData = await response.json()
        if (!response.ok) {
          if (response.status == 404) {
            const newError = new Error("Invalid Invite Code")
            setError("Invalid Invite Code")
            throw newError
          } else if (response.status == 403) {
            const newError = new Error("Code has already been used")
            setError("Code has already been used")
            throw newError
          } else {
            const newError = new Error(response.statusText)
            setError("An error occurred. Please try again later.")
            throw newError
          }
        }
        props.setInvite(parsedData.invite)
        props.setIsValidCode(true)
      } catch (error) {
        console.log(error)
      }
    }
  }

  if (shouldGoHome) {
    location.href = "/"
  }

  return (
    <div className="sign-in-form">
      <form onSubmit={onSubmit}>
        <label>
          Invitation Code From The Invite Email
          <input
            type="text"
            name="inputCode"
            value={inputCode}
            onChange={onInputChange}
            className="form-field"
          />
        </label>
        <FormError error={error} />
        <input
          type="submit"
          className="landing-page-button"
          value="Submit Code"
        />
        <span className="landing-page-button" onClick={goHome}>
          Home
        </span>
      </form>
    </div>
  )
}

export default InviteCodeForm
