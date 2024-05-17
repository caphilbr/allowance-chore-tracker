import React from "react";

const Balance = (props) => {
  
  return(
    <div className="balance-box">
      <p>Current Balance</p>
      <p className="balance-amount">${(props.child.balance).toFixed(2)}</p>
    </div>
  )
}

export default Balance