"use strict";

// Require statements
let $ = require("jquery"),
    mdKey = require ("./md-key.js");

// Document Objects


console.log("fetch-api.js is attached.");

function fetchMovie(movieSearchQuery){
// This generally works with the search bar.
    return new Promise((resolve) =>{
        let movieLoader = new XMLHttpRequest();

        console.log(`This is the string: https://${mdKey.movieKey.authDomain}/3/search/movie${mdKey.movieKey.apiKey}&query=${movieSearchQuery}&page=1`);
        movieLoader.open("GET", `https://${mdKey.movieKey.authDomain}/3/search/movie${mdKey.movieKey.apiKey}&query=${movieSearchQuery}&page=1`, true);
        movieLoader.send();
        movieLoader.addEventListener("load", function(){

            var data = JSON.parse(this.responseText);
            console.log("fetchMovie() data returned: ", data);


            resolve(data);
        },
        (reject)=> {
            console.log("Rejected:", reject);
        }
    );
    });
}


function fetchID(movieSearchQuery){
    
        return new Promise((resolve,reject) =>{
            let movieLoader = new XMLHttpRequest();
        
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