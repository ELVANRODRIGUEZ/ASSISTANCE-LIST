// ================================= FIREBASE LINK

// Initialize Firebase

var config = {
    apiKey: "AIzaSyBnzH3RDhRuGr4VHbllH-FcLbrgj0aepB8",
    authDomain: "assistance-lists.firebaseapp.com",
    databaseURL: "https://assistance-lists.firebaseio.com",
    projectId: "assistance-lists",
    storageBucket: "assistance-lists.appspot.com",
    messagingSenderId: "579020766272"
};

firebase.initializeApp(config);


// ================================= GLOBAL VARIABLES

// Create a variable to reference the database.
var database = firebase.database();

// Variable to distinguish edit mode.

var editMode = false;

// Table variables

var obra; // OBRA>> will store "obra".
var contratista; // CONTRATISTA>> will store "contratista".
var nombre; // NOMBRE>> will store "nombre del trabajador".
var rango; // RANGO>> will store "rango del trabajador".
var sabado; // SEMANA>> will store "semana".
var Lun; // LUNES>> will store "horas en lunes".
var LunEx; // LUNES EXTRA>> will store "horas extra en lunes".
var Mar; // MARTES>> will store "horas en Martes".
var MarEx; // MARTES EXTRA>> will store "horas extra en Martes".
var Mie; // MIERCOLES>> will store "horas en miércoles".
var MieEx; // MIERCOLES EXTRA>> will store "horas extra en miércoles".
var Jue; // JEUVES>> will store "horas en jueves".
var JueEx; // JEUVES EXTRA>> will store "horas extra en jueves".
var Vie; // VIERNES>> will store "horas en viernes".
var VieEx; // VIERNES EXTRA>> will store "horas extra en viernes".
var Sab; // SABADO>> will store "horas en sábado".
var SabEx; // SABADO EXTRA>> will store "horas extra en sábado".
var DomEx; // DOMINGO EXTRA>> will store "horas extra en domingo".
var totalHr = 0; // TOTAL DE HORAS>> will store "total de horas".
var totalHrEx; // TOTAL DE HORAS EXTRA>> will store "total de horas extra".
var raya; // RAYA>> will store "raya semanal del trabajador".
var impBase; // IMPORTE BASE>> will store "importe base".
var impExtra; // IMPORTE EXTRA>> will store "importe extra".
var descuentos; // DESCUENTOS>> will store "descuentos".
var impTotal; // IMPORTE TOTAL>> will store "importe total".
var formaPago; // FORMA PAGO>> will store "forma de pago".
var observaciones; // OBSERVACIONES>> will store "observaciones".

var hrsSemana = 50;


// Database variables

var listaSemanal; // LISTA SEMANAL>> array will store all listaSemanal items submitted in the Firebase database.
var keysArr; // KEYS ARRAY>> will store all of "listaSemanal" ID's values in array form.
var k; // KEY>> will store one given element from the "keysArr" array.
var nombreInTab; // NOMBRE IN TABLE>> will store a certain "NOMBRE" value from the "trabajadores" specific item.
var trabajadorID; // TRABAJADOR ID>> will store a selected id from the table's rows for edition mode.
var listaTrabajadores; // LISTA DE TRABAJADORES// wil store all listaTrabajadores existing on TRABAJADORES folder on Firebase.

var listaSemanalRef = database.ref("LISTA_SEMANAL"); // LISTA SEMANAL REFERENCE>> stores a pointer (reference) to the "LISTA_SEMANAL" folder (or table) in Firebase. We sotore the reference because it is the reference that has the ".on" (listener) method as well as the ".push" method.

var listaTrabajadoresRef = database.ref("TRABAJADORES"); // LISTA DE TRABAJADORES REFERENCE>> stores a pointer (reference) to the "TRABAJADORES" folder (or table) in Firebase. We sotore the reference because it is the reference that has the ".on" (listener) method as well as the ".push" method.


