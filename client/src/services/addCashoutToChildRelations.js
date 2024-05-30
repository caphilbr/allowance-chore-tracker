const addCashoutToChildRelations = (cashoutTransaction, childRelations) => {
  childRelations.transactions.push(cashoutTransaction)
  childRelations.balance =
    parseFloat(childRelations.balance) + parseFloat(cashoutTransaction.amount)
  return childRelations
}

export default addCashoutToChildRelations