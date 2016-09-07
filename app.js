//Problem   : We need a simple way to look up  a user's badgecount and javascript points.
//solution  Use Node.js to connect te teamtreehouse's API to get profile information to print out

var https = require("https");
var username ="saadkhanmalik";


function printMessage(username, badgeCount, points) {
  var message = username + " has " + badgeCount + " total badge(s) and " + points + " points in JavaScript";
  console.log(message);
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
    // console.log(body);
    // console.log(typeOf body);
    var profile = JSON.parse(body);
    var totalPoints = ( profile.points.HTML +
                        profile.points.CSS +
                        profile.points.Design +
                        profile.points.JavaScript +
                        profile.points.Ruby +
                        profile.points.PHP +
                        profile.points.WordPress +
                        profile.points.iOS +
                        //profile.points.'Development Tools' +
                        profile.points.Business +
                        profile.points.Python +
                        profile.points.Java +
                        // profile.points.'Digital Literacy' +
                        // profile.points.'Game Development' +
                        // profile.points.'C#' +
                        profile.points.Databases
                      )

    console.log(totalPoints);
    printMessage(username, profile.badges.length, profile.points.JavaScript)
    //console.dir(profile); //prints entier profile






  });
  //parse the data
  //print the data out
});



// error print out
request.on("error", function(error){
  console.error(error.message);
});