// ================================= ON FIREBASE "LISTA_SEMANAL" FOLDER CHANGE

listaSemanalRef.orderByChild("OBRA").on("value", gotLiSemData, errData); // Event listener for "listaSemanalRef" reference. It will trigger each time data is change on it, making a callback to "gotData" and (or) "errData" functions.

function gotLiSemData(data) {
    listaSemanal = data.val(); // Storing the new (recently changed) "LISTA_SEMANAL" json object in Firebase.
    keysArr = [];

    // =======================

    data.forEach(function (element) {
        keysArr.push(element.key); // Storing as array all the ID from "LISTA_SEMANAL" in Firebase that is going to be passed on one by one.
    })

    // =======================


    $("tbody").empty(); // Clearing the HTML table to retrieve the most recent one.

    for (var i = 0; i < keysArr.length; i++) { // Loop through all the ID's array.
        k = keysArr[i]; // Storing each ID on each loop.

        var idInTab = keysArr[i]; // Storing the "ID" from the table in each loop.
        var obraInTab = listaSemanal[k].OBRA; // Storing "OBRA" from the table in each loop.
        var contratistaInTab = listaSemanal[k].CONTRATISTA; // Storing "CONTRATISTA" from the table in each loop.
        nombreInTab = listaSemanal[k].NOMBRE; // Storing "NOMBRE" from the table in each loop.
        var rangoInTab = listaSemanal[k].RANGO; // Storing "RANGO" from the table in each loop.
        var sabadoInTab = listaSemanal[k].FECHA_SAB; // Storing "FECHA_SAB" from the table in each loop.
        var LunInTab = listaSemanal[k].HRS_LUN; // Storing "HRS_LUN" from the table in each loop.
        var LunExInTab = listaSemanal[k].HRSEXT_LUN; // Storing "HRSEXT_LUN" from the table in each loop.
        var MarInTab = listaSemanal[k].HRS_MAR; // Storing "HRS_MAR" from the table in each loop.
        var MarExInTab = listaSemanal[k].HRSEXT_MAR; // Storing "HRSEXT_MAR" from the table in each loop.
        var MieInTab = listaSemanal[k].HRS_MIE; // Storing "HRS_MIE" from the table in each loop.
        var MieExInTab = listaSemanal[k].HRSEXT_MIE; // Storing "HRSEXT_MIE" from the table in each loop.
        var JueInTab = listaSemanal[k].HRS_JUE; // Storing "HRS_JUE" from the table in each loop.
        var JueExInTab = listaSemanal[k].HRSEXT_JUE; // Storing "HRSEXT_JUE" from the table in each loop.
        var VieInTab = listaSemanal[k].HRS_VIE; // Storing "HRS_VIE" from the table in each loop.
        var VieExInTab = listaSemanal[k].HRSEXT_VIE; // Storing "HRSEXT_VIE" from the table in each loop.
        var SabInTab = listaSemanal[k].HRS_SAB; // Storing "HRS_SAB" from the table in each loop.
        var SabExInTab = listaSemanal[k].HRSEXT_SAB; // Storing "HRSEXT_SAB" from the table in each loop.
        var DomExInTab = listaSemanal[k].HRSEXT_DOM; // Storing "HRSEXT_DOM" from the table in each loop.
        var rayaInTab = listaSemanal[k].RAYA_SEMANAL; // Storing "RAYA_SEMANAL" from the table in each loop.   
        var descuentosInTab = listaSemanal[k].DESCUENTOS; // Storing "DESCUENTOS" from the table in each loop.   
        var formaPagoInTab = listaSemanal[k].FORMA_DE_PAGO; // Storing "FORMA_DE_PAGO" from the table in each loop.
        var observacionesInTab = listaSemanal[k].OBSERVACIONES; // Storing "OBSERVACIONES" from the table in each loop.   



        // ============================ BUILD THE CALCULATED FIELDS

        function testAndSumNumVal(arr) {
            var result = 0;
            for (var n = 0; n < arr.length; n++) {
                if (Number.isNaN(arr[n]) || arr[n] == "") {
                    result = result;
                } else {
                    result += parseFloat(arr[n]);
                }

            }
            return result;
        }

        var horasXDias = [LunInTab, MarInTab, MieInTab, JueInTab, VieInTab, SabInTab];
        var horasExtraXDias = [LunExInTab, MarExInTab, MieExInTab, JueExInTab, VieExInTab, SabExInTab, DomExInTab];
        var horasExtraSinDom = [LunExInTab, MarExInTab, MieExInTab, JueExInTab, VieExInTab, SabExInTab];
        var horasExtraEnDom = [DomExInTab];
        var descuentosArr = [descuentosInTab];

        totalHr = testAndSumNumVal(horasXDias);
        totalHrEx = testAndSumNumVal(horasExtraXDias);
        DomExInTab = testAndSumNumVal(horasExtraEnDom);
        var totalHrExSinDom = testAndSumNumVal(horasExtraSinDom);
        var totalDescuentos = testAndSumNumVal(descuentosArr);

        impBase = totalHr * (parseFloat(rayaInTab) / hrsSemana);

        impExtra =
            1.5 *
            (totalHrExSinDom * (parseFloat(rayaInTab) / hrsSemana)) +
            2.0 *
            (parseFloat(DomExInTab) * (parseFloat(rayaInTab) / hrsSemana));

        impTotal = impBase + impExtra - totalDescuentos;



        // ============================ FORMAT FIELDS

        var currencyFormatrer = new Intl.NumberFormat("es-MX", { // "Intl.NumberFormat" is a class (object constructor) to change the formmat of a numeric value.
            style: "currency",
            currency: "MXN",
            minimumFractionDigits: 2
        });

        var rayaConFormato = currencyFormatrer.format(rayaInTab); // Assigning the formatted "RAYA_SEMANAL" to a value.
        var impBaseConFormato = currencyFormatrer.format(impBase); // Assigning the formatted "DESCUENTO" to a value.
        var impExtraConFormato = currencyFormatrer.format(impExtra); // Assigning the formatted "DESCUENTO" to a value.
        var impTotalConFormato = currencyFormatrer.format(impTotal); // Assigning the formatted "DESCUENTO" to a value.
        var descuentosConFormato = currencyFormatrer.format(totalDescuentos); // Assigning the formatted "DESCUENTO" to a value.

        var verificaSabado = moment(String(sabadoInTab)).format("dddd"); // Extract the day so we can check whether it is Saturday.

        var warning;
        if (verificaSabado !== "Saturday") {
            sabadoInTab = "No escogió sábado";
            warning = "caution"; // Add a class to give a previously set css red background color if the date is not Saturda. We keep the field in simple format to later copy/paste it in Excel.
        } else {
            warning = "ok";
        }



        // ============================ APPEND FIELDS

        var newRow = $("<tr>" +
            "<td class='selector' idRef='" + idInTab + "'>" +
            "<button type='button' " +
            " id=fieldEraser refId='" +
            idInTab + "' class='btn btn-dark'" +
            "data-toggle='modal'" +
            "data-target='#exampleModal'" +
            ">E</button></td>" +
            "<td>" + obraInTab + "</td>" +
            "<td>" + contratistaInTab + "</td>" +
            "<td id='" + "nomInReg-" +
            nombreInTab + "'>" +
            nombreInTab + "</td>" +
            "<td>" + rangoInTab + "</td>" +
            "<td class='" + warning + "'>" +
            sabadoInTab + "</td>" +
            "<td>" + LunInTab + "</td>" +
            "<td>" + LunExInTab + "</td>" +
            "<td>" + MarInTab + "</td>" +
            "<td>" + MarExInTab + "</td>" +
            "<td>" + MieInTab + "</td>" +
            "<td>" + MieExInTab + "</td>" +
            "<td>" + JueInTab + "</td>" +
            "<td>" + JueExInTab + "</td>" +
            "<td>" + VieInTab + "</td>" +
            "<td>" + VieExInTab + "</td>" +
            "<td>" + SabInTab + "</td>" +
            "<td>" + SabExInTab + "</td>" +
            "<td>" + DomExInTab + "</td>" +
            "<td>" + totalHr + "</td>" +
            "<td>" + totalHrEx + "</td>" +
            "<td>" + rayaConFormato + "</td>" +
            "<td>" + impBaseConFormato + "</td>" +
            "<td>" + impExtraConFormato + "</td>" +
            "<td>" + descuentosConFormato + "</td>" +
            "<td>" + impTotalConFormato + "</td>" +
            "<td>" + formaPagoInTab + "</td>" +
            "<td>" + observacionesInTab + "</td>" +
            "</tr>");
        $("table > tbody:last").append(newRow); // Creating the new row(s) and appending it(them) to the cleared table.

        // findTrabajador(nombreInTab);

    }
}


