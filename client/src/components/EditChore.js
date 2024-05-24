import React, { useState } from "react"
import ErrorList from "./layout/ErrorList"
import FormError from "./layout/FormError"
import isDateInPast from "../services/isDateInPast"
import config from "../config"
import patchChore from "../services/patchChore"

const EditChore = (props) => {
  const [chorePayload, setChorePayload] = useState({
    name: props.chore.name,
    description: props.chore.description,
    amount: props.chore.amount.toString(),
    dueDate: props.chore.dueDate.slice(0,10)
  })
  const [errors, setErrors] = useState({})
  const [serverErrors, setServerErrors] = useState({})

  const validateInput = (payload) => {
    setErrors({});
    setServerErrors({});
    const {
      name,
      amount,
      dueDate
    } = payload
    const currencyRegexp = config.validation.currency.regexp.currencyRegex
    const dateRegexp = config.validation.date.regexp.dateRegex
    let newErrors = {};
    if (!amount.match(currencyRegexp)) {
      newErrors = {
        ...newErrors,
        amount: "Must be a number with up to two decimals (e.g. $9.99)",
      };
    }
    if (amount.trim() == "") {
      newErrors = {
        ...newErrors,
        amount: "Amount cannot be blank",
      };
    }
    if (!(dueDate instanceof Date) && dueDate != "" && !dueDate.match(dateRegexp)) {
      newErrors = {
        ...newErrors,
        dueDate: "date format is invalid",
      };
    }
    if (dueDate != "" && isDateInPast(dueDate)) {
      newErrors = {
        ...newErrors,
        dueDate: "Cannot set due date in the past",
      };      
    }
    if (name.trim() == "") {
      newErrors = {
        ...newErrors,
        name: "Name cannot be blank",
      };
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      return true;
    }
    return false;
  };
  
  const setFullPayload = (currentPayload) => {
    return {
      ...currentPayload,
      status: props.chore.status,
      familyId: props.chore.familyId,
      userId: props.chore.userId,
      id: props.chore.id
    }
  }

  const handleCancel = () => {
    props.setShowEditChore(false)
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    if (validateInput(chorePayload)) {
      try {
        const fullPayLoad = setFullPayload(chorePayload)
        const response = await patchChore(fullPayLoad)
        if (!response.ok) {
          if (response.status === 422) {
            setServerErrors(response.error)
          } else {
            const errorMessage = `${response.status} (${response.error.message})`
            const error = new Error(errorMessage)
            throw error
          }
        } else {
          const editedChore = response.body
          props.editChore(editedChore)
          props.setShowEditChore(false)
        }
      } catch(error) {
        console.error(`Error in fetch: ${error.message}`)
        location.href = "/dashboard"
      }
    }
  }

  const onInputChange = (event) => {
    setChorePayload({
      ...chorePayload,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  return (
    <div className="popout-box">
      <h3>Edit Chore: {props.chore.name}</h3>      
      <form onSubmit={onSubmit}>
        <ErrorList errors={serverErrors} />
        <label>
          Chore Name
          <input type="text" name="name" value={chorePayload.name} onChange={onInputChange} className="form-field" />
          <FormError error={errors.name} />
        </label>
        <label>
          Description
          <input type="text" name="description" value={chorePayload.description} onChange={onInputChange} className="form-field" />
          <FormError error={errors.description} />
        </label>
        <label>
          Amount
          <input type="text" name="amount" value={chorePayload.amount} onChange={onInputChange} className="form-field" />
          <FormError error={errors.amount} />
        </label>
        <label>
          Due Date
          <input type="date" name="dueDate" value={chorePayload.dueDate} onChange={onInputChange} className="form-field" />
          <FormError error={errors.dueDate} />
        </label>
        <input type="submit" className="allowance-button" value="Submit Chore" />
        <span className="allowance-button" onClick={handleCancel}>Cancel</span>
      </form>
    </div>
  )
}

export default EditChore