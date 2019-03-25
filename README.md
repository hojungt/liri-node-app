# __LIRI NODE APP__

#### LIRI Node App is a CLI (Command-Line Interface) application that takes in command parameters to gives back data by searching through designated APIs. LIRI will search songs in Spotify, concerts in Bands in Town, and movies in OMDB.
#### * Start using LIRI Node App by downloading this repo. 
#### * Type the following in your terminal or git bash:
#### ```node liri <command> <keywords>```
#### * Once you have entered the command, the search result will appear below the command you have entered. 
#### * Each search will be logged into file `log.txt`.

## Demo
!(liri-demo.gif)

## Examples of Command-Line Input
##### 1. `concert-this: bruno mars` 
##### 2. `spotify-this-song: i will follow you into the dark` 
##### 3. `movie-this: pride and prejudice`
##### 4. `do-what-it-says`

###### Notes on Command-Line Input
###### 1. If you don't type in a keyword for `concert-this`, a no-result message will show.
###### 2. If you don't type in a keyword for `spotify-this-song`, the default result is 'The Sign' by Ace of Base.
###### 3. If you don't type in a keyword for `movie-this`, the default result is 'Mr. Nobody'.
###### 4. Keyword is not used in `do-what-it-says`. However, you can change the desired `<command> <keywords>` combination in file `random.txt`.

## Goal
#### Create a CLI that runs independently from a webpage using Node.js, applies modules to run desired scripts with version controls, and utilizes exisiting APIs to provide up-to-date data.

## Credits
##### APIs: 
###### - Bands in Town http://www.artists.bandsintown.com/bandsintown-api
###### - Spotify https://developer.spotify.com/dashboard/
###### - OMDB http://www.omdbapi.com/
##### NPMs: 
###### - Node-Spotify-API
###### - Axios
###### - Moment
###### - DotEnv

## Notes
###### 1. The Spotify API requires sign up in order to generate a client id and client secret for the app to run.
###### 2. This is an ongoing project. Comments and feedbacks are appreciated!