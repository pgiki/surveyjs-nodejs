"use strict";
exports.up = (knex) => {
  return knex.schema.createTable("surveys", (table) => {
    table.increments("id").primary();
    table.string("name");
    table.string("postId").unique();
    table.json('json').defaultTo('{}');
  });
};

exports.down = async (knex) => {
  return knex.schema.dropTableIfExists("surveys");
};
