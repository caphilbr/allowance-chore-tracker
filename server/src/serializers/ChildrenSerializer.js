import ChoreSerializer from "./ChoreSerializer.js"
import TransactionSerializer from "./TransactionSerializer.js"
import AllowanceSerializer from "./AllowanceSerializer.js"

class ChildrenSerializer {

  static parentDashboardList = async (children) => {
    const allowedFields = ["id", "nickname", "chores", "imageUrl"]
    const serializedChildren = await Promise.all(children.map(async child => {
      const serializedChild = {}
      allowedFields.forEach(field => {
        serializedChild[field] = child[field]
      })
      serializedChild.chores = await ChoreSerializer.dashboard(child)
      serializedChild.balance = await child.balance()
      const relatedTransactions = await child.$relatedQuery("transactions")
      const serializedTransactions = TransactionSerializer.summaryforBalanceList(relatedTransactions)
      serializedChild.transactions = serializedTransactions
      const relatedAllowance = await child.$relatedQuery("allowance")
      serializedChild.allowance = AllowanceSerializer.forManageAllowance(relatedAllowance)
      return serializedChild
    }))
    return serializedChildren
  }

  static childDashboard = async (child) => {
    const allowedFields = ["id", "nickname", "chores", "imageUrl"]
    const serializedChild = {}
    allowedFields.forEach(field => {
      serializedChild[field] = child[field]
    })
    serializedChild.chores = await ChoreSerializer.dashboard(child)
    serializedChild.balance = await child.balance()
    const relatedTransactions = await child.$relatedQuery("transactions")
    const serializedTransactions = TransactionSerializer.summaryforBalanceList(relatedTransactions)
    serializedChild.transactions = serializedTransactions
    const relatedAllowance = await child.$relatedQuery("allowance")
    serializedChild.allowance = AllowanceSerializer.forManageAllowance(relatedAllowance)
    return serializedChild
  }
}

export default ChildrenSerializer