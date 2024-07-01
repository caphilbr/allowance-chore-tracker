/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.alterTable("invites", table => {
    table.boolean("isParent").notNullable().defaultTo(false)
  })
}

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  return knex.schema.alterTable('invites', table => {
    table.dropColumn('isParent')
  })
}
