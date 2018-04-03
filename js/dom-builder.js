"use strict";
// Document objects
let cardList = document.getElementById("card-area2"),
    profileArea = document.getElementById("profile-content"),
    parentDelete = document.getElementById("card-area"),
    clearmeout = document.getElementById("clear-me-out");
    

// Required objects
let db = require("./fb-db"),
    $ = require("jquery"),
    fetchAPI = require("./fetch-api");

// objects
let data,
    critInput,
    movieObject = {};


// Checks for id of a button click on the entire document. Qualifies the contents of the event that, if condition is met, discerns the purpose of particular button press.
$(document).ready(function(){
    $(document).on( "click", "button", function(){
        let stringTest = event.target.id;
        let id = parseInt(event.target.id);
        if(!Number.isNaN(id)){ // is a number value
            console.log("Satisfied the test:", event.target.id);
            writeCritique(id, data);
        }

        if(Number.isNaN(id) && (stringTest.includes("delete-"))){ // is not a value AND includes the string "delete-"

            console.log("Delete button with id:", stringTest);
            console.log("Deletion value:", event.target.value);
            let deletion = event.target.value;
            db.deletePost(deletion);
            deletePostFromDOM(stringTest);
        }
        if(Number.isNaN(id) && (stringTest.includes("update-"))){
            console.log("Update button with id:", stringTest);
            console.log("Update key for database:", event.target.value);
            let updateKey = event.target.value;
            editPost(updateKey);
        }
        else{ // not a button besides login and logout
            console.log("Not a rate button press", event.target.id);
        }
    });
});

function deletePostFromDOM(target){
    // When called, delete the post from the DOM, by targeting the parent node.
    // Target is the id name of the post to be deleted.

    console.log("deletePostFromDOM() is working");
    var isDeleteBtnClicked = target.includes("delete-");
    console.log("Is this a delete command? ",isDeleteBtnClicked, " Target variable contains: ", target);
    $(`#${target}`).parent().remove();
}


function editPost(updateKey){
// Rewrite a critique already in the firebase for quick update.

    console.log(updateKey);
    db.getSpecificPost(updateKey).then((resolve, reject)=>{
        let toEditData = resolve;
        console.log("Edit data:", toEditData);
        cardList.innerHTML = " ";
        cardList.innerHTML += `
        <i>Rewrite the critique!!</i></br>
        <div class="p-2">
            <textarea id="critique-rewrite" class="form-control" rows="5" rows="4" cols="50">${toEditData.post}
            </textarea>
        </div>`;

    var editedInput = $('#critique-rewrite')[0].addEventListener("keydown", function(e){
        let editedPacket = {};

        // Make a packet containing the goods.
        if (e.keyCode === 13 && e.target.value != "")  {
            editedPacket.post = e.target.value;
            editedPacket.movieID = toEditData.movieID;
            editedPacket.uid = toEditData.uid;
            db.updatePost(editedPacket, updateKey);
        }
      });
    });
}

