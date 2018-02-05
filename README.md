# lunchinator3000
Project Api - Test Hapi and Marklogic

My main goal was to show not only my knowledge of node.js but also that I can jump in and learn new libraries quickly. I have never used any of the main npm packages (hapi, Joi, marklogic, axios, mailgun) before Saturday but I was still able to finish most of the requirements in around 7 hours.

### Notes
* I was using the latest version of hapi.js and since I am new to it I was reading tutorials but nothing was working, come to find out hapi.js v17+ has been completley changed to use `promises` instead of `callbacks` and none of the documents have been updated yets. I decide to go ahead and get it working with `promises`
* I wanted to start right away with MarkLogic, which definetly has a different syntax... but I was able to figure it out and get it working with a local instace of marklogic running.
* I have the three different routes working though not all the functionality for each route.
* I tested the api with Restlet Client. 
* Emailing ballot link is working with mailgun api
### TODO - Didn't get to because of time
* `api/ballot` doen't return final result after `endTime` has passed
* `api/vote` isn't completely finished, about 50%
* "Sticky goal": I didn't get the the picky eater part although I am persisting everythin in mark logic.
