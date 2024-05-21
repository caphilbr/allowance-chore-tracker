const transactionBalances = (transactions) => {

  const sortedTransactions = transactions.sort((a, b) => {
    if (a.paymentDate < b.paymentDate) {
      return -1
    } else if (a.paymentDate > b.paymentDate) {
      return 1
    }
    return 0
  })
  
  const transactionsWithBalance = [{
    date: new Date(sortedTransactions[0].paymentDate),
    balance: parseFloat(sortedTransactions[0].amount)
  }]  
  for (let i = 1; i < sortedTransactions.length; i++) {
    const newEntry = {
      date: new Date(sortedTransactions[i].paymentDate),
      balance: transactionsWithBalance[i-1].balance + parseFloat(sortedTransactions[i].amount)
    }
    transactionsWithBalance.push(newEntry)
  }

  const todayEntry = {
    date: new Date(),
    balance: transactionsWithBalance[transactionsWithBalance.length - 1].balance
  }
  transactionsWithBalance.push(todayEntry)

  return transactionsWithBalance
}

export default transactionBalances