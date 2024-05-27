const Model = require("./Model.js")

class Invite extends Model {
  static get tableName() {
    return "invites"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["email"],

      properties: {
        email: { type: "string", pattern: "^\\S+@\\S+\\.\\S+$" },
        nickname: { type: "string", minLength: 1, maxLength: 30 },
      },
    }
  }

  static relationMappings() {
    const { Family } = require("./index.js")
    return {
      family: {
        relation: Model.BelongsToOneRelation,
        modelClass: Family,
        join: {
          from: "invites.familyId",
          to: "families.id",
        },
      },
    }
  }

  async sendInvite() {
    const { default: getNodeEnv } = await import("./../config.js")

    let inviteUrl = "http://localhost:3000/invite"
    // if (getNodeEnv.nodeEnv != "development") {
      inviteUrl = 
        "https://allowance-chore-tracker-46cd68f48ad0.herokuapp.com/invite"
    // }
    try {
      const { default: emailInvite } = await import(
        "./../services/emailInvite.js"
      )
      const response = await emailInvite(
        this.email,
        this.nickname,
        inviteUrl,
        this.code,
      )
      if (response instanceof Error) {
        const newError = new Error(response.message)
        throw newError
      }
      return { success: true }
    } catch (error) {
      console.log(error)
      return { success: false, errorMessage: error.message }
    }
  }
}

module.exports = Invite
