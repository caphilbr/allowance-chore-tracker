/* eslint-disable import/no-extraneous-dependencies */
const Bcrypt = require("bcrypt")
const unique = require("objection-unique")
const Model = require("./Model")
const currency = require("currency.js")

const saltRounds = 10

const uniqueFunc = unique({
  fields: ["username"],
  identifiers: ["id"],
})

class User extends uniqueFunc(Model) {
  static get tableName() {
    return "users"
  }

  set password(newPassword) {
    this.cryptedPassword = Bcrypt.hashSync(newPassword, saltRounds)
  }

  authenticate(password) {
    return Bcrypt.compareSync(password, this.cryptedPassword)
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["username"],

      properties: {
        email: { type: "string", pattern: "^\\S+@\\S+\\.\\S+$" },
        cryptedPassword: { type: ["string", "null"] },
        username: { type: "string", minLength: 2, maxLength: 30 },
      },
    }
  }

  $beforeInsert() {
    return this.$checkUniqueness("username")
  }

  $beforeUpdate() {
    return this.$checkUniqueness("username")
  }

  $formatJson(json) {
    const serializedJson = super.$formatJson(json)

    if (serializedJson.cryptedPassword) {
      delete serializedJson.cryptedPassword
    }

    return serializedJson
  }

  async balance() {
    let total = currency(0)
    const transactionArray = await this.$relatedQuery("transactions")
    if (transactionArray) {
      transactionArray.forEach((transaction) => {
        total = total.add(currency(transaction.amount))
      })
    }
    return total
  }

  static relationMappings() {
    const {
      Chore,
      Family,
      Transaction,
      Allowance,
      PendingTransaction,
    } = require("./index.js")
    return {
      chores: {
        relation: Model.HasManyRelation,
        modelClass: Chore,
        join: {
          from: "users.id",
          to: "chores.userId",
        },
      },
      family: {
        relation: Model.BelongsToOneRelation,
        modelClass: Family,
        join: {
          from: "users.familyId",
          to: "families.id",
        },
      },
      transactions: {
        relation: Model.HasManyRelation,
        modelClass: Transaction,
        join: {
          from: "users.id",
          to: "transactions.userId",
        },
      },
      allowance: {
        relation: Model.HasOneRelation,
        modelClass: Allowance,
        join: {
          from: "users.id",
          to: "allowances.userId",
        },
      },
      pendingTransactions: {
        relation: Model.HasManyRelation,
        modelClass: PendingTransaction,
        join: {
          from: "users.id",
          to: "pendingTransactions.userId",
        },
      },
    }
  }
}

module.exports = User
