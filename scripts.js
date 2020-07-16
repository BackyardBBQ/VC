/* CONTENTS
    loadStuff
    window.addEventListener - load
    fillFormField
    clearZones
    btnClick
    showMsg
    closeDiag
    selectFolder
    updateImageDisplay
    validFileType
    returnFileSize
    getLocation
    loadRoomArray
    fetchRoomNames
    whichRoom
    fetchObjs
    fetchObjsNames
    whichObject
    fetchPeepsNames
    whichPeep
    fetchConvStart
    whichTalk
    editWin
*/



//NOTE !! Got a message, display it using showMsg(message). This greys the screen out and shows the message !!
// this file is for site specific scripts
var input;
var preview;

//CHANGES I would like to create a map from the rooms and have this display the connections etc at some point.
function loadStuff() {
    console.log("gamelocation: " + localStorage.getItem('gameFolder'));
    document.getElementById("isLit").onclick = function () {
        onChangeFunc(this.getAttribute("id"), ["rDarkDesc", "canBeDark"], true);
    };

    document.getElementById("menuRooms").onclick = function () {
        btnClick("menuRooms")
    };
    document.getElementById("menuObjects").onclick = function () {
        btnClick("menuObjects")
    };
    document.getElementById("menuPeople").onclick = function () {
        btnClick("menuPeople")
    };
    document.getElementById("menuTalk").onclick = function () {
        btnClick("menuTalk");

    };
    document.getElementById("menuEvents").onclick = function () {
        btnClick("menuEvents");

    };
    document.getElementById("menuSpells").onclick = function () {
        btnClick("menuSpells");

    };
    document.getElementById("menuReqs").onclick = function () {
        btnClick("menuReqs");
    };
    document.getElementById("menuSettings").onclick = function () {
        btnClick("menuSettings")
    };
    document.getElementById("menuLocation").onclick = function () {
        btnClick("menuLocation")
    };

}




window.addEventListener('load', function () {


    window.localStorage.removeItem('OvarsSet');

    seeMe("entryScreen", true);

    // do stuff when the page has loaded
    if (localStorage.getItem('gameFolder') != 'null' && localStorage.getItem('gameFolder') != '') {
        gameLocation = localStorage.getItem('gameFolder');
    }

    document.getElementById("isLit").onchange = function () {
        onChangeFunc(this.getAttribute("id"), ["rDarkDesc", "canBeDark"], true);

    }; // end isLit change
    document.getElementById("canBeDark").onchange = function () {

        onChangeFunc(this.getAttribute("id"), ["rDarkDesc", "canBeDark"], true);
    };

    // OBJECTS
    document.getElementById("ObW").onchange = function () {
        document.getElementById("divObW").innerHTML = "Weight: " + document.getElementById("ObW").value;
    };
    document.getElementById("ObS").onchange = function () {
        document.getElementById("divObS").innerHTML = "Spaces: " + document.getElementById("ObS").value;
    };
    document.getElementById("ObSt").onchange = function () {
        document.getElementById("divObSt").innerHTML = "Strength: " + document.getElementById("ObSt").value;
    };
    document.getElementById("isRevealed").onchange = function () {
        onChangeFunc(this.getAttribute("id"), ["frmBlockTxt"], true);

    }; //end isRevealed changed

    document.getElementById("isImp").onchange = function () {
        onChangeFunc(this.getAttribute("id"), ["divImpMess"], true);

    }; //end isImp changed
    document.getElementById("NeedObToWork").onchange = function () {
        onChangeFunc(this.getAttribute("id"), ["frmObjReq"], true);

    }; //end NeedObToWork changed
    document.getElementById("objCanBeEaten").onchange = function () {
        onChangeFunc(this.getAttribute("id"), ["frmObjEatenObj", "frmObEatMess"], true);

    }; //end objCanBeEaten changed
    document.getElementById("objCanBeBroken").onchange = function () {
        onChangeFunc(this.getAttribute("id"), ["frmObjBrokenObj", "frmObBreakMess"], true);

    }; //end objCanBeBroken changed
    document.getElementById("objHidden").onchange = function () {
        onChangeFunc(this.getAttribute("id"), ["frmObjHidIn", "frmObjHidUnder", "frmObjHidBehind"], true);

    }; //end objHidden changed
    document.getElementById("objCombineable").onchange = function () {
        onChangeFunc(this.getAttribute("id"), ["frmCombCreates", "frmCombDestMe"], true);

    }; //end objCombineable changed
    document.getElementById("ObCanBeSold").onchange = function () {
        onChangeFunc(this.getAttribute("id"), ["frmObValue", "frmObSeller", "frmObSaleMess"], true);

    }; //end ObCanBeSoldchanged
    document.getElementById("ObCanBeTraded").onchange = function () {
        onChangeFunc(this.getAttribute("id"), ["frmObValue", "frmObSeller"], true);

    }; //end ObCanBeTraded changed
    document.getElementById("ObCanBeStolen").onchange = function () {
        onChangeFunc(this.getAttribute("id"), ["frmObStoleMess"], true);

    }; //end frmCanBeStolen changed
    document.getElementById("ObOpen").onchange = function () {
        onChangeFunc(this.getAttribute("id"), ["frmObOpenMess", "frmObOpenRevs", "frmIsLocked"], false);

    }; //end ObOpen changed
    // NPCs
    document.getElementById("pAge").onchange = function () {
        document.getElementById("divPage").innerHTML = "Age: " + document.getElementById("pAge").value;
    };
    document.getElementById("pHeight").onchange = function () {
        document.getElementById("divPheight").innerHTML = "Height: " + document.getElementById("pHeight").value + "cm";
    };
    document.getElementById("pCombat").onchange = function () {
        document.getElementById("divPcombat").innerHTML = "Combat: " + document.getElementById("pCombat").value;
    };
    document.getElementById("pWeariness").onchange = function () {
        document.getElementById("divPweariness").innerHTML = "Weariness: " + document.getElementById("pWeariness").value;
    };
    // onchange events for switches
    document.getElementById("canChase").onchange = function () {
        onChangeFunc(this.getAttribute("id"), ["divChaseMess", "divChaseSuccess", "divChaseFail", "divChaseDraw", "divChaseGoal"], true);

    }; //end canChase
    document.getElementById("canTalk").onchange = function () {
        onChangeFunc(this.getAttribute("id"), ["divPdefaultSay"], true);

    }; //end canTalk
    document.getElementById("isFollowing").onchange = function () {
        onChangeFunc(this.getAttribute("id"), ["divPfollowSay"], true);

    }; //end isFollowing
    document.getElementById("pCanFight").onchange = function () {
        onChangeFunc(this.getAttribute("id"), ["divFightKills", "divFightMess"], true);

    }; //end canFight
    document.getElementById("pCanResuss").onchange = function () {
        onChangeFunc(this.getAttribute("id"), ["divResussMess"], true);

    }; //end canResuss

    document.getElementById("pSubmitObj").onchange = function () {
        if (document.getElementById("pSubmitObj").selectedIndex != 0) {
            var shw = document.getElementById("divSubmitTxt");
            shw.style.visibility = "visible";
            shw.style.display = "block";
        } else {
            var shw = document.getElementById("divSubmitTxt");
            shw.style.visibility = "collapse";
            shw.style.display = "none";
        };
    }

    // conversations




}, false);




function fillFormField(xmlFile, prntNode, comparisonNode, compValue, returnNode) {
    //console.log(getXmlValue("bosses2.xml", "person", "username", "xx", "password"));
    return getXmlValue(xmlFile, prntNode, comparisonNode, compValue, returnNode);

}

function clearZones() {
    // loop thru all the forms enclosed by css class "frmEnclosure" and hide them ready for new selection
    var xx = document.getElementById("largeDisplay").querySelectorAll(".frmEnclosure");
    for (i = 0, max = xx.length; i < max; i++) {
        xx[i].style.visibility = "collapse";
        xx[i].style.display = "none";
    };
    var xxx = document.getElementById("subMenu").querySelectorAll(".frmEnclosure");
    for (i = 0, max = xxx.length; i < max; i++) {
        xxx[i].style.visibility = "collapse";
        xxx[i].style.display = "none";
    };
    // make sure the message box is closed too
    // seeMe("msgBar", false);

}

