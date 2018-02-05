const axios = require("axios");
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
module.exports = {
    pickFive: async function () {
        const url = 'https://interview-project-17987.herokuapp.com/api/restaurants';
        //get all restaurant data
        const res = await axios.get(url);
        var choices = res.data;

        // get all reviews
        const reviewsUrl = 'https://interview-project-17987.herokuapp.com/api/reviews';
        const reviewRes = await axios.get(reviewsUrl);
        const reviews = reviewRes.data;
        //console.log('reviews',reviews);
        const fiveChoices = {};
        let high = 0;
        var suggestion = {};
        //Randomly pick five restaurants and find highted revievew
        for(let i = 0; i < 5; i++){
            let el = choices.splice(getRandomInt(choices.length), 1)[0];
            //console.log('chosen', el, el.name);
            fiveChoices[el.name] = el;
        }
        // calculate review stats for each choice.
        Object.keys(fiveChoices).forEach(function(key) {
            let val = fiveChoices[key];

            val.reviewStats = {
                count: 0,
                sum: 0,
                averageReview: 0,
                high: 0,
                topReviewer: '',
                review: ''
            }
            reviews.forEach(function functionName(el) {
                if(el.restaurant === val.name){
                    val.reviewStats.count += 1;
                    var rating = parseInt(el.rating);
                    val.reviewStats.sum += rating;
                    if(rating > val.reviewStats.high){
                        val.reviewStats.high = rating;
                        val.reviewStats.topReviewer = el.reviewer;
                        val.reviewStats.review = el.review;
                    }

                }
            });
            val.reviewStats.averageReview = Math.round(val.reviewStats.sum / val.reviewStats.count);
            if(val.reviewStats.averageReview > high){
                high = val.reviewStats.averageReview;
                suggestion = {
                    "id": val.Id,
                    "name": val.name,
                    "averageReview": val.reviewStats.averageReview,
                    "TopReviewer": val.reviewStats.topReviewer,
                    "Review": val.reviewStats.review
                }
            }

        });


        //console.log('got restaurants data ',suggestion, fiveChoices);
        return {
            suggestion,
            fiveChoices
        }
    }
}
