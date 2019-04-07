// ================================= FIREBASE LINK

// Initialize Firebase

var config = {
    apiKey: "AIzaSyBkQ8n84DzblncB49K7j1My3rjueZLqXLk",
    authDomain: "elvan-first-project.firebaseapp.com",
    databaseURL: "https://elvan-first-project.firebaseio.com/",
    projectId: "elvan-first-project",
    storageBucket: "elvan-first-project.appspot.com",
    messagingSenderId: "36237204810"
};

firebase.initializeApp(config);



// ================================= GLOBAL VARIABLES

// Create a variable to reference the database.
var database = firebase.database();

var name;   // NAME>> will store "nombre del trabajador".
var rango;  // RANGO>> will store "rango del trabajador".
var raya;   // RAYA>> will store "raya semanal del trabajador".
var trabajadores;   // TRABAJADORES>> array will store all trabajadores submitted in the Firebase database.
var keysArr;    // KEYS ARRAY>> will store all of "trabajadores" ID's values in array form.
var k;  // KEY>> will store one given element from the "keysArr" array.
var nameInTab;  // NAME IN TABLE>> will store a certain "NOMBRE" value from the "trabajadores" specific item.

var trabajadoresRef = database.ref("TRABAJADORES"); // TRABAJADORES REFERENCE>> stores a pointer (reference) to the "TRABAJADORES" folder (or table) in Firebase. We sotore the reference because it is the reference that has the ".on" (listener) method.

trabajadoresRef.on("value", gotData, errData); // Event listener for "trabajadoresRef" reference. It will trigger each time data is change on it, making a callback to "gotData" and (or) "errData" functions.



// ================================= ON FIREBASE "TRABAJADORES" FOLDER CHANGE


function gotData(data) {
    trabajadores = data.val();  // Storing the new (recently changed) "TRABAJADORES" json object in Firebase.
    keysArr = Object.keys(trabajadores); // Storing as array all the ID from "TRABAJADORES" json object in Firebase.

    $("tbody").empty(); // Clearing the HTML table to retrieve the most recent one.

    for (var i = 0; i < keysArr.length; i++) { // Loop through all the ID's array.
        k = keysArr[i]; // Storing each ID on each loop.
        
        console.log("TRABAJADOR " + parseInt(i + 1));
        var idInTab = keysArr[i];   // Storing the "ID" from the table in each loop.
        console.log("  ID: " + idInTab);
        nameInTab = trabajadores[k].NOMBRE; // Storing "NOMBRE" from the table in each loop.
        console.log("  NOMBRE: " + nameInTab);
        var rangoInTab = trabajadores[k].RANGO; // Storing "RANGO" from the table in each loop.
        console.log("  RANGO: " + rangoInTab);
        var rayaInTab = trabajadores[k].RAYA_SEMANAL;   // Storing "RAYA_SEMANAL" from the table in each loop.   
        console.log("  SUELDO SEMANAL: " + rayaInTab);

        var currencyFormatrer = new Intl.NumberFormat("es-MX", {    // "Intl.NumberFormat" is a class (object constructor) to change the formmat of a numeric value.
            style: "currency",
            currency: "MXN",
            minimumFractionDigits: 2
        });

        var rayaConFormato = currencyFormatrer.format(rayaInTab);   // Assigning the formatted "RAYA_SEMANAL" to a value.

        var newRow = $("<tr>" +
            "<td>" + idInTab + "</td>" +
            "<td>" + nameInTab + "</td>" +
            "<td>" + rangoInTab + "</td>" +
            "<td>" + rayaConFormato + "</td>" +
            "</tr>");
        $("table > tbody:last").append(newRow); // Creating the new row(s) and appending it(them) to the cleared table.

        findTrabajador(nameInTab); 

    }
}

function errData(err) {
    console.log("Error: " + err);
}

function findTrabajador (nombre) { // FIND TRABAJADOR>> Is a function to retrieve the index of any given "trabajador" from the "TRABAJADORES" json object in Firebase.
    for (i = 0; i < keysArr.length; i++) {
        k = keysArr[i];
        nameInTab = trabajadores[k].NOMBRE; 
        if ( nombre == nameInTab) {
            return console.log("    " + nombre + " es el TRABAJADOR " + parseInt(i + 1));
        }
    }
}


// ================================= SUBMIT BUTTON CLICK


$("#submit-bid").on("click", function (event) {

    event.preventDefault(); // Cancel the reloading default functionality of the "submit" button.

    name = $("#name").val();
    rango = $("#rango").val();
    raya = $("#raya").val();
   
    trabajadoresRef.push({ // This will add a new "trabajador" on the Firebase "TRABAJADORES" folder (or table) with the values assign to the correspondant named variables.
        NOMBRE: name,
        RANGO: rango,
        RAYA_SEMANAL: raya,
        DateAdded: firebase.database.ServerValue.TIMESTAMP

    })

})


// ================================= ON DATA EXISTING LISTENER


// trabajadoresRef.orderByChild("DateAdded").limitToLast(1).on("child_added", function (snapshot) {
//     var fetchName = snapshot.val().NOMBRE;
//     var fetchRole = snapshot.val().RANGO;
//     var fetchRate = snapshot.val().RAYA_SEMANAL;

//     console.log(fetchName);
//     console.log(fetchRole);
//     console.log(fetchRate);

//     var $newRow = $("<tr>" +
//         "<td>" + fetchName + "</td>" +
//         "<td>" + fetchRole + "</td>" +
//         "<td>" + fetchRate + "</td>" +
//         "</tr>");
//     $("table > tbody:last").append($newRow);

// })