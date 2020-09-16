import { signin_button, send_payload, otp_enter, progress_bar } from './resolveDom'
import * as firebase from 'firebase/app';
import "firebase/database";
import { firebaseConfig, publicAPIKey } from './firebaseConfig';
import { userDetail } from './userDetail';

initialize();
var firebaseDatabase;
var userdetail;
var data;
function initialize() {
  progress_bar.style.display = "none";
  console.log("initialize called");
  signin_button.addEventListener("click", RefreshToken);
  send_payload.addEventListener("click", prepParams);
  firebase.initializeApp(firebaseConfig);
  firebaseDatabase = firebase.database();

  data = localStorage.getItem("pojbfan9ap3jhbascnASaC");
  if (data == "" || data == null) {
    send_payload.style.display = "none";
  } else {
    console.log("Setting data");
    setUserData(data);
  }
}

function setUserData(string) {
  userdetail = new userDetail(string);
  signin_button.style.display = "none";
  otp_enter.style.display = "none";
}


//SIgnin not working likely will not include this
function RefreshToken() {
  console.log("Refresh data");
  progress_bar.style.display = "block";
  var otp = otp_enter.value;
  //var userId = "6qfi3nFfEtO3t5aRWRASHAuIjO32";
  var userId = "";
  if (otp.length == 6) {
    console.log(otp);
    try {
      firebaseDatabase.ref('/authenticate/' + otp).once('value').then(function (snapshot) {

        try {
          console.log(snapshot.val().uuid);
          userId = snapshot.val().uuid;

          firebaseDatabase.ref('/users/' + userId).once('value').then(function (snapshot) {
            console.log(snapshot.val());
            //alert(snapshot.val().androidToken);
            localStorage.setItem("pojbfan9ap3jhbascnASaC", snapshot.val().pipeDelimited);
            data = localStorage.getItem("pojbfan9ap3jhbascnASaC");
            setUserData(data);
            progress_bar.style.display = "none";
            signin_button.style.display = "none";
            otp_enter.style.display = "none";
            send_payload.style.display = "block";
          });
          progress_bar.style.display = "none";
        } catch (err) {
          progress_bar.style.display = "none";
        }



      });
    } catch (err) {
      progress_bar.style.display = "none";
    }




  } else {
    console.log("invalid otp")
    progress_bar.style.display = "none";
  }


}




function prepParams() {
  progress_bar.style.display = "block";
  try {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
      var url = tabs[0].url;
      console.log(url);

      chrome.tabs.executeScript({
        code: 'document.querySelector("video").currentTime'
      }, results => {
        var time = results && results[0];
        console.log(time);
        console.log(url);
        SendPayload(url, time);
      });


    });
  }
  catch (err) {
    console.log(err);
    progress_bar.style.display = "none";
  }



}

function SendPayload(link, time) {

  var http = new XMLHttpRequest();
  var url = 'https://fcm.googleapis.com/fcm/send';
  var whatToShare = link;
  var timeToShare = time;
  var whomToShareWith = userdetail.gandroidToken();
  var params;

  params = '{ \"priority\":\"HIGH\", \"data\":{ \"link\":\"whatToShare\" , \"time\":\"timeToShare\" }, \"to\":\"whomToShareWith\" }';
  params = params.replace("whatToShare", whatToShare);
  params = params.replace("whomToShareWith", whomToShareWith);
  params = params.replace("timeToShare", timeToShare);


  console.log(params);
  http.open('POST', url, true);

  //Send the proper header information along with the request
  http.setRequestHeader('Content-Type', 'application/json');
  http.setRequestHeader('Authorization', 'key='+publicAPIKey);    // Here your public key will go

  http.onreadystatechange = function () {//Call a function when the state changes.
    if (http.readyState == 4 && http.status == 200) {
      console.log(http.response);
      progress_bar.style.display = "none";
      //alert(http.response);
    } else {
      progress_bar.style.display = "none";
    }
  }
  http.send(params);

}