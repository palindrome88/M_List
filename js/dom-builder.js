"use strict";
// Document objects
let cardList = document.getElementById("card-area2"),
    profileArea = document.getElementById("profile-content"),
    //parentRater = document.getElementById("card-area"),
    parentDelete = document.getElementById("card-area");
    


let db = require("./fb-db"),
    $ = require("jquery"),
    fetchAPI = require("./fetch-api");

// objects
let data;
let critInput;
let movieObject = {};

// Event Listeners
/*parentRater.addEventListener("click", submitMovieID, false);

*/
// Checks for id of the number.
$(document).ready(function(){
    $(document).on( "click", "button", function(){
        let stringTest = event.target.id;
        let id = parseInt(event.target.id);
        if(!Number.isNaN(id)){ // is a number value
            console.log("Satisfied the test:", event.target.id);
            writeCritique(id, data);
        }

        if(Number.isNaN(id) && (stringTest.includes("delete-"))){ // is not a value AND includes the string "delete button"

            console.log("Delete button with id", stringTest);
            console.log("Deletion value:", event.target.value);
            let deletion = event.target.value;
            db.deletePost(deletion);
        }
        else{ // not a button besides login and logout
            console.log("Not a rate button press", event.target.id);
        }
    });
});


function cardPrinter(thisMovie, allData){
    data = allData;
    cardList.innerHTML = " ";
    // Prints the cards for each movie for selecting to be rated.
    console.log("In cardPrinter()");
    thisMovie.forEach(function(item, index){

        cardList.innerHTML += 
        `<div class="p-2">
            <div class="col xl4 l6 m6 s12" id=card--${thisMovie[index].movieID}>
                    <div class="card sticky-action" id=cardSticky${thisMovie[index].movieID}>
                        <div class="card-image waves-effect waves-block waves-light" id=cardImage${thisMovie[index].movieID}>
                            <img id="activator icon${thisMovie[index].movieID}" class="movie-image" height="300" width="200" src="${thisMovie[index].poster}">
                        </div>
                        <div class="card-content">
                                <span class="card-title activator grey-text text-darken-4 icon${thisMovie[index].movieID} col s10 truncate">${thisMovie[index].title}</span>
                                <i class="material-icons right icon${thisMovie[index].movieID} col s2 activator"></i>
                        </div>
                        <div class="card-reveal" id=reveal${thisMovie[index].movieID}>
                            <span class="card-title grey-text text-darken-4">
                                <i class="material-icons right">Overview</i>
                            </span>
                            <span>(${thisMovie[index].year})</span>
                            <p>${thisMovie[index].overview}</p>
                            <p id=castReveal${thisMovie[index].movieID}></p>
                        </div>
                        <div id=rate-${index} class=rateYo></div>
                    </div>
                        <button class= "btn btn-secondary" id="${thisMovie[index].movieID}"> Rate this movie! </button>
                </div>
        </div>`;
        
    });
    
    
    
}

