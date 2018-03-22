"use strict";
// Document objects
let cardList = document.getElementById("card-area"),
    profileArea = document.getElementById("profile-content"),
    parentRater = document.getElementById("card-area");
    
    


let db = require("./fb-db"),
    $ = require("jquery");

// objects
let data;
let critInput;

// Event Listeners
parentRater.addEventListener("click", submitMovieID, false);

function cardPrinter(thisMovie, allData){
    data = allData;
    
    // Prints the cards for each movie for selecting to be rated.

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
                            <i class="material-icons right icon${thisMovie[index].movieID} col s2 activator">more_vert</i>
                        </div>
                        <div class="card-reveal" id=reveal${thisMovie[index].movieID}>
                            <span class="card-title grey-text text-darken-4">Overview<i class="material-icons right">close</i></span>
                            <span>(${thisMovie[index].year})</span>
                            <p>${thisMovie[index].overview}</p>
                            <span class="card-title grey-text text-darken-4">Cast</span>
                            <p id=castReveal${thisMovie[index].movieID}></p>
                        </div>
                            <div id=rate-${index} class=rateYo></div>
                            <button id="${thisMovie[index].movieID}" value="${thisMovie[index].movieID}" class="rate-button">Rate Me</button>
                    </div>
                </div>
        </div>`;

    });
    
    
}

function printUserProfile(result){
    // Prints the USER PROFILE information upon sign in.
    console.log("record.printUserProfile() executed.");
    profileArea.innerHTML = `<img src=${result.additionalUserInfo.profile.picture} id="profile-history" height="100" width="100">
          </br><p>${result.user.displayName}</p>`;

    // USER HISTORY tied to the profile image.
    $("#profile-history").click(function(){
        let UID = result.user.uid;
        console.log("UID:", UID);
        db.getUserHistory(UID);
    });
}

function writeCritique(movieID){
    // Creates a div that overwrites the rated movies entirely.

    // ISSUES -- This runs twice according to some event firing double. I don't know why as of yet but this is definitely a fix needed.
    cardList.innerHTML = "";
    cardList.innerHTML = `<div class="p-2">
    <textarea id="critique" rows="4" cols="50">
    
    </textarea>
    </div>`;

    console.log("We can write the critique to this address: ", data);
     let values = Object.values(data);
   
    values = values[0];
    values.movieID = movieID;
    let critiqueArea = document.getElementById("critique");
    critiqueArea.addEventListener("keydown", function(e){
        if (e.keyCode === 13 && e.target.value != "")  {
            values.post = $("#critiqueArea").val();
            console.log(values.post);
            e.stopPropagation();
        }
    });

    
    console.log(values);
    db.postCritique(values).then(
        (resolve)=>{
            console.log(resolve);
            
    });
}



function submitMovieID(e) {
    // Gets the target information for button press, then calls a dom-builder method to compose the environment to make a review, then performs a db-method to send the information to the database.
    if (e.target !== e.currentTarget) {
        var clickedItem = e.target.value;
        writeCritique(clickedItem);
    }
    e.stopPropagation();
}

module.exports = {cardPrinter, printUserProfile};