function findTrabajador(nombre) { // FIND TRABAJADOR>> Is a function to retrieve the index of any given "trabajador" from the "TRABAJADORES" json object in Firebase.
    for (i = 0; i < keysArr.length; i++) {
        k = keysArr[i];
        nombreInTab = listaSemanal[k].NOMBRE;
        if (nombre == nombreInTab) {
            return "    " + nombre + " es el TRABAJADOR " + parseInt(i + 1);
        }
    }
}


// ================================= ON FIREBASE "LISTA DE TRABAJADORES" FOLDER CHANGE

listaTrabajadoresRef.orderByChild("NOMBRE").on("child_added", gotLiTraData, errData); // Event listener for "listaSemanalRef" reference each time a new child is added and also when the page loads first. It will make a callback to "gotLiTraData" and (or) "errData" functions for each existing child and will retrieve them all sorted out by "NOMBRE" child value.

function gotLiTraData(data) { // This will dinamcally add new options for "Nombre del trabajador" select input control so the user can choose from new trabajadores. This function will run at loading time for each one of the existing childs in "TRABAJADORES" directory, and each time a new child is added.
    listaTrabajadores = data.val(); // This retrieves, one by one, each one of the childs in "TRABAJADOREA" directory as a json object in Firebase.

    var TraExistente = data.key; // This retrieves the original Id from each one of the existing childs on "TRABAJADORES" directory.
    $("#nombreList").append(
        "<option idRef='" + TraExistente +
        "'>" + listaTrabajadores.NOMBRE + "</option>");

}


