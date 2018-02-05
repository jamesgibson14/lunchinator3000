const Boom = require('boom');
const marklogic = require('marklogic');
const connection = require('../private/marklogic').connection;
const Guid = require('guid');
const db = marklogic.createDatabaseClient(connection);
const Joi = require('joi');
const restaurantData = require('../methods/restaurants');
const mailgun = require('../methods/mailgun');
//validation for POST,
const ballotSchema = Joi.object({
    //TODO check if string is valid date
    endTime: Joi.string(),
    //TODO validate each item in array
    voters: Joi.array()
});
module.exports = {
    method: 'POST',
    path: '/api/create-ballot',
    handler: ( request, h ) => {
        console.log('request', request.payload);
        var item =  request.payload;
        item.endTime = new Date(item.endTime);
        item.guid = Guid.raw();
        let doc = {
            uri: `/${item.guid}.json`,
            contentType: 'application/json',
            collections: ['ballots'],
            content: item
        }
        const response = h.response({ballotId: item.guid});
        // create new ballot
        let action = restaurantData.pickFive()
            .then(restResolve => {

                doc.content = Object.assign(doc.content, restResolve);
                console.log('restResolve',doc);
                doc.content.voters.forEach(function (val) {
                    val.vote = '';
                });
                return db.documents.write(doc)
                    .result();
            })
            .then(dbRes => {
                let to = '';
                item.voters.forEach(function (val) {
                    to += val.emailAddress + ',';
                });
                var link = `http://localhost:8080/api/ballot/${item.guid}`;
                let text = `<p>Here is your new <a href="${link}">Ballot link</a></p>`;
                let email = {
                    to: to,
                    from: 'walle@gibsonsquared.com',
                    subject: 'New Restaurant Ballot',
                    html: text
                };
                mailgun.send(email);
                console.log('Ballot Saved');
                return response;
            });

        return action;

    },
    options: {
        validate: {
            payload: ballotSchema
        }
    }
}
