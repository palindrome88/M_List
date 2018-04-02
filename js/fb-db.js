"use strict";

let $ = require ("jquery"),
    firebase = require ("./fb-config.js");

let connectionTest = () => {
    console.log("We can now append an item to a database.");
};


// POST to Firebase written posts function.

let postCritique = (userPost) => {

    console.log(`${firebase.getFBsettings().databaseURL}/critiques.json`);
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/critiques.json`,
        method: "POST",
        data: JSON.stringify(userPost)
    }).done((postData) =>{
        console.log("Confirmation of posted message:", postData);
        return postData;
    });
};

// GET User Critique History according to UID.
let getUserHistory = (userInfo) => {
    return new Promise(function(resolve, reject){

        var xhr = new XMLHttpRequest();
        xhr.open("GET", `${firebase.getFBsettings().databaseURL}/critiques.json?orderBy="uid"&"uid"="${userInfo}`);
        xhr.send();
        xhr.addEventListener("load", function(){

            var data = JSON.parse(this.responseText);
            console.log("User history:", data);
            resolve(data);
        });
    });

    // console.log("We can now get the user's history");
    // return $.ajax({
    //     url: `${firebase.getFBsettings().databaseURL}/critiques.json?orderBy="uid"&"uid"="${userInfo}`,
    //     method: "GET"
    // }).done((historyData)=>{
    //     let arr = Object.values(historyData);
    //     console.log("Confirmation of history:", arr);
    //     return arr;
    // });  
};

let setfbUser = (userInfo) => {
    console.log("Running to set the user.", firebase.getFBsettings().databaseURL);
        return $.ajax({
            url:`${firebase.getFBsettings().databaseURL}/users.json`,
            method: "POST",
            data: JSON.stringify(userInfo)
        }).done((firebaseID)=> {
            console.log("firebaseID",firebaseID);
            return firebaseID;
        });



};

// This function checks whether or not Firebase has a user by a certain ID. If it does, it returns the object. If not? It returns an empty object.
// Either way, you'll get an object back.

let getFBUser = (userInfo) => {
    console.log("Checking for firebase User,", userInfo);
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/users.json?orderBy="uid"&equalTo="${userInfo}"`,
        method: "GET"
    }).done((data)=>{
        console.log(data);
        return data;
        
    }
    );
};

let deletePost = (key) => {
    console.log("Deleting the contents of key: ", key);
    return $.ajax({
        async: true,
        crossDomain: true,
        url: `${firebase.getFBsettings().databaseURL}/critiques/${key}.json`,
        method: "DELETE"
    }).done((data)=>{
        console.log("DELETED if null: ", data);
    });
    
};

let updatePost = (data, key) => {
    console.log("Updating the contents of key: ", key);
    return $.ajax({
        async: true,
        crossDomain: true,
        url: `${firebase.getFBsettings().databaseURL}/critiques/${key}.json`,
        method: "PUT",
        data: JSON.stringify(data)
    }).done((data)=>{
        console.log(" if null: ", data);
    });


};

let getSpecificPost = (key)=>{
    console.log("Getting the contents of key: ", key);
    return $.ajax({
        async: true,
        crossDomain: true,
        url: `${firebase.getFBsettings().databaseURL}/critiques/${key}.json`,
        method: "GET"
    }).done((data)=>{
        console.log(" Retrieved this: ", data);
    });

};






module.exports = {postCritique, getSpecificPost, updatePost, connectionTest, setfbUser, getFBUser, getUserHistory, deletePost};
