import React, { useState } from "react";
import config from "../../config";
import FormError from "../layout/FormError";

const SignInForm = () => {
  const [userPayload, setUserPayload] = useState({ name: "", password: "" });
  const [shouldGoHome, setShouldGoHome] = useState(false);
  const [shouldGoDashboard, setShouldGoDashboard] = useState(false);
  const [errors, setErrors] = useState({});
  const [credentialsErrors, setCredentialsErrors] = useState("");

  const validateInput = (payload) => {
    setErrors({});
    setCredentialsErrors("");
    const { name, password } = payload;
    let newErrors = {};
    if (name.trim() === "") {
      newErrors = {
        ...newErrors,
        name: "is required",
      };
    }
    if (password.trim() === "") {
      newErrors = {
        ...newErrors,
        password: "is required",
      };
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      return true;
    }
    return false;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (validateInput(userPayload)) {
      try {
        console.log('in the fetch with payload: ', userPayload)
        const response = await fetch("/api/v1/user-sessions", {
          method: "POST",
          body: JSON.stringify(userPayload),
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        });
        if (!response.ok) {
          if (response.status === 401) {
            const body = await response.json();
            return setCredentialsErrors(body.message);
          }
          const errorMessage = `${response.status} (${response.statusText})`;
          const error = new Error(errorMessage);
          throw error;
        }
        const userData = await response.json();
        setShouldGoDashboard(true);
      } catch (err) {
        console.error(`Error in fetch: ${err.message}`);
      }
    }
  };

  const onInputChange = (event) => {
    setUserPayload({
      ...userPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  if (shouldGoDashboard) {
    location.href = "/dashboard"
  }
  
  if (shouldGoHome) {
    location.href = "/"
  }

  const goHome = () => {
    setShouldGoHome(true)
  }

  return (
    <div className="sign-in-form" onSubmit={onSubmit}>
      <p className="sign-in-up-title">Sign In</p>

      {credentialsErrors ? <p className="callout alert">{credentialsErrors}</p> : null}

      <form>
        <label>
          Name
          <input type="text" name="name" value={userPayload.name} onChange={onInputChange} className="name" />
          <FormError error={errors.name} />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            value={userPayload.password}
            onChange={onInputChange}
            className="password"
          />
          <FormError error={errors.password} />
        </label>
        <input type="submit" className="landing-page-button" value="Sign In" />
        <span className="landing-page-button" onClick={goHome}>Home</span>
      </form>
    </div>
  );
};

export default SignInForm;
