import React from "react"
import PastTransactions from "./PastTransactions"

const Balance = (props) => {

  return(
    <div className="balance-box">
      <p>Current Balance</p>
      <p className="balance-amount">${(props.child.balance).toFixed(2)}</p>
      <div className="horizontal-line" />
      <PastTransactions transactions={props.child.transactions}/>
    </div>
  )
}

export default Balance