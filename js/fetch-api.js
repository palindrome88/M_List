"use strict";
let $ = require("jquery");

let mdKey = require ("./md-key.js");

console.log("fetch-api.js is attached.");

function fetchMovie(){

    let movieLoader = new XMLHttpRequest();

    movieLoader.open("GET", `https://${mdKey.movieKey.authDomain}${mdKey.movieKey.spec}${mdKey.movieKey.apiKey}`, true);
    movieLoader.send();
    movieLoader.addEventListener("load", function(){

        var data = JSON.parse(this.responseText);
        console.log("fetchMovie() data returned: ", data);

        // Other stuff needing to get done here.
    });
}









module.exports = {};