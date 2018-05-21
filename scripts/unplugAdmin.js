const btnLogout = document.getElementById("logout");
btnLogout.addEventListener('click', e => {
  firebase.auth().signOut();
});

firebase.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser) {
  } else {
    window.location.href = "admin.html";
  }
});