// ================================= TABLE FILTERS


$("#obraSelector").on("input", function () {

    var qryObra = $(this).val(); // qryObra>> Qurey Obra will catch the selected item from the Obra header filter.
    var qryRef; // qryRef>> Query Reference.

    if ($(this).val() != "TODAS") {
        qryRef = listaSemanalRef.orderByChild("OBRA").equalTo(qryObra);
    } else {
        qryRef = listaSemanalRef.orderByChild("OBRA");
        // "Seleccionar" default option is selected from the drop down menu.
        $("#obra option:eq(0)").prop("selected", true);
        // Add the down pointing triangle indicating list is order by this filter.
        $("#obraHeader").text("OBRA \u25bc");

    } // According to the selected item in Obra header filter, this conditional will build the reference to filter either all Obras or a specific one.   

    qryRef.on("value", gotLiSemData, errData); // Event listener for "listaSemanalRef" reference. It will trigger each time data is change on it, making a callback to "gotData" and (or) "errData" functions.

    // "Seleccionar" default option is selected from the drop down menu of all filters.
    $("#contratista option:eq(0)").prop("selected", true);
    $("#rango option:eq(0)").prop("selected", true);
    // Removing other filter's down pointing triangle.
    $("#constratistaHeader").text("CONTRATISTA");
    $("#rangoHeader").text("RANGO");
});


