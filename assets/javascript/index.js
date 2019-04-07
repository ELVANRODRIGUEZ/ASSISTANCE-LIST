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

// Table variables

var obra;   // OBRA>> will store "obra".
var contratista;   // CONTRATISTA>> will store "contratista".
var name;   // NAME>> will store "nombre del trabajador".
var rango;  // RANGO>> will store "rango del trabajador".
var semana;   // SEMANA>> will store "semana".
var hrLun;   // HORAS LUNES>> will store "horas en lunes".
var hrExLun;   // HORAS EXTRA LUNES>> will store "horas extra en lunes".
var hrMar;   // HORAS MARTES>> will store "horas en Martes".
var hrExMar;   // HORAS EXTRA MARTES>> will store "horas extra en Martes".
var hrMie;   // HORAS MIERCOLES>> will store "horas en miércoles".
var hrExMie;   // HORAS EXTRA MIERCOLES>> will store "horas extra en miércoles".
var hrJue;   // HORAS JEUVES>> will store "horas en jueves".
var hrExJue;   // HORAS EXTRA JEUVES>> will store "horas extra en jueves".
var hrVie;   // HORAS VIERNES>> will store "horas en viernes".
var hrExVie;   // HORAS EXTRA VIERNES>> will store "horas extra en viernes".
var hrSab;   // HORAS SABADO>> will store "horas en sábado".
var hrExSab;   // HORAS EXTRA SABADO>> will store "horas extra en sábado".
var hrExDom;   // HORAS EXTRA DOMINGO>> will store "horas extra en domingo".
var totalHr;   // TOTAL DE HORAS>> will store "total de horas".
var totalHrEx;   // TOTAL DE HORAS EXTRA>> will store "total de horas extra".
var raya;   // RAYA>> will store "raya semanal del trabajador".
var impBase;   // IMPORTE BASE>> will store "importe base".
var impExtra;   // IMPORTE EXTRA>> will store "importe extra".
var descuentos;   // DESCUENTOS>> will store "descuentos".
var impTotal;   // IMPORTE TOTAL>> will store "importe total".
var formaPago;   // FORMA PAGO>> will store "forma de pago".
var observaciones;   // OBSERVACIONES>> will store "observaciones".


// Database variables

var listaSemanal;   // LISTA SEMANAL>> array will store all listaSemanal submitted in the Firebase database.
var keysArr;    // KEYS ARRAY>> will store all of "listaSemanal" ID's values in array form.
var k;  // KEY>> will store one given element from the "keysArr" array.
var nameInTab;  // NAME IN TABLE>> will store a certain "NOMBRE" value from the "trabajadores" specific item.

var listaSemanalRef = database.ref("LISTA_SEMANAL"); // LISTA SEMANAL>> stores a pointer (reference) to the "LISTA_SEMANAL" folder (or table) in Firebase. We sotore the reference because it is the reference that has the ".on" (listener) method.

listaSemanalRef.on("value", gotData, errData); // Event listener for "listaSemanalRef" reference. It will trigger each time data is change on it, making a callback to "gotData" and (or) "errData" functions.



// ================================= ON FIREBASE "LISTA_SEMANAL" FOLDER CHANGE


function gotData(data) {
    listaSemanal = data.val();  // Storing the new (recently changed) "LISTA_SEMANAL" json object in Firebase.
    keysArr = Object.keys(listaSemanal); // Storing as array all the ID from "LISTA_SEMANAL" json object in Firebase.

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