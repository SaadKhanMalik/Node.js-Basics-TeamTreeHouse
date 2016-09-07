//Problem   : We need a simple way to look up  a user's badgecount and javascript points.
//solution  Use Node.js to connect te teamtreehouse's API to get profile information to print out

var https = require("https");
var username ="saadkhanmalik";
//var username ="saadkhanmalik123"; // Use to check statusCode error

//print message function
function printMessage(username, badgeCount, points) {
  var message = username + " has " + badgeCount + " total badge(s) and " + points + " points in JavaScript";
  console.log(message);
}

//print out  error message function
function printError(error){
  console.error(error.message);

}


  //connect to the api url:
  //https://teamtreehouse.com/saadkhanmalik.json
  var request = https.get("https://teamtreehouse.com/" + username + ".json", function(response) {
    //console.log(response.statusCode); //Used the to innitially check connection.
    var body = "";
    //read the data
    response.on('data', function (chunk){
      body += chunk;
    });
    response.on('end', function(){
      if(response.statusCode === 200){

        try {
          // console.log(body);
          // console.log(typeOf body);
          //parse the data
          var profile = JSON.parse(body);
          var totalPoints = ( profile.points.HTML +
                              profile.points.CSS +
                              profile.points.Design +
                              profile.points.JavaScript +
                              profile.points.Ruby +
                              profile.points.PHP +
                              profile.points.WordPress +
                              profile.points.iOS +
                              profile.points['Development Tools'] +
                              profile.points.Business +
                              profile.points.Python +
                              profile.points.Java +
                              profile.points['Digital Literacy'] +
                              profile.points['Game Development'] +
                              profile.points['C#'] +
                              profile.points.Databases
          );
          //print the data out
          console.log(totalPoints);
          printMessage(username, profile.badges.length, profile.points.JavaScript);
          //console.dir(profile); //prints entier profile
        } catch (error) {
          //prse error
          printError(error);

        };
      } else {
        printError({message: "There was an error getting the profile for " + username + ". (" + response.statusCode + ")" });
      };
    });


  });

  // connection error
  request.on("error", printError);
