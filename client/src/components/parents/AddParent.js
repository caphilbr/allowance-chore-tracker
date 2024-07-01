import React, { useState } from "react"
import FormError from "../utilities/FormError.js"
import config from "../../config.js"

const AddParent = (props) => {
  const [userPayload, setUserPayload] = useState({
    email: "",
    nickname: "",
    isParent: true
  })
  const [errors, setErrors] = useState({})
  const [showWaiting, setShowWaiting] = useState(false)

  const validateInput = (payload) => {
    setErrors({})
    const { email, nickname } = payload
    const emailRegexp = config.validation.email.regexp.emailRegex
    let newErrors = {}
    if (!email.match(emailRegexp)) {
      newErrors = {
        ...newErrors,
        email: "Email is invalid",
      }
    }
    if (nickname.trim() == "") {
      newErrors = {
        ...newErrors,
        nickname: "Nickname is required",
      }
    }
    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) {
      return true
    }
    return false
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (validateInput(userPayload)) {
      try {
        setShowWaiting(true)
        const response = await fetch("/api/v1/invite/email", {
          method: "POST",
          body: JSON.stringify(userPayload),
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        })
        if (!response.ok) {
          const newError = new Error(response.statusText)
          throw newError
        }
        const parsedData = await response.json()
        const invite = parsedData.invite
        setShowWaiting(false)
        props.setEmailStatus({
          status: "success",
          code: invite.code,
        })
        props.setShowAddParent(!props.showAddParent)
      } catch (err) {
        props.setEmailStatus({
          status: "error",
          code: "n/a",
        })
        props.setShowAddParent(!props.showAddParent)
        console.error(`Error in sending email: ${err.message}`)
      }
    }
  }

  const handleChange = (event) => {
    setUserPayload({
      ...userPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  const handleCancel = () => {
    props.setEmailStatus({
      status: "",
      code: "",
    })
    setShowWaiting(false)
    props.setShowAddParent(!props.showAddParent)
  }

  return (
    <div className="cell small-9 popout-box">
      <h3>Send Invite to Parent</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Parent Email
          <input
            type="text"
            name="email"
            value={userPayload.email}
            onChange={handleChange}
            className="form-field"
          />
          <FormError error={errors.email} />
          <p>
            IMPORTANT! While in development, only emails to the developer at
            caphilbr@hotmail.com are deliverable. Soon, a new feature will be
            released that allows parents to be added without an email address.
            In the meantime, send the parent invite to caphilbr@hotmail.com and
            the registration code will be made visible to you on the next
            screen.
          </p>
        </label>
        <label>
          Parent Name
          <input
            type="text"
            name="nickname"
            value={userPayload.nickname}
            onChange={handleChange}
            className="form-field"
          />
          <FormError error={errors.nickname} />
        </label>
        {showWaiting ? <p className="email-message">Sending email...</p> : null}
        <input
          type="submit"
          className="landing-page-button"
          value="Invite Parent"
        />
        <span className="landing-page-button" onClick={handleCancel}>
          Cancel
        </span>
      </form>
    </div>
  )
}

export default AddParent
