"use strict";
// Document objects
let cardList = document.getElementById("card-area");
let profileArea = document.getElementById("profile-content");

function cardPrinter(thisMovie){
    console.log("What's inside", thisMovie);
    thisMovie.forEach(function(item, index){
        console.log(`Movie Object ${index}`, item);
        cardList.innerHTML += `<div class="p-2">
        <div class="col xl4 l6 m6 s12" id=card--${thisMovie[index].movieID}>
   				<div class="card sticky-action" id=cardSticky${thisMovie[index].movieID}>
   					<div class="card-image waves-effect waves-block waves-light" id=cardImage${thisMovie[index].movieID}>
   					  <img class="activator icon${thisMovie[index].movieID}" src="${thisMovie[index].poster}">
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
						<div id=rateYo${index} class=rateYo></div>
          </div>
               </div>
    </div>`;

    });
    
    
}

function printUserProfile(result){
    console.log("record.printUserProfile() executed.");
    profileArea.innerHTML = `<img src=${result.additionalUserInfo.profile.picture} height="100" width="100">
          </br><p>${result.user.displayName}</p>`;
}





module.exports = {cardPrinter, printUserProfile};