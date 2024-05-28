import React from "react"

const PastTransactions = (props) => {
  const sortedTransactions = props.transactions.sort((a, b) => {
    if (a.paymentDate > b.paymentDate) {
      return -1
    } else if (a.paymentDate < b.paymentDate) {
      return 1
    }
    return 0
  })

  const transactionList = sortedTransactions.map((transaction) => {
    return (
      <tr key={transaction.id}>
        <td>{transaction.paymentDate}</td>
        <td>{transaction.type}</td>
        <td className="align-amt-right">${transaction.amount.toFixed(2)}</td>
      </tr>
    )
  })

  let showEmpty = false
  if (transactionList.length == 0) {
    showEmpty = true
  }

  return (
    <>
      {showEmpty ?
        null
      :
        <div className="transaction-table-container">
          <table className="transaction-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th className="align-amt-right">Amount</th>
              </tr>
            </thead>
            <tbody>{transactionList}</tbody>
          </table>
        </div>
      }
    </>
  )
}

export default PastTransactions
