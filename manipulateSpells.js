/* CONTENTS
loadSpells
loadAllSpells
runSpells
fetchSpells
whichSpell
formulateTxt
updateSpell

*/
var loadSpells = function () {
    loadAllSpells(localStorage.getItem("gameFolder") + "/scr/spells.js");
    localStorage.setItem("spellsLoaded", "y");
}

function loadAllSpells(fnm) {
    var file = document.createElement('script');
    file.onreadystatechange = function () {
        if (this.readyState == 'complete') runSpells();
    }
    file.onload = runSpells;
    file.type = "text/javascript";
    file.src = fnm;
    document.getElementsByTagName("head")[0].appendChild(file);

}
var runSpells = function () {
    fetchSpells("selSpell", "-- Select spell --", "x");
    localStorage.removeItem("spellNameTEMP");
}; // end runSpells

var fetchSpells = function (el, firstTxt, firstValue) {
    // el = element
    // firstTxt = text of the first item in a select list
    // firstValue = value of the first item (usually 0 or xx)
    if (localStorage.getItem("spellsLoaded") != "y") {
        loadAllSpells(localStorage.getItem("gameFolder") + "/scr/spells.js");
        localStorage.setItem("spellsLoaded", "y");
    };
    if (Spell.length > 0) {
        var spellCnt = Spell.length;
        Spell.sort(function (a, b) {
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
        for (ii = 0; ii < spellCnt; ii++) {


            var option = document.createElement("option");
            option.text = Spell[ii].name.charAt(0).toUpperCase() + Spell[ii].name.slice(1);
            option.value = Spell[ii].name;
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
            for (ii = 0; ii < spellCnt; ii++) {


                var option = document.createElement("option");
                option.text = Spell[ii].name.charAt(0).toUpperCase() + Spell[ii].name.slice(1);;
                option.value = Spell[ii].name;

                x.add(option);
            };
        }; // end for
    }; // end if
}; // end fetchSpells

var whichSpell = function () {
    seeMe("btnSpSub", true);
    seeMe("btnSpNew", false);
    fetchObjsNames(["spObjNeeded", "spCreatesObject", "spDestroyObject"], "No object selected", "xx");
    fetchPeepsNames("spPerson", "Not for only one person", "xx");
    fetchRoomNames(["spRoom", "spTransTo"], "No location specified", "xx");
    fetchObjsNames("spObject", "Not one object only", "xx");
    fetchPeepsNames("spCreatesNPC", "No NPC selected", "xx");
    var spellSel = document.getElementById("selSpell");
    if (spellSel.selectedIndex != 0) {


        for (x = 0; sMax = Spell.length, x < sMax; x++) {
            if (Spell[x].name == spellSel.value) {
                localStorage.setItem("spellNameTEMP", Spell[x].name);
                // load form
                elLd("spName", Spell[x], "name");
                elLd("spObjNeeded", Spell[x], "objNeeded");
                elLd("spType", Spell[x], "type");
                elLd("spPerson", Spell[x], "specificPersonID");
                elLd("spRoom", Spell[x], "specificRoomID");
                elLd("spObject", Spell[x], "specificObjID");
                if (Spell[x].multiUse == "y") {
                    document.getElementById("spMultiUse").checked = true;
                } else {
                    document.getElementById("spMultiUse").checked = false;
                }; // end if
                elLd("spCreatesObject", Spell[x], "createObjID");
                elLd("spCreatesNPC", Spell[x], "createPersonID");
                elLd("spDestroyObject", Spell[x], "destroyObjectID");
                if (Spell[x].killPerson == "y") {
                    document.getElementById("spKills").checked = true;
                } else {
                    document.getElementById("spKills").checked = false;
                }; // end if
                elLd("spPower", Spell[x], "spellPower");
                elLd("spDesc", Spell[x], "examDescription");
                elLd("spUseTxt", Spell[x], "useTxt");
                elLd("spSecondUse", Spell[x], "secondUse");
                if (Spell[x].isCarried == "y") {
                    document.getElementById("spCarried").checked = true;
                } else {
                    document.getElementById("spCarried").checked = false;
                };
                elLd("spTransTo", Spell[x], "transportTo");
                if (Spell[x].type != "transport") {
                    document.getElementById("spTransTo").selectedIndex = 0;
                    document.getElementById("spTransSelf").checked = false;
                    seeMe("divTransTo", false);

                    seeMe("divTransSelf", false);
                } else {
                    seeMe("divTransTo", true);

                    seeMe("divTransSelf", true);
                };
                elLd("spTransSelf", Spell[x], "transportSelf");
                elLd("spFail", Spell[x], "spellFail");


                //NOTE: alreadyUsed needs setting to "n" when saved. spellPower needs checking value is <=10
            };
        };
        var elSpTy = document.getElementById("spType");
        elSpTy.onchange = function () {
            if (elSpTy.value == "transport") {
                seeMe("divTransTo", true);
                seeMe("divTransSelf", true);

            } else {
                document.getElementById("spTransTo").selectedIndex = 0;
                document.getElementById("spTransSelf").checked = false;
                seeMe("divTransTo", false);
                seeMe("divTransSelf", false);

            }; // end if
        };


    } else {
        return false;
    };
}
var updateSpell = function () {
    var thisName = document.getElementById("spName");
    if (thisName.value == "" || thisName.value == null) {
        thisName.focus();
        return false;
    };
    var bolTransSelf, bolMultiUse, bolKillNPC, bolCarried;
    if (document.getElementById("spTransSelf").checked == true) {
        bolTransSelf = "y";
    } else {
        bolTransSelf = "n";
    };
    if (document.getElementById("spMultiUse").checked == true) {
        bolMultiUse = "y";
    } else {
        bolMultiUse = "n";
    };
    if (document.getElementById("spKills").checked == true) {
        bolKillNPC = "y";
    } else {
        bolKillNPC = "n";
    };
    if (document.getElementById("spCarried").checked == true) {
        bolCarried = "y";
    } else {
        bolCarried = "n";
    };
    var pwrEl = document.getElementById("spPower");
    var pwr = 0;
    if (pwrEl.value > 10) {
        pwr = "10";
    } else {
        pwr = pwrEl.value;
    };
    for (x = 0; sMax = Spell.length, x < sMax; x++) {
        if (Spell[x].name == localStorage.getItem("spellNameTEMP")) {
            Spell[x] = {
                name: document.getElementById("spName").value,
                objNeeded: document.getElementById("spObjNeeded").value,
                type: document.getElementById("spType").value,
                transportTo: document.getElementById("spTransTo").value,
                transportSelf: bolTransSelf,
                specificPersonID: document.getElementById("spPerson").value,
                specificRoomID: document.getElementById("spRoom").value,
                specificObjID: document.getElementById("spObject").value,
                multiUse: bolMultiUse,
                createObjID: document.getElementById("spCreatesObject").value,
                createPersonID: document.getElementById("spCreatesNPC").value,
                destroyObjectID: document.getElementById("spDestroyObject").value,
                killPerson: bolKillNPC,
                spellPower: pwr,
                examDescription: document.getElementById("spDesc").value,
                useTxt: document.getElementById("spUseTxt").value,
                secondUse: document.getElementById("spSecondUse").value,
                isCarried: bolCarried,
                spellFail: document.getElementById("spFail").value,
                alreadyUsed: "n"



            };
        }; // end if

    }; // end for
    var spellTxt = formulateTxt();
    console.log(spellTxt);

    var blob = new Blob([spellTxt], {
        type: "text/javascript"
    });
    saveAs(blob, "spells.js");
}; // end updateSpell
var formulateTxt = function () {

    var compString = "";
    compString = "// version 2\nspellDecleration:\n";
    compString += "var Spell = [";
    for (x = 0; sMax = Spell.length, x < sMax; x++) {
        // as the updates or new spell have already been added to the Spell object just cycle through them and write them to the string
        compString += "{\n";
        compString += "name: '" + Spell[x].name + "',\n";
        compString += "objNeeded: '" + Spell[x].objNeeded + "',\n";
        compString += "type: '" + Spell[x].type + "',\n";
        compString += "specificPersonID: '" + Spell[x].specificPersonID + "',\n";
        compString += "specificRoomID: '" + Spell[x].specificRoomID + "',\n";
        compString += "specificObjID: '" + Spell[x].specificObjID + "',\n";
        compString += "multiUse: '" + Spell[x].multiUse + "',\n";
        compString += "alreadyUsed: '" + Spell[x].alreadyUsed + "',\n";
        compString += "createObjID: '" + Spell[x].createObjID + "',\n";
        compString += "createPersonID: '" + Spell[x].createPersonID + "',\n";
        compString += "killPerson: '" + Spell[x].killPerson + "',\n";
        compString += "spellPower: '" + Spell[x].spellPower + "',\n";
        compString += "examDescription: '" + Spell[x].examDescription + "',\n";
        compString += "useTxt: '" + Spell[x].useTxt + "',\n";
        compString += "secondUse: '" + Spell[x].secondUse + "',\n";
        compString += "isCarried: '" + Spell[x].isCarried + "',\n";
        compString += "transportTo: " + Spell[x].transportTo + "',\n";
        compString += "transportSelf: '" + Spell[x].transportSelf + "',\n";
        compString += "spellFail: '" + Spell[x].spellFail + "'\n";



        compString += "}";
        // is comma needed or not
        let sLimit = sMax - 1;
        if (x < sLimit) {
            compString += ",\n";
        } else {
            compString += "\n";
        };
    }; //
    compString += "];"
    return compString;
}; // end formulateTxt
var addSpell = function () {
    // similar to updateSpell but adding to the object after the current last one
}; // end addSpell

var emptySpell = function () {
    // clear all the boxes
}; //end eptySpell
