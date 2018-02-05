var mailgun = require("mailgun-js");
var api_key = 'key-48ycs8ajzp0c5d56w9w4polcvp0a2rl8';
var DOMAIN = 'mg.gibsonsquared.com';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: DOMAIN});
function sendEmail(mailFields) {


  //check([mailFields.to, mailFields.from, mailFields.subject, mailFields.text, mailFields.html], [Argus.String]);
  // Don't wait for result; in need to change;

  console.log(mailFields);
  // Define the settings
  var postURL = 'https://api.mailgun.net/v3/mg.gibsonsquared.com/messages';
  var options =   {
    url: postURL,
    method: 'post',
    auth: "api: ",
    params: {
      "from":mailFields.from,
      "to":mailFields.to,
      "subject": mailFields.subject,
      "html": mailFields.html,
      "text": mailFields.text || mailFields.html,
      'o:tag': mailFields.campaign || 'standard'
    }
  };
  if(mailFields.bcc)
    options.params.bcc = mailFields.bcc;
  if(mailFields.cc)
    options.params.cc = mailFields.cc;
  if(mailFields['recipient-variables'])
    options.params['recipient-variables'] = mailFields['recipient-variables'];


  // Send the request
  console.log('Sending Email');
  mailgun.messages().send(options.params, function (error, body) {
      console.log(body);
  });
};
module.exports = {
    send: sendEmail
}
