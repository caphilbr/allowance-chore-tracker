/* eslint-disable import/no-extraneous-dependencies */
const Bcrypt = require("bcrypt");
const unique = require("objection-unique");
const Model = require("./Model");

const saltRounds = 10;

const uniqueFunc = unique({
  fields: ["email"],
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
      required: ["email", "name"],

      properties: {
        email: { type: "string", pattern: "^\\S+@\\S+\\.\\S+$" },
        cryptedPassword: { type: "string" },
        name: { type: "string", minLength: 2, maxLength: 30 },
        isParent: { type: "boolean" },
        imageUrl: { type: "string" }
      },
    };
  }

  $beforeInsert() {
    return this.$checkUniqueness("email");
  }

  $beforeUpdate() {
    return this.$checkUniqueness("email");
  }

  $formatJson(json) {
    const serializedJson = super.$formatJson(json);

    if (serializedJson.cryptedPassword) {
      delete serializedJson.cryptedPassword;
    }

    return serializedJson;
  }

  static relationMappings() {
    const { Chore, Family } = require("./index.js")
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
      }
    }
  }
}

module.exports = User;
