import ChoreSerializer from "./ChoreSerializer.js";
import TransactionSerializer from "./TransactionSerializer.js";
import AllowanceSerializer from "./AllowanceSerializer.js";

class ChildrenSerializer {
  static parentDashboardList = async (children) => {
    const allowedFields = ["id", "nickname", "chores", "imageUrl", "familyId"];
    const serializedChildren = await Promise.all(
      children.map(async (child) => {
        const serializedChild = {};
        allowedFields.forEach((field) => {
          serializedChild[field] = child[field];
        });
        serializedChild.chores = await ChoreSerializer.dashboard(child);
        serializedChild.balance = await child.balance();
        const relatedTransactions = await child.$relatedQuery("transactions");
        if (relatedTransactions) {
          const serializedTransactions =
            TransactionSerializer.summaryforBalanceList(relatedTransactions);
          serializedChild.transactions = serializedTransactions;
        } else {
          serializedChild.transactions = [];
        }
        const relatedAllowance = await child.$relatedQuery("allowance");
        if (relatedAllowance) {
          serializedChild.allowance = AllowanceSerializer.forManageAllowance(relatedAllowance);
        } else {
          serializedChild.allowance = null;
        }
        return serializedChild;
      }),
    );
    return serializedChildren;
  };

  static allRelations = async (child) => {
    const allRelations = {};
    allRelations.chores = await ChoreSerializer.dashboard(child);
    allRelations.balance = await child.balance();
    const relatedTransactions = await child.$relatedQuery("transactions");
    if (relatedTransactions) {
      const serializedTransactions =
        TransactionSerializer.summaryforBalanceList(relatedTransactions);
        allRelations.transactions = serializedTransactions;
    } else {
      allRelations.transactions = [];
    }
    const relatedAllowance = await child.$relatedQuery("allowance");
    if (relatedAllowance) {
      allRelations.allowance = AllowanceSerializer.forManageAllowance(relatedAllowance);
    } else {
      allRelations.allowance = null;
    }
    return allRelations;
  };
}

export default ChildrenSerializer;