function btnClick(btnName) {
    clearZones();
    // get button name and display correct form
    try {
        switch (btnName) {
            case "menuRooms":
                console.log("Menu rooms");
                if (gameLocation != null && gameLocation != undefined && gameLocation != '') {
                    document.getElementById("showRoom").style.visibility = "visible";
                    document.getElementById("showRoom").style.display = "block";
                    document.getElementById("roomStart").style.visibility = "visible";
                    document.getElementById("roomStart").style.display = "block";
                    document.getElementById("frmRooms").style.visibility = "collapse";
                    document.getElementById("frmRooms").style.display = "none";
                    fetchRoomNames("selRooms", "-- select --", "xx");

                    document.getElementById("subRooms").style.visibility = "visible";
                    document.getElementById("subRooms").style.display = "block";
                    localStorage.setItem('openZone', 'rooms');
                    input = document.querySelector('input');
                    input = document.getElementById("RmIm");
                    preview = document.getElementById("preview");

                    input.style.opacity = 0;
                    input.addEventListener('change', updateImageDisplay);
                    var frmN = document.getElementById("showRoom");
                    frmN.addEventListener("keyup", function (event) {
                        // Number 13 is the "Enter" key on the keyboard
                        if (event.keyCode === 13) {
                            // Cancel the default action, if needed
                            event.preventDefault();
                            // Trigger the button element with a click
                            document.getElementById("btnSub").click();
                        }
                    });
                } else {
                    document.getElementById('msgBar').innerHTML = "No game location set. Please set this in the PROJECT section!";
                    document.getElementById("msgBar").style.visibility = "visible";
                    document.getElementById("msgBar").style.display = "block";
                }; // end if

                break;
            case "menuObjects":
                console.log("Menu objects");
                if (gameLocation != null && gameLocation != undefined && gameLocation != '') {
                    document.getElementById("showObjects").style.visibility = "visible";
                    document.getElementById("showObjects").style.display = "block";
                    document.getElementById("obStart").style.visibility = "visible";
                    document.getElementById("obStart").style.display = "block";
                    document.getElementById("frmObjects").style.visibility = "collapse";
                    document.getElementById("frmObjects").style.display = "none";
                    fetchObjs();
                    document.getElementById("subObjects").style.visibility = "visible";
                    document.getElementById("subObjects").style.display = "block";
                    localStorage.setItem('openZone', 'objects');
                    /* set the next five lines for image */
                    input = document.querySelector('input');
                    input = document.getElementById("ObIm");
                    preview = document.getElementById("Obpreview");

                    input.style.opacity = 0;
                    input.addEventListener('change', updateImageDisplay);
                    var frmN = document.getElementById("showObjects");
                    frmN.addEventListener("keyup", function (event) {
                        // Number 13 is the "Enter" key on the keyboard
                        if (event.keyCode === 13) {
                            // Cancel the default action, if needed
                            event.preventDefault();
                            // Trigger the button element with a click
                            document.getElementById("btnOSub").click();
                        }
                    });

                } else {
                    document.getElementById('msgBar').innerHTML = "No game location set. Please set this in the PROJECT section!";
                    document.getElementById("msgBar").style.visibility = "visible";
                    document.getElementById("msgBar").style.display = "block";
                }; // end if

                break;

            case "menuPeople":
                console.log("Menu People");
                if (gameLocation != null && gameLocation != undefined && gameLocation != "") {
                    document.getElementById("peepStart").style.visibility = "visible";
                    document.getElementById("peepStart").style.display = "block";
                    document.getElementById("frmPeople").style.visibility = "collapse";
                    document.getElementById("frmPeople").style.display = "none";
                    document.getElementById("showPeople").style.visibility = "visible";
                    document.getElementById("showPeople").style.display = "block";
                    fetchPeepsNames("selPeep", "--Select--", "x");
                    document.getElementById("subPeeps").style.visibility = "visible";
                    document.getElementById("subPeeps").style.display = "block";
                    //etc...



                    var frmN = document.getElementById("showPeople");
                    frmN.addEventListener("keyup", function (event) {
                        // Number 13 is the "Enter" key on the keyboard
                        if (event.keyCode === 13) {
                            // Cancel the default action, if needed
                            event.preventDefault();
                            // Trigger the button element with a click
                            document.getElementById("btnPSub").click();
                        }
                    });
                } else {
                    document.getElementById('msgBar').innerHTML = "No game location set. Please set this in the PROJECT section!";
                    document.getElementById("msgBar").style.visibility = "visible";
                    document.getElementById("msgBar").style.display = "block";
                }; // end if

                break;
            case "menuTalk":
                console.log("Menu Talk");
                if (gameLocation != null && gameLocation != undefined && gameLocation != "") {
                    document.getElementById("conStart").style.visibility = "visible";
                    document.getElementById("conStart").style.display = "block";
                    document.getElementById("frmTalk").style.visibility = "collapse";
                    document.getElementById("frmTalk").style.display = "none";
                    document.getElementById("showTalk").style.visibility = "visible";
                    document.getElementById("showTalk").style.display = "block";
                    fetchConvStart("selTalk", "-- Select --", "x");
                    seeMe("subTalk", true);
                } else {
                    document.getElementById('msgBar').innerHTML = "No game location set. Please set this in the PROJECT section!";
                    document.getElementById("msgBar").style.visibility = "visible";
                    document.getElementById("msgBar").style.display = "block";
                }; // end if

                break;
            case "menuReqs":
                console.log("Menu for WIN");
                if (gameLocation != null && gameLocation != undefined && gameLocation != "") {
                    seeMe("reqsStart", true);
                    seeMe("frmReqs", false);
                    seeMe("showReqs", true);
                    seeMe("subReqs", true);
                } else {
                    document.getElementById('msgBar').innerHTML = "No game location set. Please set this in the PROJECT section!";
                    document.getElementById("msgBar").style.visibility = "visible";
                    document.getElementById("msgBar").style.display = "block";
                }; // end if


                break;
            case "menuEvents":
                console.log("menu events");
                loadEvents();
                if (gameLocation != null && gameLocation != undefined && gameLocation != "") {
                    seeMe("showEvents", true);

                    seeMe("frmEvents", true);

                    seeMe("subEvents", true);

                } else {
                    document.getElementById('msgBar').innerHTML = "No game location set. Please set this in the PROJECT section!";
                    seeMe("msgBar", true);
                }; // end if
                break;
            case "menuSpells":
                console.log("menu spells");
                loadSpells();
                if (gameLocation != null && gameLocation != undefined && gameLocation != "") {
                    seeMe("showSpells", true);

                    seeMe("frmSpells", true);

                    seeMe("subSpells", true);
                    seeMe("btnSpSub", false);
                    seeMe("btnSpNew", false);
                } else {
                    document.getElementById('msgBar').innerHTML = "There was a problem!<br />It may be that no game location is set. Please set this in the PROJECT section and try again.";
                    seeMe("msgBar", true);
                }; // end if
                break;
            case "menuSettings":
                console.log("Menu People");
                if (gameLocation != null && gameLocation != undefined && gameLocation != "") {
                    document.getElementById("settingsStart").style.visibility = "visible";
                    document.getElementById("settingsStart").style.display = "block";
                    document.getElementById("frmSettings").style.visibility = "collapse";
                    document.getElementById("frmSettings").style.display = "none";
                    document.getElementById("showSettings").style.visibility = "visible";
                    document.getElementById("showSettings").style.display = "block";
                    fetchPeepsNames("selPeep");
                    document.getElementById("subSettings").style.visibility = "visible";
                    document.getElementById("subSettings").style.display = "block";
                    //etc...
                    // TODO: display tips for each sub section in independent box under menu


                    var frmN = document.getElementById("showSettings");
                    frmN.addEventListener("keyup", function (event) {
                        // Number 13 is the "Enter" key on the keyboard
                        if (event.keyCode === 13) {
                            // Cancel the default action, if needed
                            event.preventDefault();
                            // Trigger the button element with a click
                            document.getElementById("btnSetSub").click();
                        }
                    });
                } else {
                    document.getElementById('msgBar').innerHTML = "No game location set. Please set this in the PROJECT section!";
                    document.getElementById("msgBar").style.visibility = "visible";
                    document.getElementById("msgBar").style.display = "block";
                }; // end if






                break;
            case "menuLocation":
                console.log("Menu Location");
                if (gameLocation == null || gameLocation == undefined) {
                    document.getElementById("selectedFolderDIV").innerHTML = "No location selected yet";

                } else {
                    document.getElementById("selectedFolderDIV").innerHTML = "Currently selected game folder is " + gameLocation;
                };

                //set the location of users game folder here
                document.getElementById("showLocation").style.visibility = "visible";
                document.getElementById("showLocation").style.display = "block";

                document.getElementById("btnSubLocation").onclick = function () {
                    getLocation();
                    return false;
                };


                break;
        };
    } catch (e) {
        alert(e);
        showMsg("Neccessary files not found in folder: " + gameLocation + ". Please set folder in PROJECT");

    };

}

function showMsg(message) {
    document.getElementById('msgBar').innerHTML = message;
    document.getElementById("msgBar").style.visibility = "visible";
    document.getElementById("msgBar").style.display = "block";
    document.getElementById("msgArea").style.visibility = "visible";
    document.getElementById("msgArea").style.display = "block";
    window.scrollBy(0, 100);

}

function closeDiag() {
    document.getElementById("msgBar").style.visibility = "collapse";
    document.getElementById("msgBar").style.display = "none";
    document.getElementById("msgArea").style.visibility = "collapse";
    document.getElementById("msgArea").style.display = "none";
    window.scrollBy(0, 100);

}

function selectFolder(e) {
    try {
        var theFiles = e.target.files;
        var relativePath = theFiles[0].webkitRelativePath;
        var folder = relativePath.split("/");
        var fl = folder[0];
        gameLocation = fl;
    } catch (er) {
        console.log(er);
    };


}

imageSelectorAndChecker:

    // room image selector
    function updateImageDisplay() {
        while (preview.firstChild) {
            preview.removeChild(preview.firstChild);
        }

        const curFiles = input.files;
        if (curFiles.length === 0) {
            const para = document.createElement('p');
            para.textContent = 'No files currently selected';
            preview.appendChild(para);
        } else {
            const list = document.createElement('ul');
            preview.appendChild(list);

            for (const file of curFiles) {
                const listItem = document.createElement('li');
                const para = document.createElement('p');
                if (validFileType(file)) {
                    para.textContent = `File name ${file.name}, file size ${returnFileSize(file.size)}.`;
                    const image = document.createElement('img');
                    image.src = URL.createObjectURL(file);

                    localStorage.setItem('rmImRef', file.name); // <------- all images picked with picker stored as rmImRef in local storage until next image picked
                    listItem.appendChild(image);
                    listItem.appendChild(para);
                } else {
                    para.textContent = `File name ${file.name}: Not a valid file type. Update your selection.`;
                    listItem.appendChild(para);
                }

                list.appendChild(listItem);
            }
        }

    }
// check file types
const fileTypes = [
  "image/apng",
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/pjpeg",
  "image/png",
  "image/svg+xml",
  "image/tiff",
  "image/webp",
  "image/x-icon"
];

function validFileType(file) {
    return fileTypes.includes(file.type);
}

function returnFileSize(number) {
    if (number < 1024) {
        return number + 'bytes';
    } else if (number >= 1024 && number < 1048576) {
        return (number / 1024).toFixed(1) + 'KB';
    } else if (number >= 1048576) {
        return (number / 1048576).toFixed(1) + 'MB';
    }
}


function getLocation() {
    try {
        document.getElementById("selectedFolderDIV").innerHTML = "Currently selected game folder is " + gameLocation;
        localStorage.setItem('gameFolder', gameLocation);
    } catch (e) {
        console.log("error: " + e);

    };

}

