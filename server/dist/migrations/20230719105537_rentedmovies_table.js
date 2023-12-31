/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
    return knex.schema.createTable("rentedmovies", (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("genre").notNullable();
        table.integer("time").notNullable();
        table.float("price").notNullable();
        table.string("renter").notNullable();
    });
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
    return knex.schema.dropTable("rentedmovies");
};
