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

// Variable to distinguish edit mode.

var editMode = false;

// Table variables

var name; // NAME>> will store "nombre del trabajador".
var rango; // RANGO>> will store "rango del trabajador".
var raya; // RAYA>> will store "raya semanal del trabajador".
var trabajadores; // TRABAJADORES>> array will store all trabajadores submitted in the Firebase database.
var keysArr; // KEYS ARRAY>> will store all of "trabajadores" ID's values in array form.
var k; // KEY>> will store one given element from the "keysArr" array.
var nameInTab; // NAME IN TABLE>> will store a certain "NOMBRE" value from the "trabajadores" specific item.

// Database variables

var trabajadorID; // TRABAJADOR ID>> will store a selected id from the table's rows for edition mode.

var trabajadoresRef = database.ref("TRABAJADORES"); // TRABAJADORES REFERENCE>> stores a pointer (reference) to the "TRABAJADORES" folder (or table) in Firebase. We sotore the reference because it is the reference that has the ".on" (listener) method.

trabajadoresRef.orderByChild("NOMBRE").on("value", gotData, errData); // Event listener for "trabajadoresRef" reference. It will trigger each time data is change on it, making a callback to "gotData" and (or) "errData" functions.


// ================================= ON FIREBASE "TRABAJADORES" FOLDER CHANGE

function gotData(data) {
    trabajadores = data.val(); // Storing the new (recently changed) "TRABAJADORES" json object in Firebase.
    keysArr = []; // Storing as array all the ID from "TRABAJADORES" json object in Firebase.


    // =======================

    data.forEach(function (element) {
        keysArr.push(element.key); // Storing as array all the ID from "LISTA_SEMANAL" in Firebase that is going to be passed on one by one.
    })

    // =======================


    $("tbody").empty(); // Clearing the HTML table to retrieve the most recent one.

    for (var i = 0; i < keysArr.length; i++) { // Loop through all the ID's array.
        k = keysArr[i]; // Storing each ID on each loop.

        var idInTab = keysArr[i]; // Storing the "ID" from the table in each loop.
        nameInTab = trabajadores[k].NOMBRE; // Storing "NOMBRE" from the table in each loop.
        var rangoInTab = trabajadores[k].RANGO; // Storing "RANGO" from the table in each loop.
        var rayaInTab = trabajadores[k].RAYA_SEMANAL; // Storing "RAYA_SEMANAL" from the table in each loop.   
        var observaciones = trabajadores[k].OBSERVACIONES; // Storing "OBSERVACIONES" from the table in each loop.   

        var currencyFormatrer = new Intl.NumberFormat("es-MX", { // "Intl.NumberFormat" is a class (object constructor) to change the formmat of a numeric value.
            style: "currency",
            currency: "MXN",
            minimumFractionDigits: 2
        });

        var rayaConFormato = currencyFormatrer.format(rayaInTab); // Assigning the formatted "RAYA_SEMANAL" to a value.

        var newRow = $("<tr>" +
            "<td class='selector' idRef='" +
            idInTab + "'>" +
            "<button type='button' " +
            " id=fieldEraser refId='" +
            idInTab + "' class='btn btn-dark'" +
            "data-toggle='modal'" +
            "data-target='#exampleModal'" +
            ">E</button></td>" +
            "<td>" + nameInTab + "</td>" +
            "<td>" + rangoInTab + "</td>" +
            "<td>" + rayaConFormato + "</td>" +
            "<td>" + observaciones + "</td>" +
            "</tr>");
        $("table > tbody:last").append(newRow); // Creating the new row(s) and appending it(them) to the cleared table.

        // findTrabajador(nameInTab);

    }
}


function findTrabajador(nombre) { // FIND TRABAJADOR>> Is a function to retrieve the index of any given "trabajador" from the "TRABAJADORES" json object in Firebase.
    for (i = 0; i < keysArr.length; i++) {
        k = keysArr[i];
        nameInTab = trabajadores[k].NOMBRE;
        if (nombre == nameInTab) {
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
    observaciones = $("#observaciones").val();

    if (!editMode) {
        trabajadoresRef.push({ // This will add a new "trabajador" on the Firebase "TRABAJADORES" folder (or table) with the values assign to the correspondant named variables. Or, it will store push the info to an existing item if Edition Mode is on.
            NOMBRE: name,
            RANGO: rango,
            RAYA_SEMANAL: raya,
            OBSERVACIONES: observaciones,
            DateAdded: firebase.database.ServerValue.TIMESTAMP

        });

    } else {

        editMode = false;
        database.ref("TRABAJADORES/" + trabajadorID).set({
            NOMBRE: name,
            RANGO: rango,
            RAYA_SEMANAL: raya,
            OBSERVACIONES: observaciones,
            DateAdded: firebase.database.ServerValue.TIMESTAMP
        });
    }
    name = $("#name").val("");
    rango = $("#rango").val("");
    raya = $("#raya").val("");
    observaciones = $("#observaciones").val("");

})


// ================================= EDIT/ERASE BUTTON CLICK

$(document).on("click", "#fieldEraser", function () {
    trabajadorID = $(this).attr("refID");

});

$("#goErase").on("click", function () {
    database.ref("TRABAJADORES/" + idToErase).remove();
});

$("#goEdit").on("click", function () {
    editListaRow(trabajadorID);
});

function editListaRow(id) {

    editMode = true;

    changeToEditMode("on");

    trabajadoresRef.once("value", gotChild, errData);

    function gotChild(data) {

        var trabajadorInfo = trabajadores[trabajadorID];
        $("#name").val(trabajadorInfo.NOMBRE);
        $("#rango").val(trabajadorInfo.RANGO);
        $("#raya").val(trabajadorInfo.RAYA_SEMANAL);

    }

}

function changeToEditMode(state) { // It switches between addition and edition mode by visually changing the screen and let the user know which state he/she is in.

    if (state === "on") {
        $("body").css("background-color", "#343a40");
        $(".jumbotron > #mainHeader").text("MODO DE EDICIÓN DE LISTA DE ASISTENCIA");
        $("#generalNavbar").css("display", "none");
        $("#tableRow").css("display", "none");
        $("#submit-bid").text("Modificar");
    } else if (state === "off") {
        $("body").css("background-color", "#fff");
        $(".jumbotron > #mainHeader").text("REGISTRO DE LISTA DE ASISTENCIA");
        $("#generalNavbar").css("display", "block");
        $("#tableRow").css("display", "flex");
        $("#submit-bid").text("Agregar");
    }
}


// ================================= ERROR DATA CATCHER FUNCTION

function errData(err) {
    console.log("Error: " + err);
}


// "QWEASDFWERWERQWER" : {
//     "DateAdded" : 1556117631983,
//     "NOMBRE" : "AURELIO PLAYAS",
//     "RANGO" : "SEGUNDERO",
//     "RAYA_SEMANAL" : "2500"
//   },
//   "asdfafasfwefwvcvv" : {
//     "DateAdded" : 1556128993186,
//     "NOMBRE" : "MARTIN GARCIA",
//     "RANGO" : "CARPINTERO",
//     "RAYA_SEMANAL" : "3500"
//   }