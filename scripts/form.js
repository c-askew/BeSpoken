$(document).ready(function() {
  $('select').material_select();
  initForm();
});

const btnSubmit = document.getElementById("submit");
const btnLogout = document.getElementById("logout");

//Creates the logout event
btnLogout.addEventListener('click', e => {
  firebase.auth().signOut();
});

function initForm() {
  var database = firebase.database();
  var user = firebase.auth().currentUser;

  const elStaffRating = document.getElementById("staffOut");
  const elOverallRating = document.getElementById("overallOut");
  const elEnjoyedMost = document.getElementById("enjoyedMost");
  const elEnjoyedLeast = document.getElementById("enjoyedLeast");
  const elComments = document.getElementById("comments");

  btnSubmit.addEventListener('click',
  e => getFeedback(user, elStaffRating, elOverallRating, elEnjoyedMost, elEnjoyedLeast, elComments));
}

function getFeedback(user, elStaffRating, elOverallRating, elEnjoyedMost, elEnjoyedLeast, elComments) {
  //Collects Data from document elements
  var uid = user.uid;
  var staffRating = elStaffRating.innerHTML;
  var overallRating = elOverallRating.innerHTML;
  var enjoyedMost = elEnjoyedMost.options[elEnjoyedMost.selectedIndex].text;
  var enjoyedLeast = elEnjoyedLeast.options[elEnjoyedLeast.selectedIndex].text;
  var comments = elComments.value;
  //Test Data Collection
  console.log("uid: " + uid)
  console.log("Staff Rating: " + staffRating)
  console.log("Overall Rating: " + overallRating)
  console.log("Most Enjoyed: " + enjoyedMost)
  console.log("Least Enjoyed: " + enjoyedLeast)
  console.log("Commented: " + comments)

  saveFeedback(uid, staffRating, overallRating, enjoyedMost, enjoyedLeast, comments);
}


function saveFeedback(userId, staff, overall, best, worst, comment) {
  //Function to initialise new users in the database - checks that they don't currently exist
  var date = moment().format("DD-MM-YYYY");
  console.log(date);
  var feedbackReport = firebase.database().ref('feedback/' + date + '/' + userId);
  console.log(feedbackReport)
  feedbackReport.set({
    staffRating: staff,
    overallRating: overall,
    enjoyedMost: best,
    enjoyedLeast: worst,
    comments: comment
  });
}

firebase.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser) { }
  else {
    window.location.href = "index.html"
  }
});