ROOM_FUNCTIONS:
    function loadRoomArray() {

        var roomLoc = gameLocation + "/rooms.xml";
        var cntRms = countNodes(roomLoc, "room");

        var OroomTitle = [];


        OroomTitleDecleration:
            if (cntRms > 0) {
                var i = 1;
                for (i = 1; i <= cntRms; i++) {

                    var Rname
                    try {
                        Rname = getXmlValue(roomLoc, 'room', 'id', i, 'name');
                    } catch (e) {

                        Rname = "Empty room"
                    };


                    OroomTitle[i] = {
                        id: getXmlValue(roomLoc, 'room', 'id', i, 'id'),
                        name: Rname

                    }
                    /* var x = document.getElementById("selRooms");
                     var option = document.createElement("option");
                     option.text = OroomTitle[i].name;
                     option.value = OroomTitle[i].id;
                     x.add(option);*/

                }; //end for
                // sort the OroomTitle object aLphabetically
                OroomTitle.sort(function (a, b) {
                    var nameA = a.name.toUpperCase(); // ignore upper and lowercase
                    var nameB = b.name.toUpperCase(); // ignore upper and lowercase
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }

                    // names must be equal
                    return 0;
                });


            }; //end if
        // load the names with their id's into the option list - the array starts at ) but this is just a sorted array. The room ids stay as they should be
        var xx = document.getElementById("selRooms");
        if (xx.length <= 1) { // this stops it repopulating
            for (ii = 0; ii < cntRms - 1; ii++) {

                var x = document.getElementById("selRooms");
                var option = document.createElement("option");
                option.text = OroomTitle[ii].name.charAt(0).toUpperCase() + OroomTitle[ii].name.slice(1);
                option.value = OroomTitle[ii].id;
                x.add(option);
            };
        }

    }
// NOTE: fetchRoomNames is here to access the room names from other elements
function fetchRoomNames(el, firstTxt, firstValue) {

    var roomLoc = gameLocation + "/rooms.xml";
    var cntRms = countNodes(roomLoc, "room");

    var OroomTitle = [];


    OroomTitleDecleration:
        if (cntRms > 0) {
            var i = 1;

            for (i = 1; i <= cntRms; i++) {

                var Rname
                try {
                    Rname = getXmlValue(roomLoc, 'room', 'id', i, 'name');
                } catch (e) {

                    Rname = "Empty room"
                };


                OroomTitle[i] = {
                    id: getXmlValue(roomLoc, 'room', 'id', i, 'id'),
                    name: Rname

                }


            }; //end for
            // sort the OroomTitle object aLphabetically
            OroomTitle.sort(function (a, b) {
                var nameA = a.name.toUpperCase(); // ignore upper and lowercase
                var nameB = b.name.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }

                // names must be equal
                return 0;
            });


        }; //end if
    // load the names with their id's into the option list
    // var xx = el.split(","); // this makes sure if there is only one element it is put into an array

    var xx;
    if (typeof el != "string") {
        xx = el;
    } else {
        xx = el.split();
    };



    if (xx.length <= 1) {
        var x = document.getElementById(xx[0]);
        /*  var L = x.options.length - 1;
          for (r = L; r >= 0; r--) {
              x.remove[r];
          };*/

        x.innerHTML = "";
        var optionA = document.createElement("option");
        optionA.text = firstTxt;
        optionA.value = firstValue;
        x.add(optionA);
        for (ii = 0; ii < cntRms; ii++) { // first room is id=1. if it was 0 ii <= cntRms -1 would be needed - like it is for objects


            var option = document.createElement("option");
            option.text = OroomTitle[ii].name.charAt(0).toUpperCase() + OroomTitle[ii].name.slice(1);;
            option.value = OroomTitle[ii].id;

            x.add(option);
        };
    } else if (el.length > 1) {


        var elCnt = el.length;
        for (z = 0; z < elCnt; z++) {
            var x = document.getElementById(xx[z]);
            /*  var L = x.options.length - 1;
              for (r = L; r >= 0; r--) {
                  x.remove[r];
              };*/
            x.innerHTML = "";
            var optionA = document.createElement("option");
            optionA.text = firstTxt;
            optionA.value = firstValue;
            x.add(optionA);
            for (ii = 0; ii < cntRms; ii++) {


                var option = document.createElement("option");
                option.text = OroomTitle[ii].name.charAt(0).toUpperCase() + OroomTitle[ii].name.slice(1);;
                option.value = OroomTitle[ii].id;

                x.add(option);
            };
        }; // end for
    }; // end if





}

function whichRoom() {
    seeMe("roomStart", false);
    seeMe("frmRooms", true);

    document.getElementById("btnSub").style.visibility = "visible";
    document.getElementById("btnRnew").style.visibility = "hidden";
    var i = document.getElementById("selRooms").value;
    if (isNaN(i)) {
        return;
    } else {


        var roomLoc = gameLocation + "/rooms.xml";
        // now fill the form with the data for the room id = RMx
        var thisRoomObj = [];
        var Rname, Rdesc, RlitYN, RcanBeDarkYN;
        Rname = getXmlValue(roomLoc, 'room', 'id', i, 'name');
        try {
            Rname = getXmlValue(roomLoc, 'room', 'id', i, 'name');
        } catch (e) {

            Rname = "Empty room"
        };
        try {
            Rdesc = getXmlValue(roomLoc, 'room', 'id', i, 'description');
        } catch (e) {
            Rdesc = "Nothing to see";
        };
        try {
            RlitYN = getXmlValue(roomLoc, 'room', 'id', i, 'isLit');
        } catch (e) {
            RlitYN = 'y';
        };
        try {
            RcanBeDarkYN = getXmlValue(roomLoc, 'room', 'id', i, 'canBeDark');
        } catch (e) {
            RcanBeDarkYN = 'n';
        };
        var RdarkDesc, Rexits, Rn, R_e, Rs;
        try {
            RdarkDesc = getXmlValue(roomLoc, 'room', 'id', i, 'darkDescription');
        } catch (e) {
            RdarkDesc = '0';
        };
        try {
            Rexits = getXmlValue(roomLoc, 'room', 'id', i, 'exits');
        } catch (e) {
            Rexits = 'You can go this way';
        };
        try {
            Rn = getXmlValue(roomLoc, 'room', 'id', i, 'Nto');
        } catch (e) {
            Rn = '0';
        };
        try {
            R_e = getXmlValue(roomLoc, 'room', 'id', i, 'Eto');
        } catch (e) {
            R_e = '0';
        };
        try {
            Rs = getXmlValue(roomLoc, 'room', 'id', i, 'Sto');
        } catch (e) {
            Rs = 'n';
        };
        var Rw, Rup, RDwn, R_in, R_out;
        try {
            Rw = getXmlValue(roomLoc, 'room', 'id', i, 'Wto');
        } catch (e) {
            Rw = '0';
        };
        try {
            Rup = getXmlValue(roomLoc, 'room', 'id', i, 'Upto');
        } catch (e) {
            Rup = '0';
        };
        try {
            RDwn = getXmlValue(roomLoc, 'room', 'id', i, 'Dto');
        } catch (e) {
            RDwn = '0';
        };
        try {
            R_in = getXmlValue(roomLoc, 'room', 'id', i, 'Into');
        } catch (e) {
            R_in = '0';
        };
        try {
            R_out = getXmlValue(roomLoc, 'room', 'id', i, 'Outto');
        } catch (e) {
            R_out = '0';
        };
        var Rimg, Rrev, Rblock, RshortDesc, RbeenBefore;
        try {
            Rimg = getXmlValue(roomLoc, 'room', 'id', i, 'img');
        } catch (e) {
            Rimg = 'x';
        };
        try {
            Rrev = getXmlValue(roomLoc, 'room', 'id', i, 'isRevealed');
        } catch (e) {
            Rrev = 'y';
        };
        try {
            Rblock = getXmlValue(roomLoc, 'room', 'id', i, 'blocking');
        } catch (e) {
            Rblock = 'xx';
        };
        try {
            RshortDesc = getXmlValue(roomLoc, 'room', 'id', i, 'shortDesc');
        } catch (e) {
            RshortDesc = 'still nothing';
        };
        try {
            RbeenBefore = getXmlValue(roomLoc, 'room', 'id', i, 'beenBefore');
        } catch (e) {
            RbeenBefore = 'n';
        };
        var RroomType, Rhelp;
        try {
            RroomType = getXmlValue(roomLoc, 'room', 'id', i, 'roomType');
        } catch (e) {
            RroomType = 'outside';
        };
        try {
            Rhelp = getXmlValue(roomLoc, 'room', 'id', i, 'helpHint');
        } catch (e) {
            Rhelp = 'No help from me';
        };
        thisRoomObj[i] = {
            id: i,
            name: Rname,
            description: Rdesc,
            isLitYN: RlitYN,
            canBeDarkYN: RcanBeDarkYN,
            darkDescription: RdarkDesc,
            exits: Rexits,
            northTo: Rn,
            eastTo: R_e,
            southTo: Rs,
            westTo: Rw,
            upTo: Rup,
            downTo: RDwn,
            inTo: R_in,
            outTo: R_out,
            imgRef: Rimg,
            roomIsRevealed: Rrev,
            blockedTxt: Rblock,
            shortDescription: RshortDesc,
            alreadyVisitedYN: RbeenBefore,
            roomType: RroomType,
            helpTxt: Rhelp
        }
        // now fill the form
        document.getElementById("RmID").value = thisRoomObj[i].id;
        document.getElementById("RmName").value = thisRoomObj[i].name;
        document.getElementById("RmDesc").value = (thisRoomObj[i].description).trim();

        if (thisRoomObj[i].isLitYN == 'y') {

            document.getElementById("isLit").checked = true;
        } else {
            document.getElementById("isLit").checked = false;
        };
        if (thisRoomObj[i].canBeDarkYN == 'y') {
            document.getElementById("canBeDark").checked = true;
        } else {
            document.getElementById("canBeDark").checked = false;
        };
        if (thisRoomObj[i].isLitYN == 'n' || thisRoomObj[i].canBeDarkYN == 'y') {
            seeMe("rDarkDesc", true);

            document.getElementById("darkDesc").value = (thisRoomObj[i].darkDescription).trim();
        } else {
            document.getElementById("darkDesc").value = (thisRoomObj[i].darkDescription).trim();
            seeMe("rDarkDesc", false);

        };
        document.getElementById("exText").value = (thisRoomObj[i].exits).trim();

        fetchRoomNames(["selN", "selE", "selS", "selW", "selUP", "selD", "selIN", "selOUT"], "No exit", "0");

        document.getElementById("selN").value = thisRoomObj[i].northTo;

        document.getElementById("selE").value = thisRoomObj[i].eastTo;

        document.getElementById("selS").value = thisRoomObj[i].southTo;

        document.getElementById("selW").value = thisRoomObj[i].westTo;

        document.getElementById("selUP").value = thisRoomObj[i].upTo;

        document.getElementById("selD").value = thisRoomObj[i].downTo;

        document.getElementById("selIN").value = thisRoomObj[i].inTo;

        document.getElementById("selOUT").value = thisRoomObj[i].outTo;

        // TODO now add the image picker to move it ot the game folder and keep the filename for the xml.


        document.getElementById("RmIm").value = "";
        if (thisRoomObj[i].imgRef != 'x' && thisRoomObj[i].imgRef != null && thisRoomObj[i].imgRef != 'xx') {
            var el = document.getElementById("preview");
            //el.style.backgroundImage = "URL('/imgs/" + thisRoomObj[i].imgRef + "')";
            el.style.backgroundImage = "URL('" + gameLocation + "/imgs/" + thisRoomObj[i].imgRef + "')";
        };

        document.getElementById("RmBlockTxt").value = (thisRoomObj[i].blockedTxt).trim();
        if (thisRoomObj[i].roomIsRevealed == 'y') {

            document.getElementById("isRevealed").checked = true;
            seeMe("frmBlockTxt", false);

        } else {
            document.getElementById("isRevealed").checked = false;
            seeMe("frmBlockTxt", true);

        };

        document.getElementById("shortDesc").value = (thisRoomObj[i].shortDescription).trim();
        if (thisRoomObj[i].alreadyVisitedYN == 'y') {
            document.getElementById("alreadyBeen").checked == true;
        } else {
            document.getElementById("alreadyBeen").checked = false;
        };
        // correctg an error in my xml markup where sometimes its outside and others its outdoors
        let rmt = thisRoomObj[i].roomType;
        if (rmt == 'outside') {
            rmt = 'outdoors';
        };
        try {
            document.getElementById("RmType").value = rmt;

        } catch (e) {
            document.getElementById("RmRype").value = "indoors";

        };
        document.getElementById("helpHint").value = (thisRoomObj[i].helpTxt).trim();
    }; //end if
}


