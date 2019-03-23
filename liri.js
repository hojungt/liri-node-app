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
// 0. user input into string

var userInput = process.argv.slice(3).join(" ");
console.log(userInput);

// 0. CLI Command

var operator = process.argv[2];
switch (operator) {
    // case 'concert-this':
    //     movieThis();
    //     break;
    case 'spotify-this-song':
        spotifyThisSong();
        break;
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
// (code from npmjs.com)
// var spotify = new Spotify(keys.spotify);

function spotifyThisSong() {

    var spotify = new Spotify(keys.spotify);

    spotify.search({ type: 'track', query: userInput, limit: 1 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
    // console.log(data); 
    // for (i=0; i<data.tracks.items[0].album.artists.length; i++){
    //     console.log('Artist(s): ' + data.tracks.items[0].album.artists[i]);
    // }
    console.log('Artist(s): ' + data.tracks.items[0].album.artists);
    console.log('Song Name: ' + data.tracks.items[0].name);
    console.log('Preview: ' + data.tracks.items[0].preview_url);
    console.log('Album: ' + data.tracks.items[0].album.name);
    });    
}

// ========================================================================
// 3. node "movie-this"

function movieThis() {
    if (!userInput) {
        userInput = 'Mr. Nobody';
    }

    var movieName = userInput;
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    // console.log(queryUrl);

    axios.get(queryUrl)
    .then(response => {
        // console.log(response.data)
        console.log('Title: ' + response.data.Title);
        console.log('Year Release: ' + response.data.Year);
        console.log('Rating (IMDB): ' + response.data.imdbRating);
        if (!response.data.Ratings[1]){console.log('Rating (Rotten Tomatoes): N/A');}
        else {console.log('Rating (Rotten Tomatoes): ' + response.data.Ratings[1].Value);}
        console.log('Country: ' + response.data.Country);
        console.log('Language: ' + response.data.Language);
        console.log('Plot: ' + response.data.Plot);
        console.log('Actors: ' + response.data.Actors);
    });
}

// ========================================================================
// 4. node "do-what-it-says"

