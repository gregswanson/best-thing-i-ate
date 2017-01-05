var Twitter = require('twitter');
var fs = require("fs");

//connected to twitter 
var client = new Twitter({
  consumer_key: 'QOVOAhOcQkElz3kpxyspoLwY3',
  consumer_secret: 'e4YFWlWwdogQbAk5y84SxHdWVeAKugS9YZdhAHvoOtErrsnhpw',
  access_token_key: '816733086201368590-1ZFeqcdNQdrcB4aMYYFcGYJqpm3rVHI',
  access_token_secret: '3p4I7ALHL2TGpoloEeRnD0DebCJLUE7Od5o6op1lX7Mki'
});


//Tweet options
var all_tweets = [];
var historic_tweets = [];

//function
var tweetThatFood = function(){

	//Run a search for "Best Thing I Ever Ate"
	client.get('search/tweets', {q: 'Best Thing I Ever Ate', count: 100}, function(error, tweets, response) {
	   console.log(tweets);

	//loop through all tweets
	   for(tweet in tweets.statuses) {
	   	
	   	//add tweets to tweet list
	   	all_tweets.push({
	   		"text": tweets.statuses[tweet].text,
	   		"id": tweets.statuses[tweet].id,
	   		"name": tweets.statuses[tweet].user.name,
	   		"screen_name": tweets.statuses[tweet].user.screen_name,
	   		"location": tweets.statuses[tweet].user.location,
	   		"url": tweets.statuses[tweet].user.url 
	   	});

	   	//log  to console
	   	console.log(tweets.statuses[tweet].text);
	   }

	var found_one = false;

	while(!found_one){
		//choose a random number
		var random_element = Math.floor( Math.random() * all_tweets.length-1) + 1;

		//choose a random tweet
		var selected_tweet = all_tweets[random_element];

		if(!(selected_tweet in historic_tweets) && (selected_tweet.screen_name != "EatingThings101")) {
			//push selected tweet to historic_tweets
			historic_tweets.push(selected_tweet);
			found_one = true;
			//console.log("TWEET: " + selected_tweet.text + "- @" + selected_tweet.screen_name);
			
			//Test case for tweeting
			client.post('statuses/update', {status: selected_tweet.text + "- @" + selected_tweet.screen_name}, function(error, tweet, response) {
			  if (!error) {
			    console.log(tweet); 
			  } 
			});
		}
	}

	// // save historic_tweets to JSON file
	//     fs.writeFile('historic_tweets.json', JSON.stringify(historic_tweets, null, '\t'), (err) => {
	// 	  if (err) throw err;
	// 	  //console.log('It\'s saved!');
	// 	});

	//console.log("THIS IS A RANDOM TWEET: " + selected_tweet.text);

	// // save to JSON file
	//     fs.writeFile('contents.json', JSON.stringify(all_tweets, null, '\t'), (err) => {
	// 	  if (err) throw err;
	// 	  //console.log('It\'s saved!');
	// 	});

	// // save twitter feed to JSON file
	//     fs.writeFile('tweets.json', JSON.stringify(tweets, null, '\t'), (err) => {
	// 	  if (err) throw err;
	// 	  //console.log('It\'s saved!');
	// 	});
	});

}

setInterval(tweetThatFood, 60000);



 