OBJECT_FUNCTIONS:
    function fetchObjs() {
        var fileLoc = gameLocation + "/objects.xml";
        console.log("error: " + gameLocation);
        var cntObjs = countNodes(fileLoc, "object");

        var OobjTitle = [];


        OobjTitleDecleration:
            if (cntObjs > 0) {
                var i = 0;
                for (i = 0; i < cntObjs; i++) { // we have set the loop while less than because the first object is id=0. If it was 1 then it would be less than or equals

                    var name;
                    try {
                        name = getXmlValue(fileLoc, 'object', 'id', i, 'name');
                    } catch (e) {

                        name = "Undeclared object"
                    };


                    OobjTitle[i] = {
                        id: getXmlValue(fileLoc, 'object', 'id', i, 'id'),
                        name: name

                    }


                }; //end for
                // sort the OobjTitle object aLphabetically
                OobjTitle.sort(function (a, b) {
                    var nameA = a.name.toUpperCase(); // ignore upper and lowercase
                    var nameB = b.name.toUpperCase(); // ignore upper and lowercase
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }

                    // names must be equal
                    return 0;
                });


            }; //end if
        // load the names with their id's into the option list



        var xx = document.getElementById("selObjects");
        if (xx.length <= 1) {

            for (ii = 0; ii <= cntObjs - 1; ii++) { //<=cntObjs because first obj is id=0. if it was 1 then ii<cntObjs-1
                console.log("obj ii = " + ii);
                var x = document.getElementById("selObjects");
                var option = document.createElement("option");
                option.text = OobjTitle[ii].name.charAt(0).toUpperCase() + OobjTitle[ii].name.slice(1);
                option.value = OobjTitle[ii].id;
                x.add(option);
            };
        }


    }

function fetchObjsNames(el, firstTxt, firstValue) {
    var fileLoc = gameLocation + "/objects.xml";
    var cntObjs = countNodes(fileLoc, "object");

    var OobjTitle = [];


    OobjTitleDecleration:
        if (cntObjs > 0) {
            var i = 0;
            for (i = 0; i < cntObjs; i++) { // we have set the loop while less than because the first object is id=0. If it was 1 then it would be less than or equals

                var name;
                try {
                    name = getXmlValue(fileLoc, 'object', 'id', i, 'name');
                } catch (e) {

                    name = "Undeclared object"
                };


                OobjTitle[i] = {
                    id: getXmlValue(fileLoc, 'object', 'id', i, 'id'),
                    name: name

                }


            }; //end for
            // sort the OobjTitle object aLphabetically
            OobjTitle.sort(function (a, b) {
                var nameA = a.name.toUpperCase(); // ignore upper and lowercase
                var nameB = b.name.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }

                // names must be equal
                return 0;
            });


        }; //end if
    // load the names with their id's into the option list
    var xx;
    if (typeof el != "string") {
        xx = el;
    } else {
        xx = el.split();
    };


    if (xx.length <= 1) {
        var x = document.getElementById(xx[0]);
        x.innerHTML = "";
        var optionA = document.createElement("option");
        optionA.text = firstTxt;
        optionA.value = firstValue;
        x.add(optionA);
        for (ii = 0; ii <= cntObjs - 1; ii++) { //<=cntObjs because first obj is id=0. if it was 1 then ii<cntObjs-1


            var option = document.createElement("option");
            option.text = OobjTitle[ii].name.charAt(0).toUpperCase() + OobjTitle[ii].name.slice(1);
            option.value = OobjTitle[ii].id;
            x.add(option);


        }
    } else if (xx.length > 1) {


        var elCnt = xx.length;
        for (z = 0; z < elCnt; z++) {
            var x = document.getElementById(xx[z]);
            x.innerHTML = "";
            var optionA = document.createElement("option");
            optionA.text = firstTxt;
            optionA.value = firstValue;
            x.add(optionA);
            for (ii = 0; ii < cntObjs - 1; ii++) {


                var option = document.createElement("option");
                option.text = OobjTitle[ii].name.charAt(0).toUpperCase() + OobjTitle[ii].name.slice(1);;
                option.value = OobjTitle[ii].id;

                x.add(option);
            };
        }; // end for
    }; // end if



}

