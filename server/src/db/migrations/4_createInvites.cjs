/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("invites", table => {
    table.bigIncrements("id")
    table.string("email").notNullable()
    table.string("nickname")
    table.integer("code").notNullable()
    table.boolean("wasAccepted").notNullable().defaultTo(false)
    table.bigInteger("familyId").notNullable().unsigned().index().references("families.id")
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  return knex.schema.dropTableIfExists("invites")
};
