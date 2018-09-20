// Function to check if user is logged in
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        document.getElementById("user_div").style.display = "initial";
        document.getElementById("login_div").style.display = "none"; 
        document.getElementById("table_div").style.display = "initial";      

        var user = firebase.auth().currentUser;

        if(user != null){
            var email_id = user.email;
            document.getElementById("user_para").innerHTML = "Welcome User : " + email;
        }

    } else {
        document.getElementById("user_div").style.display = "none";  
        document.getElementById("login_div").style.display = "initial";
        document.getElementById("table_div").style.display = "none";   
    }
  });

// Function to login an already existing user
function login(){
    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        
        window.alert("Error : " + errorMessage);
    });

}

// Function to Register User
function register(){
    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;

    firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
}

// Function to logout user
function logout(){
    firebase.auth().signOut();
    document.getElementById("login_div").style.display = "initial";
    document.getElementById("user_div").style.display = "none"; 
    document.getElementById("table_div").style.display = "none";        

}

var rendered = false;
// Function displays info of all users
function dispInfo(){
    if(rendered == false){
        var ref = firebase.database().ref('Users');
        ref.on('value', function(snapshot) {
        snapshot.forEach(function(child) {
    
        // Mapping user to data
        var user = firebase.auth().currentUser;
    
    
        //window.alert(user.uid);
        // End of mapping user to data
    
        var datas = child.val();
        var temp0 = child.val().t0;
        var hum0 = child.val().h0;
        var temp1 = child.val().t1;
        var hum1 = child.val().h1;
        var temp2 = child.val().t2;
        var hum2 = child.val().h2;
        var temp3 = child.val().t3;
        var hum3 = child.val().h3;
        var temp4 = child.val().t4;
        var hum4 = child.val().h4;
        var temp5 = child.val().t5;
        var hum5 = child.val().h5;
    
        var table = document.getElementById("table_body");
        
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        var tempInfo = document.createTextNode(temp0);
        var humInfo = document.createTextNode(hum0);
    
        // Row 1
        var row = table.insertRow(0);
        // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
        var cell11 = row.insertCell(0);
        var cell12 = row.insertCell(1);
        // Add some text to the new cells:
        cell11.innerHTML = temp0;
        cell12.innerHTML = hum0;
    
        //Row 2
        var row = table.insertRow(1);
        var cell21 = row.insertCell(0);
        var cell22 = row.insertCell(1);
        cell21.innerHTML = temp1;
        cell22.innerHTML = hum1;
    
        //Row 3
        var row = table.insertRow(1);
        var cell31 = row.insertCell(0);
        var cell32 = row.insertCell(1);
        cell31.innerHTML = temp2;
        cell32.innerHTML = hum2;
    
        //Row 4
        var row = table.insertRow(1);
        var cell41 = row.insertCell(0);
        var cell42 = row.insertCell(1);
        cell41.innerHTML = temp3;
        cell42.innerHTML = hum3;
    
        //Row 5
        var row = table.insertRow(1);
        var cell51 = row.insertCell(0);
        var cell52 = row.insertCell(1);
        cell51.innerHTML = temp4;
        cell52.innerHTML = hum4;
    
        //Row 6
        var row = table.insertRow(1);
        var cell61 = row.insertCell(0);
        var cell62 = row.insertCell(1);
        cell61.innerHTML = temp5;
        cell62.innerHTML = hum5;
        
        var t = [temp0, temp1, temp2, temp3, temp4, temp5];
        var h = [hum0,hum1,hum2,hum3,hum4,hum5];
        displayChart(t,h);
          });
        });
    }
    
    rendered = true;
}


function displayChart(t,h){
		var MONTHS = ['12am','1am','2am','3am','4am','5am'];
		var config = {
			type: 'line',
			data: {
				labels: ['12am','1am','2am','3am','4am','5am'],
				datasets: [{
					label: 'Temperature Probe 1',
					backgroundColor: window.chartColors.red,
					borderColor: window.chartColors.red,
					data: [0,0,0,0,0,0],
					fill: false,
				}, {
					label: 'Humidity Probe 1',
					fill: false,
					backgroundColor: window.chartColors.blue,
					borderColor: window.chartColors.blue,
					data: [0,0,0,0,0,0],
				}]
			},
			options: {
				responsive: true,
				title: {
					display: true,
					text: 'Temperature and Hudmity From 12am - 5am'
				},
				tooltips: {
					mode: 'index',
					intersect: false,
				},
				hover: {
					mode: 'nearest',
					intersect: true
				},
				scales: {
					xAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Time'
						}
					}],
					yAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Temperature(C)/Humidity(%)'
						}
					}]
				}
			}
        };
    
    config.data.datasets[0].data = t;
    config.data.datasets[1].data = h;
    var ctx = document.getElementById('canvas').getContext('2d');
	window.myLine = new Chart(ctx, config);
};