function whichObject() {
    // NOTE some of the xml variables are automatically set and are not shown on the form
    //eg. haBeenUsed is initially set to 'n' and is not shown on the form
    seeMe("obStart", false);
    seeMe("frmObjects", true);

    document.getElementById("btnOSub").style.visibility = "visible";
    document.getElementById("btnOnew").style.visibility = "hidden";
    var i = document.getElementById("selObjects").value;
    var fileLoc = gameLocation + "/objects.xml";
    // now fill the form with the data for the room id = RMx
    var thisObj = [];
    var id;
    id = getXmlValue(fileLoc, 'object', 'id', i, 'id');
    var name, desc, weight;
    name = getXmlValue(fileLoc, 'object', 'id', i, 'name');
    try {
        name = getXmlValue(fileLoc, 'object', 'id', i, 'name');
    } catch (e) {

        name = "Undeclared object"
    };
    try {
        desc = getXmlValue(fileLoc, 'object', 'id', i, 'description');
    } catch (e) {
        desc = "Nothing to see";
    };
    try {
        weight = getXmlValue(fileLoc, 'object', 'id', i, 'weight');
    } catch (e) {
        weight = "0";
    };
    var spaces, specMess, IsImp;
    try {
        spaces = getXmlValue(fileLoc, 'object', 'id', i, 'spaces');
    } catch (e) {
        spaces = "1";
    };
    try {
        specMess = getXmlValue(fileLoc, 'object', 'id', i, 'specialMess');
    } catch (e) {
        specMess = "xx";
    };
    try {
        IsImp = getXmlValue(fileLoc, 'object', 'id', i, 'isImportant');
    } catch (e) {
        IsImp = "n";
    };
    var impMess, IsOn, needAOTW;
    try {
        impMess = getXmlValue(fileLoc, 'object', 'id', i, 'importantMessage');
    } catch (e) {
        impMess = "xx";
    };
    try {
        IsOn = getXmlValue(fileLoc, 'object', 'id', i, 'isOn');
    } catch (e) {
        IsOn = "xx";
    };
    try {
        needAOTW = getXmlValue(fileLoc, 'object', 'id', i, 'needsAnotherObjectToWork');
    } catch (e) {
        needAOTW = "n";
    };
    var objUW, multiUse, hasBeenU;
    try {
        objUW = getXmlValue(fileLoc, 'object', 'id', i, 'objUsesWith');
    } catch (e) {
        objUW = "9999";
    };
    try {
        multiUse = getXmlValue(fileLoc, 'object', 'id', i, 'multiUse');
    } catch (e) {
        multiUse = "y";
    };
    try {
        hasBeenU = getXmlValue(fileLoc, 'object', 'id', i, 'hasBeenUsed');
    } catch (e) {
        hasBeenU = "n";
    };
    var canBEat, eatenObj, isEat;
    try {
        canBEat = getXmlValue(fileLoc, 'object', 'id', i, 'canBeEaten');
    } catch (e) {
        canBEat = "n";
    };
    try {
        eatenObj = getXmlValue(fileLoc, 'object', 'id', i, 'eatenObject');
    } catch (e) {
        eatenObj = "xx";
    };
    try {
        isEat = getXmlValue(fileLoc, 'object', 'id', i, 'isEaten');
    } catch (e) {
        isEat = "n";
    };
    var eatMess, canBeBroken, breakMess;
    try {
        eatMess = getXmlValue(fileLoc, 'object', 'id', i, 'eatMess');
    } catch (e) {
        eatMess = "xx";
    };
    try {
        canBeBroken = getXmlValue(fileLoc, 'object', 'id', i, 'canBeBroken');
    } catch (e) {
        canBeBroken = "n";
    };
    try {
        breakMess = getXmlValue(fileLoc, 'object', 'id', i, 'breakMess');
    } catch (e) {
        breakMess = "xx";
    };
    var brokenObj, isBroken;
    try {
        brokenObj = getXmlValue(fileLoc, 'object', 'id', i, 'brokenObject');
    } catch (e) {
        brokenObj = "xx";
    };
    try {
        isBroken = getXmlValue(fileLoc, 'object', 'id', i, 'isBroken');
    } catch (e) {
        isBroken = "n";
    };
    var origRoom, isCarried;
    try {
        origRoom = getXmlValue(fileLoc, 'object', 'id', i, 'originalRoom');
    } catch (e) {
        origRoom = "9999";
    };
    try {
        isCarried = getXmlValue(fileLoc, 'object', 'id', i, 'isCarried');
    } catch (e) {
        isCarried = "n";
    };
    var isHdden, hiddenIn, hiddenUnder, hiddenBehind;
    try {
        isHid = getXmlValue(fileLoc, 'object', 'id', i, 'isHidden');
    } catch (e) {
        isHid = "n";
    };
    try {
        hiddenIn = getXmlValue(fileLoc, 'object', 'id', i, 'hiddenIn');
    } catch (e) {
        hiddenIn = "9999";
    };
    try {
        hiddenUnder = getXmlValue(fileLoc, 'object', 'id', i, 'hiddenUnder');
    } catch (e) {
        hiddenUnder = "9999";
    };
    try {
        hiddenBehind = getXmlValue(fileLoc, 'object', 'id', i, 'hiddenBehind');
    } catch (e) {
        hiddenBehind = "9999";
    };
    var revealNeeds, revealAction, revealRoom;
    try {
        revealNeeds = getXmlValue(fileLoc, 'object', 'id', i, 'revealNeeds');
    } catch (e) {
        revealNeeds = "9999";
    };
    try {
        revealAction = getXmlValue(fileLoc, 'object', 'id', i, 'revealAction');
    } catch (e) {
        revealAction = "0";
    };
    try {
        revealRoom = getXmlValue(fileLoc, 'object', 'id', i, 'revealRoom');
    } catch (e) {
        revealRoom = "9999";
    };
    var combineable, combineCreates, combineDestroysMe;
    try {
        combineable = getXmlValue(fileLoc, 'object', 'id', i, 'combineable');
    } catch (e) {
        combineable = "n";
    };
    try {
        combineCreates = getXmlValue(fileLoc, 'object', 'id', i, 'combineCreates');
    } catch (e) {
        combineCreates = "";
    };
    try {
        combineDestroysMe = getXmlValue(fileLoc, 'object', 'id', i, 'combineDestroysMe');
    } catch (e) {
        combineDestroysMe = "y";
    };
    var currentRoom, prefix, canget;
    try {
        currentRoom = getXmlValue(fileLoc, 'object', 'id', i, 'currentRoom');
    } catch (e) {
        currentRoom = "9999";
    };
    try {
        prefix = getXmlValue(fileLoc, 'object', 'id', i, 'prefix');
    } catch (e) {
        prefix = "a";
    };
    try {
        canget = getXmlValue(fileLoc, 'object', 'id', i, 'canGet');
    } catch (e) {
        canget = "y";
    };
    var actionWhenUsed, resultOfUse, mendsW;
    try {
        actionWhenUsed = defaultVals(getXmlValue(fileLoc, 'object', 'id', i, 'actionWhenUsed'), "xx");

    } catch (e) {
        actionWhenUsed = "xx";
    };
    try {
        resultOfUse = getXmlValue(fileLoc, 'object', 'id', i, 'resultOfUse');
    } catch (e) {
        resultOfUse = "xx";
    };
    try {
        mendsW = getXmlValue(fileLoc, 'object', 'id', i, 'mendsW');
    } catch (e) {
        mendsW = "xx";
    };
    var examRevealsObjID, itemForSale, itemValue, sellByD;
    try {
        examRevealsObjID = getXmlValue(fileLoc, 'object', 'id', i, 'examRevealsObjID');
    } catch (e) {
        examRevealsObjID = "xx";
    };
    try {
        itemForSale = getXmlValue(fileLoc, 'object', 'id', i, 'itemForSale');
    } catch (e) {
        itemForSale = "n";
    };
    try {
        itemValue = getXmlValue(fileLoc, 'object', 'id', i, 'itemValue');
    } catch (e) {
        itemValue = "xx";
    };
    try {
        sellByD = getXmlValue(fileLoc, 'object', 'id', i, 'sellByID');
    } catch (e) {
        sellByD = "xx";
    };
    var canBeStolen, isTradeable, saleMess, stealMess;
    try {
        canBeStolen = getXmlValue(fileLoc, 'object', 'id', i, 'canBeStolen');
    } catch (e) {
        canBeStolen = "n";
    };
    try {
        isTradeable = getXmlValue(fileLoc, 'object', 'id', i, 'isTradeable');
    } catch (e) {
        isTradeable = "n";
    };
    try {
        saleMess = getXmlValue(fileLoc, 'object', 'id', i, 'saleMess');
    } catch (e) {
        saleMess = "xx";
    };
    try {
        stealMess = getXmlValue(fileLoc, 'object', 'id', i, 'stealMess');
    } catch (e) {
        stealMess = "xx";
    };
    var isOpen, openMess, openReveals;
    try {
        isOpen = getXmlValue(fileLoc, 'object', 'id', i, 'isOpen');
    } catch (e) {
        isOpen = "n";
    };
    try {
        openMess = getXmlValue(fileLoc, 'object', 'id', i, 'openMess');
    } catch (e) {
        openMess = "xx";
    };
    try {
        openReveals = getXmlValue(fileLoc, 'object', 'id', i, 'openReveals');
    } catch (e) {
        openReveals = "xx";
    };
    var isCash, isLocked, img;
    try {
        isCash = getXmlValue(fileLoc, 'object', 'id', i, 'isCash');
    } catch (e) {
        isCash = "n";
    };
    try {
        isLocked = getXmlValue(fileLoc, 'object', 'id', i, 'isLocked');
    } catch (e) {
        isLocked = "n";
    };
    try {
        img = getXmlValue(fileLoc, 'object', 'id', i, 'img');
    } catch (e) {
        img = "xx";
    };
    var strength, useAffects, statEffect, personNeededForReveal;
    try {
        strength = getXmlValue(fileLoc, 'object', 'id', i, 'strength');
    } catch (e) {
        strength = "0";
    };
    try {
        useAffects = defaultVals(getXmlValue(fileLoc, 'object', 'id', i, 'useAffects'), "xx");

    } catch (e) {
        useAffects = "xx";
    };
    try {
        statEffect = getXmlValue(fileLoc, 'object', 'id', i, 'statEffect');
    } catch (e) {
        statEffect = "0";
    };
    try {
        personNeededForReveal = getXmlValue(fileLoc, 'object', 'id', i, 'personNeededForReveal');
    } catch (e) {
        personNeededForReveal = "xx";
    };
    // here is where you can put the properties into an object

    fetchObjsNames(["ObAfterEaten", "ObAfterBroken", "ObCombCreates", "ObMendsW", "ObExamRevs", "ObOpenRevs", "ObUseAffects"], "No relevant object", "xx");
    fetchObjsNames(["ObReqToWork", "ObHidIn", "ObHidUnder", "ObHidBehind", "ObRevealNeeds"], "No object selected", "9999");

    fetchRoomNames(["ObSelOrigRoom", "ObRevealRoom", "ObCurrRoom"], "No room selected", "9999");
    fetchPeepsNames(["ObSeller", "ObPersonNeeded"], "No person selected", "xx");

    document.getElementById("ObID").value = id;
    document.getElementById("ObName").value = name;
    document.getElementById("ObDesc").value = desc.trim();
    document.getElementById("ObPrefix").value = prefix;
    document.getElementById("ObW").value = weight;
    document.getElementById("divObW").innerHTML = "Weight: " + weight;
    document.getElementById("ObS").value = spaces;
    document.getElementById("divObS").innerHTML = "Spaces: " + spaces;
    document.getElementById("ObSt").value = strength;
    document.getElementById("divObSt").innerHTML = "Strength: " + strength;
    document.getElementById("ObSpMess").value = specMess.trim();
    if (isCash == 'n') {
        document.getElementById("ObIsCash").checked = true;
    } else {
        document.getElementById("ObIsCash").checked = false;
    };
    if (IsImp == 'n') {
        document.getElementById("isImp").checked = false;
        document.getElementById("divImpMess").style.visibility = "collapse";
        document.getElementById("divImpMess").style.display = "none";
    } else {
        document.getElementById("isImp").checked = true;
        document.getElementById("divImpMess").style.visibility = "visible";
        document.getElementById("divImpMess").style.display = "block";
    };
    document.getElementById("ObImpMess").value = impMess.trim();

    if (IsOn == false) {
        document.getElementById("isOn").checked = false;
    } else {
        document.getElementById("isOn").checked = true;
    };

    if (needAOTW == 'n') {
        document.getElementById("NeedObToWork").checked = false;
        seeMe("frmObjReq", false);

    } else {
        document.getElementById("NeedObToWork").checked = true;
        seeMe("frmObjReq", true);

    };
    document.getElementById("ObReqToWork").value = objUW;

    if (multiUse = 'n') {
        document.getElementById("objMultiUse").checked = false;
    } else {
        document.getElementById("objMultiUse").checked = true;
    };
    if (canBEat == 'n') {
        document.getElementById("objCanBeEaten").checked = false;
        seeMe("frmObjEatenObj", false);
        seeMe("frmObEatMess", false);

    } else {
        document.getElementById("objCanBeEaten").checked = true;
        seeMe("frmObjEatenObj", true);
        seeMe("frmObEatMess", true);

    };
    document.getElementById("ObAfterEaten").value = eatenObj;
    document.getElementById("ObEatMess").value = eatMess.trim();
    if (canBeBroken == 'n') {
        document.getElementById("objCanBeBroken").checked = false;
        seeMe("frmObjBrokenObj", false);
        seeMe("frmObBreakMess", false);

    } else {
        document.getElementById("objCanBeBroken").checked = true;
        seeMe("frmObjBrokenObj", true);
        seeMe("frmObBreakMess", true);

    };
    document.getElementById("ObBreakMess").value = breakMess.trim();
    document.getElementById("ObAfterBroken").value = brokenObj;
    document.getElementById("ObSelOrigRoom").value = origRoom;

    if (isCarried == 'n') {
        document.getElementById("objCarried").checked = false;
    } else {
        document.getElementById("objCarried").checked = true;
    };
    document.getElementById("ObHidIn").value = hiddenIn;
    document.getElementById("ObHidUnder").value = hiddenUnder;
    document.getElementById("ObHidBehind").value = hiddenBehind;
    if (isHid == 'n') {
        document.getElementById("objHidden").checked = false;
        seeMe("frmObjHidIn", false);
        seeMe("frmObjHidUnder", false);
        seeMe("frmObjHidBehind", false);

    } else {
        document.getElementById("objHidden").checked = true;
        seeMe("frmObjHidIn", true);
        seeMe("frmObjHidUnder", true);
        seeMe("frmObjHidBehind", true);

    };





    document.getElementById("ObRevealNeeds").value = revealNeeds;
    document.getElementById("ObRevealAction").value = revealAction;
    document.getElementById("ObRevealRoom").value = revealRoom;
    document.getElementById("ObCombCreates").value = combineCreates;
    document.getElementById("ObCombDestMe").value = combineDestroysMe;
    if (combineable == 'n') {
        document.getElementById("objCombineable").checked = false;
        seeMe("frmCombCreates", false);
        seeMe("frmCombDestMe", false);

    } else {
        document.getElementById("objCombineable").checked = true;
        seeMe("frmCombCreates", true);
        seeMe("frmCombDestMe", true);

    };

    document.getElementById("ObCurrRoom").value = currentRoom;
    document.getElementById("ObCanBeGot").value = canget;
    if (canget == 'n') {
        document.getElementById("ObCanBeGot").checked = false;
    } else {
        document.getElementById("ObCanBeGot").checked = true;
    };
    document.getElementById("ObUseAction").value = actionWhenUsed;
    document.getElementById("ObUseTxt").value = resultOfUse.trim();
    document.getElementById("ObMendsW").value = mendsW;
    document.getElementById("ObExamRevs").value = examRevealsObjID;

    if (itemForSale == 'n') {
        document.getElementById("ObCanBeSold").checked = false;
    } else {
        document.getElementById("ObCanBeSold").checked = true;
    };

    if (isTradeable == 'n') {
        document.getElementById("ObCanBeTraded").checked = false;
    } else {
        document.getElementById("ObCanBeTraded").checked = true;
    };
    document.getElementById("ObValue").value = itemValue;
    document.getElementById("ObSeller").value = sellByD;
    document.getElementById("ObSaleMess").value = saleMess.trim();
    document.getElementById("ObCanBeStolen").value = canBeStolen;
    if (canBeStolen == 'n') {
        document.getElementById("ObCanBeStolen").checked = false;
        seeMe("frmObStoleMess", false);

    } else {
        document.getElementById("ObCanBeStolen").checked = true;
        seeMe("frmObStoleMess", true);

    }
    document.getElementById("ObStoleMess").value = stealMess;
    document.getElementById("ObOpen").value = isOpen;
    if (isOpen == 'n') {
        document.getElementById("ObOpen").checked = false;
        seeMe("frmObOpenMess", true);
        seeMe("frmObOpenRevs", true);

    } else {
        document.getElementById("ObOpen").checked = true;
        seeMe("frmObOpenMess", false);
        seeMe("frmObOpenRevs", false);

    }
    document.getElementById("ObOpenMess").value = openMess.trim();
    document.getElementById("ObOpenRevs").value = openReveals;
    if (isLocked == 'n') {
        document.getElementById("ObIsLocked").checked = false;
    } else {
        document.getElementById("ObIsLocked").checked = true;
    }
    if (img != "" && img != null && img != undefined && img != "x" & img != "xx") {

        var el = document.getElementById("Obpreview");

        el.style.backgroundImage = "URL('" + gameLocation + "/imgs/" + img + "')";
    } else {
        document.getElementById("Obpreview").innerHTML = "No Image";
    };

    document.getElementById("ObUseAffects").value = useAffects;
    document.getElementById("ObStatEff").value = statEffect;
    document.getElementById("ObPersonNeeded").value = personNeededForReveal;

}


