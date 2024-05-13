const Model = require("./Model.js")

class Chore extends Model {
  static get tableName() {
    return "chores"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "amount"],

      properties: {
        name: { type: "string", minLength: 2, maxLength: 30 },
        description: { type: "string", minLength: 2, maxLength: 100 },
        amount: { type: "number", minimum: 0, maximum: 1000 },
        dueDate: {
          type: "object",
          properties: {
            createdAt: {
              type: "string",
              format: "date"
            }
          }
        },
        imageUrl: { type: "string" },
      },
    }
  }

  static relationMappings() {
    const { User, Family } = require("./index.js")
    return{
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "chores.userId",
          to: "user.id"
        }
      },
      family: {
        relation: Model.BelongsToOneRelation,
        modelClass: Family,
        join: {
          from: "chores.familyId",
          to: "families.id"
        }
      }
    }
  }
}

module.exports = Chore;
