"use strict";
let $ = require("jquery");

let mdKey = require ("./md-key.js");

console.log("fetch-api.js is attached.");

function fetchMovie(movieSearchQuery){
// Search Bar function
    return new Promise((resolve,reject) =>{
        let movieLoader = new XMLHttpRequest();

        movieLoader.open("GET", `https://${mdKey.movieKey.authDomain}${mdKey.movieKey.spec}${movieSearchQuery}/${mdKey.movieKey.apiKey}`, true);
        movieLoader.send();
        movieLoader.addEventListener("load", function(){

            var data = JSON.parse(this.responseText);
            console.log("fetchMovie() data returned: ", data);

            // Other stuff needing to get done here.

            resolve(data);
        });
    });
}









module.exports = {};