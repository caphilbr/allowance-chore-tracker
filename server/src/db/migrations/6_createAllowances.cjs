/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("allowances", table => {
    table.bigIncrements("id")
    table.string("amount").notNullable().defaultTo("0.00")
    table.date("firstDate").notNullable()
    table.date("lastDate").notNullable()
    table.string("frequency").notNullable()
    table.bigInteger("userId").notNullable().unsigned().index().references("users.id")
    table.bigInteger("familyId").notNullable().unsigned().index().references("families.id")
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  return knex.schema.dropTableIfExists("allowances")
};

