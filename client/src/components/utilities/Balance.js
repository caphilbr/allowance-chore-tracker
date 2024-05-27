import React from "react"
import PastTransactions from "./PastTransactions"

const Balance = (props) => {
  return (
    <div className="balance-box">
      <span>Current Balance</span>
      <br />
      <span className="balance-amount">${props.child.balance.toFixed(2)}</span>
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
