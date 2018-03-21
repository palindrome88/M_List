"use strict";

// REQUIRE statments
let fetchAPI = require ("./fetch-api.js"),
    db = require("./fb-db.js"),
    user = require ("./users.js"),
    record = require ("./dom-builder.js"),
    $ = require ("jquery");
// DOCUMENT OBJECTS

let inputBar = document.getElementById("search-bar-content");
let submitButton = document.getElementById("submit-button");


// DATA

let movieObject = [];

$("#goog-login").click(function() {
        console.log("clicked auth");
        user.logInGoogle()
        .then((result) => {

            // Print to DOM user details like photo or name using 
            //result.user.displayName && result.additionalUserInfo.profile.picture
          console.log("result from login", result);
          
          record.printUserProfile(result);
          checkUser(result.user.uid);
          $("#goog-login").addClass("is-hidden");
          
          
        });
    });

function executeApplication(allData, data){
    console.log("Running executeApplication().");
    let dataUID = data[0].uid;
      console.log("Data from Firebase", data, allData);
      let key = Object.keys(allData);
      console.log("Num of keys in allDakey", key);
      key = key[0];
      console.log("KEY: ", key);

      inputBar.addEventListener("keyup", function(e){
        if (e.keyCode === 13 && e.target.value != "")  {
            let userInput = e.target.value;
            console.log("Content in search bar, looking for movie", userInput);


            fetchAPI.fetchMovie(userInput).then(
                (resolved)=>{
                    console.log("Resolved:", resolved);
                    // REORGANIZE data.
                    let results = resolved.results;
                    for (var i = 0; i < results.length; i++) {
                        let item = results[i];
                        //console.log(results[i]);
                        item.release_date = item.release_date.slice(0, item.release_date.indexOf('-'));
                        if (item.poster_path === null) {
                          movieObject[i] = {
                            title: item.title,
                            year: item.release_date,
                            poster: 'images/PLACEHOLDER.jpg',
                            overview: item.overview,
                            movieID: item.id,
                            rating: 0,
                            watched: false,
                            inFB: false
                            };
                        }
                         else {
                            movieObject[i] = {
                              title: item.title,
                              year: item.release_date,
                              poster: `http://image.tmdb.org/t/p/w500${item.poster_path}`,
                              overview: item.overview,
                              movieID: item.id,
                              rating: 0,
                              watched: false,
                              inFB: false
                                };
                            }
                        }
                        // Object.values(movieObject)
                        // movieObject.forEach(function(item, index){
                        //     console.log(`Movie Object ${index}`, item);
                        // });
                    record.cardPrinter(movieObject);
                   
                
                },
                (reject)=>{
                    console.log("Rejected:", reject);
            }
        );
        }



      });

}

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
            executeApplication(newdata, ID);
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
        executeApplication(primarykey);
    });
    
  }





