import React, { useState } from "react"
import FormError from "../utilities/FormError"
import postTransaction from "../../services/fetch/postTransaction"
import config from "../../config"
import ErrorList from "../utilities/ErrorList"

const CashoutForm = (props) => {
  
  const [cashoutAmount, setCashOutAmount] = useState(0)
  const [errors, setErrors] = useState({})
  const [serverErrors, setServerErrors] = useState({})
  
  const handleCancel = () => {
    props.setShowCashout(false)
  }

  const onInputChange = (event) => {
    setCashOutAmount(event.currentTarget.value)
  }

  const validateInput = (amount) => {
    setErrors({})
    setServerErrors({})
    const currencyRegexp = config.validation.currency.regexp.currencyRegex
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
    if (parseFloat(amount) > parseFloat(props.child.balance)) {
      newErrors = {
        ...newErrors,
        amount: "Cashout cannot be greater than Balance",
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
    if (validateInput(cashoutAmount)) {
      const fullPayload = {
        amount: -cashoutAmount,
        type: `Cashout`,
        paymentDate: new Date(),
        userId: props.child.id,
        isPending: true
      }
      const response = await postTransaction(fullPayload)
      if (response.ok) {
        const newTransaction = response.body
        props.addCashoutState(newTransaction)
        props.setShowCashout(false)
      } else if (response.status == 422) {
        setServerErrors(response.error)
      } else {
        // location.href = "/dashboard"
      }
    }
  }

  return (
    <div className="popout-box">
      <h3>Request Cash</h3>
      <form onSubmit={onSubmit}>
        <ErrorList errors={serverErrors} />
        <label>
          Amount
          <input
            type="text"
            name="cashoutAmount"
            value={cashoutAmount}
            onChange={onInputChange}
            className="form-field"
          />
          <FormError error={errors.amount} />
        </label>
        <input type="submit" className="allowance-button" value="Submit" />
        <span className="button-styling" onClick={handleCancel}>
          Cancel
        </span>
      </form>
    </div>
  )
}

export default CashoutForm