function cardPrinter(thisMovie, allData){
    data = allData;
    cardList.innerHTML = " ";
    clearmeout.innerHTML = " ";
    // Prints the cards for each movie for selecting to be rated.
    console.log("In cardPrinter()");
    thisMovie.forEach(function(item, index){

        cardList.innerHTML += 
        `<div class="row">
            <div class="col-sm-6" id=card--${thisMovie[index].movieID}>
            ${/* 
                ***NOTE***


                IMAGE BEGINS ---
                ***END NOTE**
                */''}
                <div class="dynamic-card-container card sticky-action card bg-light mb-3 card text-center" style="max-width: 18rem;">
                        <div class="header card sticky-action" id=cardSticky${thisMovie[index].movieID}>
                            <div class="card-image waves-effect waves-block waves-light" id=cardImage${thisMovie[index].movieID}>
                                <img id="activator icon${thisMovie[index].movieID}" class="movie-image" height="300" width="200" src="${thisMovie[index].poster}">
                            </div>
                            ${/* 
                                ***NOTE***
                                IMAGE ENDS---

                                
                                HEADER SECTION BEGINS
                                TITLE follows
                                ***END NOTE**
                                */''}
                            <div class="card-content">
                                    <span class="card-title activator grey-text text-darken-4 icon${thisMovie[index].movieID} col s10 truncate">${thisMovie[index].title}</span>
                                    <i class="material-icons right icon${thisMovie[index].movieID} col s2 activator"></i>
                            </div>
                            ${/* 
                                ***NOTE***
                                DESCRIPTION
                                ***
                                YEAR 
                                ACTUAL OVERVIEW
                                EMPTY CAST LIST
                                ***
                                ***END NOTE**
                                */''}
                            <div class="card-reveal" id=reveal${thisMovie[index].movieID}>
                                <span class="card-title grey-text text-darken-4">
                                </span>
                                <span>(${thisMovie[index].year})</span>
                                <p>${thisMovie[index].overview}</p>
                                <p id=castReveal${thisMovie[index].movieID}></p>
                            </div>
                            <div id=rate-${index} class=rateYo></div>

                            ${/* 
                                ***NOTE***
                                DESCRIPTION ENDS HERE

                                BUTTON BELOW
                                ***END NOTE**
                                */''}
                            <div class="container">
                                <button class= "btn btn-secondary" id="${thisMovie[index].movieID}"> Rate this movie! </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
        
    });  
}

function printUserProfile(result){
    // Prints the USER PROFILE information upon sign in.
    console.log("record.printUserProfile() executed.");
    profileArea.innerHTML = 
    `<span>
        <img src=${result.additionalUserInfo.profile.picture}  id="profile-history" class="rounded-circle" height="100" width="100"></br>
        <p class="username">${result.user.displayName}</p>
    </span>`;

    // USER HISTORY tied to the profile image.
    $("#profile-history").click(function(){
        cardList.innerHTML = " ";
        let UID = result.user.uid;
        console.log("UID:", UID);
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
    // Critique related function. The function fires upon profile click, and prints the results from the theMovieDB api call & the firebase call. 

        cardList.innerHTML += `<div class="row">
        <div class="col-sm-6" id=card--${ thisMovie.movieID}>
        ${/* 
            ***NOTE***


            IMAGE BEGINS ---
            ***END NOTE**
            */''}
            <div class="dynamic-card-container card sticky-action card bg-light mb-3 card text-center" style="max-width: 18rem;">
                    <div class="header card sticky-action" id=cardSticky${thisMovie.movieID}>
                        <div class="card-image waves-effect waves-block waves-light" id=cardImage${ thisMovie.movieID}>
                            <img id="activator icon${ thisMovie.movieID}" class="movie-image" height="300" width="200" src="${ thisMovie.poster}">
                        </div>
                        ${/* 
                            ***NOTE***
                            IMAGE ENDS---

                            
                            HEADER SECTION BEGINS
                            TITLE follows
                            ***END NOTE**
                            */''}
                        <div class="card-content">
                                <span class="card-title activator grey-text text-darken-4 icon${ thisMovie.movieID} col s10 truncate">${ thisMovie.title}</span>
                                <i class="material-icons right icon${ thisMovie.movieID} col s2 activator"></i>
                        </div>
                        ${/* 
                            ***NOTE***
                            DESCRIPTION
                            ***
                            YEAR 
                            ACTUAL OVERVIEW
                            EMPTY CAST LIST
                            ***
                            ***END NOTE**
                            */''}
                        <div class="card-reveal" id=reveal${ thisMovie.movieID}>
                            <span class="card-title grey-text text-darken-4">
                            </span>
                            <span>(${ thisMovie.year})</span>
                            <p>${ thisMovie.overview}</p>
                            <p id=castReveal${ thisMovie.movieID}></p>
                        </div>
                        <div id=rate-${index} class=rateYo></div>

                        ${/* 
                            ***NOTE***
                            DESCRIPTION ENDS HERE

                            BUTTON BELOW
                            ***END NOTE**
                            */''}
                            ${/* 
                        <div class="container">
                            <button class= "btn btn-secondary" id="${ thisMovie.movieID}"> Rate this movie! </button>
                            ***NOTE***
                            Buttons below.
                            ***END NOTE**
                            */''}
                            <div class="container">
                            <h2>Critique ${index+1}</h2>
                            <p> ${thisMovie.post}</p>
                            <button id="delete-${thisMovie.movieID}" value="${thisMovie.values}" class="btn btn-primary btn-md">Delete</button>
                            <button id="update-${thisMovie.movieID}" value="${thisMovie.values}" class="btn btn-primary btn-md">Update</button>
                     </div>
                </div>
            </div>
        </div>
    </div>`;

       
    }

function writeCritique(movieID, allData){
    // Prints Critique details
    cardList.innerHTML = "";
    cardList.innerHTML = `
    <i>Write a critique!!</i></br>
    <div class="p-2">
        <textarea id="critique" class="form-control" rows="5" rows="4" cols="50">
        </textarea>
    </div>`;

    // Event listener for critique textarea, upon enter.
    var input = $('#critique')[0].addEventListener("keydown", function(e){
        
        // Reassign the allData variable to target the UID specifically.
        let uid = Object.values(allData);
        uid = uid[0].uid;
        let packet = {};

        // Make a packet containing the goods.
        if (e.keyCode === 13 && e.target.value != ""){
            packet.post = e.target.value;
            packet.movieID = movieID;
            packet.uid = uid;
            submitCritique(packet);
        }

    });
}


function submitCritique(packet){
    db.postCritique(packet).then(
        (resolve)=>{
        console.log("Resolved db.postCritique():", resolve);
    },
        (reject)=>{
        console.log("Rejected db.postCritique():", reject);
    });
}

module.exports = {cardPrinter , printUserProfile};