import React, { useState } from "react"
import FormError from "./layout/FormError";
import config from "../config";
import ErrorList from "./layout/ErrorList";
import postTransaction from "./../services/postTransaction"

const ManualTransaction = (props) => {
  const [userPayload, setUserPayload] = useState({
    amount: "",
    description: ""
  });
  const [errors, setErrors] = useState({});
  const [serverErrors, setServerErrors] = useState({});

  const validateInput = (payload) => {
    setErrors({});
    setServerErrors({});
    const { amount, description } = payload;
    const currencyRegexp = config.validation.currency.regexp.currencyRegex;
    let newErrors = {};
    if (!amount.match(currencyRegexp)) {
      newErrors = {
        ...newErrors,
        amount: "must be a number with up to two decimals (e.g. $9.99)",
      };
    }
    if (amount.trim() == "") {
      newErrors = {
        ...newErrors,
        amount: "amount cannot be blank",
      };
    }
    if (description.length > 20) {
      newErrors = {
        ...newErrors,
        amount: "Limit description to 20 characters",
      };
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      return true;
    }
    return false;
  };

  const onSubmit = async (event) => {
    event.preventDefault()
    if (validateInput(userPayload)) {
      try {
        const fullPayload = {
          amount: userPayload.amount,
          type: `Adjustment: ${userPayload.description}`,
          paymentDate: new Date(),
          userId: props.child.id
        };
        const response = await postTransaction(fullPayload)
        if (!response.ok) {
          if (response.status === 422) {
            setServerErrors(response.error);
          } else {
            const errorMessage = `${response.status} (${response.error.message})`;
            const error = new Error(errorMessage);
            throw error;
          }
        } else {
          const newTransaction = response.body
          props.addTranscation(newTransaction)
          props.setShowManualTransaction(false)
        }
      } catch(error) {
        console.error(`Error in fetch: ${error.message}`);
        // location.href = "/dashboard";
      }
    }
  }

  const onInputChange = (event) => {
    setUserPayload({
      ...userPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleCancel = () => {
    props.setShowManualTransaction(false)
  }

  return (
    <div className="popout-box">
      <h3>New Manual Transaction</h3>
      <form onSubmit={onSubmit}>
      <ErrorList errors={serverErrors} />
        <label>
          Amount
          <input
            type="text"
            name="amount"
            value={userPayload.amount}
            onChange={onInputChange}
            className="form-field"
          />
          <FormError error={errors.amount} />
        </label>
        <label>
          Description
          <input
            type="text"
            name="description"
            value={userPayload.description}
            onChange={onInputChange}
            className="form-field"
          />
          <FormError error={errors.description} />
        </label>
        <input type="submit" className="allowance-button" value="Submit" />
        <span className="allowance-button" onClick={handleCancel}>
          Cancel
        </span>
      </form>
    </div>
  )
}

export default ManualTransaction