$("#constratistaSelector").on("input", function () {

    var qryContratista = $(this).val(); // qryObra>> Qurey Contratistas will catch the selected item from the Contratistas header filter.
    var qryRef; // qryRef>> Query Reference.

    if ($(this).val() != "TODOS") {
        qryRef = listaSemanalRef.orderByChild("CONTRATISTA").equalTo(qryContratista);

    } else {
        qryRef = listaSemanalRef.orderByChild("CONTRATISTA");
        // "Seleccionar" default option is selected from the drop down menu.
        $("#contratista option:eq(0)").prop("selected", true);
        // Add the down pointing triangle indicating list is order by this filter.
        $("#contratistaHeader").text("CONTRATISTA \u25bc");

    } // According to the selected item in Contratista header filter, this conditional will build the reference to filter either all Contratistas or a specific one.   

    qryRef.on("value", gotLiSemData, errData); // Event listener for "listaSemanalRef" reference. It will trigger each time data is change on it, making a callback to "gotData" and (or) "errData" functions.

    // "Seleccionar" default option is selected from the drop down menu of all filters.
    $("#obra option:eq(0)").prop("selected", true);
    $("#rango option:eq(0)").prop("selected", true);
    // Removing other filter's down pointing triangle.
    $("#obraHeader").text("OBRA");
    $("#rangoHeader").text("RANGO");

});

$("#rangoSelector").on("input", function () {

    var qryRango = $(this).val(); // qryObra>> Qurey Contratistas will catch the selected item from the Contratistas header filter.
    var qryRef; // qryRef>> Query Reference.

    if ($(this).val() != "TODOS") {
        qryRef = listaSemanalRef.orderByChild("RANGO").equalTo(qryRango);
    } else {
        qryRef = listaSemanalRef.orderByChild("RANGO");
        // "Seleccionar" default option is selected from the drop down menu.
        $("#rango option:eq(0)").prop("selected", true);
        // Add the down pointing triangle indicating list is order by this filter.
        $("#rangoHeader").text("RANGO \u25bc");

    } // According to the selected item in Rango header filter, this conditional will build the reference to filter either all Contratistas or a specific one.   

    qryRef.on("value", gotLiSemData, errData); // Event listener for "listaSemanalRef" reference. It will trigger each time data is change on it, making a callback to "gotData" and (or) "errData" functions.

    // "Seleccionar" default option is selected from the drop down menu of all filters.
    $("#obra option:eq(0)").prop("selected", true);
    $("#contratista option:eq(0)").prop("selected", true);
    // Removing other filter's down pointing triangle.
    $("#obraHeader").text("OBRA");
    $("#contratistaHeader").text("CONTRATISTA");
});


// ================================= SELECTING LIST IN INPUT FORM

$("#obraList").on("change", function () {
    var obraItem = $("option:selected", this).attr("idRef"); // We are retrieving the Id stored on the option "idRef" attribute.
    if (obraItem == "limpiarSeleccion") { // If "Limpiar Selección" is selected, "Seleccionar" default option is selected from the drop down menu.
        $("#listaObra option:eq(0)").prop("selected", true);

    }

});

$("#nombreList").on("change", function () {
    var trabajadorItem = $("option:selected", this).attr("idRef"); // We are retrieving the Id stored on the option "idRef" attribute.
    if (trabajadorItem == "limpiarSeleccion") { // If "Limpiar Selección" is selected, then "rango" and "raya" get cleared and "Seleccionar" default option is selected from the drop down menu.
        $("#rango").val("");
        $("#raya").val("");
        $("#listaTrabajadores option:eq(0)").prop("selected", true);

    } else {

        listaTrabajadoresRef.once("value", gotTrabajador, errData); // Listening to the "value" event to trigger a function that has the data parsed as a json object as the first parameter by default. We will need it to search for the above obtained ID.

        function gotTrabajador(data) {
            listaTrabajadores = data.val();
            var trabajadorInfo = listaTrabajadores[trabajadorItem]; // "listaTrabajadores" was already defined when "Nombre del trabajador" option input was populated. We are retrieving the Id stored on the option
            $("#rango").val(trabajadorInfo.RANGO);
            $("#raya").val(trabajadorInfo.RAYA_SEMANAL);

        }
    }
});

