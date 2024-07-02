import React, { useState } from "react"
import ErrorList from "../utilities/ErrorList"
import FormError from "../utilities/FormError"
import isDateInPast from "../../utilities/isDateInPast"
import config from "../../config"
import patchChore from "../../services/fetch/patchChore"

const EditChore = (props) => {
  const [chorePayload, setChorePayload] = useState({
    name: props.chore.name,
    description: props.chore.description,
    amount: props.chore.amount.toString(),
    dueDate: props.chore.dueDate.slice(0, 10),
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
      status: props.chore.status,
      familyId: props.chore.familyId,
      userId: props.chore.userId,
      id: props.chore.id,
    }
  }

  const handleCancel = () => {
    props.setShowEditChore(false)
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    if (validateInput(chorePayload)) {
      const fullPayLoad = setFullPayload(chorePayload)
      const response = await patchChore(fullPayLoad)
      if (response.ok) {
        const editedChore = response.body
        props.editChore(editedChore)
        props.setShowEditChore(false)
      } else if (response.status === 422) {
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

  const formInputElements = [
    ["Chore Name", "name"],
    ["Description", "description"],
    ["Amount", "amount"],
    ["Due Date", "dueDate"],
  ].map((element) => {
    return (
      <label>
        {element[0]}
        <input
          type={element[1] == "dueDate" ? "date" : "text"}
          name={element[1]}
          value={chorePayload[element[1]]}
          onChange={onInputChange}
          className="form-field"
        />
        <FormError error={errors[element[1]]} />
      </label>
    )
  })


  return (
    <div className="popout-box">
      <h3>Edit Chore: {props.chore.name}</h3>
      <form onSubmit={onSubmit}>
        <ErrorList errors={serverErrors} />
        {formInputElements}
        <input
          type="submit"
          className="allowance-button"
          value="Submit Chore"
        />
        <span className="allowance-button" onClick={handleCancel}>
          Cancel
        </span>
      </form>
    </div>
  )
}

export default EditChore
