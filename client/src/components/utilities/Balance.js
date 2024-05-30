import React from "react"
import PastTransactions from "./PastTransactions"
import patchTransaction from "../../services/fetch/patchTransaction"

const Balance = (props) => {
 
  const toggleCashout = () => {
    props.setShowCashout(true)
  }

  const pendingCashouts = props.child.transactions.filter(transaction => {
    return transaction.isPending
  })
  
  const payCashouts = async () => {
    for (const pendingCashout of pendingCashouts) {
      const updatedCashout = {
        ...pendingCashout,
        isPending: false
      }
      const response = await patchTransaction(updatedCashout)
      if (!response.ok) {
        console.log('error in approving cashouts: ', response.error)
        return
      }
      const updatedTransaction = response.body
      props.editTransaction(updatedTransaction)
    }
  }
  
  let showApproveCashout = false
  if (pendingCashouts.length > 0 && props.user.isParent){
    showApproveCashout = true
  }

  return (
    <div className="balance-box">
      <p>Current Balance</p>
      <p className="balance-amount">${props.child.balance.toFixed(2)}</p>
      {!props.user.isParent ?
        (
          <span className="button-styling-cashout" onClick={toggleCashout}>
            Request Cashout
          </span>
        )
      :
        null
      }
      {showApproveCashout ?
        <span className="button-styling-small-accept" onClick={payCashouts}>
          Pay Cashouts
        </span>
      :
        null
      }
      <div className="horizontal-line" />
      <PastTransactions transactions={props.child.transactions} />
      {props.user.isParent ? (
        <span
          id="manual-transaction-button"
          onClick={props.handleManualTransaction}
        >
          Add Manual Transaction
        </span>
      ) : null}
    </div>
  )
}

export default Balance