$("#contratistaList").on("change", function () {
    var contratistaItem = $("option:selected", this).attr("idRef"); // We are retrieving the Id stored on the option "idRef" attribute.
    if (contratistaItem == "limpiarSeleccion") { // If "Limpiar Selección" is selected, "Seleccionar" default option is selected from the drop down menu.
        $("#listaContratistas option:eq(0)").prop("selected", true);

    }

});

$("#rangoList").on("change", function () {
    var rangoItem = $("option:selected", this).attr("idRef"); // We are retrieving the Id stored on the option "idRef" attribute.
    if (rangoItem == "limpiarSeleccion") { // If "Limpiar Selección" is selected, "Seleccionar" default option is selected from the drop down menu.
        $("#listaRango option:eq(0)").prop("selected", true);

    }

});


// ================================= SUBMIT BUTTON CLICK

$("#submit-bid").on("click", function (event) {

    event.preventDefault(); // Cancel the reloading default functionality of the "submit" button.

    obra = $("#obraList").val();
    contratista = $("#contratistaList").val();
    nombre = $("#nombreList").val();
    sabado = $("#sabado").val();
    rango = $("#rangoList").val();
    Lun = $("#Lun").val();
    LunEx = $("#Lun-e").val();
    Mar = $("#Mar").val();
    MarEx = $("#Mar-e").val();
    Mie = $("#Mie").val();
    MieEx = $("#Mie-e").val();
    Jue = $("#Jue").val();
    JueEx = $("#Jue-e").val();
    Vie = $("#Vie").val();
    VieEx = $("#Vie-e").val();
    Sab = $("#Sab").val();
    SabEx = $("#Sab-e").val();
    DomEx = $("#Dom-e").val();
    raya = $("#raya").val();
    descuentos = $("#descuentos").val();
    formaPago = $("#formaPago").val();
    observaciones = $("#observaciones").val();

    if (!editMode) { // This will add (push) a new "lista semanal" on the Firebase "LISTA_SEMANAL" folder (or table) with the values assigned to the correspondant named variables. Or, it will update the info of an existing item if Edition Mode is on.

        listaSemanalRef.push({
            OBRA: obra,
            CONTRATISTA: contratista,
            NOMBRE: nombre,
            RANGO: rango,
            FECHA_SAB: sabado,
            HRS_LUN: Lun,
            HRSEXT_LUN: LunEx,
            HRS_MAR: Mar,
            HRSEXT_MAR: MarEx,
            HRS_MIE: Mie,
            HRSEXT_MIE: MieEx,
            HRS_JUE: Jue,
            HRSEXT_JUE: JueEx,
            HRS_VIE: Vie,
            HRSEXT_VIE: VieEx,
            HRS_SAB: Sab,
            HRSEXT_SAB: SabEx,
            HRSEXT_DOM: DomEx,
            RAYA_SEMANAL: raya,
            DESCUENTOS: descuentos,
            FORMA_DE_PAGO: formaPago,
            OBSERVACIONES: observaciones,
            DateAdded: firebase.database.ServerValue.TIMESTAMP // This will add a timestamp for the pushed item.
        })

    } else {
        editMode = false;
        database.ref("LISTA_SEMANAL/" + trabajadorID).set({
            OBRA: obra,
            CONTRATISTA: contratista,
            NOMBRE: nombre,
            RANGO: rango,
            FECHA_SAB: sabado,
            HRS_LUN: Lun,
            HRSEXT_LUN: LunEx,
            HRS_MAR: Mar,
            HRSEXT_MAR: MarEx,
            HRS_MIE: Mie,
            HRSEXT_MIE: MieEx,
            HRS_JUE: Jue,
            HRSEXT_JUE: JueEx,
            HRS_VIE: Vie,
            HRSEXT_VIE: VieEx,
            HRS_SAB: Sab,
            HRSEXT_SAB: SabEx,
            HRSEXT_DOM: DomEx,
            RAYA_SEMANAL: raya,
            DESCUENTOS: descuentos,
            FORMA_DE_PAGO: formaPago,
            OBSERVACIONES: observaciones,
            DateAdded: firebase.database.ServerValue.TIMESTAMP // This will add a timestamp for the pushed item.
        });

        changeToEditMode("off");

    }

    $("#obraList").val("");
    $("#contratistaList").val("");
    $("#nombreList").val("");
    $("#rangoList").val("");
    $("#sabado").val("");
    $("#Lun").val("");
    $("#Lun-e").val("");
    $("#Mar").val("");
    $("#Mar-e").val("");
    $("#Mie").val("");
    $("#Mie-e").val("");
    $("#Jue").val("");
    $("#Jue-e").val("");
    $("#Vie").val("");
    $("#Vie-e").val("");
    $("#Sab").val("");
    $("#Sab-e").val("");
    $("#Dom-e").val("");
    $("#raya").val("");
    $("#descuentos").val("");
    $("#formaPago").val("");
    $("#observaciones").val("");

    window.scrollTo(0, 0);

});