function printUserProfile(result){
    // Prints the USER PROFILE information upon sign in.
    console.log("record.printUserProfile() executed.");
    profileArea.innerHTML = `<span class="border border-success"><img src=${result.additionalUserInfo.profile.picture}  id="profile-history" class="rounded-circle" height="100" width="100">
          </br><p><i>${result.user.displayName}</i></p></span>`;

    // USER HISTORY tied to the profile image.
    $("#profile-history").click(function(){
        let UID = result.user.uid;
        console.log("UID:", UID);
        // firstThingAsync()  
        //     .then(function(result1) {
        //         return Promise.all([result1, secondThingAsync(result1)]); 
        //     })
        //     .then(function(results) {
        //         // do something with results array: results[0], results[1]
        //     })
        //     .catch(function(err){ /* ... */ });
    
        db.getUserHistory(UID).then(function(resolve){
            

            let arr = Object.values(resolve);
            let keys = Object.keys(resolve);
            
            console.log("We can manipulate these bits:", arr);
            let movieID;

            arr.forEach(function(item,index){
                movieID = arr[index].movieID;
                console.log("Movie ID:", movieID);
                console.log("What's in arr:", arr[index]);
                console.log("Keys at index: ", index, " is ", keys[index]);
                fetchAPI.fetchID(movieID).then(
                    (resolve)=>{
                        console.log("Do we have it?", resolve);
                        let item = resolve;
                        //console.log(results[i]);
                        item.release_date = item.release_date.slice(0, item.release_date.indexOf('-'));
                        if (item.poster_path === null) {
                            movieObject = {
                            title: item.title,
                            year: item.release_date,
                            poster: 'images/PLACEHOLDER.jpg',
                            overview: item.overview,
                            movieID: item.id,
                            rating: 0,
                            watched: false,
                            inFB: false,
                            post: arr[index].post,
                            values: keys[index]
                            };
                        }
                        else {
                            movieObject = {
                                title: item.title,
                                year: item.release_date,
                                poster: `http://image.tmdb.org/t/p/w500${item.poster_path}`,
                                overview: item.overview,
                                movieID: item.id,
                                rating: 0,
                                watched: false,
                                inFB: false,
                                post: arr[index].post,
                                values: keys[index]
                                };
                            }
                        printUserHistory(movieObject, index);
                    });
            });
            
        
            
        }).catch(function(err){

            console.log.bind(console);
        });

    });
}
function printUserHistory(thisMovie, index){
    
    
    
        
        cardList.innerHTML += 
        `<div class="p-2">
            <div class="col xl4 l6 m6 s12" id=card--${thisMovie.movieID}>
                    <div class="card sticky-action" id=cardSticky${thisMovie.movieID}>
                        <div class="card-image waves-effect waves-block waves-light" id=cardImage${thisMovie.movieID}>
                        <img id="activator icon${thisMovie.movieID}" class="movie-image" height="300" width="200" src="${thisMovie.poster}">
                        </div>
                        <div class="card-content">
                                <span class="card-title activator grey-text text-darken-4 icon${thisMovie.movieID} col s10 truncate">${thisMovie.title}</span>
                            <i class="material-icons right icon${thisMovie.imovieIDd} col s2 activator">more_vert</i>
                        </div>
                        <div class="card-reveal" id=reveal${thisMovie.movieID}>
                            <span class="card-title grey-text text-darken-4">Overview<i class="material-icons right"></i></span>
                            <span>(${thisMovie.release_date})</span>
                            <p>${thisMovie.overview}</p>
                            
                            <p id=castReveal${thisMovie.movieID}></p>
                        </div>
                            <div id=rate-${index} class=rateYo></div>
                            <button id="delete-${thisMovie.movieID}" value="${thisMovie.values}" class="delete-button">Delete Me</button>
                            <p> ${thisMovie.post}</p>
                    </div>
                </div>
        </div>`;
    }

function writeCritique(movieID, allData){
    // Prints Critique details
    cardList.innerHTML = "";
    cardList.innerHTML = `<i>Write a critique!!</i></br><div class="p-2">
    <textarea id="critique" class="form-control" rows="5" rows="4" cols="50">
    </textarea>
    </div>`;

    // Event listener for critique textarea, upon enter.
    var input = $('#critique')[0].addEventListener("keydown", function(e){
        
        let uid = Object.values(allData);
        uid = uid[0].uid;
        let packet = {};

    // Make a packet containing the goods.
    if (e.keyCode === 13 && e.target.value != "")  {
        packet.post = e.target.value;
        packet.movieID = movieID;
        packet.uid = uid;

        submitCritique(packet);
    }

    });


    // // Creates a div that overwrites the rated movies entirely.

    // // ISSUES -- This runs twice according to some event firing double. I don't know why as of yet but this is definitely a fix needed.
    // cardList.innerHTML = "";
    // cardList.innerHTML = `<i>Write a critique!!</i></br><div class="p-2">
    // <textarea id="critique" class="form-control" rows="5" rows="4" cols="50">
    // </textarea>
    // </div>`;

    // console.log("We can write the critique to this address: ", data);
    //  let values = Object.values(data);
   
    // values = values[0];
    // values.movieID = movieID;
    // let critiqueArea = document.getElementById("critique");
    // critiqueArea.addEventListener("keypress", function(e){
    //     if (e.keyCode === 13 && e.target.value != "")  {
    //         values.post = $("#critique").val();
    //         console.log(values.post);
    //         e.stopPropagation();
    //     }
    // });

    
    // console.log(values);
    // db.postCritique(values).then(
    //     (resolve)=>{
    //         console.log(resolve);
            
    // });
}


function submitCritique(packet){

    db.postCritique(packet).then((resolve)=>{
        console.log("Resolved db.postCritique():", resolve);
    },
    (reject)=>{
        console.log("Rejected db.postCritique():", reject);
    });
    

}

/*function submitMovieID(e) {
    // Gets the target information for button press, then calls a dom-builder method to compose the environment to make a review, then performs a db-method to send the information to the database.
    if (e.target !== e.currentTarget) {
        var clickedItem = e.target.value;
        writeCritique(clickedItem);
    }
    e.stopPropagation();
}*/

function deleteCritique(e){
    if (e.target !== e.currentTarget) {
        var clickedItem = e.target.value;
        console.log("Key of the Item to Delete", clickedItem);
        db.deletePost(clickedItem).then((resolve)=>{

            console.log("Successfully deleted", resolve);
        });
    }
    e.stopPropagation();

}
module.exports = {cardPrinter , printUserProfile};