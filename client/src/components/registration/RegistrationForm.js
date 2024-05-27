import React, { useState } from "react"
import config from "../../config"
import ErrorList from "../utilities/ErrorList"
import FormError from "../utilities/FormError"
import translateServerErrors from "../../utilities/translateServerErrors"

const RegistrationForm = () => {
  const [userPayload, setUserPayload] = useState({
    username: "(e.g. mother99)",
    nickname: "",
    familyName: "(e.g. The Smiths)",
    email: "",
    password: "",
    passwordConfirmation: "",
    isParent: true,
    imageUrl: "",
  })

  const [errors, setErrors] = useState({})
  const [serverErrors, setServerErrors] = useState({})
  const [shouldGoHome, setShouldGoHome] = useState(false)
  const [shouldGoProfile, setShouldGoProfile] = useState(false)

  const validateInput = (payload) => {
    setErrors({})
    setServerErrors({})
    const { email, username, password, passwordConfirmation, familyName } =
      payload
    const emailRegexp = config.validation.email.regexp.emailRegex
    let newErrors = {}
    if (!email.match(emailRegexp)) {
      newErrors = {
        ...newErrors,
        email: "is invalid",
      }
    }
    if (password.trim() == "") {
      newErrors = {
        ...newErrors,
        password: "is required",
      }
    }
    if (username.trim() == "") {
      newErrors = {
        ...newErrors,
        username: "is required",
      }
    }
    if (familyName.trim() == "") {
      newErrors = {
        ...newErrors,
        familyName: "is required",
      }
    }
    if (passwordConfirmation.trim() === "") {
      newErrors = {
        ...newErrors,
        passwordConfirmation: "is required",
      }
    } else {
      if (passwordConfirmation !== password) {
        newErrors = {
          ...newErrors,
          passwordConfirmation: "does not match password",
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
        const response = await fetch("/api/v1/users", {
          method: "POST",
          body: JSON.stringify(userPayload),
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        })
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

  if (shouldGoProfile) {
    location.href = "/profile"
  }

  if (shouldGoHome) {
    location.href = "/"
  }

  const goHome = () => {
    setShouldGoHome(true)
  }

  return (
    <div className="sign-in-form full-screen-intro">
      <p className="sign-in-up-title">Register a new Family</p>
      <p className="reg-notice">
        If you want to add a child or spouse to a an existing family, please
        login to add them instead of using this form
      </p>
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
          Family Name
          <input
            type="text"
            name="familyName"
            value={userPayload.familyName}
            onChange={onInputChange}
            className="form-field"
          />
          <FormError error={errors.familyName} />
        </label>
        <label>
          Parent Email
          <input
            type="text"
            name="email"
            value={userPayload.email}
            onChange={onInputChange}
            className="form-field"
          />
          <FormError error={errors.email} />
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
        <input type="submit" className="landing-page-button" value="Register" />
        <span className="landing-page-button" onClick={goHome}>
          Home
        </span>
      </form>
    </div>
  )
}

export default RegistrationForm
