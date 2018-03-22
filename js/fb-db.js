"use strict";

let $ = require ("jquery"),
    firebase = require ("./fb-config.js");

let connectionTest = () => {
    console.log("We can now append an item to a database.");
};


// POST to Firebase written posts function.

let postCritique = (userPost) => {

    console.log(`${firebase.getFBsettings().databaseURL}/posts.json`);
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/posts.json`,
        method: "POST",
        data: JSON.stringify(userPost)
    }).done((postData) =>{
        console.log("Confirmation of posted message:", postData);
        return postData;
    });
};
// GET User Post History according to UID.
let getUserHistory = (userInfo) => {
    console.log("We can now get the user's history");
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/posts.json?orderBy="uid"&"uid"="${userInfo}`,
        method: "GET"
    }).done((historyData)=>{
        console.log("Confirmation of history:", historyData);
        return historyData;
    });


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
        url: `${firebase.getFBsettings().databaseURL}/posts/${key}.json"`,
        method: "DELETE"
    }).done((data)=>{
        console.log("DELETED if null: ", data);
    });
    

};







module.exports = {postCritique, connectionTest, setfbUser, getFBUser, getUserHistory, deletePost};
