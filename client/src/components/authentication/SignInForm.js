import React, { useState } from "react"
import FormError from "../utilities/FormError"
import postUserSession from "../../services/fetch/postUserSession"

const SignInForm = () => {
  const [userPayload, setUserPayload] = useState({ username: "", password: "" })
  const [shouldGo, setShouldGo] = useState({
    home: false,
    dashboard: false
  })
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
        const response = await postUserSession(userPayload)
        if (!response.ok) {
          if (response.status === 401) {
            const body = await response.json()
            return setCredentialsErrors(body.message)
          }
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw error
        }
        setShouldGo({
          ...shouldGo,
          dashboard: true
        })
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
    setShouldGo({
      ...shouldGo,
      home: true
    })
  }

  if (shouldGo.dashboard) {
    location.href = "/dashboard"
  }

  if (shouldGo.home) {
    location.href = "/"
  }

  return (
    <div className="sign-in-form" onSubmit={onSubmit}>
      <p className="sign-in-up-title">Login</p>

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
        <span className="landing-page-button" onClick={goHome}>
          Home
        </span>
        <input type="submit" className="landing-page-button" value="Login" />
      </form>
    </div>
  )
}

export default SignInForm
