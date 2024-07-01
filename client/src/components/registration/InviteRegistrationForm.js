import React, { useState } from "react"
import ErrorList from "../utilities/ErrorList"
import FormError from "../utilities/FormError"
import translateServerErrors from "../../utilities/translateServerErrors"

const InviteRegistrationForm = (props) => {
  const [userPayload, setUserPayload] = useState({
    username: "",
    password: "",
    passwordConfirmation: "",
  })
  const [errors, setErrors] = useState({})
  const [serverErrors, setServerErrors] = useState({})
  const [shouldGoHome, setShouldGoHome] = useState(false)
  const [shouldGoProfile, setShouldGoProfile] = useState(false)

  const validateInput = (payload) => {
    setErrors({})
    setServerErrors({})
    const { username, password, passwordConfirmation } = payload
    let newErrors = {}
    if (password.trim() == "") {
      newErrors = {
        ...newErrors,
        password: "Password is required",
      }
    }
    if (username.trim() == "") {
      newErrors = {
        ...newErrors,
        username: "Username is required",
      }
    }
    if (passwordConfirmation.trim() === "") {
      newErrors = {
        ...newErrors,
        passwordConfirmation: "Password confirmation is required",
      }
    } else {
      if (passwordConfirmation !== password) {
        newErrors = {
          ...newErrors,
          passwordConfirmation: "Does not match password",
        }
      }
    }

    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) {
      return true
    }
    return false
  }

  const onSubmit = async (event) => {
    event.preventDefault()

    try {
      if (validateInput(userPayload)) {
        const fullUserPayload = {
          ...userPayload,
          nickname: props.invite.nickname,
          email: props.invite.email,
          isParent: props.invite.isParent,
          imageUrl: "",
          familyId: props.invite.familyId,
          inviteId: props.invite.id,
        }
        let response
        if (props.invite.isParent) {
          response = await fetch("/api/v1/users/parent", {
            method: "POST",
            body: JSON.stringify(fullUserPayload),
            headers: new Headers({
              "Content-Type": "application/json",
            }),
          })
        } else {
          response = await fetch("/api/v1/users/child", {
            method: "POST",
            body: JSON.stringify(fullUserPayload),
            headers: new Headers({
              "Content-Type": "application/json",
            }),
          })
        }
        if (!response.ok) {
          if (response.status === 422) {
            const body = await response.json()
            const newServerErrors = translateServerErrors(body.errors)
            return setServerErrors(newServerErrors)
          }
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw error
        }
        return setShouldGoProfile(true)
      }
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  const onInputChange = (event) => {
    setUserPayload({
      ...userPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  const goHome = () => {
    setShouldGoHome(true)
  }

  const clearForm = () => {
    setUserPayload({
      username: "",
      password: "",
      passwordConfirmation: "",
    })
  }

  const inviteMessage = `An email and nickname have already been provided. Simply choose a username and password and you'll get access to Chore Champions!`

  if (shouldGoProfile) {
    location.href = "/profile"
  }

  if (shouldGoHome) {
    location.href = "/"
  }

  return (
    <div className="sign-in-form">
      <p className="invite-message">{inviteMessage}</p>
      <ErrorList errors={serverErrors} />
      <form onSubmit={onSubmit}>
        <label>
          Username
          <input
            type="text"
            name="username"
            value={userPayload.username}
            onChange={onInputChange}
            className="form-field"
          />
          <FormError error={errors.username} />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            value={userPayload.password}
            onChange={onInputChange}
            className="form-field"
          />
          <FormError error={errors.password} />
        </label>
        <label>
          Password Confirmation
          <input
            type="password"
            name="passwordConfirmation"
            value={userPayload.passwordConfirmation}
            onChange={onInputChange}
            className="form-field"
          />
          <FormError error={errors.passwordConfirmation} />
        </label>
        <div className="intro-button-container">
          <input type="submit" className="landing-page-button" value="Register" />
          <span className="landing-page-button" onClick={goHome}>
            Home
          </span>
          <span className="landing-page-button" onClick={clearForm}>
            Clear
          </span>
        </div>
      </form>
    </div>
  )
}

export default InviteRegistrationForm
