const Model = require("./Model.js")

class Transaction extends Model {
  static get tableName() {
    return "transactions"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["amount", "type", "userId", "paymentDate"],

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
    const { Chore, User } = require("./index.js")
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "transactions.userId",
          to: "users.id",
        },
      },
    }
  }
}

module.exports = Transaction
