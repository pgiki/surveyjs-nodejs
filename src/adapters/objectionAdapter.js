
const uuid = require('uuidv4').uuid
const Result = require('../models/Result')
const Survey = require('../models/Survey')

function ObjectionAdapter(session) {
  
  function addSurvey(name, callback) {
    Survey.query().insert({
      postId: uuid(),
      name: name || 'Survey Name',
      json: "{}"
    }).then(callback)
  }

  function postResults(postId, data, callback) {
    Result.query().insert({
      postId,
      data
    }).then(callback, (err)=>{
      console.log("Error saving results data", err)
    })
  }

  function getResults(postId, callback) {
    Result.query()
    .where('postId', postId)
    .then(callback)
  }

  function deleteSurvey(surveyId, callback) {
    Survey.query()
    .delete()
    .where('id', surveyId)
    .then(callback)
  }

  function storeSurvey(id, name, json, callback) {
    Survey.query()
      .findById(id)
      .patch({
          name: name || id,
          json,
      }).then(number=>{
        if(number===0){
          // create a new survey
          Survey.query().insert({
            postId: uuid(),
            name: name || 'Survey Name',
            json: json|| "{}"
          }).then(callback)
        }else{
          Survey.query().findById(id)
          .then(callback)
        }
      })
  }

  function changeName(id, name, callback) {
    Survey.query().patchAndFetchById(id, {
      name
    }).then(callback)
  }

  function getSurveys(callback) {
    Survey.query().then(callback)
  }
  function getSurvey(surveyId, callback) {
    Survey.query().findById(surveyId).then(callback).catch(err=>{
      callback && callback({"error": err.message})
    })
  }

  return {
    addSurvey: addSurvey,
    getSurvey,
    storeSurvey: storeSurvey,
    getSurveys: getSurveys,
    deleteSurvey: deleteSurvey,
    postResults: postResults,
    getResults: getResults,
    changeName: changeName
  };
}

module.exports = ObjectionAdapter;
