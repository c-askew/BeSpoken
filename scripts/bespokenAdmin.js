$(document).ready(function() {
  getAllFeedback();
});

const overallEl = document.getElementById("overall");
const staffEl = document.getElementById("staff");

//Assigns the logout button event
const btnLogout = document.getElementById("logout");
btnLogout.addEventListener('click', e => {
  firebase.auth().signOut();
});

function getAllFeedback() {
  //Snapshots all data - runs through two for each loops to convert in a single array of objects
  //for easier handling.
  var feedback = firebase.database().ref('feedback');
  var feedbackAll = [];
  feedback.on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      childSnapshot.forEach(function(innerChild) {
        feedbackAll.push(innerChild.val());
      })
    });
    console.log(feedbackAll)
    //Call the getAverage function for both/all required keys
    getAverage(feedbackAll, "overallRating");
    getAverage(feedbackAll, "staffRating");
  });
};

function getAverage(feedback, rating) {
  if (rating == "overallRating") {
    var avg = d3.mean(feedback, function(d) { return d.overallRating; });
    console.log(avg);
    overallEl.innerHTML = avg;
  }
  else {
    var avg = d3.mean(feedback, function(d) { return d.staffRating; });
    console.log(avg);
    staffEl.innerHTML = avg;
  }

}



firebase.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser) {
  } else {
    window.location.href = "admin.html";
  }
});
