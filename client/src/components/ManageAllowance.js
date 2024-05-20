import React, { useState, useEffect } from "react"
import FormError from "./layout/FormError"
import config from "../config"
import isDateInPast from "../services/isDateInPast"

const ManageAllowance = (props) => {
  
  const [allowance, setAllowance] = useState({
    amount: "",
    firstDate: "",
    lastDate: "",
    frequency: "",
    userId: "",
    familyId: ""
  })
  const [errors, setErrors] = useState({});
  const [serverErrors, setServerErrors] = useState({});

  useEffect(() => {
    setAllowance({
      ...props.child.allowance,
      amount: props.child.allowance.amount.toString()
  })

  },[])

  const validateInput = (payload) => {
    setErrors({});
    setServerErrors({});
    const {
      amount,
      firstDate,
      lastDate
    } = payload
    const currencyRegexp = config.validation.currency.regexp.currencyRegex
    const dateRegexp = config.validation.date.regexp.dateRegex
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
    if (firstDate.trim() == "") {
      newErrors = {
        ...newErrors,
        firstDate: "date cannot be blank",
      };
    }
    if (!firstDate.match(dateRegexp)) {
      newErrors = {
        ...newErrors,
        firstDate: "date format is invalid",
      };
    }
    if (isDateInPast(firstDate)) {
      newErrors = {
        ...newErrors,
        firstDate: "Cannot change past allowances",
      };      
    }
    if (lastDate.trim() == "") {
      newErrors = {
        ...newErrors,
        lastDate: "date cannot be blank",
      };
    }
    if (!lastDate.match(dateRegexp)) {
      newErrors = {
        ...newErrors,
        lastDate: "date format is invalid",
      };
    }
    const today = new Date()
    const fiveYearsFromNow = new Date(today.getFullYear() + 5, today.getMonth(), today.getDate());

    if (new Date(lastDate) > fiveYearsFromNow) {
      newErrors = {
        ...newErrors,
        lastDate: "Cannot set allowance beyond 5 years",
      };
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      return true;
    }
    return false;
  };

  const onSubmit = (event) => {
    event.preventDefault()
    if (validateInput(allowance)) {
      try {

      } catch(error) {

      }
    }
  }

  const onInputChange = (event) => {
    setAllowance({
      ...allowance,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const deleteAllowance = () => {

  }

  return (
    <div className="manage-allowance">
      <h3>{props.child.nickname} Allowance</h3>
      
      <form onSubmit={onSubmit}>
        <label>
          Amount
          <input type="text" name="amount" value={allowance.amount} onChange={onInputChange} className="form-field" />
          <FormError error={errors.amount} />
        </label>
        <label>
          Frequency
          <select className="form-field" name="frequency" onChange={onInputChange} value={allowance.frequency}>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <FormError error={errors.frequency} />
        </label>
        <label>
          First Payment Date
          <input type="date" name="firstDate" value={allowance.firstDate} onChange={onInputChange} className="form-field" />
          <FormError error={errors.firstDate} />
        </label>
        <label>
          Last Payment Date
          <input type="date" name="lastDate" value={allowance.lastDate} onChange={onInputChange} className="form-field" />
          <FormError error={errors.lastDate} />
        </label>

        <input type="submit" className="detail-option-button" value="Submit Changes" />
        <span className="detail-option-button" onClick={deleteAllowance}>Delete This Allowance</span>
        <span className="detail-option-button" onClick={props.manageAllowance}>Cancel</span>
      </form>
    </div>
  )
}

export default ManageAllowance