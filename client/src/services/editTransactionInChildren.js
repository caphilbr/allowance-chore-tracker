import showDate from "../utilities/showDate"

const editTransactionInChildren = (transactionToEdit, children) => {
  const formattedTransaction = {
    ...transactionToEdit,
    paymentDate: showDate(new Date(transactionToEdit.paymentDate))
  }
  const updatedChildren = children.map((child) => {
    if (child.id == formattedTransaction.userId) {
      const updatedTransactions = child.transactions.map(transaction => {
        if (transaction.id == formattedTransaction.id) {
          return formattedTransaction
        } else {
          return transaction
        }
      })
      child.transactions = updatedTransactions
    }
    return child
  })
  return updatedChildren
}

export default editTransactionInChildren
