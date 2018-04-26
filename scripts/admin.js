function initAdmin() {
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

// Import Admin SDK
var admin = require("firebase-admin");

// Get a database reference to our posts
var db = admin.database();
var ref = db.ref("server/saving-data/fireblog/posts");

// Attach an asynchronous callback to read the data at our posts reference
ref.on("value", function(snapshot) {
  console.log(snapshot.val());
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});
