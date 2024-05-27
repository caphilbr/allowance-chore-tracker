import React, { useState } from "react"
import ErrorList from "../utilities/ErrorList"
import FormError from "../utilities/FormError"
import isDateInPast from "../../utilities/isDateInPast"
import config from "../../config"
import postChore from "../../services/fetch/postChore"

const AddChore = (props) => {
  const [chorePayload, setChorePayload] = useState({
    name: "",
    description: "",
    amount: "",
    dueDate: "",
  })
  const [errors, setErrors] = useState({})
  const [serverErrors, setServerErrors] = useState({})

  const validateInput = (payload) => {
    setErrors({})
    setServerErrors({})
    const { name, amount, dueDate } = payload
    const currencyRegexp = config.validation.currency.regexp.currencyRegex
    const dateRegexp = config.validation.date.regexp.dateRegex
    let newErrors = {}
    if (!amount.match(currencyRegexp)) {
      newErrors = {
        ...newErrors,
        amount: "Must be a number with up to two decimals (e.g. $9.99)",
      }
    }
    if (amount.trim() == "") {
      newErrors = {
        ...newErrors,
        amount: "Amount cannot be blank",
      }
    }
    if (
      !(dueDate instanceof Date) &&
      dueDate != "" &&
      !dueDate.match(dateRegexp)
    ) {
      newErrors = {
        ...newErrors,
        dueDate: "date format is invalid",
      }
    }
    if (dueDate != "" && isDateInPast(dueDate)) {
      newErrors = {
        ...newErrors,
        dueDate: "Cannot set due date in the past",
      }
    }
    if (name.trim() == "") {
      newErrors = {
        ...newErrors,
        name: "Name cannot be blank",
      }
    }

    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) {
      return true
    }
    return false
  }

  const setFullPayload = (currentPayload) => {
    return {
      ...currentPayload,
      status: "open",
      familyId: props.child.familyId,
      userId: props.child.id,
    }
  }

  const handleCancel = () => {
    props.setShowAddChore(false)
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    if (validateInput(chorePayload)) {
      const fullPayLoad = setFullPayload(chorePayload)
      const response = await postChore(fullPayLoad)
      if (response.ok) {
        const newChore = response.body
        props.addChoreToList(newChore)
        props.setShowAddChore(false)
      } else if (response.status == 422) {
        setServerErrors(response.error)
      } else {
        location.href = "/dashboard"
      }
    }
  }

  const onInputChange = (event) => {
    setChorePayload({
      ...chorePayload,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  return (
    <div className="popout-box">
      <h3>Add New Chore to {props.child.nickname}</h3>
      <form onSubmit={onSubmit}>
        <ErrorList errors={serverErrors} />
        <label>
          Chore Name
          <input
            type="text"
            name="name"
            value={chorePayload.name}
            onChange={onInputChange}
            className="form-field"
          />
          <FormError error={errors.name} />
        </label>
        <label>
          Description
          <input
            type="text"
            name="description"
            value={chorePayload.description}
            onChange={onInputChange}
            className="form-field"
          />
          <FormError error={errors.description} />
        </label>
        <label>
          Amount
          <input
            type="text"
            name="amount"
            value={chorePayload.amount}
            onChange={onInputChange}
            className="form-field"
          />
          <FormError error={errors.amount} />
        </label>
        <label>
          Due Date
          <input
            type="date"
            name="dueDate"
            value={chorePayload.dueDate}
            onChange={onInputChange}
            className="form-field"
          />
          <FormError error={errors.dueDate} />
        </label>
        <input
          type="submit"
          className="allowance-button"
          value="Submit"
        />
        <span className="allowance-button" onClick={handleCancel}>
          Cancel
        </span>
      </form>
    </div>
  )
}

export default AddChore
