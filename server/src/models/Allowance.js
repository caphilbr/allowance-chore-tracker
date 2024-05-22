const Model = require("./Model.js");

class Allowance extends Model {
  static get tableName() {
    return "allowances";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["amount", "firstDate", "lastDate", "frequency", "userId", "familyId"],

      properties: {
        amount: { type: "object" },
        frequency: { type: "string", enum: ["weekly", "monthly"] },
        firstDate: {
          type: "object",
          properties: {
            createdAt: {
              type: "string",
              format: "date",
            },
          },
        },
        lastDate: {
          type: "object",
          properties: {
            createdAt: {
              type: "string",
              format: "date",
            },
          },
        },
      },
    };
  }

  static relationMappings() {
    const { User, Family, PendingTransaction } = require("./index.js");
    return {
      family: {
        relation: Model.BelongsToOneRelation,
        modelClass: Family,
        join: {
          from: "allowances.familyId",
          to: "families.id",
        },
      },
      pendingTransactions: {
        relation: Model.HasManyRelation,
        modelClass: PendingTransaction,
        join: {
          from: "allowances.id",
          to: "pendingTransactions.allowanceId",
        },
      },
      user: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: "allowances.userId",
          to: "users.id",
        },
      },
    };
  }

  async deletePendingAllowances() {
    const { PendingTransaction } = require("./index.js");
    await PendingTransaction.query().delete().where({ allowanceId: this.id });
  }

  async generatePendingAllowances() {
    const { PendingTransaction } = require("./index.js");
    const { default: addDays } = await import("./../services/addDays.js");
    const { default: addMonths } = await import("./../services/addMonths.js");
    const currency = require("currency.js");

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let date = this.firstDate;

    do {
      if (date >= today) {
        await PendingTransaction.query().insert({
          amount: currency(this.amount),
          type: "allowance",
          paymentDate: date,
          userId: this.userId,
          allowanceId: this.id,
        });
      }
      if (this.frequency === "weekly") {
        date = addDays(date, 7);
      }
      if (this.frequency === "monthly") {
        date = addMonths(date, 1);
      }
    } while (date <= this.lastDate);
  }

  static async processPendingAllowances(familyId) {
    const { PendingTransaction, Transaction, Family } = require("./index.js");
    const currency = require("currency.js");

    const today = new Date();
    today.setHours(23, 59, 59, 999);

    const family = await Family.query().findById(familyId);
    const children = await family.children();
    for (const child of children) {
      const pendingTransactions = await child.$relatedQuery("pendingTransactions");
      if (pendingTransactions) {
        for (const pendingTransaction of pendingTransactions) {
          if (pendingTransaction.paymentDate <= today) {
            const newTransaction = {
              amount: currency(pendingTransaction.amount),
              type: "allowance",
              paymentDate: pendingTransaction.paymentDate,
              userId: pendingTransaction.userId,
            };
            await Transaction.query().insert(newTransaction);
            await PendingTransaction.query().deleteById(pendingTransaction.id);
          }
        }
      }
    }
  }
}

module.exports = Allowance;
