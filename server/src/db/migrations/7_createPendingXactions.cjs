/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("pendingTransactions", table => {
    table.bigIncrements("id")
    table.string("amount").notNullable().defaultTo("0.00")
    table.string("type").notNullable()
    table.date("paymentDate").notNullable()
    table.boolean("isPaid").notNullable().defaultTo(false)
    table.bigInteger("userId").notNullable().unsigned().index().references("users.id")
    table.bigInteger("allowanceId").notNullable().unsigned().index().references("allowances.id")
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  return knex.schema.dropTableIfExists("pendingTransactions")
};
