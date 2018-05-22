$(document).ready(function() {
  collectData();
});




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

function collectData() {
  //Grabs a data snapshot of all data entered today.
  var date = moment().format("DD-MM-YYYY");
  var userData = firebase.database().ref('uploadData/' + date);
  var allData = [];
  var ecstasyData =[];
  var fearData =[];
  var loveData =[];
  var sadnessData =[];

  userData.on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      allData.push(childSnapshot.val());
      ecstasyData.push(childSnapshot.val().ecstasyResponse);
      fearData.push(childSnapshot.val().fearResponse);
      loveData.push(childSnapshot.val().loveResponse);
      sadnessData.push(childSnapshot.val().sadnessResponse);
    })

  });
  //Short delay to ensure snapshot data is populated fully.
  setTimeout(function() { getFrequencies(ecstasyData, fearData, loveData, sadnessData) }, 3000);


  // console.log("Data from " + date)
  // console.log(allData)
}

function getFrequencies(ecstasy, fear, love, sadness){
  ecstasy = frequencyFilter(ecstasy);
  fear = frequencyFilter(fear);
  love = frequencyFilter(love);
  sadness = frequencyFilter(sadness);
  console.log(ecstasy)
  console.log(fear)
  console.log(love)
  console.log(sadness)
  outputData(ecstasy, fear, love, sadness);
};

function frequencyFilter(filterArray) {
  //https://stackoverflow.com/a/3579871
    var newArray = [];
    var freq = {};
    //Count Frequency of Occurances
    var i=filterArray.length-1;
    for (var i;i >-1; i--) {
        var value = filterArray[i];
        freq[value]==null?freq[value]=1:freq[value]++;
    }
    //Create Array of Filtered Values
    for (var value in freq) {
        newArray.push(value);
    }
    //Define Sort Function and Return Sorted Results
    function compareFreq(a,b) {
        return freq[b]-freq[a];
    }
    //Load into an array and then return the first value in that array
    var mostFreq = newArray.sort(compareFreq)
    return mostFreq[0];
}

function outputData(ecstasy, fear, love, sadness) {
  const fearEl = document.getElementById('fear');
  const ecstasyEl = document.getElementById('ecstasy');
  const sadnessEl = document.getElementById('sadness');
  const loveEl = document.getElementById('love');



  fearEl.src = "assets/" + fear.toLowerCase() +".jpg";
  ecstasyEl.src = "assets/" + ecstasy.toLowerCase() +".jpg";
  sadnessEl.src = "assets/" + sadness.toLowerCase() +".jpg";
  loveEl.src = "assets/" + love.toLowerCase() +".jpg";
}

function imageRight(box) {
  var curr = document.getElementById(box);
  if (box == 4) {
    document.getElementById("box4").classList.add('hide');
    document.getElementById("box1").classList.remove('hide');
  } else {
    var nextBox = box + 1;
    document.getElementById("box" + box).classList.add('hide');
    document.getElementById("box" + nextBox).classList.remove('hide');
  }
}

function imageLeft(box) {
  if (box == 1) {
    document.getElementById("box1").classList.add('hide');
    document.getElementById("box4").classList.remove('hide');
  } else {
    var nextBox = box - 1;
    document.getElementById("box" + box).classList.add('hide');
    document.getElementById("box" + nextBox).classList.remove('hide');
  }
}
