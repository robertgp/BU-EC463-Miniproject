var mainText = document.getElementById("mainText");
var submitBtn = document.getElementById("submitBtn");
var fireHeading = document.getElementById("fireHeading");

var firebaseHeadingRef = firebase.database().ref().child("Heading");
firebaseHeadingRef.on('value', function(datasnapshot){
    fireHeading.innerText = datasnapshot.val();
});

function submitClick(){
    var firebaseRef = firebase.database().ref();
    var messageText = mainText.value;
    firebaseRef.push().set(messageText);
}

$(document).ready(function(){
    var rootRef = firebase.database().ref().child("Users");
    rootRef.on("child_added", snap => {
        var temp1 = snap.child("Temp 01").exportVal();
        var temp2 = snap.child("Temp 02").exportVal();
        var username = snap.child("Username").exportVal();

        $("#table_body").append("<tr><td>" + username + "</td><td>" + temp1 + "</td><td>" + temp2 + "</td></tr>");      
    });
});


