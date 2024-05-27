const payChoreAndUpdateChildren = (choreToPay, newTransaction, children) => {
  const updatedChildren = children.filter((child) => {
    if (child.id == choreToPay.userId) {
      child.transactions.push(newTransaction)
      child.balance =
        parseFloat(child.balance) + parseFloat(newTransaction.amount)
    }
    return child
  })
  return updatedChildren
}

export default payChoreAndUpdateChildren
