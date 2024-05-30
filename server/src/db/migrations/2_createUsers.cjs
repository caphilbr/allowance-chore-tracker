/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("users", table => {
    table.bigIncrements("id")
    table.string("username").notNullable().unique()
    table.string("cryptedPassword").notNullable()
    table.string("nickname").notNullable()
    table.string("email")
    table.string("imageUrl")
    table.date("quizDate").defaultTo("2000-12-31")
    table.boolean("isParent").notNullable().defaultTo(false)
    table.bigInteger("familyId").notNullable().unsigned().index().references("families.id")
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  return knex.schema.dropTableIfExists("users")
}
