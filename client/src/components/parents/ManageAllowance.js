import React, { useState, useEffect } from "react"
import FormError from "../utilities/FormError"
import config from "../../config"
import isDateInPast from "../../utilities/isDateInPast"
import patchAllowance from "../../services/fetch/patchAllowance"
import deleteAllowance from "../../services/fetch/deleteAllowance"
import ErrorList from "../utilities/ErrorList"

const ManageAllowance = (props) => {
  const [userPayload, setUserPayload] = useState({
    amount: "",
    firstDate: "",
    lastDate: "",
    frequency: "weekly",
  })
  const [errors, setErrors] = useState({})
  const [serverErrors, setServerErrors] = useState({})
  const [showDelete, setShowDelete] = useState(false)

  useEffect(() => {
    if (props.child.allowance) {
      setUserPayload({
        ...props.child.allowance,
        amount: props.child.allowance.amount.toString(),
      })
    }
  }, [])

  const validateInput = (payload) => {
    setErrors({})
    setServerErrors({})
    const { amount, firstDate, lastDate } = payload
    const currencyRegexp = config.validation.currency.regexp.currencyRegex
    const dateRegexp = config.validation.date.regexp.dateRegex
    let newErrors = {}
    if (!amount.match(currencyRegexp)) {
      newErrors = {
        ...newErrors,
        amount: "must be a number with up to two decimals (e.g. $9.99)",
      }
    }
    if (amount.trim() == "") {
      newErrors = {
        ...newErrors,
        amount: "amount cannot be blank",
      }
    }
    if (firstDate.trim() == "") {
      newErrors = {
        ...newErrors,
        firstDate: "date cannot be blank",
      }
    }
    if (!firstDate.match(dateRegexp)) {
      newErrors = {
        ...newErrors,
        firstDate: "date format is invalid",
      }
    }
    if (isDateInPast(firstDate)) {
      newErrors = {
        ...newErrors,
        firstDate: "Cannot change past allowances",
      }
    }
    if (lastDate.trim() == "") {
      newErrors = {
        ...newErrors,
        lastDate: "date cannot be blank",
      }
    }
    if (!lastDate.match(dateRegexp)) {
      newErrors = {
        ...newErrors,
        lastDate: "date format is invalid",
      }
    }
    const today = new Date()
    const fiveYearsFromNow = new Date(
      today.getFullYear() + 5,
      today.getMonth(),
      today.getDate(),
    )
    if (new Date(lastDate) > fiveYearsFromNow) {
      newErrors = {
        ...newErrors,
        lastDate: "Cannot set allowance beyond 5 years",
      }
    }
    if (new Date(lastDate) <= new Date(firstDate)) {
      newErrors = {
        ...newErrors,
        lastDate: "Must be later than First Payment Date",
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
      const fullPayload = {
        ...userPayload,
        userId: props.child.id,
        familyId: props.child.familyId,
      }
      const response = await patchAllowance(fullPayload)
      if (response.status === 422) {
        setServerErrors(response.error)
      } else {
        location.href = "/dashboard"
      }
    }
  }

  const onInputChange = (event) => {
    setUserPayload({
      ...userPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  const onDeleteClick = () => {
    setShowDelete(!showDelete)
  }

  const handleDelete = async () => {
    setShowDelete(false)
    const response = await deleteAllowance(props.child.allowance.id)
    if (response.ok) {
      location.href = "/dashboard"
    }
  }

  const handleCancel = () => {
    props.setShowManageAllowance(false)
  }

  const confirmDelete = (
    <div className="confirm-delete align-center">
      <p>
        This will delete the allowance, resulting in no future allowance
        payments. Past allowance payments will remain in the child's balance.
      </p>
      <span className="allowance-button" onClick={handleDelete}>
        Confirm Allowance Delete
      </span>
      <span className="allowance-button" onClick={onDeleteClick}>
        Cancel
      </span>
    </div>
  )

  return (
    <div className="popout-box">
      <h3>{props.child.nickname} Allowance</h3>
      {showDelete ? confirmDelete : null}

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
          Frequency
          <select
            className="form-field"
            name="frequency"
            onChange={onInputChange}
            value={userPayload.frequency}
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <FormError error={errors.frequency} />
        </label>
        <label>
          First Payment Date
          <input
            type="date"
            name="firstDate"
            value={userPayload.firstDate}
            onChange={onInputChange}
            className="form-field"
          />
          <FormError error={errors.firstDate} />
        </label>
        <label>
          Last Payment Date
          <input
            type="date"
            name="lastDate"
            value={userPayload.lastDate}
            onChange={onInputChange}
            className="form-field"
          />
          <FormError error={errors.lastDate} />
        </label>
        <div className="manage-allowance-button-container">
          <input
            type="submit"
            className="allowance-button"
            value="Submit"
          />
          <span className="allowance-button" onClick={onDeleteClick}>
            Delete Allowance
          </span>
          <span className="allowance-button" onClick={handleCancel}>
            Cancel
          </span>
        </div>
      </form>
    </div>
  )
}

export default ManageAllowance
