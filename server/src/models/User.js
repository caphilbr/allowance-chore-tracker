/* eslint-disable import/no-extraneous-dependencies */
const Bcrypt = require("bcrypt");
const unique = require("objection-unique");
const Model = require("./Model");

const saltRounds = 10;

const uniqueFunc = unique({
  fields: ["username"],
  identifiers: ["id"],
});

class User extends uniqueFunc(Model) {
  static get tableName() {
    return "users";
  }

  set password(newPassword) {
    this.cryptedPassword = Bcrypt.hashSync(newPassword, saltRounds);
  }

  authenticate(password) {
    return Bcrypt.compareSync(password, this.cryptedPassword);
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["username"],

      properties: {
        email: { type: "string", pattern: "^\\S+@\\S+\\.\\S+$" },
        cryptedPassword: { type: "string" },
        username: { type: "string", minLength: 2, maxLength: 30 }
      },
    };
  }

  $beforeInsert() {
    return this.$checkUniqueness("username");
  }

  $beforeUpdate() {
    return this.$checkUniqueness("username");
  }

  $formatJson(json) {
    const serializedJson = super.$formatJson(json);

    if (serializedJson.cryptedPassword) {
      delete serializedJson.cryptedPassword;
    }

    return serializedJson;
  }

  async balance() {
    let total = 0
    const transactionArray = await this.$relatedQuery('transactions')
    transactionArray.forEach(transaction => {
      total += parseFloat(transaction.amount)
    })
    return total
  }

  static relationMappings() {
    const { Chore, Family, Transaction } = require("./index.js")
    return{
      chores: {
        relation: Model.HasManyRelation,
        modelClass: Chore,
        join: {
          from: "users.id",
          to: "chores.userId"
        }
      },
      family: {
        relation: Model.BelongsToOneRelation,
        modelClass: Family,
        join: {
          from: "users.familyId",
          to: "families.id"
        }
      },
      transactions: {
        relation: Model.HasManyRelation,
        modelClass: Transaction,
        join: {
          from: "users.id",
          to: "transactions.userId"
        }
      }
    }
  }
}

module.exports = User;
