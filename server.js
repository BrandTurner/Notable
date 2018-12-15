/* Load the HTTP library */
var http = require("http");
var express = require('express');
// const fs = require('fs');
// const ytdl = require('ytdl-core');
// const path = require('path');
// const spawn = require('child_process').spawn;
// const ffmpeg = require('fluent-ffmpeg');
var moment = require('moment');
const request = require('request');

// var promise = require('bluebird');

// var options = {
//   // Initialization Options
//   promiseLib: promise
// };

// var pgp = require('pg-promise')(options);
// var connectionString = 'postgres://localhost:5432/kcrw';
// var db = pgp(connectionString);

// const Spotify = require('spotify-web-api-node');
// const CLIENT_ID = 'a524fb6de5bb4ae0b86d19e9411ddbdc';
// const CLIENT_SECRET = '1acd7cc0474e42e794ec2ad470a0d758';
// const REDIRECT_URI = 'http://localhost:5000/callback';
// const STATE_KEY = 'spotify_auth_state';

// const scopes = ['user-read-private', 'user-read-email', 'playlist-modify-public', 'playlist-modify-private'];

// // configure spotify
// const spotifyApi = new Spotify({
//   clientId: CLIENT_ID,
//   clientSecret: CLIENT_SECRET,
//   redirectUri: REDIRECT_URI
// });

/** Generates a random string containing numbers and letters of N characters */
const generateRandomString = N => (Math.random().toString(36)+Array(N).join('0')).slice(2, N+2);

//TODO - Playlist download strategy
// https://www.libhive.com/providers/npm/packages/ytdl-core

/* Create an HTTP server to handle responses */
const app = express();

// CORS SHIT
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// TODO - get stuff after download, should be title plus the youtube ID
// TODO - for caching purposes, once new item is downloaded, register in DB
// using spotify as id of record
//https://localhost:5000/download/:videoId?playlist=false
const outputPath = __dirname + '/download/';

const physician_list = [
  {
    "first_name":"Julius",
    "last_name":"Hibbert",
    "id": 0
  },
  {
    "first_name":"Algernop",
    "last_name":"Krieger",
    "id": 1
  },
  {
    "first_name":"Nick",
    "last_name":"Riviera",
    "id":2
  }
]

const physician_times = [
  {
    "docId":0,
    "first_name": "julius",
    "last_name" : "Hibbert",
    "appointments" : [
      {
        "id": 0,
        "patient_name": "Dr who",
        "time":"10am",
        "type": "new patient"
      },
    ]
  },
  {
    "docId":1,
    "first_name": "Algerpop",
    "last_name" : "Krieger",
    "appointments" : [
      {
        "id": 0,
        "patient_name": "Random names",
        "time":"10am",
        "type": "new patient"
      },
      {
        "id": 1,
        "patient_name": "Sterling Archer",
        "time":"9am",
        "type": "new patient"
      },
      {
        "id": 2,
        "patient_name": "Brandon Turner",
        "time":"8am",
        "type": "new patient"
      },
      {
        "id": 3,
        "patient_name": "REddit User",
        "time":"7am",
        "type": "follow-up"
      },
      {
        "id": 4,
        "patient_name": "Jack Sparrow",
        "time":"6",
        "type": "new patient"
      },
    ]
  },
  {
    "docId":2,
    "first_name": "Nick",
    "last_name" : "Riviera",
    "appointments" : [
      {
        "id": 0,
        "patient_name": "Ray Fields",
        "time":"10am",
        "type": "new patient"
      },
    ]
  }
]

app.get('/physicians', function(req, res) {
  request('https://tracklist-api.kcrw.com/Simulcast/date/' + moment().subtract(1, 'days').format("YYYY/MM/DD"), function (error, response, body){
    if (!error && response.statusCode == 200) {
        res.send(physician_list);
        console.log(body);
    }
  });
})

app.get('/physicians/:docId', function(req, res) {


        res.send(physician_times[req.params.docId]);

    })


app.get('/kcrw', function(req, res) {
    request('https://tracklist-api.kcrw.com/Simulcast/date/' + moment().subtract(1, 'days').format("YYYY/MM/DD"), function (error, response, body){
        if (!error && response.statusCode == 200) {
            res.send(JSON.parse(body));
            console.log(body);
        }
    });
});




/**
 * The /callback endpoint - hit after the user logs in to spotifyApi
 * Verify that the state we put in the cookie matches the state in the query
 * parameter. Then, if all is good, redirect the user to the user page. If all
 * is not good, redirect the user to an error page
 */


app.listen(5000);
