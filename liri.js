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
    case 'do-what-it-says':
        doWhatItSays();
        break;
}

// ========================================================================
// 1. node "concert-this"

function concertThis() {

    var artist = userInput;
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(queryUrl)
    .then(response => {
        if (!response.data[0]) {
            doubleLog('=======================================================================');
            doubleLog('No concert information found based on your request :(');
        }
        // console.log(response.data);
        for (i=0; i<response.data.length; i++){
            doubleLog('=======================================================================');
            doubleLog('Venue Name: ' + response.data[i].venue.name);
            if (!response.data[i].venue.region) {
                doubleLog('Venue Location: ' + response.data[i].venue.city + ', ' + response.data[i].venue.country);
            }
            else {
                doubleLog('Venue Location: ' + response.data[i].venue.city + ', ' + response.data[i].venue.region + ', ' + response.data[i].venue.country);
            }
            doubleLog('Concert Time: ' + moment(response.data[i].datetime).format("L"));
        }
    });
}


// ========================================================================
// 2. node "spotify-this-song"

function spotifyThisSong() {

    // access keys information
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
        doubleLog('=======================================================================');
        doubleLog('Artist(s): ' + data.tracks.items[i].album.artists[0].name);
        doubleLog('Song Name: ' + data.tracks.items[i].name);
        doubleLog('Preview: ' + data.tracks.items[i].preview_url);
        doubleLog('Album: ' + data.tracks.items[i].album.name);
    
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
        doubleLog('=======================================================================');
        doubleLog('Title: ' + response.data.Title);
        doubleLog('Year Release: ' + response.data.Year);
        doubleLog('Rating (IMDB): ' + response.data.imdbRating);
        if (!response.data.Ratings[1]){doubleLog('Rating (Rotten Tomatoes): N/A');}
        else {doubleLog('Rating (Rotten Tomatoes): ' + response.data.Ratings[1].Value);}
        doubleLog('Country: ' + response.data.Country);
        doubleLog('Language: ' + response.data.Language);
        doubleLog('Plot: ' + response.data.Plot);
        doubleLog('Actors: ' + response.data.Actors);
    });
}

// ========================================================================
// 4. node "do-what-it-says"

function doWhatItSays() {

    fs.readFile('./random.txt', 'utf8', (error, data) => {
        if (error) {
            return console.log(error);
        }
        // console.log(data);
        var importInput = data.split(',');

        userInput = importInput[1];
        switch (importInput[0]) {
            case 'concert-this':
                concertThis();
                break;
            case 'spotify-this-song':
                spotifyThisSong();
                break;
            case 'movie-this':
                movieThis();
                break;
        }
    });

}

// 5. log all response into log.txt

// operator and userinput
var commandLog = operator + " " + userInput;
fs.appendFile('./log.txt', "\n" + commandLog + "\n", 'utf8', function(error) {
    if (error) {
      return console.log(error);
    }
});

// apply console.log and fs.appendFile for all response data
function doubleLog (input) {
    console.log(input);
    fs.appendFile("log.txt", input + "\n", 'utf8', function(error){
        if (error) {
            return console.log(error);
        }
    });
};