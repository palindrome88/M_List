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
        let stringTest = event.target.className;
        let id = parseInt(event.target.id);
        if(!Number.isNaN(id)){ // is a number value
            console.log("Satisfied the test:", event.target.id);
            writeCritique(id, data);
        }

        if(Number.isNaN(id) && (stringTest.includes("delete button"))){ // is not a value AND includes the string "delete button"

            console.log("This test");
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
        db.getUserHistory(UID).then((resolve)=> {
            let arr = Object.values(resolve);
            let arr2 = Object.keys(resolve);
            // get images from movieDB using a Promise.
            console.log("Values: ", arr, "Keys: ", arr2);
            cardList.innerHTML = " ";
            cardList.innerHTML = " USER HISTORY ";
            arr.forEach(function(item, index){
                // TESTS //
                let movieID = arr[index].movieID;
                console.log("Movie ID: ", movieID );


                // cardList.innerHTML = arr[index].movieID + " " + arr[index].uid;
                fetchAPI.fetchID(movieID).then((thisMovie)=>{
                    
                        cardList.innerHTML += 
                        `<div class="p-2">
                            <div class="col xl4 l6 m6 s12" id=card--${thisMovie.id}>
                                    <div class="card sticky-action" id=cardSticky${thisMovie.id}>
                                        <div class="card-image waves-effect waves-block waves-light" id=cardImage${thisMovie.id}>
                                        <img id="activator icon${thisMovie.id}" class="movie-image" height="300" width="200" src="http://image.tmdb.org/t/p/w500${thisMovie.poster_path}">
                                        </div>
                                        <div class="card-content">
                                                <span class="card-title activator grey-text text-darken-4 icon${thisMovie.id} col s10 truncate">${thisMovie.title}</span>
                                            <i class="material-icons right icon${thisMovie.id} col s2 activator">more_vert</i>
                                        </div>
                                        <div class="card-reveal" id=reveal${thisMovie.id}>
                                            <span class="card-title grey-text text-darken-4">Overview<i class="material-icons right"></i></span>
                                            <span>(${thisMovie.release_date})</span>
                                            <p>${thisMovie.overview}</p>
                                            
                                            <p id=castReveal${thisMovie.id}></p>
                                        </div>
                                            <div id=rate-${index} class=rateYo></div>
                                            <button id="${thisMovie.id}" value="${arr2[index]}" class="delete-button">Delete Me</button>
                                            
                                    </div>
                                </div>
                        </div>`;


                });
                
            });

            parentDelete.addEventListener("click", deleteCritique, false);

        });
    });
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