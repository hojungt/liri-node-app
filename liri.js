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
// console.log(userInput);

// 0. CLI command operator

var operator = process.argv[2];
switch (operator) {
    case 'concert-this':
        concertThis();
        break;
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

function concertThis() {

    var artist = userInput;
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(queryUrl)
    .then(response => {
        if (!response.data[0]) {
            console.log('=======================================================================');
            console.log('No concert information found based on your request :(');
        }
        // console.log(response.data);
        for (i=0; i<response.data.length; i++){
            console.log('=======================================================================');
            console.log('Venue Name: ' + response.data[i].venue.name);
            if (!response.data[i].venue.region) {
                console.log('Venue Location: ' + response.data[i].venue.city + ', ' + response.data[i].venue.country);
            }
            else {
                console.log('Venue Location: ' + response.data[i].venue.city + ', ' + response.data[i].venue.region + ', ' + response.data[i].venue.country);
            }
            console.log('Concert Time: ' + moment(response.data[i].datetime).format("L"));
        }
    });
}


// ========================================================================
// 2. node "spotify-this-song"

function spotifyThisSong() {

    // access keys information
    // (code from npmjs.com)
    var spotify = new Spotify(keys.spotify);

    if (!userInput) {
        userInput = 'The Sign';
    }

    spotify.search({ type: 'track', query: userInput }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        else if (userInput == 'The Sign'){
            i = 9;
        }
        else {
            i = 0;
        }
        // console.log(data);
        console.log('=======================================================================');
        console.log('Artist(s): ' + data.tracks.items[i].album.artists[0].name);
        console.log('Song Name: ' + data.tracks.items[i].name);
        console.log('Preview: ' + data.tracks.items[i].preview_url);
        console.log('Album: ' + data.tracks.items[i].album.name);
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
        console.log('=======================================================================');
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

