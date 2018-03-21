"use strict";
// Document objects
let cardList = document.getElementById("card-area");
let profileArea = document.getElementById("profile-content");

function cardPrinter(results){

    cardList.innerHTML += `<div class="p-2">

    </div>`;
    
}

function printUserProfile(result){
    console.log("record.printUserProfile() executed.");
    profileArea.innerHTML = `<img src=${result.additionalUserInfo.profile.picture} height="100" width="100">
          </br><p>${result.user.displayName}</p>`;
}





module.exports = {cardPrinter, printUserProfile};