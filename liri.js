// require .env for spotify keys
require('dotenv').config();

// require keys.js
var keys = require('./keys.js');
// require File System
var fs = require('fs');
// require axios
var axios = require('axios');
// require moment.js
// (code from momentjs.com)
var moment = require('moment');
// require node-spotify-API 
// (code from npmjs.com)
var Spotify = require('node-spotify-api');

// ========================================================================
// 0. User Input

// var userInput = process.argv[3];
// if (process.argv.length > 4) {
//     for (i = 4; i < process.argv.length; i++) {
//         userInput = userInput + " " + process.argv[i];
//     }
// };
// console.log(userInput);

var userInput = process.argv.slice(3).join(" ");
console.log(userInput);


// 0. CLI Command

var operator = process.argv[2];
switch (operator) {
    // case 'concert-this':
    //     movieThis();
    //     break;
    // case 'spotify-this-song':
    //     spotifyThisSong();
    //     break;
    case 'movie-this':
        movieThis();
        break;
    // case 'do-what-it-says':
    //     doWhatItSays();
    //     break;
}


// ========================================================================
// 1. node "concert-this"


// ========================================================================
// 2. node "spotify-this-song"

// access keys information
// var spotify = new Spotify(keys.spotify);

// spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
//     if (err) {
//       return console.log('Error occurred: ' + err);
//     }
   
//   console.log(data); 
//   });

// ========================================================================
// 3. node "movie-this"

function movieThis() {
    var movieName = userInput;
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    console.log(queryUrl);

    axios.get(queryUrl)
    .then(response => {
        // console.log(response.data)
        console.log(
            '\nTitle: ' + response.data.Title,
            '\nYear Release: ' + response.data.Year,
            '\nRating (IMDB): ' + response.data.imdbRating,
            '\nRating (Rotten Tomatoes): ' + response.data.Ratings[1].Value,
            '\nCountry: ' + response.data.Country,
            '\nLanguage: ' + response.data.Language,
            '\nPlot: ' + response.data.Plot,
            '\nActors: ' + response.data.Actors,
        )
    });
    
}


// ========================================================================
// 4. node "do-what-it-says"

