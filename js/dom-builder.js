"use strict";
// Document objects
let cardList = document.getElementById("card-area");
let profileArea = document.getElementById("profile-content");
let parentRater = document.getElementById("card-area");

// Event Listeners
parentRater.addEventListener("click", submitMovieID, false);


function cardPrinter(thisMovie){
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
    // Prints the user profile information upon sign in.
    console.log("record.printUserProfile() executed.");
    profileArea.innerHTML = `<img src=${result.additionalUserInfo.profile.picture} height="100" width="100">
          </br><p>${result.user.displayName}</p>`;
}

function writeCritique(){


    
}


function submitMovieID(e) {
    // Gets the target information for button press, then calls a dom-builder method to compose the environment to make a review, then performs a db-method to send the information to the database.
    if (e.target !== e.currentTarget) {
        var clickedItem = e.target.id;
        console.log("Hello " + clickedItem + " " + e.target.value);

        // Pass along to firebase.


    }
    e.stopPropagation();
}

module.exports = {cardPrinter, printUserProfile};