'use strict';

const { Model } = require('objection');

class Survey extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'surveys';
  }
}

module.exports = Survey
