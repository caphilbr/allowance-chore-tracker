/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("chores", table => {
    table.bigIncrements("id")
    table.string("name").notNullable()
    table.string("description")
    table.string("amount").notNullable().defaultTo("0.00")
    table.date("dueDate")
    table.string("status").notNullable().defaultTo("open")
    table.string("imageUrl")
    table.bigInteger("familyId").unsigned().index().notNullable().references("families.id")
    table.bigInteger("userId").unsigned().index().references("users.id")
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  return knex.schema.dropTableIfExists("chores")
};