PEOPLE_SECTION:
    function fetchPeepsNames(el, firstTxt, firstValue) {
        var fileLoc = gameLocation + "/people.xml";
        var cntObjs = countNodes(fileLoc, "person");

        var OitemTitle = [];


        OitemTitleDecleration:
            if (cntObjs > 0) {
                var i = 0;
                for (i = 0; i < cntObjs; i++) { // we have set the loop while less than because the first object is id=0. If it was 1 then it would be less than or equals

                    var name;
                    try {
                        name = getXmlValue(fileLoc, 'person', 'id', i, 'name');
                    } catch (e) {

                        name = "Undeclared object"
                    };


                    OitemTitle[i] = {
                        id: getXmlValue(fileLoc, 'person', 'id', i, 'id'),
                        name: name

                    }


                }; //end for
                // sort the OitemTitle object aLphabetically
                OitemTitle.sort(function (a, b) {
                    var nameA = a.name.toUpperCase(); // ignore upper and lowercase
                    var nameB = b.name.toUpperCase(); // ignore upper and lowercase
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }

                    // names must be equal
                    return 0;
                });


            }; //end if
        // load the names with their id's into the option list
        var xx;
        if (typeof el != "string") {
            xx = el;
        } else {
            xx = el.split();
        };

        if (xx.length <= 1) {
            var x = document.getElementById(xx[0]);
            x.innerHTML = "";
            var optionA = document.createElement("option");
            optionA.text = firstTxt;
            optionA.value = firstValue;
            x.add(optionA);
            for (ii = 0; ii < cntObjs; ii++) {


                var option = document.createElement("option");
                option.text = OitemTitle[ii].name.charAt(0).toUpperCase() + OitemTitle[ii].name.slice(1);
                option.value = OitemTitle[ii].id;
                x.add(option);
            };
        } else if (xx.length > 1) {


            var elCnt = xx.length;
            for (z = 0; z < elCnt; z++) {
                var x = document.getElementById(xx[z]);
                x.innerHTML = "";
                var optionA = document.createElement("option");
                optionA.text = firstTxt;
                optionA.value = firstValue;
                x.add(optionA);
                for (ii = 0; ii < cntObjs; ii++) {


                    var option = document.createElement("option");
                    option.text = OitemTitle[ii].name.charAt(0).toUpperCase() + OitemTitle[ii].name.slice(1);;
                    option.value = OitemTitle[ii].id;

                    x.add(option);
                };
            }; // end for
        }; // end if
    }

function whichPeep() {

    seeMe("peepStart", false);
    seeMe("frmPeople", true);

    document.getElementById("btnPSub").style.visibility = "visible";
    document.getElementById("btnPnew").style.visibility = "hidden";
    var i = document.getElementById("selPeep").value;
    if (isNaN(i)) {
        return;
    } else {
        var fileLoc = gameLocation + "/people.xml";

        document.getElementById("pID").value = getXmlValue(fileLoc, 'person', 'id', i, 'id');
        document.getElementById("pName").value = getXmlValue(fileLoc, 'person', 'id', i, 'name');
        document.getElementById("pCall").value = getXmlValue(fileLoc, 'person', 'id', i, 'call');
        document.getElementById("pSex").value = getXmlValue(fileLoc, 'person', 'id', i, 'sex');
        document.getElementById("pAge").value = getXmlValue(fileLoc, 'person', 'id', i, 'age');
        document.getElementById("pCombat").value = getXmlValue(fileLoc, 'person', 'id', i, 'combat');
        document.getElementById("pHeight").value = getXmlValue(fileLoc, 'person', 'id', i, 'height');
        document.getElementById("pWeariness").value = getXmlValue(fileLoc, 'person', 'id', i, 'weariness');
        document.getElementById("pDesc").value = (getXmlValue(fileLoc, 'person', 'id', i, 'description')).trim();
        document.getElementById("pStatTxt").value = (getXmlValue(fileLoc, 'person', 'id', i, 'stationaryText')).trim();
        if (getXmlValue(fileLoc, 'person', 'id', i, 'canTalk') == "y") {
            document.getElementById("canTalk").checked = true;
            seeMe("divPdefaultSay", true);

        } else {
            document.getElementById("canTalk").checked = false;
            seeMe("divPdefaultSay", false);

        };
        document.getElementById("pDefaultSay").value = (getXmlValue(fileLoc, 'person', 'id', i, 'defaultSay')).trim();
        if (getXmlValue(fileLoc, 'person', 'id', i, 'isFollowing') == "y") {
            document.getElementById("isFollowing").checked = true;
            seeMe("divPfollowSay", true);

        } else {
            document.getElementById("isFollowing").checked = false;
            seeMe("divPfollowSay", false);

        };
        document.getElementById("pFollowingText").value = (getXmlValue(fileLoc, 'person', 'id', i, 'followingText')).trim();
        fetchRoomNames("pCurrentRoom", "Nowhere at start", "0");
        if (getXmlValue(fileLoc, 'person', 'id', i, 'currRoom') != null) {
            document.getElementById("pCurrentRoom").value = getXmlValue(fileLoc, 'person', 'id', i, 'currRoom');
        };
        if (getXmlValue(fileLoc, 'person', 'id', i, 'isHidden') == 'y') {
            document.getElementById("isHidden").checked = true;
        } else {
            document.getElementById("isHidden").checked = false;
        };
        if (getXmlValue(fileLoc, 'person', 'id', i, 'canFight') == 'y') {
            document.getElementById("pCanFight").checked = true;
            seeMe("divFightKills", true);
            seeMe("divFightMess", true);

            if (getXmlValue(fileLoc, 'person', 'id', i, 'fightMessage') != 'xx' && getXmlValue(fileLoc, 'person', 'id', i, 'fightMessage') != null) {
                document.getElementById("pFightMess").value = (getXmlValue(fileLoc, 'person', 'id', i, 'fightMessage')).trim();
            };
        } else {
            document.getElementById("pCanFight").checked = false;
            seeMe("divFightKills", false);
            seeMe("divFightMess", false);

        };
        if (getXmlValue(fileLoc, 'person', 'id', i, 'fightKills') == 'y') {
            document.getElementById("pFightKills").checked = true;
        } else {
            document.getElementById("pFightKills").checked = false;
        };

        if (getXmlValue(fileLoc, 'person', 'id', i, 'canResuss') == 'y') {
            document.getElementById("pCanResuss").checked = true;
            seeMe("divResussMess", true);

        } else {
            document.getElementById("pCanResuss").checked = false;
            seeMe("divResussMess", false);

        };
        if (getXmlValue(fileLoc, 'person', 'id', i, 'resussMess') != 'xx' && getXmlValue(fileLoc, 'person', 'id', i, 'resussMess') != null) {
            document.getElementById("pResussMess").value = (getXmlValue(fileLoc, 'person', 'id', i, 'resussMess')).trim();
        };
        fetchObjsNames(["pKillRevealsObjID", "pSubmitObj"], "No object set", "xx");
        try {
            document.getElementById("pKillRevealsObjID").value = getXmlValue(fileLoc, 'person', 'id', i, 'killRevealsObjID');
        } catch (e) {
            document.getElementById("pKillRevealsObjID").value = "xx";
        };
        if (getXmlValue(fileLoc, 'person', 'id', i, 'isDead') == 'y') {
            document.getElementById("pIsDead").checked = true;
        } else {
            document.getElementById("pIsDead").checked = false;
        };
        var img = getXmlValue(fileLoc, 'person', 'id', i, 'img');
        if (img != "" && img != null && img != undefined && img != "x" & img != "xx") {

            var el = document.getElementById("Pepreview");

            el.style.backgroundImage = "URL('" + gameLocation + "/imgs/" + img + "')";
        } else {
            document.getElementById("Pepreview").innerHTML = "No Image";
        };
        if (getXmlValue(fileLoc, 'person', 'id', i, 'wonders') == 'y') {
            document.getElementById("canWonder").checked = true;
        } else {
            document.getElementById("canWonder").checked = false;
        };
        if (getXmlValue(fileLoc, 'person', 'id', i, 'canChase') == 'y') {
            document.getElementById("canChase").checked = true;
            seeMe("divChaseMess", true);
            seeMe("divChaseSuccess", true);
            seeMe("divChaseFail", true);
            seeMe("divChaseDraw", true);


            if (getXmlValue(fileLoc, 'person', 'id', i, 'chaseMsg') != "" && getXmlValue(fileLoc, 'person', 'id', i, 'chaseMsg') != null && getXmlValue(fileLoc, 'person', 'id', i, 'chaseMsg') != undefined) {

                document.getElementById("pChaseMess").value = getXmlValue(fileLoc, 'person', 'id', i, 'chaseMsg');
            };
            if (getXmlValue(fileLoc, 'person', 'id', i, 'chaseSuccess') != "" && getXmlValue(fileLoc, 'person', 'id', i, 'chaseSuccess') != null && getXmlValue(fileLoc, 'person', 'id', i, 'chaseSuccess') != undefined) {
                document.getElementById("pChaseSuccess").value = getXmlValue(fileLoc, 'person', 'id', i, 'chaseSuccess');
            };

        } else {
            document.getElementById("canChase").checked = false;
            seeMe("divChaseMess", false);
            seeMe("divChaseSuccess", false);
            seeMe("divChaseFail", false);
            seeMe("divChaseDraw", false);

        };

        document.getElementById("pSubmitObj").value = getXmlValue(fileLoc, 'person', 'id', i, 'submitItemID');
        if (getXmlValue(fileLoc, 'person', 'id', i, 'submitText') != "" && getXmlValue(fileLoc, 'person', 'id', i, 'submitText') != null) {
            document.getElementById("pSubmitTxt").value = getXmlValue(fileLoc, 'person', 'id', i, 'submitText') != null;
        } else {
            document.getElementById("pSubmitTxt").value = "Surrender is completed";
        };
        if (document.getElementById("pSubmitObj").selectedIndex != 0) {
            var shw = document.getElementById("divSubmitTxt");
            shw.style.visibility = "visible";
            shw.style.display = "block";
        } else {
            var shw = document.getElementById("divSubmitTxt");
            shw.style.visibility = "collapse";
            shw.style.display = "none";
        };
    }; // end if

} // end whichPeep function

