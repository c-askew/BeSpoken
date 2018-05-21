$(document).ready(function() {
    Materialize.updateTextFields();
});

//Assign Elements
const txtEmail = document.getElementById("email");
const txtPassword = document.getElementById("password");
const btnLogin = document.getElementById("login");
const btnLogout = document.getElementById("logout");
const btnSignup = document.getElementById("signup");
const btnGoogle = document.getElementById("google");


//Create Email Login Event
btnLogin.addEventListener('click', e=> {
  const email = txtEmail.value;
  const pass = txtPassword.value;
  const auth = firebase.auth();
  const promise = auth.signInWithEmailAndPassword(email,pass);
  promise.catch(e => console.log(e.message));
});

//Creates Email Signup Event
btnSignup.addEventListener('click', e=> {
  const email = txtEmail.value;
  const pass = txtPassword.value;
  const auth = firebase.auth();
  const promise = auth.createUserWithEmailAndPassword(email,pass);
  promise.catch(e => console.log(e.message));

});

//Create Google Event
var googProvider = new firebase.auth.GoogleAuthProvider();
btnGoogle.addEventListener('click', e => {
  firebase.auth().signInWithPopup(googProvider).then(function(result) {
    // This gives you a Access Token
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
  });
});

const signinForm = document.getElementById("signin");
const questionForm = document.getElementById("questionForm");
//Realtime Listener to manage elements based on current status
firebase.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser) {
    window.location.href = "userSelect.html"
  } else {  }
});
