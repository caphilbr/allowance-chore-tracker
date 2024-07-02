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

  const transactionList = sortedTransactions.filter((transaction) => {
    return !transaction.isPending
  })

  const pendingTransactionList = sortedTransactions.filter((transaction) => {
    return transaction.isPending
  })

  const transactionListToShow = transactionList.map((transaction) => {
    return (
      <tr key={transaction.id}>
        <td>{transaction.paymentDate}</td>
        <td>{transaction.type}</td>
        <td className="align-amt-right">${transaction.amount.toFixed(2)}</td>
      </tr>
    )
  })

  const pendingTransactionsToShow = pendingTransactionList.map((transaction) => {
    return (
      <tr key={transaction.id}>
        <td>{transaction.paymentDate}</td>
        <td>{transaction.type}</td>
        <td className="align-amt-right">${transaction.amount.toFixed(2)}</td>
      </tr>
    )
  })

  let showEmpty = false
  if (transactionListToShow.length == 0) {
    showEmpty = true
  }

  let showPending = false
  if (pendingTransactionsToShow.length > 0) {
    showPending = true
  }

  return (
    <>
      {showPending &&
        <div className="transaction-table-container">
          <table className="pending-transaction-table">
            <thead>
              <tr>
                <th colSpan={3}>Pending Cashouts</th>
              </tr>
            </thead>
            <tbody>{pendingTransactionsToShow}</tbody>
          </table>
        </div>
      }
      {!showEmpty && 
        <div className="transaction-table-container">
          <table className="transaction-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th className="align-amt-right">Amount</th>
              </tr>
            </thead>
            <tbody>{transactionListToShow}</tbody>
          </table>
        </div>
      }
    </>
  )
}

export default PastTransactions
