const Knex = require('knex');
const knexfile = require('../knexfile');
module.exports = Knex(knexfile.production);