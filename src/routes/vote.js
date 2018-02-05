const Boom = require('boom');
const _ = require('underscore');
const marklogic = require('marklogic');
const connection = require('../private/marklogic').connection;
const Guid = require('guid');
const db = marklogic.createDatabaseClient(connection);
const Joi = require('joi');
//validation for POST,
const ballotSchema = Joi.object({
    restaurantId: Joi.string().required(),
    ballotId: Joi.string().required(),
    voterName: Joi.string().required(),
    emailAddress: Joi.string().required()
});
module.exports = {
    method: 'POST',
    path: '/api/vote',
    handler: ( request, h ) => {
        console.log('request', request.payload);
        var vote =  request.payload;
        var guid =  vote.ballotId;
        // create new ballot
        var url = `/${guid}.json`;
        console.log(guid, url);
        var action = db.documents.read({uris: url});
        return action.result()
            .then((response) => {
                const ballot = response[0].content;
                let voter = _.findWhere(ballot.voters,{emailAddress: vote.emailAddress});
                voter.vote = vote.restaurantId;
                console.log('voter', voter);
                const pb = marklogic.patchBuilder;
                return db.documents.patch(response[0].uri,

                    // replace the value of a property in an array item
                    pb.replace('/array-node("voters")', ballot.voters),

                ).result();

            })
            .then(response => {
                console.log('2nd then ', response);
                db.documents.read({uris: response.uri}).result()
            }) // The patch returns a response with the URI of the document it just updated. Read that document to verify the patch.
            .then(response => {
                console.log('third then', response)
                return h.response('success');
            })
            .catch(error => console.log('dberror', error));

    },
    options: {
        validate: {
            payload: ballotSchema
        }
    }
}
