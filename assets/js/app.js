$(document).ready(function () {
 // initialize firebase
 var config = {
    apiKey: "AIzaSyCo4jS1IXc0nCsd7Ue5YiRfqsSAPjkj5zk",
    authDomain: "new-underground.firebaseapp.com",
    databaseURL: "https://new-underground.firebaseio.com",
    projectId: "new-underground",
    storageBucket: "",
    messagingSenderId: "958607761213",
    appId: "1:958607761213:web:b1f31c014027c254"
  };
 // Initialize Firebase
firebase.initializeApp(config);

// a var to represent the database
var database = firebase.database();

// button to submit the user given info
$("#trainInfoBtn").on("click", function(event) {
  event.preventDefault(); //no button reset

  //set user input values to variables
  var trainName = $("#name").val().trim();
  var destination = $("#dest").val().trim();

  //converts user input to usable info
//   var firstTime = moment($("#firstTime").val().trim(), "hh:mm").subtract(1, "years").format("hh:mm");

  var frequency = $("#freq").val().trim();
  
  //current time
  var currentTime = moment();
  console.log("CURRENT TIME: " +  moment(currentTime).format("hh:mm"));

  console.log(trainName);
  console.log(destination);
  console.log(firstTime);
  console.log(frequency);
  console.log(currentTime);



  //gathers together all our new train info
  var newTrain = {

      train: trainName,
      trainGoing: destination,
      trainComing: firstTime,
      everyXMin: frequency
  };


  //uploads newTrain to firebase
  database.ref().push(newTrain);
  
  //clears elements before adding new text
  $("#name").val("");
  $("#dest").val("");
  $("#firstTime").val("");
  $("#freq").val("");

  //I think I need this
  return false;

}); 

//not sure what this does found with google foo
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

      console.log(childSnapshot.val());
      //store in variables
      var trainName = childSnapshot.val().train;
      var destination =childSnapshot.val().trainGoing;
      var firstTime = childSnapshot.val().trainComing;
      var frequency = childSnapshot.val().everyXMin;

      console.log(trainName);
      console.log(destination);
      console.log(firstTime);
      console.log(frequency);

      //makes first train time neater
      var trainTime = moment.unix(firstTime).format("hh:mm");
      //calculate difference between times
      var difference =  moment().diff(moment(trainTime),"minutes");

      //time apart(remainder)
      var trainRemain = difference % frequency;

      //minutes until arrival
      var minUntil = frequency - trainRemain;

      //next arrival time
      var nextArrival = moment().add(minUntil, "minutes").format('hh:mm');

      //adding info to DOM table 
      $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minUntil + "</td></tr>");

});   
});
