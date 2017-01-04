/*
1. conect to a twitter account
2. search for "best thing i ever ate"
3. choose randon tweet from search
4. tweet is not one tweeted before
5. post tweet on twitter
6. run code repeats x number of minutes
7. diploy worker with node
8. stretch - google image search of phrase and include pic

-------------------------------
API Stuff
-------------------------------

Consumer Key (API Key)	yeeKpkXjTVobq2EwtREID7HVr
Consumer Secret (API Secret)	fPQnhJuXLi7PwEwQ4KKUE6an0QZYLQpzr7Wfdg82roLtobTe2B

Access Token	715349654607683584-7QMzoLwET3qCu1QGDM94JHnQ2c2uHLN
Access Token Secret	KWU0m0vaXvR28fZk3Aq3kVGx2NMKIl7gtamWBBK5fAS47
*/

var Twitter = require('twitter');
var fs = require("fs");

//connected to twitter 
var client = new Twitter({
  consumer_key: 'yeeKpkXjTVobq2EwtREID7HVr',
  consumer_secret: 'fPQnhJuXLi7PwEwQ4KKUE6an0QZYLQpzr7Wfdg82roLtobTe2B',
  access_token_key: '715349654607683584-7QMzoLwET3qCu1QGDM94JHnQ2c2uHLN',
  access_token_secret: 'KWU0m0vaXvR28fZk3Aq3kVGx2NMKIl7gtamWBBK5fAS47'
});
 
var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);

// save twitter feed to text file
    fs.writeFile('tweets.json', JSON.stringify(tweets, null, '\t'), (err) => {
	  if (err) throw err;
	  console.log('It\'s saved!');
});
  }
});