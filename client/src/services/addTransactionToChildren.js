const addTransactionToChildren = (transactionToAdd, children) => {
  const updatedChildren = children.map((child) => {
    if (child.id == transactionToAdd.userId) {
      child.transactions.push(transactionToAdd)
      child.balance =
        parseFloat(child.balance) + parseFloat(transactionToAdd.amount)
    }
    return child
  })
  return updatedChildren
}

export default addTransactionToChildren
