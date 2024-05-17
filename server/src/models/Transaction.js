const Model = require("./Model.js")

class Transaction extends Model {
  static get tableName() {
    return "transactions"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["amount", "type", "userId"],

      properties: {
        amount: {
          type: "number",
          pattern: "^(-?\d+)(?:\.\d{0,2})?$"
        },
        type: { type: "string" }
      },
    }
  }

  static relationMappings() {
    const { Chore, User } = require("./index.js")
    return{
      chore: {
        relation: Model.HasOneRelation,
        modelClass: Chore,
        join: {
          from: "transactions.choreId",
          to: "chores.id"
        }
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "transactions.userId",
          to: "users.id"
        }
      }
    }
  }
}

module.exports = Transaction