TALK_SECTION:
    function fetchConvStart(el, firstTxt, firstValue) {

        var fileLoc = gameLocation + "/conversations.xml";
        var cntObjs = countNodes(fileLoc, "conversation");

        var OobjTalk = [];


        OobjTalkDecleration:
            if (cntObjs > 0) {
                var i = 0;
                for (i = 0; i < cntObjs; i++) { // we have set the loop while less than because the first object is id=0. If it was 1 then it would be less than or equals

                    var name;
                    //  try {
                    name = getXmlValue(fileLoc, 'conversation', 'id', i, 'line1');
                    //   } catch (e) {

                    //  name = "Undeclared conversation"
                    //  };


                    OobjTalk[i] = {
                        id: getXmlValue(fileLoc, 'conversation', 'id', i, 'id'),
                        name: name.substr(0, 25) + ".."

                    }


                }; //end for

                // sort the OobjTitle object aLphabetically
                OobjTalk.sort(function (a, b) {
                    var nameA = a.name.toUpperCase(); // ignore upper and lowercase
                    var nameB = b.name.toUpperCase(); // ignore upper and lowercase
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }

                    // names must be equal
                    return 0;
                });


            }; //end if
        // load the names with their id's into the option list

        var xx;
        if (typeof el != "string") {
            xx = el;
        } else {
            xx = el.split();
        };

        if (xx.length <= 1) {
            var x = document.getElementById(xx[0]);
            x.innerHTML = "";
            var optionA = document.createElement("option");
            optionA.text = firstTxt;
            optionA.value = firstValue;
            x.add(optionA);
            for (ii = 0; ii <= cntObjs - 1; ii++) { //<=cntObjs because first obj is id=0. if it was 1 then ii<cntObjs-1


                var option = document.createElement("option");
                option.text = OobjTalk[ii].name.charAt(0).toUpperCase() + OobjTalk[ii].name.slice(1);
                option.value = OobjTalk[ii].id;
                x.add(option);


            };
        } else if (xx.length > 1) {


            var elCnt = xx.length;
            for (z = 0; z < elCnt; z++) {
                var x = document.getElementById(xx[z]);
                x.innerHTML = "";
                var optionA = document.createElement("option");
                optionA.text = firstTxt;
                optionA.value = firstValue;
                x.add(optionA);
                for (ii = 0; ii < cntObjs - 1; ii++) {


                    var option = document.createElement("option");
                    option.text = OobjTalk[ii].name.charAt(0).toUpperCase() + OobjTalk[ii].name.slice(1);;
                    option.value = OobjTalk[ii].id;

                    x.add(option);
                };
            }; // end for
        }; // end if


    } // end fetchTalk

