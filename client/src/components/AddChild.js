import React, { useState } from "react"
import FormError from "./layout/FormError";
import config from "./../config.js"

const AddChild = (props) => {

  const [userPayload, setUserPayload] = useState({
    email: ""
  })
  const [errors, setErrors] = useState({});
  const [showWaiting, setShowWaiting] = useState(false)

  const validateInput = (payload) => {
    setErrors({});
    const { email } = payload;
    const emailRegexp = config.validation.email.regexp.emailRegex;
    let newErrors = {};
    if (!email.match(emailRegexp)) {
      newErrors = {
        ...newErrors,
        email: "Email is invalid",
      };
    } 
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      return true;
    }
    return false;
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if(validateInput(userPayload)) {
      try {
        setShowWaiting(true)
        const inviteUrl = "https://www.cyclingnews.com"
        const emailPayload = {...userPayload, inviteUrl: inviteUrl}
        const response = await fetch("/api/v1/email", {
          method: "POST",
          body: JSON.stringify(emailPayload),
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        });
        setShowWaiting(false)
        props.setEmailStatus('success')
        props.setShowAddChild(!props.showAddChild)
      } catch (err) {
        props.setEmailStatus('error')
        props.setShowAddChild(!props.showAddChild)
        console.error(`Error in sending email: ${err.message}`);
      }
    }
  }

  const handleChange = (event) => {
    setUserPayload({
      ...userPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  }

  const handleCancel = () => {
    props.setEmailStatus('')
    setShowWaiting(false)
    props.setShowAddChild(!props.showAddChild)
  }


  return (
    <div className="invite-form">
      <form onSubmit={handleSubmit}>
        <label>Child Email
          <input type="text" name="email" value={userPayload.email} onChange={handleChange} className="form-field" />
          <FormError error={errors.email} />
        </label>
        {showWaiting ? <p className="email-message">Sending email...</p> : null}
        <input type="submit" className="landing-page-button" value="Invite Child" />
        <span className="landing-page-button" onClick={handleCancel}>Cancel</span>
      </form>
    </div>
  )
}

export default AddChild