/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.table("transactions", table => {
    table.boolean("isPending").notNullable().defaultTo(false)
  })
}

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  return knex.schema.table('transactions', table => {
    table.dropColumn('isPending')
  })
}
