"use strict";
exports.up = async (knex) => {
  return await knex.schema.createTable("results", (table) => {
    table.increments("id").primary();
    table.json('data').defaultTo('{}');
    table.string("postId").references("surveys.postId");
  });
};

exports.down = async (knex) => {
  return knex.schema.dropTableIfExists("results");
};
