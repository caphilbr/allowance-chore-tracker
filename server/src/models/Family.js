const Model = require("./Model.js")

class Family extends Model {
  static get tableName() {
    return "families"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],

      properties: {
        name: { type: "string", minLength: 2, maxLength: 30 }
      },
    }
  }

  static relationMappings() {
    const { Chore, User } = require("./index.js")
    return{
      chores: {
        relation: Model.HasManyRelation,
        modelClass: Chore,
        join: {
          from: "families.id",
          to: "chores.familyId"
        }
      },
      users: {
        relation: Model.HasManyRelation,
        modelClass: User,
        join: {
          from: "families.id",
          to: "users.familyId"
        }
      }
    }
  }

}

module.exports = Family