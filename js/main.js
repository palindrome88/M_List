"use strict";


let fetchAPI = require ("./fetch-api.js"),
    db = require("./fb-db.js"),
    user = require ("./users.js"),
    $ = require ("jquery");



function checkUser(data){

    console.log("In checkUser(), do you mean to check " + data + "? Because that's what's being passed in the Firebase to be checked.");

    // Here we are setting the google identified user to the firebase database in the User collection.
    db.getFBUser(data).then((newdata) =>{
        console.log("Data checkUser:", newdata);
        let ID = Object.values(newdata);

        /*Firebase will not tell you explicitly that the User exists already or not. You have to interpret from the details what is what. getFBUser will always return an object (primary key), but whether or not the object contains any values is what matters. So you must conduct a test. If the object holds NO items, then the User is new, and you need to set the user. If the object is more than 0, (preferably not greater than 1 though), the User has logged in before. So, based on the premise that ID should either be a 1 or a 0, I act accordingly because we are calling the index value of the key.*/
        
        console.log(`${data} === ${ID.length}`);
        
        if (ID.length > 0) {
            console.log("User history found. Using User:", ID[0].uid);
            //runTheApp(newdata, ID);
            user.setUser(ID);
        }

        if (ID.length === 0){ 
            console.log("New User:" , data);
            
            let UID = user.getUser(); 
            // Let's get the user from Google. Set her credentials in this object.
            
            user.setUser(ID); 
            // Set the User For Google
            
            setUser( newdata,UID); 
            //Set the User for Firebase & the web app.
            
        }
    });
}

function setUser(keyobject, data){ 
    let userInfo = {};
    userInfo.uid = data; 
    // Set the credentials as a property of a new object. Firebase requires an object to be sent.
    console.log("userInfo", userInfo);
    db.setfbUser(userInfo).then((primarykey)=>{
        console.log("New User has been set with primary key:", primarykey);
        //runTheApp(primarykey);
    });
    
  }





