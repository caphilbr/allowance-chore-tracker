import showDate from "../services/showDate.js"

class TransactionSerializer {
  static summaryforBalanceList(transactionsArray) {
    const allowedTransactionFields = ["id", "paymentDate", "type", "amount"]
    const serializedTransactions = transactionsArray.map((transaction) => {
      const serializedTransaction = {}
      allowedTransactionFields.forEach((field) => {
        if (field === "paymentDate") {
          serializedTransaction[field] = showDate(transaction[field])
        } else {
          serializedTransaction[field] = transaction[field]
        }
      })
      return serializedTransaction
    })
    return serializedTransactions
  }

  static singleTransactionForBalanceList(transaction) {
    const allowedTransactionFields = ["id", "paymentDate", "type", "amount"]
    const serializedTransaction = {}
    allowedTransactionFields.forEach((field) => {
      if (field === "paymentDate") {
        serializedTransaction[field] = showDate(transaction[field])
      } else {
        serializedTransaction[field] = transaction[field]
      }
    })
    return serializedTransaction
  }
}

export default TransactionSerializer
