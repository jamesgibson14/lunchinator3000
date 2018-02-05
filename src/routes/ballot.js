const Boom = require('boom');
const marklogic = require('marklogic');
const connection = require('../private/marklogic').connection;
const Guid = require('guid');
const db = marklogic.createDatabaseClient(connection);
const Joi = require('joi');
//validation object for GET,
const ballotSchema = Joi.object({
    ballotId: Joi.string().length(36)
});
console.log('loading route: ballot');
module.exports = {
    method: 'GET',
    path: '/api/ballot/{ballotId}',
    handler: ( request, h ) => {
        console.log('request', request.params);
        var guid =  request.params.ballotId;
        // create new ballot
        var url = `/${guid}.json`;
        console.log(guid, url);
        var action = db.documents.read({uris: url});
        return action.result()
        .then(dbRes => {
            console.dir(JSON.stringify(dbRes))
            let doc = dbRes[0].content;
            let obj = {
                suggestion: doc.suggestion,
                choices: [],
                voters: doc.voters
            }
            Object.keys(doc.fiveChoices).forEach(function(key) {
                var val = doc.fiveChoices[key];
                obj.choices.push(val);
            });
            return h.response(obj);
        })
        .catch(error => console.error(error));

    },
    options: {
        validate: {
            params: ballotSchema
        }
    }
}
