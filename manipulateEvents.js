/* CONTENTS
    eventsTxt=""
    loadEvents
    loadEventFile
    writeExistingEvents
    saveToFile
    tempAdd
    addAnother

*/

// load the existing code from events.js into a string
// have a form on index that allows for input of new event
// save the form in correct format into second string and save as blob
var eventsTxt = "";
var loadEvents = function () {

    loadEventFile(localStorage.getItem("gameFolder") + "/scr/events.js");
    var elAff = document.getElementById("evAffect");
    elAff.onblur = function () {
        var ElVal = parseFloat(elAff.value);
        if (elAff.value > 10) {
            elAff.value = "10"
        } else if (ElVal < -10) {

            elAff.value = "-10";
        };
    };
    var elNm = document.getElementById("evName");
    elNm.onblur = function () {
        if (allLetter(elNm) == false) {
            elNm.value = "";
        };
    };
    fetchRoomNames("evRoomOnly", "Not one room only");
};

function loadEventFile(fnm) {

    var client = new XMLHttpRequest();
    client.open('GET', fnm);
    client.onreadystatechange = function () {
        console.log("ready state = " + this.readyState);
        if (this.readyState == '4') {
            eventsTxt = client.responseText;
            localStorage.setItem("oldEvents", eventsTxt);

        }

    }
    client.send();
}


var saveToFile = function () {
    if (document.getElementById("evName") != "") {
        tempAdd();

    }



    // put the localStorage item into a variable save the var as blob
    var newTxt = localStorage.getItem("oldEvents") + "\n" + localStorage.getItem("newEvents");
    var blob = new Blob([newTxt], {
        type: "text/javascript"
    });
    saveAs(blob, "events.js");
    localStorage.removeItem("oldEvents");
    localStorage.removeItem("newEvents");
};
var tempAdd = function () {
    // check form
    var elNm = document.getElementById("evName");
    var elInitText = document.getElementById("evFirstText");
    var elLtr = document.getElementById("evLaterText");
    var elAff = document.getElementById("evAffect");
    if (elAff.value == null) {
        elAff.value = "0";
    };
    var elRoomOnly = document.getElementById("evRoomOnly");
    if (elRoomOnly.value == "xx") {
        elRoomOnly.value = null;
    };
    var elOcc = document.getElementById("evOccur");
    if (elOcc.value == "xx") {
        elOcc.value = "never";
    };

    // get the new events from the form
    var varNm = elNm.value;
    var newEvs; // add events from form to this variable + format it like event
    newEvs = "var " + varNm + " = Object.create(Events);\n";
    newEvs += varNm + '.firstTxt: "' + elInitText.value + '";\n';
    newEvs += varNm + '.laterTxt: "' + elLtr.value + '";\n';
    newEvs += varNm + '.affect: "' + elAff.value + '";\n';
    newEvs += varNm + '.needToBeInRoomID: ' + elRoomOnly.value + ';\n';
    newEvs += varNm + '.occurence: "' + elOcc.value + '";\n';
    newEvs += varNm + '.alreadyDone: "n";\n'


    //console.log(newEvs); // <---- remove me



    var oldNew = "";
    if (localStorage.getItem("newEvents") != undefined && localStorage.getItem("newEvents") != null) {
        oldNew = localStorage.getItem("newEvents");
    };




    var oldAndNew = oldNew + "\n" + newEvs;

    // add new event to new localStorage item "newEvents"
    localStorage.setItem("newEvents", oldAndNew);
    console.log(localStorage.getItem("oldEvents") + "\n" + localStorage.getItem("newEvents"));
    // empty the fields for next event
    elNm.value = "";

};
var addAnother = function () {
    var evName = document.getElementById("evName");
    if (evName.value != "") {
        // first save the current event
        tempAdd();
        // now empty the form elements
        evName.value = "";

    };
    document.getElementById("evFirstText").value = "";
    document.getElementById("evLaterText").value = "";
    document.getElementById("evAffect").value = "0";
    document.getElementById("evRoomOnly").selectedIndex = 0;
    document.getElementById("evOccur").selectedIndex = 0;
};
