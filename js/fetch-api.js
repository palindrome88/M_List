"use strict";

// Require statements
let $ = require("jquery"),
    mdKey = require ("./md-key.js");

// Document Objects

let inputBar = document.getElementById("search-bar-content");

console.log("fetch-api.js is attached.");

function fetchMovie(movieSearchQuery){
// Search Bar function
    return new Promise((resolve,reject) =>{
        let movieLoader = new XMLHttpRequest();

        // https://api.themoviedb.org/3/search/company?api_key=0cb4bea7ac2765085515b786420df202&query=Paris%2C%20Texas&page=1
        //https://api.themoviedb.org/3/search/Paris,%20Texas/?api_key=0cb4bea7ac2765085515b786420df202
        console.log(`This is the string: https://${mdKey.movieKey.authDomain}/3/search/movie${mdKey.movieKey.apiKey}&query=${movieSearchQuery}&page=1`);
        movieLoader.open("GET", `https://${mdKey.movieKey.authDomain}/3/search/movie${mdKey.movieKey.apiKey}&query=${movieSearchQuery}&page=1`, true);
        movieLoader.send();
        movieLoader.addEventListener("load", function(){

            var data = JSON.parse(this.responseText);
            console.log("fetchMovie() data returned: ", data);

            // Other stuff needing to get done here.

            resolve(data);
        });
    });
}


function fetchID(movieSearchQuery){
    // Search Bar function
        return new Promise((resolve,reject) =>{
            let movieLoader = new XMLHttpRequest();
            
            // https://api.themoviedb.org/3/search/movie/468?api_key=0cb4bea7ac2765085515b786420df202&page=1
            // https://api.themoviedb.org/3/movie/468?api_key=0cb4bea7ac2765085515b786420df202&language=en-US
            console.log(`This is the string: https://${mdKey.movieKey.authDomain}/3/movie/${movieSearchQuery}${mdKey.movieKey.apiKey}&page=1`);
            movieLoader.open("GET", `https://${mdKey.movieKey.authDomain}/3/movie/${movieSearchQuery}${mdKey.movieKey.apiKey}&page=1`, true);
            movieLoader.send();
            movieLoader.addEventListener("load", function(){
    
                var data = JSON.parse(this.responseText);
                console.log("fetchMovie() data returned: ", data);
    
                // Other stuff needing to get done here.
    
                resolve(data);
            });
        });
    }






module.exports = {fetchMovie, fetchID};