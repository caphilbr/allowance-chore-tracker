import React, { useState } from "react"
import FormError from "../shared/FormError"

const SignInForm = () => {
  const [userPayload, setUserPayload] = useState({ username: "", password: "" })
  const [shouldGoHome, setShouldGoHome] = useState(false)
  const [shouldGoDashboard, setShouldGoDashboard] = useState(false)
  const [errors, setErrors] = useState({})
  const [credentialsErrors, setCredentialsErrors] = useState("")

  const validateInput = (payload) => {
    setErrors({})
    setCredentialsErrors("")
    const { username, password } = payload
    let newErrors = {}
    if (username.trim() === "") {
      newErrors = {
        ...newErrors,
        username: "Username is required",
      }
    }
    if (password.trim() === "") {
      newErrors = {
        ...newErrors,
        password: "Email is required",
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
    if (validateInput(userPayload)) {
      try {
        const response = await fetch("/api/v1/user-sessions", {
          method: "POST",
          body: JSON.stringify(userPayload),
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        })
        if (!response.ok) {
          if (response.status === 401) {
            const body = await response.json()
            return setCredentialsErrors(body.message)
          }
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw error
        }
        const userData = await response.json()
        setShouldGoDashboard(true)
      } catch (err) {
        console.error(`Error in fetch: ${err.message}`)
      }
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

  if (shouldGoDashboard) {
    location.href = "/dashboard"
  }

  if (shouldGoHome) {
    location.href = "/"
  }

  return (
    <div className="sign-in-form" onSubmit={onSubmit}>
      <p className="sign-in-up-title">Sign In</p>

      {credentialsErrors ? (
        <p className="callout alert">{credentialsErrors}</p>
      ) : null}

      <form>
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
        <input type="submit" className="landing-page-button" value="Sign In" />
        <span className="landing-page-button" onClick={goHome}>
          Home
        </span>
      </form>
    </div>
  )
}

export default SignInForm