function whichTalk() {

    seeMe("conStart", false);
    seeMe("frmTalk", true);
    seeMe("btnTSub", true);
    seeMe("btnTnew", false);
    var i = document.getElementById("selTalk").value;
    if (isNaN(i)) {
        return;
    } else {
        var fileLoc = gameLocation + "/conversations.xml";

        document.getElementById("conID").value = getXmlValue(fileLoc, 'conversation', 'id', i, 'id');
        var thisTalkObj = [];
        thisTalkObj[i] = {
            id: i,
            onePersonOnly: defaultVals(getXmlValue(fileLoc, 'conversation', 'id', i, 'onePersonOnly'), "y"),
            forPerson1: defaultVals(getXmlValue(fileLoc, 'conversation', 'id', i, 'forPerson1'), "x"),
            forPerson2: defaultVals(getXmlValue(fileLoc, 'conversation', 'id', i, 'forPerson2'), "x"),
            forPerson3: defaultVals(getXmlValue(fileLoc, 'conversation', 'id', i, 'forPerson3'), "x"),
            forPerson4: defaultVals(getXmlValue(fileLoc, 'conversation', 'id', i, 'forPerson4'), "x"),
            forPerson5: defaultVals(getXmlValue(fileLoc, 'conversation', 'id', i, 'forPerson5'), "x"),
            numbLines: defaultVals(getXmlValue(fileLoc, 'conversation', 'id', i, 'numbLines'), "1"),
            line1: defaultVals(getXmlValue(fileLoc, 'conversation', 'id', i, 'line1'), "Hello"),
            line2: defaultVals(getXmlValue(fileLoc, 'conversation', 'id', i, 'line2'), "x"),
            line3: defaultVals(getXmlValue(fileLoc, 'conversation', 'id', i, 'line3'), "x"),
            line4: defaultVals(getXmlValue(fileLoc, 'conversation', 'id', i, 'line4'), "x"),
            line5: defaultVals(getXmlValue(fileLoc, 'conversation', 'id', i, 'line5'), "x"),
            line6: defaultVals(getXmlValue(fileLoc, 'conversation', 'id', i, 'line6'), "x"),
            line7: defaultVals(getXmlValue(fileLoc, 'conversation', 'id', i, 'line7'), "x"),
            line8: defaultVals(getXmlValue(fileLoc, 'conversation', 'id', i, 'line8'), "x"),
            line9: defaultVals(getXmlValue(fileLoc, 'conversation', 'id', i, 'line9'), "x"),
            line10: defaultVals(getXmlValue(fileLoc, 'conversation', 'id', i, 'line10'), "x"),
            line1Resp: defaultVals(getXmlValue(fileLoc, 'conversation', 'id', i, 'line1Resp'), "hello"),
            line2Resp: defaultVals(getXmlValue(fileLoc, 'conversation', 'id', i, 'line2Resp'), "x"),
            line3Resp: defaultVals(getXmlValue(fileLoc, 'conversation', 'id', i, 'line3Resp'), "x"),
            line4Resp: defaultVals(getXmlValue(fileLoc, 'conversation', 'id', i, 'line4Resp'), "x"),
            line5Resp: defaultVals(getXmlValue(fileLoc, 'conversation', 'id', i, 'line5Resp'), "x"),
            line6Resp: defaultVals(getXmlValue(fileLoc, 'conversation', 'id', i, 'line6Resp'), "x"),
            line7Resp: defaultVals(getXmlValue(fileLoc, 'conversation', 'id', i, 'line7Resp'), "x"),
            line8Resp: defaultVals(getXmlValue(fileLoc, 'conversation', 'id', i, 'line8Resp'), "x"),
            line9Resp: defaultVals(getXmlValue(fileLoc, 'conversation', 'id', i, 'line9Resp'), "x"),
            line10Resp: defaultVals(getXmlValue(fileLoc, 'conversation', 'id', i, 'line10Resp'), "x"),
            roomOnlyID: defaultVals(getXmlValue(fileLoc, 'conversation', 'id', i, 'roomOnlyID'), "x"),
            revealObjID: defaultVals(getXmlValue(fileLoc, 'conversation', 'id', i, 'revealObjID'), "xx"),
            objRevealLine: defaultVals(getXmlValue(fileLoc, 'conversation', 'id', i, 'objRevealLine'), "xx"),
            help1: defaultVals(getXmlValue(fileLoc, 'conversation', 'id', i, 'help1'), "Try returning the greeting"),
            help2: defaultVals(getXmlValue(fileLoc, 'conversation', 'id', i, 'help2'), "xx"),
            help3: defaultVals(getXmlValue(fileLoc, 'conversation', 'id', i, 'help3'), "xx"),
            help4: defaultVals(getXmlValue(fileLoc, 'conversation', 'id', i, 'help4'), "xx"),
            help5: defaultVals(getXmlValue(fileLoc, 'conversation', 'id', i, 'help5'), "xx"),
            help6: defaultVals(getXmlValue(fileLoc, 'conversation', 'id', i, 'help6'), "xx"),
            help7: defaultVals(getXmlValue(fileLoc, 'conversation', 'id', i, 'help7'), "xx"),
            help8: defaultVals(getXmlValue(fileLoc, 'conversation', 'id', i, 'help8'), "xx"),
            help9: defaultVals(getXmlValue(fileLoc, 'conversation', 'id', i, 'help9'), "xx"),
            help10: defaultVals(getXmlValue(fileLoc, 'conversation', 'id', i, 'help10'), "xx")

        }
        fetchPeepsNames("forPerson1", "No person 1", "x");
        elLd("conID", thisTalkObj[i], "id");
        if (thisTalkObj[i].onePersonOnly === "y") {
            document.getElementById("onePersonOnly").checked = true;
            seeMe("frmP2", false);
            seeMe("frmP3", false);
            seeMe("frmP4", false);
            seeMe("frmP5", false);

        } else {
            document.getElementById("onePersonOnly").checked = false;
            seeMe("frmP2", true);
            seeMe("frmP3", true);
            seeMe("frmP4", true);
            seeMe("frmP5", true);
        };

        elLd("forPerson1", thisTalkObj[i], "forPerson1");
        elLd("forPerson2", thisTalkObj[i], "forPerson2");
        elLd("forPerson3", thisTalkObj[i], "forPerson3");
        elLd("forPerson4", thisTalkObj[i], "forPerson4");
        elLd("forPerson5", thisTalkObj[i], "forPerson5");
        document.getElementById("onePersonOnly").onclick = function () {
            onChangeFunc("onePersonOnly", ["frmP2", "frmP3", "frmP4", "frmP5"], false);
        };
        setSlider("numbLines", thisTalkObj[i].numbLines, "divNumbLines");
        var elNL = document.getElementById("numbLines");
        for (x = 0; x <= 9; x++) {
            var elz = x + 1;
            var els = "divL" + elz;
            var elR = "divR" + elz;
            var elH = "divhelp" + elz;
            var nl = elNL.value;
            if (nl > x) {
                seeMe(els, true);
                seeMe(elH, true);
            } else {
                seeMe(els, false);
                seeMe(elH, false);
            };
            if (x < (nl - 1)) {
                seeMe(elR, true);
            } else {
                seeMe(elR, false);
            };
        };

        elNL.onchange = function () {
            slideChange("numbLines", "divNumbLines", "No. lines");
            // if > 1 then show 2, if > 2 then show three etc with elses
            // line elmenets
            multipleELsShow(elNL, "divL", 0, 10);

            for (x = 1; x <= elNL.value; x++) {
                var nm = "line" + x;
                var hpN = "Help" + x;
                var elL = document.getElementById(nm);
                var elH = document.getElementById(hpN);
                if (elL.value == "x") {
                    elL.value = "";
                };
                if (elH.value == "x") {
                    elH.value = "";
                };

            };
            //help elements
            multipleELsShow(elNL, "divhelp", 0, 10);



            // cant send this to multipleElsShow as the number displayed has to be one less than the value of numbLines

            //response elements
            var nl = elNL.value;
            nl = nl - 1;
            for (x = 0; x < 10; x++) {
                var elz = x + 1;
                var els = "divR" + elz;
                if (nl > x) {
                    seeMe(els, true);
                } else {
                    seeMe(els, false);
                };
            };

            for (x = 1; x < elNL.value; x++) {


                var nmR = document.getElementById(nm);
                if (nmR.value == "x") {
                    nmR.value = "";
                };

            };

            sldr.max = elNL.value;
        }; // end elNL change func *****************************

        // below is for the initial load of the elements
        for (x = 1; x <= elNL.value; x++) {
            var nm = "line" + x;
            elLd(nm, thisTalkObj[i], nm);
            var hNm = "Help" + x;
            var hObPr = "help" + x;
            elLd(hNm, thisTalkObj[i], hObPr);
        };


        for (x = 1; x < elNL.value; x++) {

            var nm = "Resp" + x;
            var obNm = "line" + x + "Resp";
            elLd(nm, thisTalkObj[i], obNm);

        };
        var sldr = document.getElementById("objRevealLine");
        var slVal = defaultVals(thisTalkObj[i].objRevealLine, "0");

        if (isNaN(slVal) == true) {
            slVal = "0";
        };
        setSlider("objRevealLine", slVal, "divObjReveal");

        sldr.max = elNL.value;
        document.getElementById("divInp").innerHTML = elNL.value;

        sldr.onchange = function () {

            slideChange("objRevealLine", "divObjReveal", "Obj reveal");

        };
        fetchRoomNames("roomOnlyID", "Any room", "x");
        elLd("roomOnlyID", thisTalkObj[i], "roomOnlyID");
        fetchObjsNames("revealObjID", "No object", "xx");
        elLd("revealObjID", thisTalkObj[i], "revealObjID");
    }; // end if

}; // end of load conversation function

WIN_SETTINGS:
    var editWin = function () {
        // load the win data and display it
        seeMe("reqsStart", false);
        seeMe("frmReqs", true);
        seeMe("btnWSub", true);

        fetchRoomNames("room", "Any room", "xx");
        fetchObjsNames(["objHeld", "objRevealed", "objBroke", "objEaten"], "No object", "xx");

        fetchPeepsNames(["npcAlive", "npcDead", "npcRevealed"], "No NPC required", "xx");

        fetchConvStart("convID", "No conversation", "xx");
        var conv = document.getElementById("convID");
        conv.onchange = function () {
            // set the max value to the numbLines of convID 
            var i = conv.value;
            var fileLoc = gameLocation + "/conversations.xml";
            var lnMax = getXmlValue(fileLoc, 'conversation', 'id', i, 'numbLines');
            document.getElementById("convLine").max = lnMax;
            document.getElementById("convLineTip").innerHTML = "If a conversation is selected then here is where you select which line number has to be passed<br /><b>Max value = " + lnMax + "</b>";
        }
        var cln = document.getElementById("convLine");
        cln.onchange = function () {
            slideChange("convLine", "divLine", "Conv line no");
        };
        // now load the xml into an object but THEY MUST BE SAVED IN CORRECT ORDER

        var fileLoc = gameLocation + "/win.xml";
        var winObj = [];
        var i = 1;
        winObj[i] = {
            id: i,
            roomID: defaultVals(getXmlValue(fileLoc, 'goal', 'id', i, 'roomID'), "xx"),
            objHeld: defaultVals(getXmlValue(fileLoc, 'goal', 'id', i, 'objHeld'), "xx"),
            objRevealed: defaultVals(getXmlValue(fileLoc, 'goal', 'id', i, 'objRevealed'), "xx"),
            objBroken: defaultVals(getXmlValue(fileLoc, 'goal', 'id', i, 'objBroken'), "xx"),
            objEaten: defaultVals(getXmlValue(fileLoc, 'goal', 'id', i, 'objEaten'), "xx"),
            cashReq: defaultVals(getXmlValue(fileLoc, 'goal', 'id', i, 'cashReq'), "0"),
            personAlive: defaultVals(getXmlValue(fileLoc, 'goal', 'id', i, 'personAlive'), "xx"),
            personDead: defaultVals(getXmlValue(fileLoc, 'goal', 'id', i, 'personDead'), "xx"),
            personRevealed: defaultVals(getXmlValue(fileLoc, 'goal', 'id', i, 'personRevealed'), "xx"),
            conversationIDneeded: defaultVals(getXmlValue(fileLoc, 'goal', 'id', i, 'conversationIDneeded'), "xx"),
            convLineReached: defaultVals(getXmlValue(fileLoc, 'goal', 'id', i, 'convLineReached'), "xx")
        }; // end winObj
        elLd("room", winObj[i], "roomID");
        elLd("objHeld", winObj[i], "objHeld");
        elLd("objRevealed", winObj[i], "objRevealed");
        elLd("objBroke", winObj[i], "objBroken");
        elLd("objEaten", winObj[i], "objEaten");
        if (isNaN(winObj[i].cashReq)) {
            document.getElementById("cashAmnt").value = "0";
        } else {
            elLd("cashAmnt", winObj[i], "cashReq");
        };
        elLd("npcAlive", winObj[i], "personAlive");
        elLd("npcDead", winObj[i], "personDead");
        elLd("npcRevealed", winObj[i], "personRevealed");
        elLd("convID", winObj[i], "conversationIDneeded");
        if (isNaN(winObj[i].conversationIDneeded)) {

            var lnMax = "0";
            document.getElementById("convLine").max = lnMax;
            document.getElementById("convLineTip").innerHTML = "If a conversation is selected then here is where you select which line number has to be passed<br /><b>Max value = " + lnMax + "</b>";
        } else {
            var fileLoc = gameLocation + "/conversations.xml";
            var lnMax = getXmlValue(fileLoc, 'conversation', 'id', i, 'numbLines');
            document.getElementById("convLine").max = lnMax;
            document.getElementById("convLineTip").innerHTML = "If a conversation is selected then here is where you select which line number has to be passed<br /><b>Max value = " + lnMax + "</b>";
        };
        if (isNaN(winObj[i].convLineReached)) {
            document.getElementById("convLine").value = "0";
        } else {
            elLd("convLine", winObj[i], "convLineReached");


        };

    }; // end of load win function
