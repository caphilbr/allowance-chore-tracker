const Model = require("./Model.js")

class PendingTransaction extends Model {
  static get tableName() {
    return "pendingTransactions"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["amount", "type", "userId", "allowanceId", "paymentDate"],

      properties: {
        amount: { type: "object" },
        type: { type: "string" },
        paymentDate: {
          type: "object",
          properties: {
            createdAt: {
              type: "string",
              format: "date",
            },
          },
        },
      },
    }
  }

  static relationMappings() {
    const { Allowance, User } = require("./index.js")
    return {
      allowance: {
        relation: Model.BelongsToOneRelation,
        modelClass: Allowance,
        join: {
          from: "pendingTransactions.allowanceId",
          to: "allowances.id",
        },
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "pendingTransactions.userId",
          to: "users.id",
        },
      },
    }
  }
}

module.exports = PendingTransaction