// ================================= EDIT/ERASE BUTTON CLICK

$(document).on("click", "#fieldEraser", function () {
    trabajadorID = $(this).attr("refID");

});

$("#goErase").on("click", function () {
    database.ref("LISTA_SEMANAL/" + trabajadorID).remove();
});

$("#goEdit").on("click", function () {
    editListaRow(trabajadorID);
});



function editListaRow(id) {

    editMode = true;

    changeToEditMode("on");

    listaSemanalRef.once("value", gotChild, errData);

    function gotChild(data) {

        var trabajadorInfo = listaSemanal[id];
        $("#obraList").val(trabajadorInfo.OBRA);
        $("#contratistaList").val(trabajadorInfo.CONTRATISTA);
        $("#nombreList").val(trabajadorInfo.NOMBRE);
        $("#rangoList").val(trabajadorInfo.RANGO);
        $("#sabado").val(trabajadorInfo.FECHA_SAB);
        $("#Lun").val(trabajadorInfo.HRS_LUN);
        $("#Lun-e").val(trabajadorInfo.HRSEXT_LUN);
        $("#Mar").val(trabajadorInfo.HRS_MAR);
        $("#Mar-e").val(trabajadorInfo.HRSEXT_MAR);
        $("#Mie").val(trabajadorInfo.HRS_MIE);
        $("#Mie-e").val(trabajadorInfo.HRSEXT_MIE);
        $("#Jue").val(trabajadorInfo.HRS_JUE);
        $("#Jue-e").val(trabajadorInfo.HRSEXT_JUE);
        $("#Vie").val(trabajadorInfo.HRS_VIE);
        $("#Vie-e").val(trabajadorInfo.HRSEXT_VIE);
        $("#Sab").val(trabajadorInfo.HRS_SAB);
        $("#Sab-e").val(trabajadorInfo.HRSEXT_SAB);
        $("#Dom-e").val(trabajadorInfo.HRSEXT_DOM);
        $("#raya").val(trabajadorInfo.RAYA_SEMANAL);
        $("#descuentos").val(trabajadorInfo.DESCUENTOS);
        $("#formaPago").val(trabajadorInfo.FORMA_DE_PAGO);
        $("#observaciones").val(trabajadorInfo.OBSERVACIONES);
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
    console.log("ELVAN, ASSISTANCE_LIST ERROR: " + err);
}