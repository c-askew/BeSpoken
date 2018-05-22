
const btnSubmit = document.getElementById("submit");
const btnLogout = document.getElementById("logout");

btnSubmit.addEventListener('click', e => {
  gatherResponses();
})

btnLogout.addEventListener('click', e => {
  firebase.auth().signOut();
});

function gatherResponses() {
  var database = firebase.database();
  var user = firebase.auth().currentUser;
  var uid = user.uid;

  var fearResponse = $('input[name=fear]:checked').val();
  var ecstasyResponse = $('input[name=ecstasy]:checked').val();
  var sadnessResponse = $('input[name=sadness]:checked').val();
  var loveResponse = $('input[name=love]:checked').val();

  if (fearResponse == undefined) { alert("Please select a Fear Response"); return; }
  if (ecstasyResponse == undefined) { alert("Please select a Ecstasy Response"); return; }
  if (sadnessResponse == undefined) { alert("Please select a Sadness Response"); return; }
  if (loveResponse == undefined) { alert("Please select a Love Response"); return; }

  var date = moment().format("DD-MM-YYYY");
  console.log(date);
  var uploadUnplugResponses = database.ref('uploadData/' + date + '/' + uid);
  console.log(uploadUnplugResponses)
  uploadUnplugResponses.set({
    fearResponse: fearResponse,
    ecstasyResponse: ecstasyResponse,
    sadnessResponse: sadnessResponse,
    loveResponse: loveResponse
  });
  console.log(fearResponse);
  console.log(ecstasyResponse);
  console.log(sadnessResponse);
  console.log(loveResponse);
  waitingScreen();
}

function waitingScreen() {
  document.getElementById('survey').classList.add('hide');
  document.getElementById('submit').classList.add('hide');
  document.getElementById('waiting').classList.remove('hide');
}

firebase.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser) { }
  else {
    window.location.href = "index.html"
  }
});
