'use strict';

const { Model } = require('objection');
const knexfile = require('../knex');
const Survey = require('./Survey');
Model.knex(knexfile);
class Result extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'results';
  }
  static get relationMappings() {
    return {
      children: {
        relation: Model.HasManyRelation,
        modelClass: Survey,
        join: {
          from: 'surveys.postId',
          to: 'results.postId'
        }
      }
    };
  }
}

module.exports = Result