function moveTo(currentRoom, direction) {
    var currRoom = parseFloat(currentRoom);
    var bolExitOk = false;
    var moveTo = 0;
    var niceDir;

    var strBlock = undefined;
    var nextR = undefined;

    // find if you can move that way from that room
    switch (direction) {
        case "n":

            niceDir = 'North';
            if (Oroom[currRoom].northTo != '0') {

                nextR = parseFloat(Oroom[currRoom].northTo);

                if (Oroom[nextR].roomIsRevealed != 'y') {

                    bolExitOk = false;
                    moveTo = 0;
                    if (Oroom[nextR].blockedTxt != 'xx') {

                        strBlock = Oroom[nextR].blockedTxt;

                    } else {
                        strBlock = "Something";
                    };

                } else {
                    bolExitOk = true;
                    moveTo = Oroom[currRoom].northTo;
                };
            };

            break;
        case "e":
            niceDir = 'East';
            if (Oroom[currRoom].eastTo != '0') {
                nextR = parseFloat(Oroom[currRoom].eastTo);

                if (Oroom[nextR].roomIsRevealed != 'y') {

                    bolExitOk = false;
                    moveTo = 0;
                    if (Oroom[nextR].blockedTxt != 'xx') {

                        strBlock = Oroom[nextR].blockedTxt;

                    } else {
                        strBlock = "Something";
                    };

                } else {
                    bolExitOk = true;
                    moveTo = Oroom[currRoom].eastTo;
                };
            };
            break;
        case "s":
            niceDir = 'South';
            if (Oroom[currRoom].southTo != '0') {
                nextR = parseFloat(Oroom[currRoom].southTo);

                if (Oroom[nextR].roomIsRevealed != 'y') {

                    bolExitOk = false;
                    moveTo = 0;
                    if (Oroom[nextR].blockedTxt != 'xx') {

                        strBlock = Oroom[nextR].blockedTxt;

                    } else {
                        strBlock = "Something";
                    };

                } else {
                    bolExitOk = true;
                    moveTo = Oroom[currRoom].southTo;
                };
            };
            break;
        case "w":
            niceDir = 'West';
            if (Oroom[currRoom].westTo != '0') {
                nextR = parseFloat(Oroom[currRoom].westTo);

                if (Oroom[nextR].roomIsRevealed != 'y') {

                    bolExitOk = false;
                    moveTo = 0;
                    if (Oroom[nextR].blockedTxt != 'xx') {

                        strBlock = Oroom[nextR].blockedTxt;

                    } else {
                        strBlock = "Something";
                    };

                } else {
                    bolExitOk = true;
                    moveTo = Oroom[currRoom].westTo;
                };
            };
            break;
        case "up":
            niceDir = 'Up';
            if (Oroom[currRoom].upTo != '0') {
                nextR = parseFloat(Oroom[currRoom].upTo);

                if (Oroom[nextR].roomIsRevealed != 'y') {

                    bolExitOk = false;
                    moveTo = 0;
                    if (Oroom[nextR].blockedTxt != 'xx') {

                        strBlock = Oroom[nextR].blockedTxt;

                    } else {
                        strBlock = "Something";
                    };

                } else {
                    bolExitOk = true;
                    moveTo = Oroom[currRoom].upTo;
                };
            };
            break;
        case "down":
            niceDir = 'Down';
            if (Oroom[currRoom].downTo != '0') {
                nextR = parseFloat(Oroom[currRoom].downTo);

                if (Oroom[nextR].roomIsRevealed != 'y') {

                    bolExitOk = false;
                    moveTo = 0;
                    if (Oroom[nextR].blockedTxt != 'xx') {

                        strBlock = Oroom[nextR].blockedTxt;

                    } else {
                        strBlock = "Something";
                    };

                } else {
                    bolExitOk = true;
                    moveTo = Oroom[currRoom].downTo;
                };
            };
            break;
        case "in":
            niceDir = 'In';
            if (Oroom[currRoom].inTo != '0') {
                nextR = parseFloat(Oroom[currRoom].inTo);

                if (Oroom[nextR].roomIsRevealed != 'y') {

                    bolExitOk = false;
                    moveTo = 0;
                    if (Oroom[nextR].blockedTxt != 'xx') {

                        strBlock = Oroom[nextR].blockedTxt;

                    } else {
                        strBlock = "Something";
                    };

                } else {
                    bolExitOk = true;
                    moveTo = Oroom[currRoom].inTo;
                };
            };
            break;
        case "out":
            niceDir = 'Out';
            if (Oroom[currRoom].outTo != '0') {
                nextR = parseFloat(Oroom[currRoom].outTo);

                if (Oroom[nextR].roomIsRevealed != 'y') {

                    bolExitOk = false;
                    moveTo = 0;
                    if (Oroom[nextR].blockedTxt != 'xx') {

                        strBlock = Oroom[nextR].blockedTxt;

                    } else {
                        strBlock = "Something";
                    };

                } else {
                    bolExitOk = true;
                    moveTo = Oroom[currRoom].outTo;
                };
            };
            break;
            // etc etc
    };

    if (bolExitOk == false && strBlock != undefined) {

        niceDir += ". " + strBlock + " is blocking the entrance";
        showTxt("<br />" + niceDir, 'txtDisplay');

        var objDiv = document.getElementById("txtDisplay");
        objDiv.scrollTop = objDiv.scrollHeight;

    }
    // find which room number you are going to

    // check all requirements are fullfilled such as
    // door is unlocked or an object is carried

    // then use function getThisRoom(newRoomID)
    else if (bolExitOk == true) {
        // check if anyone follows player and move them if they do
        getThisRoom(moveTo, moveTxt + niceDir, currRoom);

    } else {

        showTxt(cantGo + niceDir, 'txtDisplay');
    };

}

function localStore(key, obj) {
    // string name, string value
    return window.localStorage.setItem(key, JSON.stringify(obj));

}

function localGet(key) {
    return JSON.parse(window.localStorage.getItem(key));
}

function systComm(cmnd) {
    var returnValue = '';
    //do the command

    switch (cmnd) {

        case "save":
            //do save
            localStorage.clear();
            // objects
            var str = JSON.stringify(Oobject);
            localStore("objects", str);
            // inventory
            var inv = JSON.stringify(invent);
            localStore("inv", inv);
            // rooms
            var rms = JSON.stringify(Oroom);
            localStore("rooms", rms);

            //people
            var pps = JSON.stringify(Opeeps);
            localStore("peeps", pps);
            //conversations
            var cnvs = JSON.stringify(Oconv);
            localStore("convs", cnvs);
            //requirements
            var requ = JSON.stringify(arrReqs);
            localStore("reqs", requ);
            // other variables such as currentroom, cash and when done colours schemes
            var cr = JSON.stringify(varRID);
            localStore("currR", cr);
            if (cash == undefined) {
                cash = 100;
            };
            var csh = JSON.stringify(cash);
            localStore("money", csh);
            var gro = JSON.stringify(graphON);
            localStore("graphs", gro);

            for (x = 0; x < Spell.length; x++) {
                var spUsed = JSON.stringify(Spell[x].alreadyUsed);
                var spCarr = JSON.stringify(Spell[x].isCarried);
                localStore(x + "_spellUsed", spUsed);
                localStore(x + "_spellCarried", spCarr);

            };

            // need to change the events inot objects like spells are
            localStore("eve_done", JSON.stringify(Events.alreadyDone));
            localStore("rain_done", JSON.stringify(rain.alreadyDone));
            localStore("cold_done", JSON.stringify(cold.alreadyDone));
            returnValue = 'Game saved';
            break;
        case "load":
            // do load
            Oobject = JSON.parse(localGet("objects"));
            invent = JSON.parse(localGet("inv"));
            Oroom = JSON.parse(localGet("rooms"));
            Opeeps = JSON.parse(localGet("peeps"));
            Oconv = JSON.parse(localGet("convs"));
            arrReqs = JSON.parse(localGet("reqs"));

            // vars
            varRID = parseFloat(JSON.parse(localGet("currR")));
            cash = parseFloat(JSON.parse(localGet("money"))).toFixed;
            document.getElementById("money").value = "£" + cash;
            graphON = JSON.parse(localGet("graphs"));
            getThisRoom(varRID, "Game loaded", varRID);

            for (x = 0; x < Spell.length; x++) {
                Spell[x].alreadyUsed = JSON.parse(localGet(x + "_spellUsed"));
                Spell[x].isCarried = JSON.parse(localGet(x + "_spellCarried"));
            };
            Events.alreadyDone = JSON.parse(localGet("eve_done"));
            rain.alreadyDone = JSON.parse(localGet("rain_done"));
            cold.alreadyDone = JSON.parse(localGet("cold_done"));

            returnValue = 'Game loaded';

            break;
        case "quit":
            //end program
            var el = document.getElementById("d_main");
            el.parentNode.removeChild(el);
            alert("Game quit, but you have to close the window yourself!");
            window.close();
            break;
        case "darkmode":
            //change css to dark
            returnValue = 'Layout style set to darkmode';
            break;
        case "lightmode":
            //change css to light (normal)
            returnValue = 'Layout style set to lightmode';
            break;
        case "list":
            //list verbs
            if (verbs.length > 0) {
                returnValue = 'List of verbs which can be used:<br/>';
                vbC = 0;
                verbs.forEach(function (vrb) {
                    returnValue += verbs[vbC];
                    // bit of grammar
                    if (vbC == verbs.length - 2) {
                        returnValue += ' and ';
                    } else {
                        returnValue += ', ';
                    };
                    vbC++;
                });
                returnValue += "<br />" + listAlsoTxt;
            } else {
                returnValue = 'There are no verbs stored';
            };
            break;
        case "textonly":
            // hide the elements for graphics
            if (graphON == true) {
                // hide elements
                var elem = document.getElementById("imageRow");
                elem.style.display = "none";


                graphON = false;
                returnValue += "Graphics are now OFF";
            } else {
                returnValue += "The graphics are already off";
            };

            break;
        case "graphicson":
            if (graphON == false) {
                // show graphic elements
                var elem = document.getElementById("imageRow");
                elem.style.display = "block";
                graphON = true;
                returnValue += "Graphics are now ON";
            } else {
                returnValue += "The graphics are already on";
            };
            break;
        case "stats":
            let strEnd = "/" + stat_maxAmnt + "<br />";
            returnValue += "Your current stats are:<br />"
            returnValue += "Charisma: " + stat_charisma + strEnd;
            returnValue += "Combat: " + stat_combat + strEnd;
            returnValue += "Dexterity: " + stat_dexterity + strEnd;
            returnValue += "Strength: " + stat_strength + strEnd;
            returnValue += "Mood: " + getMood(moodLevel);
            break;
        case "help":
            returnValue += doHelp();
            break;
    };
    return returnValue;
}

function doEntry(theVerb, theNoun, fullInput = '') {
    var returnValue = '';
    var nid = 0;
    var cnt = Oobject.length;
    var bolIsObj = false;
    var bolIsPeep = false;
    // get id number of objects
    for (x = 0; x < cnt; x++) {
        if (Oobject[x].name == theNoun) {

            nid = Oobject[x].id;
            bolIsObj = true;
            break;
        };
    };
    if (bolIsObj == false && theNoun != undefined) {
        cnt = Opeeps.length;
        for (x = 0; x < cnt; x++) {

            if (Opeeps[x].call == theNoun || Opeeps[x].name == theNoun) {

                nid = Opeeps[x].id;
                bolIsObj = false;
                bolIsPeep = true;
                break;
            };
        };
    };


    // if there is a use (which is not "use") for noun and the verb is use then replace the verb with the action-when-used verb
    if (theVerb == "use") {
        for (v = 0; v < verbs.length; v++) {
            if (verbs[v] != "use" && verbs[v] == Oobject[nid].actionWhenUsed) {
                theVerb = verbs[v];
                break;

            };
        }; //end for loop   
    }; // end if verb use



    switch (theVerb) {
        case "exam":

            //returnValue = call exam function

            // first look to see if it relates to something blocking a room      
            if (theNoun == undefined) {
                var indivWds = fullInput.split(' ');
                var bolDone = false;
                var thisRm = false;
                for (x = 1; x < Oroom.length; x++) {


                    if (Oroom[x].blockedTxt != 'xx' && bolDone === false) {

                        for (ex = 7; ex < 15; ex++) { // loop thru exits
                            let exName = '';
                            switch (ex) {
                                case 7:
                                    exName = 'northTo';
                                    break;
                                case 8:
                                    exName = 'eastTo';
                                    break;
                                case 9:
                                    exName = 'southTo';
                                    break;
                                case 10:
                                    exName = 'westTo';
                                    break;
                                case 11:
                                    exName = 'upTo';
                                    break;
                                case 12:
                                    exName = 'downTo';
                                    break;
                                case 13:
                                    exName = 'inTo';
                                    break;
                                case 14:
                                    exName = 'outTo';
                                    break;
                                default:
                                    exName = 'northTo';
                                    break;
                            }
                            if (Oroom[x][ex] == varRID && Oroom[x].roomIsRevealed === 'n') {
                                thisRm = true;
                                break;
                            };

                        };

                        if (thisRm == true) {

                            let bl = Oroom[x].blockedTxt.toLowerCase();

                            for (nc = 0; nc < indivWds.length; nc++) {
                                let nn = indivWds[nc].toLowerCase();

                                if (bl.includes(nn) == true) {

                                    returnValue += "<br />It is " + Oroom[x].blockedTxt + ". That is all you can tell";
                                    bolDone = true;
                                    break;
                                };
                            }; //end loop

                        }; // end thisrm===true       

                    }; // end if rooms 17 != xx

                }; // end for <rooms.length
            };

            // end is it blocking a room       

            if (bolIsObj == true) {

                if ((parseFloat(Oobject[nid].currentRoom) == varRID || Oobject[nid].isCarried == 'y') && Oobject[nid].isHidden == 'n') // if its here and not hidden
                {

                    //is it broken?
                    if (Oobject[nid].isBroken == 'y') {
                        returnValue += 'It is ' + Oobject[nid].prefix + ' ' + Oobject[nid].brokenObject; // it is A broken...... xxx
                        if (Oobject[nid].examRevealsObjID != 'xx' && Oobject[nid].hasBeenUsed == 'n') // exam reveals obj and it hasnt been examined before
                        {
                            Oobject[nid].hasBeenUsed = 'y';
                            let revOb = parseFloat(Oobject[nid].examRevealsObjID);
                            if (Oobject[revOb].currentRoom == 9999 && Oobject[revOb].hasBeenUsed == 'n') {
                                // object has not been revealed or used yet
                                Oobject[revOb].currentRoom = varRID;
                                Oobject[revOb].isHidden = 'n';

                                returnValue += "<br />" + firstCap(Oobject[revOb].prefix) + " " + Oobject[revOb].name + " " + newObjVis + " " + Oobject[nid].name;
                            };

                        }; // end IF exam reveals obj
                        break;
                    } else {
                        returnValue += 'The ' + Oobject[nid].name + ' is ' + Oobject[nid].description;
                        if (Oobject[nid].strength != 0) {
                            returnValue += "<br />It's strength is : " + Oobject[nid].strength + "/" + stat_maxAmnt;
                        };

                        if (Oobject[nid].isOn == 'y') //is it on?
                        {
                            returnValue += '. It is on';
                        };
                        if (Oobject[nid].isOpen == 'y') //is it open
                        {
                            returnValue += ".<br />The " + Oobject[nid].name + " is open";
                        };
                        if (Oobject[nid].examRevealsObjID != 'xx' & Oobject[nid].hasBeenUsed == 'n') // exam reveals obj
                        {
                            let revOb = parseFloat(Oobject[nid].examRevealsObjID);

                            if (Oobject[revOb].currentRoom == 9999 && Oobject[revOb].hasBeenUsed == 'n') {
                                Oobject[nid].hasBeenUsed = 'y';
                                // object has not been revealed or used yet
                                Oobject[revOb].currentRoom = varRID;
                                Oobject[revOb].isHidden = 'n';
                                returnValue += "<br />" + firstCap(Oobject[revOb].prefix) + " " + Oobject[revOb].name + " " + newObjVis + " " + Oobject[nid].name;
                            };

                        }; // end IF exam reveals obj
                        // break;  
                    };

                }; // end of here or carried AND not hidden

                // poss show pic here in specialPic

            }; // end bolIsObj == true


            // if not return value, check to see if its a person
            if (bolIsObj == false && bolIsPeep == true) // could it be a person
            {

                if (parseFloat(Opeeps[nid].currentRoom) == varRID && Opeeps[nid].isHiddenYN == 'n') //is person here and not hidden
                {

                    returnValue += Opeeps[nid].call + ' is ' + Opeeps[nid].description + "<br />" + firstCap(Opeeps[nid].sex) + " has combat abilty of " + Opeeps[nid].combat + "/" + stat_maxAmnt + " and weariness of " + Opeeps[nid].weariness + "/" + stat_maxAmnt;
                    break;
                };

            }; // end of bolIsObj == false
            //if still no return value return message
            if (returnValue == '') {
                returnValue = notHere;
            };
            if (Oroom[varRID].isLitYN == 'n' && lightIsOn == false) {
                returnValue = "It's too dark to examine anything";
            };
            break;
        case "get":


            if (bolIsObj == true) {
                // check there is enough slots and weight
                if (((invWeight + parseFloat(Oobject[nid].weight)) <= weightAllowance) && (itemsLimit >= (invent.length + parseFloat(Oobject[nid].spaces)))) {
                    if (Oobject[nid].canGet == 'y' && parseFloat(Oobject[nid].currentRoom) == varRID && (Oroom[varRID].isLitYN == 'y' || lightIsOn == true)) // can be picked up and is here AND room is lit or the light is on?
                    {

                        let invPlc = invent.length++;
                        // add to inventory
                        invent[invPlc] = Oobject[nid].name;
                        invWeight = parseFloat(Oobject[nid].weight);
                        Oobject[nid].isCarried = 'y'; // is carried to yes
                        Oobject[nid].currentRoom = 9999; // take it out of any room
                        Oobject[nid].isHidden = 'n'; // cant really be hidden
                        if (Oobject[nid].isCash == 'y') // is cash
                        {
                            cash += parseFloat(Oobject[nid].itemValue);
                            var el = document.getElementById('money');
                            el.textContent = "Funds: " + cshSy + cash.toFixed(2);
                        }
                        returnValue += firstCap(Oobject[nid].specialMess);
                        if (Oobject[nid].isImportant == 'y') { // is important so increase mood
                            statCheck(statUse.MIN, statType.MOOD, true);

                        };
                    } else if (Oobject[nid].canGet == 'y' && parseFloat(Oobject[nid].currentRoom) == varRID && (Oroom[varRID].isLitYN == 'n' && lightIsOn == false)) {
                        returnValue += tooDarkForObj;
                    } else if (theNoun != undefined) {
                        returnValue += cantGet + Oobject[nid].prefix + ' ' + Oobject[nid].name + ' up';
                    };

                } // end of enough space and weight
                else {
                    returnValue += noCapacity + Oobject[nid].prefix + ' ' + Oobject[nid].name + ' up';
                    if (Oobject[nid].isImportant == 'y') { // drop mood point as couldnt get important object
                        statCheck(statUse.MIN, statType.MOOD, false);
                    }
                };



            } else {
                if (theNoun != undefined) {
                    returnValue += cantGet + theNoun + " up";
                } else {
                    returnValue += getWhat;
                };

            };
            //if still no return value return message
            if (returnValue == '') {
                returnValue += "There is no " + theNoun + " here to get";
            };
            break;
        case "look":
            getThisRoom(varRID, '', varRID);
            returnValue += lookAgain;
            break;
        case "use":
            if (bolIsObj == true) {
                // carried and not on or here, off and not hidden
                if ((Oobject[nid].isCarried == 'y' || (Oobject[nid].currentRoom == varRID && Oobject[nid].isHidden == 'n')) && Oobject[nid].isOn == 'n') {

                    Oobject[nid].isOn = 'y';
                    returnValue += 'You turn the ' + Oobject[nid].name + ' on';
                    Oobject[nid].hasBeenUsed = 'y'; // has been used to Y
                    if (Oobject[nid].actionWhenUsed == 'light') {
                        lightIsOn = true;
                    };
                    if (Oobject[nid].isImportant == 'y') { // important and turned on, increase charisma
                        if (Oobject[nid].useAffects != "xx") {
                            returnValue += "<br />" + changeStat(Oobject[nid].useAffects, parseFloat(Oobject[nid].statEffect), "random");
                        } else {
                            statCheck(statUse.MIN, statType.CHARISMA, true);
                        };


                    };
                } else
                if ((Oobject[nid].isCarried == 'y' || (Oobject[nid].currentRoom == varRID && Oobject[nid].isHidden == 'n')) && Oobject[nid].isOn == 'y') {
                    Oobject[nid].isOn = 'n';
                    returnValue += 'You turn the ' + Oobject[nid].name + ' off';
                    if (Oobject[nid].actionWhenUsed == 'light') {
                        lightIsOn = false;
                    };
                    Oobject[nid].hasBeenUsed = 'y';
                    if (Oobject[nid].isImportant == 'y') { // important and turned off, increase charisma
                        if (Oobject[nid].useAffects != "xx") {
                            returnValue += "<br />" + changeStat(Oobject[nid].useAffects, parseFloat(Oobject[nid].statEffect), "random");
                        } else {
                            statCheck(statUse.MIN, statType.CHARISMA, false);
                        };

                    };
                } else
                if (Oobject[nid].isOn == 'xx' && (Oobject[nid].isCarried == 'y' || Oobject[nid].currentRoom == varRID)) //it cant be switched on / off and is either here or carried
                {

                    // make sure it can be used atm before using it
                    let bolOkToUse = false;
                    var bolSecObj = false;
                    if (Oobject[nid].needsAnotherObjToWork == 'n') {
                        bolOkToUse = true;
                        if (Oobject[nid].isImportant == 'y') { // important and turned on, increase charisma
                            if (Oobject[nid].useAffects != "xx") {
                                returnValue += "<br />" + changeStat(Oobject[nid].useAffects, parseFloat(Oobject[nid].statEffect), "random");
                            } else {
                                statCheck(statUse.MIN, statType.CHARISMA, true);
                            };

                        };
                    } else if (Oobject[nid].needsAnotherObjToWork == 'y') //needs another object to work
                    {
                        bolSecObj = true;
                        //get needed obj id
                        var otherID = 9999;
                        if (Oobject[nid].objUsesWith == 'xx') {
                            otherID = 9999;
                        } else {
                            otherID = parseFloat(Oobject[nid].objUsesWith);
                        }


                        if (otherID != 9999) // not the no object id
                        {
                            // is it here or carried AND has mutli uses or has not been used yet
                            if ((Oobject[otherID].currentRoom == varRID || Oobject[otherID].isCarried == 'y') && (Oobject[otherID].multiUse == 'y' || Oobject[otherID].hasBeenUsed == 'n')) {
                                bolOkToUse = true;
                            };
                            // are both not broken?
                            if ((Oobject[otherID].currentRoom == varRID || Oobject[otherID].isCarried == 'y') && Oobject[nid].isBroken == 'n' && Oobject[otherID].isBroken == 'n') {
                                bolOkToUse = true;
                                if (Oobject[nid].isImportant == 'y') { // both ok so increase mood
                                    if (Oobject[nid].useAffects != "xx") {
                                        returnValue += "<br />" + changeStat(Oobject[nid].useAffects, parseFloat(Oobject[nid].statEffect), "up");
                                    } else {
                                        statCheck(statUse.MIN, statType.MOOD, true);
                                    };

                                };
                            } else if ((Oobject[otherID].currentRoom == varRID || Oobject[otherID].isCarried == 'y') && Oobject[nid].isBroken == 'y' || Oobject[otherID].isBroken == 'y') // one is broken
                            {
                                bolOkToUse = false;
                                if (Oobject[nid].isImportant == 'y') { // one is broken so decrease mood
                                    if (Oobject[nid].useAffects != "xx") {
                                        returnValue += "<br />" + changeStat(Oobject[nid].useAffects, parseFloat(Oobject[nid].statEffect), "down");
                                    } else {
                                        statCheck(statUse.MIN, statType.MOOD, false);
                                    };

                                };
                            };
                            // are both not eaten?
                            if ((Oobject[otherID].currentRoom == varRID || Oobject[otherID].isCarried == 'y') && Oobject[nid].isEaten == 'n' && Oobject[otherID].isEaten == 'n') {
                                bolOkToUse = true;
                            } else if ((Oobject[otherID].currentRoom == varRID || Oobject[otherID].isCarried == 'y') && Oobject[nid].isEaten == 'y' || Oobject[otherID].isEaten == 'y') // one eaten
                            {
                                bolOkToUse = false;
                            };
                            // both arent hidden
                            if ((Oobject[otherID].currentRoom == varRID || Oobject[otherID].isCarried == 'y') && Oobject[nid].isHidden == 'n' && Oobject[otherID].isHidden == 'n') {
                                bolOkToUse = true;
                                if (Oobject[nid].isImportant == 'y') { // both not hidden, increase dexterity
                                    if (Oobject[nid].useAffects != "xx") {
                                        returnValue += "<br />" + changeStat(Oobject[nid].useAffects, parseFloat(Oobject[nid].statEffect), "up");
                                    } else {
                                        statCheck(statUse.MIN, statType.DEXTERITY, true);
                                    };

                                };
                            } else if ((Oobject[otherID].currentRoom == varRID || Oobject[otherID].isCarried == 'y') && Oobject[nid].isHidden == 'y' || Oobject[otherID].isHidden == 'y') { // one hidden
                                bolOkToUse = false;
                                if (Oobject[nid].isImportant == 'y') { // one is hidden decrease dexterity
                                    if (Oobject[nid].useAffects != "xx") {
                                        returnValue += "<br />" + changeStat(Oobject[nid].useAffects, parseFloat(Oobject[nid].statEffect), "random");
                                    } else {
                                        statCheck(statUse.MIN, statType.DEXTERITY, false);
                                    };

                                };
                            };

                        }; // end of not an impossible number for other object IF THEN

                    }; // end of needs another object IF THEN

                    // actionWhenUsed applies to on its own or with another object
                    if (bolOkToUse == true) {
                        let awu = Oobject[nid].actionWhenUsed;
                        let secID = 9999;
                        if (bolSecObj = true) {
                            secID = parseFloat(Oobject[nid].objUsesWith);
                        };
                        UsageEffects:

                            switch (awu) {
                                case "hit":
                                    // do what both objects say for '38'.
                                    if (bolSecObj = true) {




                                        if (Oobject[secID].canBeBroken == 'y' && Oobject[secID].combineDestroysMe == 'y') {
                                            // break second obj
                                            Oobject[secID].isBroken = 'y';
                                        }; // end of needs to be broken

                                        if (parseFloat(Oobject[secID].revealRoom) != 0) // reveals a room?
                                        {
                                            let rvRm = parseFloat(Oobject[secID].revealRoom);
                                            Oroom[rvRm].roomIsRevealed = 'y';
                                            if (Oobject[secID].isImportant == 'y') { // happy to reveal another room
                                                statCheck(statUse.MID, statType.MOOD, true);
                                            };
                                        };

                                        Oobject[secID].hasBeenUsed = 'y'; // mark as used
                                    }; // end of second object

                                    if (Oobject[nid].canBeBroken == 'y' && Oobject[nid].isBroken == 'n') // can be broken but isnt
                                    {

                                        if (rollDice(Oobject[nid].strength, stat_strength) == true) { // stat_strength beats object strength




                                            // swap with a diff object
                                            if (Oobject[nid].brokenObject != 'xx') {

                                                Oobject[nid].isBroken = 'y';
                                                let nob = parseFloat(Oobject[nid].brokenObject);
                                                Oobject[nob].currentRoom = varRID; // new object is now in this room
                                                Oobject[nid].currentRoom = 9999; // n ot in any room now
                                                Oobject[nid].isCarried = 'n'; //not carried either
                                                returnValue += firstCap(Oobject[nid].breakMess) + '<br />'; // break mess
                                                if (Oobject[nid].isImportant == 'y') { // oops, broken it
                                                    statCheck(statUse.MAX, statType.MOOD, false);
                                                };
                                            } // end of swap with broken obj
                                            else {
                                                Oobject[nid].isBroken = 'y'; // make obj broken
                                                returnValue += firstCap(Oobject[nid].breakMess) + '<br />'; // break mess
                                                if (Oobject[nid].isImportant == 'y') { // broken it
                                                    statCheck(statUse.MAX, statType.MOOD, false);
                                                    statCheck(statUse.MIN, statType.DEXTERITY, false);
                                                };
                                            }; // end of just break this obj


                                            returnValue += firstCap(Oobject[nid].resultOfUse);

                                        } // end strength is high enough   
                                        else {
                                            returnValue += stat_noStrength;
                                        };





                                    }; // end of can be broken but isnt




                                    break;
                                case "combine":
                                    if ((Oobject[nid].isCarried == 'y' || Oobject[nid].currentRoom == varRID) && (Oobject[secID].isCarried == 'y' || Oobject[secID].currentRoom == varRID) && (Oroom[varRID].isLitYN == 'y' || lightIsOn == true)) // both objs here or carried AND room is lit or light is on
                                    {
                                        if (Oobject[nid].combineable == 'y' && Oobject[secID].combineable == 'y') {
                                            let crID = 9999;
                                            if (Oobject[nid].combineCreates != 9999 && Oobject[nid].combineCreates != 'xx') {
                                                crID = parseFloat(Oobject[nid].combineCreates);

                                            } else if (Oobject[secID].combineCreates != 9999 && Oobject[secID].combineCreates != 'xx') {
                                                crID = parseFloat(Oobject[secID].combineCreates);
                                            }; // end IF combineCreates not 9999 for either
                                            // get new obj and make sure its visible
                                            returnValue += "The " + Oobject[nid].name + " and the " + Oobject[secID].name + " " + combineTxt + " " + Oobject[crID].prefix + " " + Oobject[crID].name;
                                            Oobject[crID].currentRoom = varRID;
                                            Oobject[crID].isHidden = 'n';
                                            // destory other objs
                                            if (Oobject[nid].combineDestroysMe == 'y') // first obj is destroyed
                                            {
                                                Oobject[nid].currentRoom = 9999; // send to heaven
                                                if (Oobject[nid].isCarried == 'y') {
                                                    dropFromInv(nid, true);
                                                    returnValue += ".<br />The " + Oobject[nid].name + " " + destroytxt;
                                                } // end IF first obj is carried
                                                else {
                                                    returnValue += ".<br />The " + Oobject[nid].name + " " + destroytxt;
                                                }; // end first obj not carried

                                            } // end IF first obj is destoyed with combine
                                            else {
                                                if (Oobject[nid].isCarried == 'y') {
                                                    dropFromInv(nid, false);
                                                    returnValue += ".<br />The " + Oobject[nid].name + " " + objDrop;
                                                } // end IF first obj is carried
                                                else {
                                                    returnValue += ".<br />The " + Oobject[nid].name + " is still on the floor";
                                                }; // end first obj not carried
                                            }; // end first obj is NOT destroyed

                                            if (Oobject[secID].combineDestroysMe == 'y') // second obj is destroyed
                                            {
                                                Oobject[secID].currentRoom = 9999; // send to heaven
                                                if (Oobject[secID].isCarried == 'y') {
                                                    dropFromInv(secID, true);
                                                    returnValue += ".<br />The " + Oobject[secID].name + " " + destroytxt;
                                                } // end IF second obj is carried
                                                else {
                                                    returnValue += ".<br />The " + Oobject[secID].name + " " + destroytxt;
                                                }; // end second obj not carried

                                            } // end IF second obj is destoyed with combine
                                            else {
                                                if (Oobject[secID].isCarried == 'y') {
                                                    dropFromInv(secID, false);
                                                    returnValue += ".<br />The " + Oobject[secID].name + " " + objDrop;
                                                } // end IF second obj is carried
                                                else {
                                                    returnValue += ".<br />The " + Oobject[secID].name + " is still on the floor";
                                                }; // end second obj not carried
                                            }; // end second obj is NOT destroyed
                                            if (Oobject[nid].isImportant == 'y') { // important and turned on, increase charisma
                                                statCheck(statUse.MID, statType.DEXTERITY, true);
                                                statCheck(statUse.MIN, statType.MOOD, true);
                                            };
                                        }; //end both combineable
                                    } else if ((Oobject[nid].isCarried == 'y' || Oobject[nid].currentRoom == varRID) && (Oobject[secID].isCarried == 'y' || Oobject[secID].currentRoom == varRID) && (Oroom[varRID].isLitYN == 'n' && lightIsOn == false)) {
                                        returnValue += "<br />" + tooDarkForObj;

                                    }; // end both here/carried
                                    break;

                                case "reveal":
                                    //room revealed
                                    var rrev = undefined;
                                    if ((Oobject[nid].isCarried == 'y' || Oobject[nid].currentRoom == varRID) && (Oobject[secID].isCarried == 'y' || Oobject[secID].currentRoom == varRID)) {

                                        if (Oobject[nid].revealRoom != '0') {
                                            rrev = parseFloat(Oobject[nid].revealRoom);
                                        } else if (Oobject[secID].revealRoom != '0') {
                                            rrev = parseFloat(Oobject[secID].revealRoom);
                                        };
                                    } else if (Oobject[nid].isCarried == 'y' && Oobject[nid].personNeededForReveal != 'xx') { //the object is here and there is a number in the personNeededForReveal node
                                        returnValue += deathRevealsEtc(nid);
                                        Oobject[nid].actionWhenUsed = 'afterReveal';

                                    } else if (Oobject[nid].currentRoom == varRID && Oobject[nid].isCarried == 'n' && Oobject[nid].personNeededForReveal != 'xx') {
                                        returnValue += hereNotCarried;


                                    } else {
                                        returnValue += "<br />That did nothing";
                                    };
                                    if (rrev != undefined) {
                                        Oroom[rrev].roomIsRevealed = 'y';
                                        Oroom[rrev].blockedTxt = 'xx';
                                        var rmNm = Oroom[rrev].name;
                                        returnValue += "Having " + Oobject[nid].prefix + " " + Oobject[nid].name +
                                            " and " + Oobject[secID].prefix + " " + Oobject[secID].name + " together has revealed " + rmNm;
                                        Oobject[nid].actionWhenUsed = 'afterReveal';
                                        // this means the next use will have the action of afterReveal and not reveal. 
                                    } else {
                                        returnValue += "<br />That did nothing of any note";
                                    };
                                    break;

                                case "damage":
                                    // apply damage to objects which can be broken '18'

                                    if (Oobject[nid].canBeBroken == 'y' && Oobject[nid].isBroken == 'n') {

                                        if (Oobject[nid].isImportant != 'y') //is not important
                                        {
                                            // see if enough stats to make it work
                                            var bolStrength = rollDice(parseFloat(Oobject[nid].strength), stat_strength);

                                            if (bolStrength == true) {


                                                Oobject[nid].isBroken = 'y'; // is broken

                                                if (Oobject[nid].brokenObject != 'xx') // replace with a diff object
                                                {
                                                    let nob = parseFloat(Oobject[nid].brokenObject);
                                                    if (Oobject[nid].isCarried == 'y') {
                                                        addToInv(nob, true, nid);
                                                        Oobject[nob].isCarried = 'y'; // new obj to inv
                                                        Oobject[nid].isCarried = 'n'; //drop obj
                                                        Oobject[nid].currentRoom = 9999; //send to heaven
                                                    } else {
                                                        Oobject[nob].currentRoom = varRID; //new obj to here
                                                        Oobject[nid].currentRoom = 9999; //old obj to heaven
                                                    };
                                                }; // end of has to be replaced
                                                returnValue += firstCap(Oobject[nid].breakMess);
                                            } // end of bolstrength==true
                                            else {
                                                returnValue += stat_noStrength;
                                            };
                                        } //end of not important
                                        else {
                                            statCheck(statUse.MID, statType.CHARISMA, false);
                                            returnValue += firstCap(Oobject[nid].importantMessage); //send important message
                                        }; // end of is too important for that
                                    };
                                    break;

                                case "mend":
                                    if (Oobject[nid].mendsWith != 'xx' && Oobject[nid].isBroken == 'y') // can be mended and is broken
                                    {
                                        var bolDextOK = rollDice(1, stat_dexterity);
                                        if (bolDextOK == true) {


                                            let nob = parseFloat(Oobject[nid].mendsWith);
                                            if (Oobject[nob].currentRoom = varRID || Oobject[nob].isCarried == 'y') //mend obj is here or carried
                                            {
                                                // this will only fix an object that has been broken but not swapped for a broken obj
                                                Oobject[nid].isBroken = 'n'; // set to not broken
                                                returnValue += 'The ' + Oobject[nid].name + " " + mendTxt + " " + Oobject[nob].name;
                                                // youve mended something - well played
                                                statCheck(statUse.MID, statType.MOOD, true);
                                            } else // mend obj is not present
                                            {
                                                returnValue += 'The ' + Oobject[nid].name + " " + noMend;
                                            }; // end of mend obj here and carried
                                        } // end boldextok==true
                                        else {
                                            returnValue += stat_noDexterity;
                                        };
                                    }; // end of can be mended and is broken
                                    break;
                                case "light":
                                    if (Oobject[nid].isOn == 'n' && (Oobject[nid].hasBeenUsed == 'n' || Oobject[nid].multiUse == 'y')) //is off AND has not been used or is multiuse
                                    {
                                        Oobject[nid].isOn = 'y'; //switch it on
                                        returnValue += firstCap(Oobject[nid].resultOfUse) + "<br />" + litThe + " " + Oobject[nid].name;
                                        lightIsOn = true;
                                    } else if (Oobject[nid].isOn == 'y' && (Oobject[nid].hasBeenUsed == 'n' || Oobject[nid].multiUse == 'y')) //is on AND not used before or is multiuse
                                    {
                                        Oobject[nid].isOn = 'n';
                                        returnValue += firstCap(Oobject[nid].resultOfUse) + '<br />As the ' + Oobject[nid].name + " " + unlitThe;
                                        lightIsOn = true;
                                    } else {
                                        returnValue += 'You cannot use the ' + Oobject[nid].name + ' again';
                                        if (Oobject[nid].isImportant == 'y') { // important and cannot be used again - sad!!
                                            statCheck(statUse.MIN, statType.MOOD, false);
                                        };
                                    };
                                    break;
                                case "extinguish":
                                    if (Oobject[nid].isOn == 'n' && (Oobject[nid].hasBeenUsed == 'n' || Oobject[nid].multiUse == 'y')) //is off AND has not been used or is multiuse
                                    {
                                        Oobject[nid].isOn = 'y'; //switch it on
                                        returnValue += firstCap(Oobject[nid].resultOfUse) + '<br />As the ' + Oobject[nid].name + " " + unlitThe;
                                        lightIsOn = false;
                                    } else if (Oobject[nid].isOn == 'y' && (Oobject[nid].hasBeenUsed == 'n' || Oobject[nid].multiUse == 'y')) //is on AND not used before or is multiuse
                                    {
                                        Oobject[nid].isOn = 'n';
                                        returnValue += firstCap(Oobject[nid].resultOfUse) + "<br />" + extingThe + " " + Oobject[nid].name;
                                        lightIsOn = false;
                                    } else {
                                        returnValue += cantUse + " " + Oobject[nid].name + " " + againTxt;
                                    };
                                    break;
                                case "mark":
                                    if (Oobject[nid].hasBeenUsed == 'n' || Oobject[nid].multiUse == 'y' && (Oroom[varRID].isLitYN == 'y' || lightIsOn == true)) // obj not used or is multiuse
                                    {
                                        returnValue += firstCap(Oobject[nid].resultOfUse);
                                        Oobject[nid].hasBeenUsed = 'y'; // set has been used to y
                                    } else if (Oobject[nid].hasBeenUsed == 'n' || Oobject[nid].multiUse == 'y' && (Oroom[varRID].isLitYN == 'n' && lightIsOn == false)) {
                                        returnValue += "<br />" + tooDarkForObj;
                                    } else {
                                        returnValue += cantUse + " " + Oobject[nid].name + " " + againTxt;
                                    };

                                    break;
                                case "hide":
                                    if (Oobject[nid].isHidden == 'n' && (Oobject[nid].hasBeenUsed == 'n' || Oobject[nid].multiUse == 'y') && (Oroom[varRID].isLitYN == 'y' || lightIsOn == true)) // is not hidden AND hasnt been used or is multiuse
                                    {

                                        let nob = 0;
                                        let strIUB = '';
                                        if (Oobject[nid].hiddenIn != 9999 && Oobject[nid].hiddenIn != 'xx') {

                                            nob = parseFloat(Oobject[nid].hiddenIn);
                                            if (Oobject[nob].currentRoom == varRID || Oobject[nob].isCarried == 'y') {
                                                Oobject[nid].isCarried = 'n'; // stop carrying it
                                                Oobject[nid].currentRoom = 9999; //send to heaven
                                                Oobject[nid].isHidden = 'y'; //hide
                                                strIUB = ' in ';
                                                if (Oobject[nid].isImportant == 'y') { // important and turned on, increase charisma
                                                    statCheck(statUse.MIN, statType.DEXTERITY, true);
                                                };
                                            };

                                        } else if (Oobject[nid].hiddenUnder != 9999 && Oobject[nid].hiddenUnder != 'xx') {

                                            nob = parseFloat(Oobject[nid].hiddenUnder);
                                            if (Oobject[nob].currentRoom == varRID || Oobject[nob].isCarried == 'y') {
                                                Oobject[nid].isCarried = 'n'; // stop carrying it
                                                Oobject[nid].currentRoom = 9999; //send to heaven
                                                Oobject[nid].isHidden = 'y'; //hide
                                                strIUB = ' under ';
                                                if (Oobject[nid].isImportant == 'y') { // important and turned on, increase charisma
                                                    statCheck(statUse.MIN, statType.DEXTERITY, true);
                                                };
                                            };
                                        } else if (Oobject[nid].hiddenBehind != 9999 && Oobject[nid].hiddenBehind != 'xx') {

                                            nob = parseFloat(Oobject[nid].hiddenBehind);
                                            if (Oobject[nob].currentRoom == varRID || Oobject[nob].isCarried == 'y') {
                                                Oobject[nid].isCarried = 'n'; // stop carrying it
                                                Oobject[nid].currentRoom = 9999; //send to heaven
                                                Oobject[nid].isHidden = 'y'; //hide
                                                strIUB = ' behind ';
                                                if (Oobject[nid].isImportant == 'y') { // important and turned on, increase charisma
                                                    statCheck(statUse.MIN, statType.DEXTERITY, true);
                                                };
                                            };
                                        } else {
                                            returnValue += cantHide + " " + Oobject[nid].name + " " + cantHidePT2;
                                        };




                                        if (strIUB != '') // if its in, under or behind something
                                        {

                                            returnValue += 'The ' + Oobject[nid].name + " " + isHid;
                                            returnValue += strIUB + Oobject[nob].prefix + ' ' + Oobject[nob].name; // add extra txt to returnValue
                                        } else {
                                            if ((Oobject[nid].hiddenIn != 9999 && Oobject[nid].hiddenIn != 'xx') || (Oobject[nid].hiddenUnder != 9999 && Oobject[nid].hiddenUnder != 'xx') || (Oobject[nid].hiddenBehind != 9999 && Oobject[nid].hiddenBehind != 'xx')) // could be hidden but obj not here to hide behind, under or in
                                            {
                                                returnValue += cantHide + " " + Oobject[nid].name + " " + cantHidePT2;
                                            };
                                        };

                                    } else if (Oobject[nid].isHidden == 'n' && (Oobject[nid].hasBeenUsed == 'n' || Oobject[nid].multiUse == 'y') && (Oroom[varRID].isLitYN == 'n' && lightIsOn == false)) {
                                        returnValue += "<br />" + tooDarkForObj;

                                    }; // end of isnt hidden and hasnt been used or is multiuse
                                    break;
                                case "unlock": // will work as lock too

                                    if (Oobject[nid].isLocked == 'y' && (Oobject[secID].currentRoom == varRID || Oobject[secID].isCarried == 'y')) //is locked and here /carried
                                    {
                                        Oobject[nid].isLocked = 'n';
                                        returnValue += useTxt + " " + Oobject[secID].name + " " + unlockTxt + " " + Oobject[nid].name;
                                    } else if (Oobject[nid].isLocked == 'n' && (Oobject[secID].currentRoom == varRID || Oobject[secID].isCarried == 'y')) {
                                        Oobject[nid].isLocked = 'y';
                                        returnValue += useTxt + " " + Oobject[secID].name + " " + lockTxt + " " + Oobject[nid].name;
                                    } else {
                                        if (Oobject[nid].revealRoom != 'xx' && (Oobject[nid].hasBeenUsed == 'n' || Oobject[nid].multiUse == 'y')) {
                                            let trm = Oobject[nid].revealRoom;
                                            if (Oroom[trm].blockedTxt != 'xx' && (Oobject[nid].currentRoom == varRID || Oobject[nid].isCarried == 'y')) {
                                                for (e = 7; e < 15; e++) {
                                                    let exName = '';
                                                    switch (e) {
                                                        case 7:
                                                            exName = 'northTo';
                                                            break;
                                                        case 8:
                                                            exName = 'eastTo';
                                                            break;
                                                        case 9:
                                                            exName = 'southTo';
                                                            break;
                                                        case 10:
                                                            exName = 'westTo';
                                                            break;
                                                        case 11:
                                                            exName = 'upTo';
                                                            break;
                                                        case 12:
                                                            exName = 'downTo';
                                                            break;
                                                        case 13:
                                                            exName = 'inTo';
                                                            break;
                                                        case 14:
                                                            exName = 'outTo';
                                                            break;
                                                        default:
                                                            exName = 'northTo';
                                                            break;
                                                    }
                                                    if (Oroom[trm][exName] == varRID && Oroom[trm].roomIsRevealed == 'n') {
                                                        Oroom[trm].roomIsRevealed = 'y';
                                                        Oroom[trm].blockedTxt = 'xx';
                                                        Oobject[nid].hasBeenUsed = 'y';
                                                        returnValue += "<br />" + firstCap(Oobject[nid].openMess);
                                                        break;
                                                    }; // end if exit is current room and room is not revealed
                                                }; // end for loop
                                            }; //end if room blocking not xx and object carried/here
                                        }; // end if obj reveal room is not xx and obj can be used

                                    }; // end of else

                                    break;
                                case "magic":
                                    var spNm = "";
                                    for (var x = 0; x < Spell.length; x++) {

                                        if (Oobject[Spell[x].objNeeded][23] == 'y' && (Spell[x].alreadyUsed == 'n' || Spell[x].multiUse == 'y')) {

                                            spNm = Spell[x].name;
                                            returnValue += "<br />" + castSpell(spNm, varRID);
                                            statCheck(statUse.MID, statType.CHARISMA, true);
                                            break;
                                        };

                                    };
                                    break;

                                case "afterReveal":
                                    if (Oobject[nid].personNeededForReveal != 'xx') {
                                        returnValue += deathRevealsEtc(undefined, nid);

                                    } else {
                                        returnValue += "<br />" + cantUse + " " + Oobject[nid].name + " right now";
                                    };



                                    break;

                                case "use":

                                    // if objuseswith (11) != xx and this obj is in the current room then get id at combinecreate (32) of second obj.
                                    // if obj with id at 32 is at 9999 then bring it to this room and display importantmessage (8)
                                    if (Oobject[nid].objUsesWith != 'xx' && Oobject[nid].objUsesWith != '9999') {
                                        let nob = Oobject[nid].objUsesWith;
                                        if (Oobject[nob].currentRoom == varRID || Oobject[nob].isCarried == 'y') {
                                            if (Oobject[nob].combineCreates != 'xx' && Oobject[nob].combineCreates != '9999') {
                                                let secO = Oobject[nob].combineCreates;
                                                if (Oobject[secO].currentRoom == 9999 && Oobject[secO].hasBeenUsed == 'n') {

                                                    Oobject[secO].currentRoom = varRID;
                                                    returnValue += firstCap(Oobject[nob].importantMessage);
                                                };
                                            }; // end combineCreate
                                        }; //end new obj here
                                    }; // end obj uses with



                                    break;

                                    // case "something else":
                                    //break;
                                default:
                                    if (Oobject[nid].resultOfUse == 'xx') {
                                        returnValue += "<br />Nothing really happens";
                                    } else {
                                        returnValue += "<br />" +
                                            firstCap(Oobject[nid].resultOfUse);
                                    };


                                    break;
                            }; // end switch ***********************
                    };




                }; // end of must be here or carried and must be used not switched on IF THEN
            };
            break;

        case "talk":
            // this is different to say, because we want to prompt user to enter correct conversation points
            if (Oroom[varRID].isLitYN == 'y' || lightIsOn == true) {
                if (theNoun != undefined) {
                    let pi = 0;
                    do {
                        if ((theNoun == Opeeps[pi].name || theNoun == Opeeps[pi].call) && Opeeps[pi].currentRoom == varRID) {
                            if (Opeeps[pi].isDeadYN == 'y') { //is dead

                                returnValue += "<br />" + deadNoTalk;
                            } else {
                                returnValue += "<br />" + Opeeps[pi].call + " says '" + Opeeps[pi].defaultSay + "'";
                            };


                            break;
                        }
                        pi++;
                    }
                    while (pi < Opeeps.length);
                }; // end noun not undefined

            };

            break;
        case "say":
            // get conversations relative to people here
            // find a conversation relative to a person here
            if (Oroom[varRID].isLitYN == 'y' || lightIsOn == true) {


                let conID = 0;
                var conResponse = '';
                var bolConFound = false;
                for (x = 0; x < Oconv.length; x++) {

                    if (Oconv[x].onePersonYN == 'y' && (Oconv[x].roomID == varRID || Oconv[x].roomID == "x")) //one person only && this rrom only or no specific room
                    {


                        let oneP = parseFloat(Oconv[x].p1ID); //one person's id
                        if (theNoun == undefined) {
                            theNoun = Opeeps[oneP].name
                        };

                        if ((Opeeps[oneP].currentRoom == varRID && (Opeeps[oneP].name == theNoun || Opeeps[oneP].call == theNoun)) || Opeeps[oneP].currentRoom == varRID) // that one person is here and their name has been used OR no name was given
                        {

                            bolConFound = true;
                            conID = x; //set conv id to x

                            break;
                        } else if (Opeeps[oneP].currentRoom != varRID && (Opeeps[oneP].name == theNoun || Opeeps[oneP].call == theNoun) || Opeeps[oneP].currentRoom != varRID) {
                            bolConFound = false;
                            conID = 0;
                            returnValue += noPeepTalk;
                            break;
                        };

                    } //end one person only
                    else // not for one person only
                    {
                        for (p = 3; p <= 7; p++) {
                            var subP = 'p' + (p - 2) + 'ID';
                            if (Oconv[x][subP] != 'x' && (Oconv[x].roomID == varRID || Oconv[x].roomID == "x")) //person field has an id value
                            {

                                let pid = 0;
                                pid = parseFloat(Oconv[x][subP]);
                                if (theNoun == undefined) {
                                    theNoun = Opeeps[pid].call
                                };
                                if ((Opeeps[pid].currentRoom == varRID && (Opeeps[pid].name == theNoun || Opeeps[pid].call == theNoun)) || Opeeps[pid].currentRoom == varRID) // that person is here and their name has been used OR no name was given
                                {
                                    bolConFound = true;
                                    conID = x;
                                    break;
                                } else if ((Opeeps[pid].currentRoom != varRID && (Opeeps[pid].name == theNoun || Opeeps[pid].call == theNoun)) || Opeeps[pid].currentRoom != varRID) {
                                    bolConFound = false;
                                    conID = 0;
                                    returnValue += talkError;

                                };
                            } // end of loop thru poss peeps
                        }; // end of loop
                    };
                }; // end of FOR all conversations loop
                if (bolConFound == true) {

                    if (Oconv[conID].roomID != 'x') // this conv has to be in a certain room
                    {
                        if (Oconv[conID].roomID != varRID) // not in right room
                        {
                            bolConFound = false;
                            conID = 0;
                            returnValue += talkWrongRoom;
                        };
                    }; // end of has to be in a certain room
                }; //end of IF conv found 

                if (bolConFound == true) {

                    //use fullInput to get what said
                    let theInput = fullInput.replace(/["]/g, "'"); // replace double quote with single to help following code
                    theInput = theInput.replace("?", "");
                    theInput = theInput.replace("!", "");
                    theInput = theInput.replace(".", "");
                    theInput = theInput.trim();
                    let spkStart = theInput.indexOf("'");
                    let spkEnd = theInput.lastIndexOf("'");
                    if (spkEnd == spkStart) // make sure there is a second quote
                    {
                        spkEnd = theInput.length;

                    };



                    let spkString = theInput.substring(spkStart + 1, spkEnd);
                    // now see what line the conversation is at
                    let nxtLine = 0;
                    let numbLines = Oconv[conID].numberLines;
                    for (cl = 9; cl <= numbLines + 8; cl++) // loop thru conversation lines (numblines + 8 because 1 + 8 = 9 ie the first line)
                    {
                        var propName = 'line' + (cl - 8);

                        if (Oconv[conID][propName] != 'x') // this line isnt used or never had anything or has been spoken
                        {
                            nxtLine = cl;
                            break;
                        };
                        if (cl == numbLines + 8) {
                            nxtLine = cl;
                            break;
                        }

                    }; // end FOR loop thru conv lines

                    console.log("nextline = " + nxtLine);
                    //  return the relevant line if spkString matches the line Response and make the line ='x' unless nxtline = 9 (the first line) when there is no required spkString

                    for (z = 9; z <= numbLines + 8; z++) //loop thru convs line
                    {
                        let respID = z + 9;

                        if (nxtLine == z) // this line is the next line
                        {

                            var propName = 'line' + (respID - 18) + 'Resp';

                            if (fullInput.includes(Oconv[conID][propName]) || nxtLine == 9) {

                                nxtLine += 1;
                                var subPN = "line" + (nxtLine - 9);
                                if (nxtLine <= 18 && Oconv[conID][propName] != 'x') // checking there is another line in the conv after this one and this one has something to say

                                {

                                    returnValue += theNoun += " responds '" + firstCap(Oconv[conID][subPN]) + "'";
                                    Oconv[conID][subPN] = 'x'; // make this line = 'x'

                                    // is an object created at this point in conversation? 

                                    if (Oconv[conID].objRevealedID != 'xx' && Oconv[conID].help1 == (nxtLine -= 9)) {


                                        let revO = Oconv[conID].objRevealedID;
                                        if (Oobject[revO].currentRoom == "9999" && Oobject[revO].hasBeenUsed == 'n') {

                                            Oobject[revO].currentRoom = varRID;
                                            if (addToInv(revO, false, 0) == true) {
                                                returnValue += "<br />" + firstCap(Oobject[revO].prefix) + " " + Oobject[revO].name + " is passed to you";
                                            } else {
                                                returnValue += "<br />" + Oobject[revO].prefix + " " + Oobject[revO].name + " is placed on the ground";
                                            };

                                        };
                                    }; // end is obj created
                                    break;
                                } else {
                                    // if nothing left in conv...
                                    returnValue += theNoun + " " + peepSaysZero;
                                    Oconv[conID][subPN] = 'x'; // make this line = 'x'
                                    break;
                                };

                            } else // response does not include key words
                            {
                                // is there some help

                                let hlpLn = z + 22; // helpTxt array index
                                let subsubPN = 'help' + (hlpLn - 30);
                                console.log("SUBsubPN = " + subsubPN + "#: " + subsubPN);
                                if (Oconv[conID][subsubPN] != "xx") {
                                    returnValue += theNoun + " " + peepBlanks + ". HINT: " + Oconv[conID][subsubPN];
                                } else {
                                    returnValue += theNoun + " " + peepBlanks;
                                };



                                break;
                            }; // end of does response include the required response
                        }; //end IF nxtline ==z


                    };
                    if (returnValue == '' && bolConFound == true) {
                        returnValue += theNoun + " " + peepSaysZero;
                    };


                }; // end bolconfound==true
            } else {
                returnValue += "<br />" + tooDarkForPeep;
            };
            break;
        case "drop":
            if (bolIsObj == true) {
                if (Oobject[nid].isCarried == 'y') {
                    let ioID = 0;
                    invent.forEach(function (nm) {
                        if (nm == Oobject[nid].name) {
                            ioID = parseFloat(invent.indexOf(nm));

                        };

                    });

                    invent.splice(ioID, 1);
                    invent.sort();
                    if (Oobject[nid].isCash == 'y') //is cash?
                    {
                        cash -= parseFloat(Oobject[nid].itemValue);
                        var el = document.getElementById('money');
                        el.textContent = "Funds: " + cshSy + cash.toFixed(2);
                        statCheck(statUse.MID, statType.MOOD, false);
                    };
                    returnValue += dropTxt + " " + Oobject[nid].name + ' to the floor';
                    Oobject[nid].isCarried = 'n';
                    Oobject[nid].currentRoom = varRID;
                };

            } else {
                returnValue += cantDrop;
            };
            break;
        case "eat":
            // is the object here or carried
            if (Oobject[nid].isCarried == 'y' || (Oobject[nid].currentRoom == varRID && (Oroom[varRID].isLitYN == 'y' || lightIsOn == true))) {
                if (Oobject[nid].canBeEaten == 'y') // can be eaten?
                {
                    if (Oobject[nid].isEaten == 'n') //isnt already eaten
                    {
                        Oobject[nid].isEaten = 'y';
                        if (Oobject[nid].eatMess != 'xx') // make sure there is an eatmessage
                        {
                            returnValue += firstCap(Oobject[nid].eatMess);
                        } else {
                            returnValue += eatTxt + " " + Oobject[nid].name;
                        }; //end IF eat message
                        if (Oobject[nid].eatenObject != 'xx') // theres a new obj after eaten
                        {
                            let nob = parseFloat(Oobject[nid].eatenObject);
                            if (invent.length < itemsLimit && Oobject[nid].isCarried == 'n') // room in inv for item and current item not carried
                            {
                                // addtoinv is function to add to ionventory
                                if (addToInv(nob) == true) // can it be added
                                {
                                    Oobject[nid].currentRoom = 9999; // send old obj to heaven
                                    returnValue += '<br />The ' + Oobject[nob].name + " " + inInvTxt;
                                };
                            } // end of obj not in inv and room in inv
                            else if (invent.length <= itemsLimit && Oobject[nid].isCarried == 'y') // room if this item which is carried goes
                            {
                                // add new ob and derop old
                                if (addToInv(nob, true, nid) == true) {
                                    //now destroy the old as its eaten
                                    Oobject[nid].currentRoom = 9999;
                                    returnValue += '<br />The ' + Oobject[nob].name + " " + inInvTxt;
                                };

                            } // end of obj carried in inv 
                            else if (Oobject[nid].isCarried == 'n' && invent.length >= itemsLimit) // no room in inv and obj not in inv
                            {
                                Oobject[nid].isCarried = 'n'; //
                                Oobject[nid].currentRoom = 9999;
                                Oobject[nob].isCarried = 'n';
                                Oobject[nob].currentRoom = varRID;
                                returnValue += '<br />The ' + Oobject[nob].name + " " + notFitInInv;
                            }
                            statCheck(statUse.MIN, statType.STRENGTH, true);
                        }; // end of IF new obj after eaten
                    } else {
                        returnValue += eatNoMore + " " + Oobject[nid].name;
                    }; // end IF already eaten
                }
            }; // end of IF obj here or carried
            break;
        case "drink":
            // is the object here or carried
            if (Oobject[nid].isCarried == 'y' || (Oobject[nid].currentRoom == varRID && (Oroom[varRID].isLitYN == 'y' || lightIsOn == true))) {
                if (Oobject[nid].canBeEaten == 'y') // can be eaten which is same as drink?
                {
                    if (Oobject[nid].isEaten == 'n') //isnt already drunk
                    {
                        Oobject[nid].isEaten = 'y';
                        if (Oobject[nid].eatMess != 'xx') // make sure there is an eatmessage
                        {
                            returnValue += firstCap(Oobject[nid].eatMess);
                        } else {
                            returnValue += drinkTxt + " " + Oobject[nid].name;
                        }; //end IF eat message
                        if (Oobject[nid].eatenObject != 'xx') // theres a new obj after eaten
                        {
                            let nob = parseFloat(Oobject[nid].eatenObject);
                            if (invent.length < itemsLimit && Oobject[nid].isCarried == 'n') // room in inv for item and current item not carried
                            {
                                // addtoinv is function to add to ionventory
                                if (addToInv(nob) == true) // can it be added
                                {
                                    Oobject[nid].currentRoom = 9999; // send old obj to heaven
                                    returnValue += '<br />The ' + Oobject[nob].name + " " + inInvTxt;
                                };
                            } // end of obj not in inv and room in inv
                            else if (invent.length <= itemsLimit && Oobject[nid].isCarried == 'y') // room if this item which is carried goes
                            {
                                // add new ob and derop old
                                if (addToInv(nob, true, nid) == true) {
                                    //now destroy the old as its eaten
                                    Oobject[nid].currentRoom = 9999;
                                    returnValue += '<br />The ' + Oobject[nob].name + " " + inInvTxt;
                                };

                            } // end of obj carried in inv 
                            else if (Oobject[nid].isCarried == 'n' && invent.length >= itemsLimit) // no room in inv and obj not in inv
                            {
                                Oobject[nid].isCarried = 'n'; //
                                Oobject[nid].currentRoom = 9999;
                                Oobject[nob].isCarried = 'n';
                                Oobject[nob].currentRoom = varRID;
                                returnValue += '<br />The ' + Oobject[nob].name + " " + notFitInInv;
                            };
                            statCheck(statUse.MIN, statType.STRENGTH, true);
                        }; // end of IF new obj after eaten
                    } else {
                        returnValue += drinkNoMore + " " + Oobject[nid].name;
                    }; // end IF already eaten
                }
            }; // end of IF obj here or carried            
            break;
        case "fight":
            if (bolIsObj == false && bolIsPeep == true) // its a person
            {
                if (Opeeps[nid].currentRoom == varRID && Opeeps[nid].isHiddenYN == 'n' && Opeeps[nid].canFightYN == 'y') //is here, not hidden and can fight
                {
                    var bolFights = rollDice(Opeeps[nid].combat, stat_combat);
                    bolFights = true;
                    if (bolFights == true) {
                        returnValue += deathRevealsEtc(nid);
                    } // end of bolfFight == true
                    else {
                        returnValue += stat_noCombat;
                    };
                } // end here, not hidden and can fight
                // instead of fighting peep submits if player carrying an item
                else if (Opeeps[nid].submissionItem != 'xx') {

                    let subID = parseFloat(Opeeps[nid].submissionItem);
                    returnValue += deathRevealsEtc(nid, subID);






                } else if (Opeeps[nid].currentRoom == varRID && Opeeps[nid].isHiddenYN == 'n' && Opeeps[nid].canFightYN == 'n') {
                    returnValue += Opeeps[nid].name + " " + noFight;
                };
            } else {
                returnValue += noFighting;
            };
            break;
        case "resuss":
            if (Oroom[varRID].isLitYN == 'y' || lightIsOn == true) {


                // bring peep back
                if (bolIsObj == false && bolIsPeep == true) {
                    if (rollDice(2, stat_strength) == true) { // win dice roll

                        if (Opeeps[nid].canRessusYN == 'y' && Opeeps[nid].isDeadYN == 'y') // can resuss and is dead
                        {

                            Opeeps[nid].isDeadYN = 'n';
                            // set toher values back to default
                            Opeeps[nid].name = getXmlValue('people.xml', 'person', 'id', nid, 'name');
                            Opeeps[nid].description = getXmlValue('people.xml', 'person', 'id', nid, 'description') + '. Not looking any better for almost dying';
                            Opeeps[nid].canTalkYN = getXmlValue('people.xml', 'person', 'id', nid, 'canTalk');
                            Opeeps[nid].defaultSay = getXmlValue('people.xml', 'person', 'id', nid, 'defaultSay') + ' and I am not fighting anyone, ever again';
                            Opeeps[nid].isFollowingYN = getXmlValue('people.xml', 'person', 'id', nid, 'isFollowing');
                            if (Opeeps[nid].resussMess != "xx") {
                                returnValue += firstCap(Opeeps[nid].resussMess);
                            } else {
                                returnValue += resussTxt + " " + Opeeps[nid].call + ", " + resussTxtPT2 + " " + Opeeps[nid].name + ". " + Opeeps[nid].call + " looks at you and says 'I am never fighting again!";
                            };

                            statCheck(statUse.MAX, statType.CHARISMA, true);
                            statCheck(statUse.MID, statType.MOOD, true);

                        } else if (Opeeps[nid].canRessusYN == 'n' && Opeeps[nid].isDeadYN == 'y') // no resuss but is dead
                        {
                            returnValue += noResuss + " " + Opeeps[nid].call;
                            statCheck(statUse.MID, statType.MOOD, false);
                            statCheck(statUse.MIN, statType.CHARISMA, false);
                        } else if (Opeeps[nid].canRessusYN == 'y' && Opeeps[nid].isDeadYN == 'n') // can resuss but isnt dead
                        {
                            let psx = 'he';
                            if (Opeeps[nid].sex == 'f') {
                                psx = 'she';
                            }; //he or she
                            returnValue += dontResuss + " " + Opeeps[nid].call + " as " + psx + " " + notDead;
                        }; // end can resuss but not dead

                    } // end win roll
                    else {
                        returnValue += stat_noStrength + "<br />" + noResuss + " " + Opeeps[nid].call;
                    };
                }; // end is person

            } // end light is on
            else {
                returnValue += "<br />" + tooDarkForPeep;
            }; // end light is off
            break;
        case "bring":
            // cannot think of use for this currently so atm the bring is replaced with get in geneeral.js at Replacements
            break;
        case "make":
            // ******* phase 2 - when user gets info about what two things will make ********
            break;
        case "buy":
            // can item be bought? is seller here? does use have enough money or tradeable value

            /* before all the stuff below check to see if it is stock in a shop and whether you can buy it from the current room. Then you have to remove it the stock list etc */

            var stockListIDs = stockIDS();
            let stkLmt = stockListIDs.length;
            var bolBought = false;
            if (stkLmt > 0) {
                // now see if the object in the list is the noun
                if (bolIsObj == true) {
                    for (st = 0; st < stkLmt; st++) {
                        if (Oobject[nid].id == stockListIDs[st] && bolBought == false) {
                            // the object is in the shop stock list
                            var thePrice = 0;
                            if (Oobject[nid].itemValue != 'xx') {
                                thePrice = parseFloat(Oobject[nid].itemValue);
                                if (cash >= thePrice) {
                                    cash = cash - thePrice;
                                    if (addToInv(Oobject[nid].id) == true) {
                                        returnValue += exchText + " " + thePrice + " credits for the " + Oobject[nid].name + ". " + putInInv;
                                        Oobject[nid].isHidden = 'n';
                                        var el = document.getElementById('money');
                                        el.textContent = "Funds: " + cshSy + cash.toFixed(2);
                                        // put the peep description back to normal, just incase obj was given to him/her
                                        statCheck(statUse.MID, statType.DEXTERITY, true);
                                        bolBought = true;

                                    } else {
                                        Oobject[nid].currentRoom = varRID;
                                        Oobject[nid].isHidden = 'n';
                                        returnValue += "br />" + exchText + " " + thePrice + " credits for the " + Oobject[nid].name + ". It " + notFitInInv;
                                        statCheck(statUse.MID, statType.DEXTERITY, true);
                                        bolBought = true;

                                    }; // end of add to inv = true
                                } else { // not enough cash
                                    returnValue += "Sorry but you do not have enough cash to buy the " + Oobject[nid].name;
                                    statCheck(statUse.MIN, statType.CHARISMA, false);

                                }; // end not enough cash
                            }; // end has price
                            break;
                        };
                    };
                };
            }; // end stkLmt.length > 0


            if (bolIsObj == true && bolBought == false) {
                if (Oobject[nid].itemForSaleYN == 'y' && Oobject[nid].isCarried == 'n') // can be bought and isnt carried
                {
                    let pid = parseFloat(Oobject[nid].sellerID); // get sellers id
                    if (Opeeps[pid].currentRoom != varRID) // seller not here
                    {
                        returnValue += cantBuy + " " + Oobject[nid].name + " " + sellerGone;
                    } else // seller is here
                    {
                        var buyPrice = 0;


                        // check value
                        if (Oobject[nid].itemValue != 'xx') // item has a value
                        {
                            buyPrice = parseFloat(Oobject[nid].itemValue);
                            if (rollDice(Opeeps[pid].weariness, stat_charisma) == false) { // charisma loses over weariness

                                // increase the price
                                buyPrice += buySell_variant;
                                returnValue += stat_noCharisma + "<br />Because of this the seller has increased the purchase price to " + cshSy + buyPrice.toFixed(2);
                            };

                            // exchange money for item
                            if (cash >= buyPrice) // more cash than value
                            {
                                cash = cash - buyPrice;
                                if (addToInv(Oobject[nid].id) == true) {
                                    returnValue += exchText + " " + buyPrice + " credits for the " + Oobject[nid].name + ". " + putInInv;
                                    Oobject[nid].isHidden = 'n';
                                    var el = document.getElementById('money');
                                    el.textContent = "Funds: " + cshSy + cash.toFixed(2);
                                    // put the peep description back to normal, just incase obj was given to him/her
                                    statCheck(statUse.MID, statType.DEXTERITY, true);

                                    Opeeps[pid].description = getXmlValue('people.xml', 'person', 'id', pid, 'description');
                                } else {
                                    Oobject[nid].currentRoom = varRID;
                                    Oobject[nid].isHidden = 'n';
                                    returnValue += "br />" + exchText + " " + buyPrice + " credits for the " + Oobject[nid].name + ". It " + notFitInInv;
                                    statCheck(statUse.MID, statType.DEXTERITY, true);

                                    Opeeps[pid].description = getXmlValue('people.xml', 'person', 'id', pid, 'description');
                                }; // end of add to inv = true
                            } // end of cash >= arrobject[nid][42]
                            else { // not enough cash
                                returnValue += "Sorry but you do not have enough cash to buy the " + Oobject[nid].name;
                                statCheck(statUse.MIN, statType.CHARISMA, false);

                            }; // end not enough cash



                            // ********** V2 barter with objects *************

                        }; // end IF has value





                    }; // end seller is here

                } // end IF can be bought and isnt carried
                else if (Oobject[nid].itemForSaleYN == 'y' && Oobject[nid].isCarried == 'y') {
                    returnValue += buyNoMore + " " + Oobject[nid].name;
                } // end IF can be bought but already carried
                else if (Oobject[nid].itemForSaleYN == 'n') {
                    returnValue += cantBuy + " " + Oobject[nid].name;
                }; // end IF cannot be bought
            }; // end IF bolisobj==true

            break;

        case "sell":
            // can it be traded and is it carried?
            if (bolIsObj == true) {
                if (Oobject[nid].isTradeable == 'y' && Oobject[nid].isCarried == 'y') {
                    // is the seller here
                    let pid = Oobject[nid].sellerID;

                    if (Opeeps[pid].currentRoom == varRID) {
                        var sellPrice = 0;
                        sellPrice = Oobject[nid].itemValue;
                        if (rollDice(Opeeps[pid].weariness, stat_charisma) == false) {
                            sellPrice -= buySell_variantkl
                            if (sellPrice < 0) {
                                sellPrice = 1;
                            };
                            returnValue += stat_noCharisma + "<br />Because of this the buyer will not pay more than " + cshSy + sellPrice.toFixed(2);
                        };
                        Oobject[nid].currentRoom = 9999;
                        Oobject[nid].isCarried = 'n';
                        Oobject[nid].isHidden = 'y';
                        cash += sellPrice;
                        let el = document.getElementById('money');
                        el.textContent = "Funds: " + cshSy + cash.toFixed(2);
                        returnValue += "<br />" + soldTxt + " " + Oobject[nid].name + ' to ' + Opeeps[pid].name + " for " + sellPrice + " credits.<br />" + Oobject[nid].saleMess;
                        statCheck(statUse.MID, statType.DEXTERITY, true);
                        statCheck(statUse.MIN, statType.MOOD, true);


                    } // end buyer is here
                    else {
                        returnValue += cantSell + " " + Oobject[nid].name + " to anybody here";
                    }; // end buyer not here

                } // end can be traded and is carried
                else if (Oobject[nid].isTradeable == 'n' && Oobject[nid].isCarried == 'y') { // cannot be sold but is carried
                    returnValue += cantSell + " " + Oobject[nid].name + ". " + alwaysYours;
                } else if (Oobject[nid].isCarried == 'n') {
                    // not even carried
                    returnValue += notYoursToSell;
                };
            }; // end IF bolisobj==true

            break;
        case "open":

            // check object here (or carried) and is not open and can be opened (ie not 'xx' at 48 - is open) and is not hidden
            if (bolIsObj == true) {
                if ((Oobject[nid].currentRoom == varRID || Oobject[nid].isCarried == 'y') && Oobject[nid].isOpen == 'n' && Oobject[nid].isHidden == 'n' && Oobject[nid].isLocked == 'n') {
                    Oobject[nid].isOpen = 'y';
                    returnValue += firstCap(Oobject[nid].openMess);
                    // does open reveal another object
                    if (Oobject[nid].openReveals != 'xx') {
                        let oid = Oobject[nid].openReveals;
                        Oobject[oid].currentRoom = varRID;
                        Oobject[oid].isCarried = 'n';
                        returnValue += "<br />Opening the " + Oobject[nid].name + " reveals " + Oobject[oid].prefix + " " + Oobject[oid].name + " " + putOnFloor;
                        Oobject[nid].isOpen = 'y'; //set object as open
                        Oobject[nid].openReveals = 'xx'; // no longer reveals a new object if opened again
                        statCheck(statUse.MIN, statType.DEXTERITY, true);

                    } else if (Oobject[nid].revealRoom != 'xx') // openreveals what room?
                    {
                        let rid = Oobject[nid].openReveals;
                        Oroom[rid].roomIsRevealed = 'y';
                        Oroom[rid].blockedTxt = 'xx';
                        returnValue += "<br />Opening the " + Oobject[nid].name + " reveals a route to " + Oroom[rid].name;
                        statCheck[statUse.MIN, statType.MOOD, true];
                    } else {
                        if (Oobject[nid].openMess != "xx") {
                            returnValue += ". " + Oobject[nid].openMess;
                        };
                        returnValue += "The " + Oobject[nid].name + " is empty";
                        statCheck(statUse.MIN, statType.MOOD, false);
                    }; // end IF reveals another obj
                } else if ((Oobject[nid].currentRoom == varRID || Oobject[nid].isCarried == 'y') && Oobject[nid].isOpen == 'n' && Oobject[nid].isHidden == 'n' && Oobject[nid].isLocked == 'y') {
                    returnValue += "The " + Oobject[nid].name + " " + lockedTxt;
                    statCheck(statUse.MID, statType.MOOD, false);
                } else if ((Oobject[nid].currentRoom == varRID || Oobject[nid].isCarried == 'y') && Oobject[nid].isOpen == 'y' && Oobject[nid].isHidden == 'n') {
                    // it is already open
                    returnValue += "The " + Oobject[nid].name + " " + openTxt;

                } else if ((Oobject[nid].currentRoom != varRID && Oobject[nid].isCarried == 'n') || Oobject[nid].isHidden == 'y') {
                    // obj is not here and not carried or is hidden
                    returnValue += cantOpen;
                }; // end all IFS about object carried, here, hidden or open       
            }; // end IF bolisobj == true


            break;

        case "close":
            if (bolIsObj == true) {
                if (Oobject[nid].isOpen == 'y' && (Oobject[nid].currentRoom == varRID || Oobject[nid].isCarried == 'y')) // is open and here or carried
                {
                    Oobject[nid].isOpen = 'n';
                    returnValue += "The " + Oobject[nid].name + " " + closeTxt;
                    if (Oobject[nid].isImportant == 'y') {
                        statCheck(statUse.MID, statType.DEXTERITY, true);
                        statCheck(statUse.MIN, statType.MOOD, true);
                    };
                } else if (Oobject[nid].isOpen == 'n' && (Oobject[nid].currentRoom == varRID || Oobject[nid].isCarried == 'y')) {
                    returnValue += "The " + Oobject[nid].name + " " + notOpen;
                };
            }; // end IF bolisobj == true

            break;
        case "dance":
            // cant quite see the point but maybe in v2
            returnValue += danceTxt;
            break;
        case "pick":
            if (bolIsObj == true) {
                if (Oobject[nid].isLocked == 'y' && (Oobject[nid].currentRoom == varRID || Oobject[nid].isCarried == 'y')) { // is here / carried and is locked
                    // now lets see if plyr has enough dexterity to do this. Its got to be tough
                    if (pickAttempts < max_pickFails) {


                        if (rollDice((stat_maxAmnt * 2), stat_dexterity) == true) {
                            Oobject[nid].isLocked = 'n';
                            returnValue += pickLockTxt + " " + Oobject[nid].name;
                            pickAttempts = 0;
                            if (Oobject[nid].isImportant == 'y') {
                                statCheck(statUse.MID, statType.DEXTERITY, true);
                                statCheck(statUse.MIN, statType.MOOD, true);
                            };
                        } // end roll dice wins
                        else {
                            returnValue += stat_noDexterity;
                            pickAttempts++;
                        }; // end roll dice loses
                    } else {
                        returnValue += tooManyPickFailsTxt;
                    };
                } else if (Oobject[nid].currentRoom != varRID && Oobject[nid].isCarried == 'n') { // not here or carried
                    returnValue += "The " + Oobject[nid].name + " " + notHere;
                } else if (Oobject[nid].isLocked == 'n' && (Oobject[nid].currentRoom == varRID || Oobject[nid].isCarried == 'y')) { // not locked
                    returnValue += "The " + Oobject[nid].name + " is already unlocked";
                };
            };

            break;
        case "undo":

            var bolUn = false;
            if (bolIsObj == true) {
                if (Oobject[nid].isLocked == 'y' && (Oobject[nid].currentRoom == varRID || Oobject[nid].isCarried == 'y')) //is locked and here /carried
                {
                    let secID = parseFloat(Oobject[nid].objUsesWith);
                    if (secID != 9999) // is a real object
                    {
                        if (Oobject[secID].currentRoom == varRID || Oobject[secID].isCarried == 'y') // second object is here
                        {
                            Oobject[nid].isLocked = 'n';
                            returnValue += "You use the " + Oobject[secID].name + " " + unlockTxt + " " + Oobject[nid].name;
                            if (Oobject[nid].isImportant == 'y' || Oobject[secID].isImportant == 'y') {
                                statCheck(statUse.MID, statType.DEXTERITY, true);
                                statCheck(statUse.MIN, statType.MOOD, true);
                            };
                        };
                    }; // end is real object

                    bolUn = true;
                } // end is unlocked etc
                else if (Oobject[nid].isLocked == 'n' && (Oobject[nid].currentRoom == varRID || Oobject[nid].isCarried == 'y')) // making it unlock
                {
                    let secID = parseFloat(Oobject[nid].objUsesWith);
                    if (secID != 9999) // is a real object
                    {
                        if (Oobject[secID].currentRoom == varRID || Oobject[secID].isCarried == 'y') // second object is here
                        {
                            Oobject[nid].isLocked = 'y';
                            returnValue += "You use the " + Oobject[secID].name + " " + lockTxt + " " + Oobject[nid].name + ", " + abmonishLocked;
                            if (Oobject[nid].isLocked == 'y' || Oobject[secID].isImportant == 'y') {
                                statCheck(statUse.MID, statType.DEXTERITY, true);
                                statCheck(statUse.MIN, statType.MOOD, true);
                            };
                        };
                    }; // end is real object

                    bolUn = true;
                } // end IF already locked    
                else {
                    if (Oobject[nid].revealRoom != 'xx' && (Oobject[nid].hasBeenUsed == 'n' || Oobject[nid].multiUse == 'y')) {
                        let trm = Oobject[nid].revealRoom;
                        if (Oroom[trm].blockedTxt != 'xx' && (Oobject[nid].currentRoom == varRID || Oobject[nid].isCarried == 'y')) {
                            for (e = 7; e < 15; e++) {
                                let exName = '';
                                switch (e) {
                                    case 7:
                                        exName = 'northTo';
                                        break;
                                    case 8:
                                        exName = 'eastTo';
                                        break;
                                    case 9:
                                        exName = 'southTo';
                                        break;
                                    case 10:
                                        exName = 'westTo';
                                        break;
                                    case 11:
                                        exName = 'upTo';
                                        break;
                                    case 12:
                                        exName = 'downTo';
                                        break;
                                    case 13:
                                        exName = 'inTo';
                                        break;
                                    case 14:
                                        exName = 'outTo';
                                        break;
                                    default:
                                        exName = 'northTo';
                                        break;
                                }
                                if (Oroom[trm][exName] == varRID && Oroom[trm].roomIsRevealed == 'n') {
                                    Oroom[trm].roomIsRevealed = 'y';
                                    Oroom[trm].blockedTxt = 'xx';
                                    Oobject[nid].hasBeenUsed = 'y';
                                    returnValue += "<br />" + firstCap(Oobject[nid].openMess);
                                    break;
                                }; // end if exit is current room and room is not revealed
                            }; // end for loop
                        }; //end if room blocking not xx and object carried/here
                        bolUn = true;
                    }; // end if obj reveal room is not xx and obj can be used

                }; // end of else


            }; //end bolisobj
            if (bolUn == false) {

                var indivWds = fullInput.split(' ');
                for (w = 0; w < indivWds.length; w++) {
                    let nn = indivWds[w].toLowerCase();


                    for (rr = 0; rr < Oobject.length; rr++) {
                        if (Oobject[rr].revealRoom != "xx" && (Oobject[rr].hasBeenUsed == 'n' || Oobject[rr].multiUse == 'y') && Oobject[rr].isCarried == 'y' && Oobject[rr].actionWhenUsed == 'unlock') {

                            let nr = Oobject[rr].revealRoom;
                            for (e = 7; e < 15; e++) {
                                let exName = '';
                                switch (e) {
                                    case 7:
                                        exName = 'northTo';
                                        break;
                                    case 8:
                                        exName = 'eastTo';
                                        break;
                                    case 9:
                                        exName = 'southTo';
                                        break;
                                    case 10:
                                        exName = 'westTo';
                                        break;
                                    case 11:
                                        exName = 'upTo';
                                        break;
                                    case 12:
                                        exName = 'downTo';
                                        break;
                                    case 13:
                                        exName = 'inTo';
                                        break;
                                    case 14:
                                        exName = 'outTo';
                                        break;
                                    default:
                                        exName = 'northTo';
                                        break;
                                }
                                if (Oroom[nr][exName] == varRID && Oroom[nr].roomIsRevealed == 'n' && Oroom[nr].blockedTxt.includes(nn) == true) {
                                    Oroom[nr].roomIsRevealed = 'y';
                                    Oroom[nr].blockedTxt = 'xx';
                                    Oobject[rr].hasBeenUsed = 'y';
                                    returnValue += "<br />" + firstCap(Oobject[rr].openMess);
                                    break;
                                }; //end does exit from reveal room = this room and that room is not revealed 
                            }; //end loop thru exits

                        }; // end if revealroom is not xx, objects can be used and is carried and the use action is unlock
                    }; // end for loop thru all objects


                }; //end loop thru words in input

            };

            break;
        case "engage":
            if (bolIsObj == true) {
                if (Oobject[nid].isLocked == 'n' && (Oobject[nid].currentRoom == varRID || Oobject[nid].isCarried == 'y')) //is locked and here /carried
                {
                    let secID = parseFloat(Oobject[nid].objUsesWith);
                    if (secID != 9999) // is a real object
                    {
                        if (Oobject[secID].currentRoom == varRID || Oobject[secID].isCarried == 'y') // second object is here
                        {
                            Oobject[nid].isLocked = 'y';
                            returnValue += "You use the " + Oobject[secID].name + " " + lockTxt + " " + Oobject[nid].name;
                            if (Oobject[nid].isImportant == 'y' || Oobject[secID].isImportant == 'y') {
                                statCheck(statUse.MID, statType.DEXTERITY, true);
                                statCheck(statUse.MIN, statType.MOOD, true);
                            };
                        };
                    }; // end is real object


                } // end is unlocked etc
                else if (Oobject[nid].isLocked == 'y' && (Oobject[nid].currentRoom == varRID || Oobject[nid].isCarried == 'y')) // making it unlock
                {
                    let secID = parseFloat(Oobject[nid].objUsesWith);
                    if (secID != 9999) // is a real object
                    {
                        if (Oobject[secID].currentRoom == varRID || Oobject[secID].isCarried == 'y') // second object is here
                        {
                            Oobject[nid].isLocked = 'n';
                            returnValue += useTxt + " " + Oobject[secID].name + " " + unlockTxt + " " + Oobject[nid].name + ", " + abmonishLocked;
                            if (Oobject[nid].isImportant == 'y' || Oobject[secID].isImportant == 'y') {
                                statCheck(statUse.MID, statType.DEXTERITY, true);
                                statCheck(statUse.MIN, statType.MOOD, true);
                            };
                        };
                    }; // end is real object


                }; // end IF already locked        
            }; // end IF bolisobj==true

            break;
        case "enter":
            // not really got any use for this currently. If a use is required then you need to remove the replace "enter" and  "exit" near the beginning of afterEnter() in general.js
            break;
        case "exit":
            // not really got any use for this currently. If a use is required then you need to remove the replace "enter" and  "exit" near the beginning of afterEnter() in general.js
            break;
        case "fix":
            // this is same as "mend" in use"
            if (bolIsObj == true) {
                if (Oobject[nid].mendsWith != 'xx' && Oobject[nid].isBroken == 'y') // can be mended and is broken
                {
                    let nob = parseFloat(Oobject[nid].mendsWith);
                    if (Oobject[nob].currentRoom = varRID || Oobject[nob].isCarried) //mend obj is here or carried
                    {
                        if (rollDice(Oobject[nid].strength, stat_dexterity) == true) { // dexterity good enough


                            // this will only fix an object that has been broken but not swapped for a broken obj
                            Oobject[nid].isBroken = 'n'; // set to not broken
                            returnValue += 'The ' + Oobject[nid].name + ' ' + fixedTxt + " " + Oobject[nob].name;
                            if (Oobject[nob].isImportant == 'y') {
                                statCheck(statUse.MID, statType.DEXTERITY, true);
                                statCheck(statUse.MIN, statType.MOOD, true);
                                statCheck(statUse.MIN, statType.CHARISMA, true);
                            };
                        } // end dexterity good enough
                        else {
                            returnValue += stat_noDexterity + "<br />The " + Oobject[nid].name + " " + noMend;
                        }; // end dexterity not good enough
                    } else // mend obj is not present
                    {
                        returnValue += 'The ' + Oobject[nid].name + " " + noMend;
                    }; // end of mend obj here and carried
                }; // end of can be mended and is broken         
            }; // end IF bolisobj==true

            break;

        case "break":
            // apply damage to objects which can be broken '18'

            if (Oobject[nid].canBeBroken == 'y' && Oobject[nid].isBroken == 'n') {

                if (Oobject[nid].isImportant != 'y') //is not important
                {
                    // see if enough stats to make it work
                    var bolStrength = rollDice(parseFloat(Oobject[nid].strength), stat_strength);

                    if (bolStrength == true) {


                        Oobject[nid].isBroken = 'y'; // is broken

                        if (Oobject[nid].brokenObject != 'xx' && Number.isNaN(parseFloat(Oobject[nid].brokenObject)) == false) // replace with a diff object
                        {
                            let nob = parseFloat(Oobject[nid].brokenObject);
                            if (Oobject[nid].isCarried == 'y') {
                                addToInv(nob, true, nid);


                                Oobject[nob].isCarried = 'y'; // new obj to inv
                                Oobject[nid].isCarried = 'n'; //drop obj
                                Oobject[nid].currentRoom = 9999; //send to heaven
                            } else {
                                Oobject[nob].currentRoom = varRID; //new obj to here
                                Oobject[nid].currentRoom = 9999; //old obj to heaven
                            };
                        }; // end of has to be replaced
                        returnValue += firstCap(Oobject[nid].breakMess);
                    } // end of bolstrength==true
                    else {
                        returnValue += stat_noStrength;
                    };
                } //end of not important
                else {
                    statCheck(statUse.MID, statType.CHARISMA, false);
                    returnValue += firstCap(Oobject[nid].importantMessage); //send important message
                }; // end of is too important for that
            };
            break;




        case "give":

            var bolSwapped = false;
            // first try it with structure being "give box to billy"
            if (bolIsObj == true) {
                // first see if can give to person (obj-sellByID) in this room (43) then get id of combinecreates (32). if 32 is at 9999 and not used then swap objs
                if (Oobject[nid].sellerID != 'xx' && Oobject[nid].combineCreates != "xx") {
                    let pid = parseFloat(Oobject[nid].sellerID);
                    if (Opeeps[pid].currentRoom == varRID) {
                        let nnid = parseFloat(Oobject[nid].combineCreates);
                        if (Oobject[nnid].currentRoom = 9999) {
                            addToInv(nnid, true, nid);
                            returnValue += "<br />" + swapTxt + " " + Oobject[nid].name + " and get back " + Oobject[nnid].prefix + " " + Oobject[nnid].name;
                            bolSwapped = true;
                        } //end new obj is still uncreated
                        else {
                            returnValue += "<br />The " + Oobject[nnid].name + " is no longer retrievable";
                        }; //end obj has been created already
                    } //end person is here
                    else {
                        returnValue += "<br />Giving the " + Oobject[nid].name + " away now would be a mistake";
                    }; //end peep not here
                } // end can give to person
                // else if right room and person and revealroom (30) != xx then get room id set room-isrevealed (16) to 'y' & blocking (17) to 'xx' 
                else if (Oobject[nid].revealRoom != "xx" && Oobject[nid].sellerID != "xx" && (Oobject[nid].currentRoom == varRID || Oobject[nid].isCarried == "y")) {
                    let pid = Oobject[nid].sellerID;
                    if (Opeeps[pid].currentRoom == varRID) { // check relevant peep is here
                        let nrid = Oobject[nid].revealRoom;
                        Oroom[nrid].roomIsRevealed = 'y';
                        Oroom[nrid].blockedTxt = 'xx';
                        if (Oobject[nid].importantMessage != "xx" && (Oobject[nid].hasBeenUsed == "n" || Oobject[nid].multiUse == "y")) {
                            returnValue += "<br />" + firstCap(Oobject[nid].importantMessage) + ". You can now enter " + Oroom[nrid].name;
                        } else if (Oobject[nid].importantMessage == "xx" && (Oobject[nid].hasBeenUsed == "n" || Oobject[nid].multiUse == "y")) {
                            returnValue += "<br />" + swapTxt + " " + Oobject[nid].name + " and you can now enter " + Oroom[nrid].name;
                        };
                        Oobject[nid].hasBeenUsed = "y";
                        bolSwapped = true;
                    } else {
                        returnValue += "<br />There is no one here to accept the " + Oobject[nid].name;
                        break;
                    };

                }; //end reveals room and the right person is here






                if (bolSwapped == false) {


                    var pName = '';
                    for (x = 0; x < Opeeps.length; x++) {
                        let pn = Opeeps[x].name.toLowerCase();
                        let pn2 = Opeeps[x].call.toLowerCase();
                        if (fullInput.includes(pn) || fullInput.includes(pn2)) {

                            if (Opeeps[x].currentRoom == varRID) {
                                pName = Opeeps[x].call;

                                // now we can give the object to the person, if possible
                                if ((Oobject[nid].isCarried == 'y' || Oobject[nid].currentRoom == varRID) && Oobject[nid].isHidden == 'n' && Oobject[nid].isTradeable == 'y') {
                                    Oobject[nid].currentRoom = 9999;
                                    Oobject[nid].isCarried = 'n';
                                    Oobject[nid].isHidden = 'y';
                                    Oobject[nid].sellerID = x;
                                    Oobject[nid].itemForSaleYN = 'y';
                                    Opeeps[x].description += ". " + Opeeps[x].call + " is holding " + Oobject[nid].prefix + " " + Oobject[nid].name + ". " + canBuy + " " + Oobject[nid].itemValue + " credits";

                                    returnValue += givenTxt + " " + Oobject[nid].name + ' to ' + pName + " for nothing. " + pName + " says 'Thanks'";
                                    statCheck(statUse.MIN, statType.CHARISMA, true);
                                } else {
                                    returnValue += cantGive + " " + Oobject[nid].name + " to " + pName;
                                    statCheck(statUse.MID, statType.CHARISMA, false);
                                }; // end IF obj is here/carried & not hidden & is tradeable

                                break; // exit the for loop
                            }; // end is person here

                        }; // end IF input includes name of person
                    }; // end FOR loop

                }; // end bolswapped == false                     




            } // end bolIsObj
            else if (bolIsPeep == true) {

                var oName = '';
                for (x = 0; x < Oobject.length; x++) {
                    let oNm = Oobject[x].name.toLowerCase();

                    if (fullInput.includes(oNm)) {

                        if (Opeeps[nid].currentRoom == varRID) {

                            // first see if can give to person in this room (43) then get id of combinecreates (32). if 32 is at 9999 and not used then swap objs
                            if (Oobject[x].sellerID != 'xx' && Oobject[x].combineCreates != "xx") {
                                let pid = parseFloat(Oobject[x].sellerID);
                                if (Opeeps[pid].currentRoom == varRID) {
                                    let nnid = parseFloat(Oobject[x].combineCreates);
                                    if (Oobject[nnid].currentRoom = 9999) {
                                        addToInv(nnid, true, x);
                                        returnValue += "<br />" + swapTxt + " " + Oobject[x].name + " and get back " + Oobject[nnid].prefix + " " + Oobject[nnid].name;
                                        bolSwapped = true;
                                    } //end new obj is still uncreated
                                    else {
                                        returnValue += "<br />The " + Oobject[nnid].name + " is no longer retrievable";
                                    }; //end obj has been created already
                                } //end person is here
                                else {
                                    returnValue += "<br />Giving the " + Oobject[x].name + " away now would be a mistake";
                                }; //end peep not here
                            } // end can give to person
                            // else if right room and person and revealroom (30) != xx then get room id set room-isrevealed (16) to 'y' & blocking (17) to 'xx' 
                            else if (Oobject[x].revealRoom != "xx" && (Oobject[x].hasBeenUsed == "n" || Oobject[x].multiUse == "y"))

                            {
                                let nrid = Oobject[x].revealRoom;
                                Oroom[nrid].roomIsRevealed = 'y';
                                Oroom[nrid].blockedTxt = 'xx';
                                if (Oobject[x].importantMessage != "xx") {
                                    returnValue += "<br />" + firstCap(Oobject[x].importantMessage) + ". You can now enter " + Oroom[nrid].name;
                                } else {
                                    returnValue += "<br />" + swapTxt + " " + Oobject[x].name + " and you can now enter " + Oroom[nrid].name;
                                };
                                Oobject[x].hasBeenUsed = "y";
                                bolSwapped = true;
                            }; //end reveals room and the right person is here                         

                            if (bolSwapped == false) {



                                if (Oobject[x].isCarried == 'y' || Oobject[x].currentRoom == varRID) {

                                    if (Oobject[x].isTradeable == 'y') {
                                        Oobject[x].currentRoom = 9999;
                                        Oobject[x].isCarried = 'n';
                                        Oobject[x].isHidden = 'y';
                                        Oobject[x].sellerID = nid;
                                        Oobject[x].itemForSaleYN = 'y';
                                        Opeeps[nid].description += ". " + Opeeps[nid].call + " is holding " + Oobject[x].prefix + " " + Oobject[x].name + ". " + canBuy + " " + Oobject[x].itemValue + " credits";


                                        returnValue += givenTxt + " " + oName + ' to ' + Opeeps[nid].call + " for nothing. " + Opeeps[nid].call + " says 'Thanks'";
                                        statCheck(statUse.MIN, statType.CHARISMA, true);
                                    } // end IF obj tradeable
                                    else {
                                        returnValue += cantGive + " " + oName + " to " + Opeeps[nid].name;
                                        statCheck(statUse.MIN, statType.CHARISMA, false);
                                    }; // end not tradeable
                                    break;
                                }; // end IF obj here or carried

                            }; //end bolswapped == false          



                        }; // end IF person here
                    }; // end IF input includes obj name
                }; // end FOR loop




            }; // end IF bolIsPeep


            break;
        case "help":
            // not really got any use for this atm
            if (bolIsPeep == true && Opeeps[nid].currentRoom == varRID) {
                returnValue += nothingCanDo + " " + Opeeps[nid].name;
            };
            break;
        case "jump":
            // no use yet
            returnValue += jumpTxt;
            break;
        case "leave":
            returnValue += whichDir;
            break;
        case "listen":
            if (Opeeps[nid].currentRoom == varRID) {
                returnValue += Opeeps[nid].call + " says '" + Opeeps[nid].defaultSay + "'. You could always try saying something to " + Opeeps[nid].sex;
            };
            break;
        case "move":
            returnValue += whichDir;
            break;
        case "nod":
            returnValue += nodTxt;
            break;
        case "push":
            // atm this is not used, instead push is a synonm for use
            break;
        case "pull":
            // atm this is not used, instead push is a synonm for use
            break;
        case "read":
            // just like exam

            if (bolIsObj == true) {

                if ((parseFloat(Oobject[nid].currentRoom) == varRID || Oobject[nid].isCarried == 'y') && Oobject[nid].isHidden == 'n') // if its here and not hidden
                {

                    //is it broken?
                    if (Oobject[nid].isBroken == 'y') {
                        returnValue += 'It is ' + Oobject[nid].prefix + ' ' + Oobject[nid].brokenObject; // it is A broken...... xxx
                        if (Oobject[nid].examRevealsObjID != 'xx') // exam reveals obj
                        {
                            let revOb = parseFloat(Oobject[nid].examRevealsObjID);
                            Oobject[revOb].currentRoom = varRID;
                            Oobject[revOb].isHidden = 'n';
                            returnValue += "<br />" + Oobject[revOb].prefix + " " + Oobject[revOb].name + " " + visAfterRead + " " + Oobject[nid].name;
                            if (Oobject[revOb].isImportant == 'y') {
                                statCheck(statUse.MIN, statType.CHARISMA, true);
                            };
                        }; // end IF exam reveals obj
                        break;
                    } else {
                        returnValue += 'The ' + Oobject[nid].name + ' is ' + Oobject[nid].description;
                        if (Oobject[nid].isOn == 'y') //is it on?
                        {
                            returnValue += '. It is on';
                        };
                        if (Oobject[nid].isOpen == 'y') //is it open
                        {
                            returnValue += ".<br />The " + Oobject[nid].name + " is open";
                        };
                        if (Oobject[nid].examRevealsObjID != 'xx') // exam reveals obj
                        {
                            let revOb = parseFloat(Oobject[nid].examRevealsObjID);
                            Oobject[revOb].currentRoom = varRID;
                            Oobject[revOb].isHidden = 'n';
                            returnValue += "<br />" + Oobject[revOb].prefix + " " + Oobject[revOb].name + " " + visAfterRead + " " + Oobject[nid].name;
                        }; // end IF exam reveals obj
                        // break;  
                    };

                }; // end of here or carried AND not hidden

                // poss show pic here in specialPic

            }; // end bolIsObj == true


            // if not return value, check to see if its a person
            if (bolIsObj == false && bolIsPeep == true) // could it be a person
            {

                if (parseFloat(Opeeps[nid].currentRoom) == varRID && Opeeps[nid].isHiddenYN == 'n') //is person here and not hidden
                {

                    returnValue += firstCap(Opeeps[nid].call) + ' is ' + Opeeps[nid].description;
                    break;
                };

            }; // end of bolIsObj == false
            //if still no return value return message
            if (returnValue == '') {
                returnValue += notHere + " to read";
            };






            break;
        case "send":
            if (bolIsObj == true && (Oobject[nid].isCarried == 'y' || Oobject[nid].currentRoom == varRID)) {
                returnValue += cantSend + " " + Oobject[nid].name + " to. Well no-where it can reach today";
            }; // end is object and it is here/carried
            break;
        case "sit":
            if (bolIsPeep == true && Opeeps[nid].currentRoom == varRID) {
                returnValue += "You try to make " + Opeeps[nid].call + " sit down, but " + Opeeps[nid].sex + " " + wonSit + " " + firstCap(Opeeps[nid].sex) + " is " + Opeeps[nid].stationaryTxt.toLowerCase();
            } else {
                returnValue += sitTxt;
            };

            break;
        case "smile":
            if (bolIsPeep == true && Opeeps[nid].currentRoom == varRID) {
                returnValue += "You try to smile at " + Opeeps[nid].call + " but " + Opeeps[nid].sex + " is not impressed. " + firstCap(Opeeps[nid].sex) + " scowls at you and you are left in no uncertain terms not to do that again";
            } else {
                returnValue += smileTxt;
            };

            break;
        case "stand":
            if (bolIsPeep == true && Opeeps[nid].currentRoom == varRID) {
                returnValue += "You try to make " + Opeeps[nid].call + " stand straight, but " + Opeeps[nid].sex + " does not want to be like that, so refuses and remains standing as " + Opeeps[nid].sex + " was." + firstCap(Opeeps[nid].sex) + " is " + Opeeps[nid].stationaryTxt.toLowerCase();
            } else {
                returnValue += standTxt;
            };
            break;
        case "throw":
            if (bolIsObj == true && (Oobject[nid].isCarried == 'y' || Oobject[nid].currentRoom == varRID) && Oobject[nid].isHidden == 'n') {
                if (Oobject[nid].isImportant == 'y' && Oobject[nid].brokenObject == 'xx') {
                    // obj is important
                    returnValue += cantThrow + " " + Oobject[nid].name + ". It is far too important for that sort of mistake";
                    statCheck(statUse.MID, statType.CHARISMA, false);
                } // end IF obj is important and there's no replacement obj
                else {
                    if (Oobject[nid].isCarried == 'y' && Oobject[nid].brokenObject != 'xx' && Number.isInteger(parseFloat(Oobject[nid].brokenObject))) { // is carried and is replacement
                        if (rollDice(1, stat_strength) == true) {


                            dropFromInv(nid, true);

                            let oid = Oobject[nid].brokenObject;
                            addToInv(oid);
                            returnValue += throwtxt + " " + Oobject[nid].name + " " + throwTxtPT2 + " " + Oobject[oid].prefix + " " + Oobject[oid].name + " lying on the floor. You pick it up and put it in your inventory";
                            if (Oobject[oid].isImportant == 'y') {
                                statCheck(statUse.MIN, statType.CHARISMA, true);
                            };

                        } // end strength wins
                        else {
                            returnValue += stat_noStrength + "<br />" + cantThrow + " " + Oobject[nid].name;
                        };
                    } else if (Oobject[nid].isCarried == 'n' && Oobject[nid].brokenObject != 'xx' && Number.isInteger(parseFloat(Oobject[nid].brokenObject))) { // is not carried but is replacement
                        if (rollDice(1, stat_strength) == true) {


                            let oid = Oobject[nid].brokenObject;
                            Oobject[nid].currentRoom = 9999;
                            Oobject[nid].isHidden = 'n';
                            Oobject[oid].currentRoom = varRID;
                            Oobject[oid].isHidden = 'y';
                            returnValue += throwtxt + " " + Oobject[nid].name + " " + throwTxtPT2 + " " + Oobject[oid].name + " lying on the floor";
                            if (Oobject[oid].isImportant == 'y') {
                                statCheck(statUse.MIN, statType.CHARISMA, true);
                            };
                        } // end strength wins
                        else {
                            returnValue += stat_noStrength + "<br />" + cantThrow + " " + Oobject[nid].name;
                        }; // end no throw due to strength
                    } else if (Oobject[nid].isCarried == 'y' && (Oobject[nid].brokenObject == 'xx' || Oobject[nid].brokenObject != parseFloat(Oobject[nid].brokenObject))) { // is carried but no replacement

                        if (Oobject[nid].isBroken == 'y') { // already been broken
                            returnValue += "The poor damaged " + Oobject[nid].name + " " + doesntThrow;

                        } else { // not already broken
                            Oobject[nid].isbroken = 'y';
                            Oobject[nid].description += ". It is broken";
                            Oobject[nid].canBeBroken = 'n';
                            returnValue += throwtxt + "" + Oobject[nid].name + " " + fliesFail;
                            if (Oobject[nid].isImportant == 'y') {
                                statCheck(statUse.MIN, statType.CHARISMA, false); // drop some charisma
                            };
                        }; // end IF broken
                    } else if (Oobject[nid].isCarried == 'n' && (Oobject[nid].brokenObject == 'xx' || Oobject[nid].brokenObject != parseFloat(Oobject[nid].brokenObject))) { // not carried and no replacement and [20] is a string
                        if (Oobject[nid].isbroken == 'y') { // already been broken
                            returnValue += "The poor damaged " + Oobject[nid].name + " " + doesntThrow + " It lies on the floor looking sad";
                            if (Oobject[nid].isImportant == 'y') {
                                statCheck(statUse.MIN, statType.CHARISMA, false);
                            };
                        } else { // not already broken
                            Oobject[nid].isbroken = 'y';
                            Oobject[nid].description += ". It is broken";
                            Oobject[nid].canBeBroken = 'n';
                            returnValue += "You launch the " + Oobject[nid].name + " " + fliesFailToFloor;
                            if (Oobject[nid].isImportant == 'y') {
                                statCheck(statUse.MIN, statType.CHARISMA, false); // lose some charisma
                            };
                        };
                    }; // end IF carried and replacement queries
                }; // end obj not important
            } // end obj is here/carried and not hidden
            break;
        case "turn":
            // if its on, turn it off vversa. If its in inv, drop it vversa,
            if (bolIsObj == true) {
                if ((Oobject[nid].currentRoom == varRID || Oobject[nid].isCarried == 'y') && Oobject[nid].isHidden == 'n') { //obj is here / carried and not hidden
                    if (Oobject[nid].isOn == 'y' && (Oobject[nid].hasBeenUsed == 'n' || (Oobject[nid].hasBeenUsed == 'y' && Oobject[nid].multiUse == 'y'))) { // is on or (is off or (is on and multi use))
                        Oobject[nid].isOn = 'n';
                        Oobject[nid].hasBeenUsed = 'y';
                        returnValue += "You turn the " + Oobject[nid].name + " off";
                        if (Oobject[nid].actionWhenUsed == 'light') {
                            lightIsOn = false;
                        };
                    } else if (Oobject[nid].isOn == 'n' && (Oobject[nid].hasBeenUsed == 'n' || (Oobject[nid].hasBeenUsed == 'y' && Oobject[nid].multiUse == 'y'))) {
                        Oobject[nid].isOn = 'y';
                        Oobject[nid].hasBeenUsed = 'y';
                        returnValue += "You turn the " + Oobject[nid].name + " on";
                        if (Oobject[nid].actionWhenUsed == 'light') {
                            lightIsOn = true;
                        };
                    } else if (Oobject[nid].hasBeenUsed == 'y' && Oobject[nid].multiUse == 'n') {
                        returnValue += "The " + Oobject[nid].name + " " + alreadyUsed;
                    }; // end IF checking obj on etc
                } else {
                    returnValue += "The " + Oobject[nid].name + " " + turnFail;

                }; // end IF here etc
            } else if (bolIsObj == false && bolIsPeep == false) {
                if (fullInput.includes(" north")) {

                    moveTo(varRID, "n");
                    returnValue = 'Turning north ' + cleverTxt + ' North';
                    break;
                } else if (fullInput.includes(" south")) {
                    moveTo(varRID, "s");
                    returnValue = 'Turning south ' + cleverTxt + ' south to me';
                    break;
                } else if (fullInput.includes(" east")) {
                    moveTo(varRID, "e");
                    returnValue = 'Turning east ' + cleverTxt + ' east to me';
                    break;
                } else if (fullInput.includes(" west")) {
                    moveTo(varRID, "w");
                    returnValue = 'Turning west ' + cleverTxt + ' west to me';
                    break;
                } else if (fullInput.includes(" up")) {
                    moveTo(varRID, "up");
                    returnValue = 'Turning up ' + cleverTxt + ' up to me and not simply arriving';
                    break;
                } else if (fullInput.includes(" in")) {
                    moveTo(varRID, "in");
                    returnValue = 'Turning in ' + cleverTxt + ' in to me and not going to bed';
                    break;
                } else if (fullInput.includes(" down")) {
                    moveTo(varRID, "down");
                    returnValue = 'Turning down ' + cleverTxt + ' down to me and not refusing something';
                    break;
                } else if (fullInput.includes(" out")) {
                    moveTo(varRID, "out");
                    returnValue = 'Turning out ' + cleverTxt + ' out to me and not how you dress';
                    break;
                };

            };
            break;
        case "wait":
            returnValue += dontWait;
            break;
        case "write":
            let theInput = fullInput.replace(/["]/g, "'"); // replace double quote with single to help following code
            theInput = theInput.replace("?", "");
            theInput = theInput.replace("!", "");
            theInput = theInput.replace(".", "");
            theInput = theInput.trim();
            let spkStart = theInput.indexOf("'");
            let spkEnd = theInput.lastIndexOf("'");
            if (spkEnd == spkStart) // make sure there is a second quote
            {
                spkEnd = theInput.length;

            };



            var spkString = theInput.substring(spkStart + 1, spkEnd);


            if (bolIsObj == true && Oobject[nid].actionWhenUsed == 'mark') { // eg "write "xxxx" with chalk





                if ((Oobject[nid].currentRoom == varRID || Oobject[nid].isCarried == 'y') && Oobject[nid].isHidden == 'n') {
                    if (Oobject[nid].hasBeenUsed == 'n' || (Oobject[nid].hasBeenUsed == 'y' && Oobject[nid].multiUse == 'y')) { // hasnt been used, or has and is mutli use
                        if (Oobject[nid].actionWhenUsed == 'mark') { // mark is a result of use variable but appropriate to use the same for write

                            // write 'xxx' with chalk on another obj  
                            let bol2obj = false;
                            for (zz = 0; zz < Oobject.length; zz++) {

                                if (fullInput.toLowerCase().includes(Oobject[zz].name) && Oobject[zz].name != Oobject[nid].name) { // includes another obj

                                    if (Oobject[zz].description.includes(" " + writtenOnTxt) == false) {
                                        Oobject[zz].description += "<br />The words '" + spkString + "' " + writtenOnTxt;
                                        returnValue += "You write '" + spkString + "' on the " + Oobject[zz].name + " using the " + Oobject[nid].name;
                                        Oobject[nid].hasBeenUsed = 'y';
                                    } else {
                                        Oobject[nid].description += "<br />Entry: '" + spkString + "'";
                                        returnValue += alreadyWrittenOn + " " + Oobject[nid].name;
                                    };
                                    bol2obj = true;
                                    break;
                                };
                            }; // end for loop


                            // write "xxx" with obj
                            if (bol2obj == false) {
                                returnValue += firstCap(Oobject[nid].resultOfUse);
                                Oobject[nid].hasBeenUsed = 'y';
                                if (Oroom[varRID].shortDescription.includes(" are marked on a nearby surface") == false) {
                                    Oroom[varRID].shortDescription += "<br />The words '" + spkString + "' are marked on a nearby surface";

                                };
                            };



                            if (Oobject[nid].isImportant == 'y') { // is important
                                statCheck(statUse.MIN, statType.DEXTERITY, true);
                            };
                        } // end if 'mark'
                        else { // cant write again

                            returnValue += cantWrite + " " + Oobject[nid].name;
                            if (Oobject[nid].isImportant == 'y') {
                                statCheck(statUse.MIN, statType.DEXTERITY, false);
                            };

                        };
                    } // hasnt been used or is mutli use
                    else if (Oobject[nid].hasBeenUsed == 'y' && Oobject[nid].multiUse == 'n') {
                        returnValue += cantWrite + " " + Oobject[nid].name + " again";
                    };
                } // end obj here / carried & not hidden
                else {
                    returnValue += "The " + Oobject[nid].name + " " + notSeen;
                }; // end not here


            } // end if is obj == true
            else if (bolIsObj == true && Oobject[nid].actionWhenUsed != 'mark') { // write "xxx" on box with chalk
                let obj2yes = false;
                for (zz = 0; zz < Oobject.length; zz++) {
                    if (fullInput.toLowerCase().includes(Oobject[zz].name) && Oobject[zz].name != Oobject[nid].name && Oobject[zz].actionWhenUsed == 'mark') { // includes another obj which can mark

                        if (Oobject[nid].description.includes(" " + writtenOnTxt) == false) {
                            Oobject[nid].description += "<br />The words '" + spkString + "' " + writtenOnTxt;
                            returnValue += "You write '" + spkString + "' on the " + Oobject[nid].name + " using the " + Oobject[zz].name;

                            Oobject[zz].hasBeenUsed = 'y';
                        } else {
                            Oobject[nid].description += "<br />Entry: '" + spkString + "'";
                            returnValue += alreadyWrittenOn + " " + Oobject[nid].name;
                        };
                        obj2yes = true;
                        break;
                    };
                };
                if (obj2yes == false) { // eg write "xxxx" on box
                    var obj2No = true;
                    for (ob = 0; ob < invent.length; ob++) {
                        let obNm = invent[ob];
                        for (ab = 0; ab < Oobject.length; ab++) {
                            if (obNm == Oobject[ab].name && Oobject[ab].actionWhenUsed == 'mark') {
                                if (Oobject[nid].description.includes(" " + writtenOnTxt) == false) {
                                    Oobject[nid].description += "<br />The words '" + spkString + "' " + writtenOnTxt;
                                    returnValue += "You write '" + spkString + "' on the " + Oobject[nid].name + " using the " + Oobject[ab].name;
                                    Oobject[ab].hasBeenUsed = 'y';
                                } else {
                                    Oobject[nid].description += "<br />Entry: '" + spkString + "'";
                                    returnValue += alreadyWrittenOn + " " + Oobject[nid].name;
                                }
                                obj2No = false;
                                break;
                            };
                        };
                    };
                    if (obj2No == true) {
                        returnValue += cantWrite + Oobject[nid].name;
                    };


                };

            };


            break;
        case "inventory":
            returnValue = carryingTxt;
            if (invent.length > 0) {
                for (i = 0; i < invent.length; i++) {
                    returnValue += '<br />(' + (i + 1) + ') ' + invent[i];
                }
            } else {
                returnValue += '<br />Nothing';
            };
            break;
        case "switch":
            // if its on, turn it off vversa. If its in inv, drop it vversa,
            if (bolIsObj == true) {
                if ((Oobject[nid].currentRoom == varRID || Oobject[nid].isCarried == 'y') && Oobject[nid].isHidden == 'n') { //obj is here / carried and not hidden
                    if (Oobject[nid].isOn == 'y' && (Oobject[nid].hasBeenUsed == 'n' || (Oobject[nid].hasBeenUsed == 'y' && Oobject[nid].multiUse == 'y'))) { // is on or (is off or (is on and multi use))
                        Oobject[nid].isOn = 'n';
                        Oobject[nid].hasBeenUsed = 'y';
                        returnValue += "You switch the " + Oobject[nid].name + " off";
                        if (Oobject[nid].actionWhenUsed == 'light') // is of type light
                        {
                            lightIsOn = false;
                        };
                        if (Oobject[nid].isImportant == 'y') {
                            statCheck(statUse.MIN, statType.CHARISMA, false);
                        };
                    } else if (Oobject[nid].isOn == 'n' && (Oobject[nid].hasBeenUsed == 'n' || (Oobject[nid].hasBeenUsed == 'y' && Oobject[nid].multiUse == 'y'))) {
                        Oobject[nid].isOn = 'y';
                        Oobject[nid].hasBeenUsed = 'y';
                        returnValue += "You switch the " + Oobject[nid].name + " on";
                        if (Oobject[nid].actionWhenUsed == 'light') // is of type light
                        {
                            lightIsOn = true;
                        };
                    } else if (Oobject[nid].hasBeenUsed == 'y' && Oobject[nid].multiUse == 'n') {
                        returnValue += "The " + Oobject[nid].name + " has already been used. " + cantUse + " " + Oobject[nid].name + " " + againTxt;
                    }; // end IF checking obj on etc
                } else {
                    returnValue += "The " + Oobject[nid].name + " " + notSeen;
                }; // end IF here etc
            };
            break;
        case "combine":

            if (bolIsObj == true && Oobject[nid].combineable == 'y') {

                let secID = 9999;
                if (bolSecObj = true) {
                    secID = parseFloat(Oobject[nid].objUsesWith);
                };

                if ((Oobject[nid].isCarried == 'y' || Oobject[nid].currentRoom == varRID) && (Oobject[secID].isCarried == 'y' || Oobject[secID].currentRoom == varRID)) // both objs here or carried
                {
                    if (rollDice(Oobject[nid].strength, stat_dexterity) == true && rollDice(Oobject[secID].strength, stat_dexterity) == true) {


                        if (Oobject[nid].combineable == 'y' && Oobject[secID].combineable == 'y') {
                            let crID = 9999;
                            if (Oobject[nid].combineCreates != 'xx') {
                                crID = parseFloat(Oobject[nid].combineCreates);

                            } else if (Oobject[secID].combineCreates != 'xx') {
                                crID = parseFloat(Oobject[secID].combineCreates);
                            }; // end IF combineCreates not 9999 for either
                            // get new obj and make sure its visible
                            returnValue += "The " + Oobject[nid].name + " and the " + Oobject[secID].name + " " + combineTxt + " " + Oobject[crID].prefix + " " + Oobject[crID].name;
                            Oobject[crID].currentRoom = varRID;
                            Oobject[crID].isHidden = 'n';
                            // destory other objs
                            if (Oobject[nid].combineDestroysMe == 'y') // first obj is destroyed
                            {
                                Oobject[nid].currentRoom = 9999; // send to heaven
                                if (Oobject[nid].isCarried == 'y') {
                                    dropFromInv(nid, true);
                                    returnValue += ".<br />The " + Oobject[nid].name + " " + destroytxt;
                                } // end IF first obj is carried
                                else {
                                    returnValue += ".<br />The " + Oobject[nid].name + " " + destroytxt;
                                }; // end first obj not carried

                            } // end IF first obj is destoyed with combine
                            else {
                                if (Oobject[nid].isCarried == 'y') {
                                    dropFromInv(nid, false);
                                    returnValue += ".<br />The " + Oobject[nid].name + " is dropped to the floor";
                                } // end IF first obj is carried
                                else {
                                    returnValue += ".<br />The " + Oobject[nid].name + " is still on the floor";
                                }; // end first obj not carried
                            }; // end first obj is NOT destroyed
                            if (Oobject[nid].isImportant == 'y') {
                                statCheck(statUse.MID, statType.DEXTERITY, true);
                                statCheck(statUse.MIN, statType.MOOD, true);
                            };
                            if (Oobject[secID].combineDestroysMe == 'y') // second obj is destroyed
                            {
                                Oobject[secID].currentRoom = 9999; // send to heaven
                                if (Oobject[secID].isCarried == 'y') {
                                    dropFromInv(secID, true);
                                    returnValue += ".<br />The " + Oobject[secID].name + " " + destroytxt;
                                } // end IF second obj is carried
                                else {
                                    returnValue += ".<br />The " + Oobject[secID].name + " " + destroytxt;
                                }; // end second obj not carried

                            } // end IF second obj is destoyed with combine
                            else {
                                if (Oobject[secID].isCarried == 'y') {
                                    dropFromInv(secID, false);
                                    returnValue += ".<br />The " + Oobject[secID].name + " is dropped to the floor";
                                } // end IF second obj is carried
                                else {
                                    returnValue += ".<br />The " + Oobject[secID].name + " is still on the floor";
                                }; // end second obj not carried
                            }; // end second obj is NOT destroyed
                            if (Oobject[secID].isImportant == 'y') {
                                statCheck(statUse.MID, statType.DEXTERITY, true);
                                statCheck(statUse.MIN, statType.MOOD, true);
                            };
                        }; //end both combineable

                    } // end dexterity beats both objects strength
                    else {
                        returnValue += stat_noDexterity + "<br />" + stat_noDextTwoObjects;
                    };





                }; // end both here/carried
            }; // end if is obj
            break;
        case "cast":

            var spNm = "";
            for (var x = 0; x < Spell.length; x++) {
                if (fullInput.includes(Spell[x].name) == true) {
                    if (rollDice(Spell[x].spellPower, (stat_charisma + stat_dexterity)) == true) {


                        spNm = Spell[x].name;
                        returnValue += "<br />" + castSpell(spNm, varRID);
                    } // end enough charisma and dexterity
                    else {
                        returnValue += stat_noMagic;
                    };
                    break;
                };

            };

            break;

        case "wear":
            if (bolIsObj == true) {
                if (Oobject[nid].isCarried == 'y' && Oobject[nid].description.includes("worn") == false) {
                    Oobject[nid].description += " It is worn";
                    returnValue += "You put the " + Oobject[nid].name + " on in the most appropriate way";

                    changeStat("charisma", stat_medAmnt, "up");
                } else {
                    returnValue += "You are not carrying the " + Oobject[nid].name + " or if you are, it is already being worn";
                };
            };
            break;

        case "remove":
            if (bolIsObj == true) {
                if (Oobject[nid].isCarried == 'y' && Oobject[nid].description.includes("worn") == true) {
                    Oobject[nid].description = getXmlValue('objects.xml', 'object', 'id', nid, 'description');
                    returnValue += "You take the " + Oobject[nid].name + " off and stow it in your inventory";
                    changeStat("charisma", stat_medAmnt, "down");
                } else {
                    returnValue += "You are not carrying the " + Oobject[nid].name + " or if you are, you are not wearing it";
                };
            };

            break;


    };

    //  var elm = document.getElementById('txtInput');
    // elm.focus();
    window.scrollTo(0, document.body.scrollHeight);
    return returnValue;
}

function doHelp() {

    if (Oroom[varRID].helpTxt != "xx") {

        return Oroom[varRID].helpTxt;
    } else {
        return noHelpMsg;
    };
}

function statCheck(statAction = undefined, statType = "charisma", inc = true, roomID = undefined, peepID = undefined, objID = undefined, theVerb = undefined) { // using the above variables decide if any stats are changed
    // statAction can be any of the statUse enums
    switch (statAction) {
        case "min":
            switch (statType) {
                case "charisma":
                    if (inc == true) {
                        if (stat_charisma <= (stat_maxAmnt - stat_smallAmnt)) {
                            stat_charisma += stat_smallAmnt;
                        } else {
                            stat_charisma = stat_maxAmnt;
                        };
                    } // end is increase
                    else { // its a minus
                        if (stat_charisma >= (stat_minAmnt + stat_smallAmnt)) {
                            stat_charisma -= stat_smallAmnt;
                        } else {
                            stat_charisma = stat_minAmnt;
                        };
                    }; // end is minus


                    break;

                case "strength":
                    if (inc == true) {
                        if (stat_strength <= (stat_maxAmnt - stat_smallAmnt)) {
                            stat_strength += stat_smallAmnt;
                        } else {
                            stat_strength = stat_maxAmnt;
                        };
                    } // end is increase
                    else {
                        if (stat_strength >= (stat_minAmnt + stat_smallAmnt)) {
                            stat_strength -= stat_smallAmnt;
                        } else {
                            stat_strength = stat_minAmnt;
                        };
                    }; // end it is minus

                    break;
                case "combat":
                    if (inc == true) {
                        if (stat_combat <= (stat_maxAmnt - stat_smallAmnt)) {
                            stat_combat += stat_smallAmnt;
                        } else {
                            stat_strength = stat_maxAmnt;
                        };
                    } // end is increase
                    else {
                        if (stat_combat >= (stat_minAmnt + stat_smallAmnt)) {
                            stat_combat -= stat_smallAmnt;
                        } else {
                            stat_combat = stat_minAmnt;
                        };
                    }; // end is minus

                    break;
                case "dexterity":
                    if (inc == true) {
                        if (stat_dexterity <= (stat_maxAmnt - stat_smallAmnt)) {
                            stat_dexterity += stat_smallAmnt;
                        } else {
                            stat_dexterity = stat_maxAmnt;
                        };
                    } // end is increase
                    else {
                        if (stat_dexterity >= (stat_minAmnt + stat_smallAmnt)) {
                            stat_dexterity -= stat_smallAmnt;
                        } else {
                            stat_dexterity = stat_minAmnt;
                        };
                    }; //end is minus

                    break;
                case "mood":
                    if (inc == true) {
                        if (moodLevel <= (stat_maxAmnt - stat_smallAmnt)) {
                            moodLevel += stat_smallAmnt;
                        } else {
                            moodLevel = stat_maxAmnt;
                        };
                    } // end is plus
                    else {
                        if (moodLevel >= (stat_minAmnt + stat_smallAmnt)) {
                            moodLevel -= stat_smallAmnt;
                        } else {
                            moodLevel = stat_maxAmnt;
                        };
                    }; // end is minus
                    break;
            };
            break;

        case "mid":
            switch (statType) {
                case "charisma":
                    if (inc == true) {
                        if (stat_charisma <= (stat_maxAmnt - stat_medAmnt)) {
                            stat_charisma += stat_medAmnt;
                        } else {
                            stat_charisma = stat_maxAmnt;
                        };
                    } // end is increase
                    else { // its a minus
                        if (stat_charisma >= (stat_minAmnt + stat_medAmnt)) {
                            stat_charisma -= stat_medAmnt;
                        } else {
                            stat_charisma = stat_minAmnt;
                        };
                    }; // end is minus


                    break;

                case "strength":
                    if (inc == true) {
                        if (stat_strength <= (stat_maxAmnt - stat_medAmnt)) {
                            stat_strength += stat_medAmnt;
                        } else {
                            stat_strength = stat_maxAmnt;
                        };
                    } // end is increase
                    else {
                        if (stat_strength >= (stat_minAmnt + stat_medAmnt)) {
                            stat_strength -= stat_medAmnt;
                        } else {
                            stat_strength = stat_minAmnt;
                        };
                    }; // end it is minus

                    break;
                case "combat":
                    if (inc == true) {
                        if (stat_combat <= (stat_maxAmnt - stat_medAmnt)) {
                            stat_combat += stat_medAmnt;
                        } else {
                            stat_strength = stat_maxAmnt;
                        };
                    } // end is increase
                    else {
                        if (stat_combat >= (stat_minAmnt + stat_medAmnt)) {
                            stat_combat -= stat_medAmnt;
                        } else {
                            stat_combat = stat_minAmnt;
                        };
                    }; // end is minus

                    break;
                case "dexterity":
                    if (inc == true) {
                        if (stat_dexterity <= (stat_maxAmnt - stat_medAmnt)) {
                            stat_dexterity += stat_medAmnt;
                        } else {
                            stat_dexterity = stat_maxAmnt;
                        };
                    } // end is increase
                    else {
                        if (stat_dexterity >= (stat_minAmnt + stat_medAmnt)) {
                            stat_dexterity -= stat_medAmnt;
                        } else {
                            stat_dexterity = stat_minAmnt;
                        };
                    }; //end is minus

                    break;
                case "mood":
                    if (inc == true) {
                        if (moodLevel <= (stat_maxAmnt - stat_medAmnt)) {
                            moodLevel += stat_medAmnt;
                        } else {
                            moodLevel = stat_maxAmnt;
                        };
                    } // end is plus
                    else {
                        if (moodLevel >= (stat_minAmnt + stat_medAmnt)) {
                            moodLevel -= stat_medAmnt;
                        } else {
                            moodLevel = stat_maxAmnt;
                        };
                    }; // end is minus
                    break;
            };

            break;

        case "max":
            switch (statType) {
                case "charisma":
                    if (inc == true) {
                        if (stat_charisma <= (stat_maxAmnt - stat_lrgAmnt)) {
                            stat_charisma += stat_lrgAmnt;
                        } else {
                            stat_charisma = stat_maxAmnt;
                        };
                    } // end is increase
                    else { // its a minus
                        if (stat_charisma >= (stat_minAmnt + stat_lrgAmnt)) {
                            stat_charisma -= stat_lrgAmnt;
                        } else {
                            stat_charisma = stat_minAmnt;
                        };
                    }; // end is minus


                    break;

                case "strength":
                    if (inc == true) {
                        if (stat_strength <= (stat_maxAmnt - stat_lrgAmnt)) {
                            stat_strength += stat_lrgAmnt;
                        } else {
                            stat_strength = stat_maxAmnt;
                        };
                    } // end is increase
                    else {
                        if (stat_strength >= (stat_minAmnt + stat_lrgAmnt)) {
                            stat_strength -= stat_lrgAmnt;
                        } else {
                            stat_strength = stat_minAmnt;
                        };
                    }; // end it is minus

                    break;
                case "combat":
                    if (inc == true) {
                        if (stat_combat <= (stat_maxAmnt - stat_lrgAmnt)) {
                            stat_combat += stat_lrgAmnt;
                        } else {
                            stat_strength = stat_maxAmnt;
                        };
                    } // end is increase
                    else {
                        if (stat_combat >= (stat_minAmnt + stat_lrgAmnt)) {
                            stat_combat -= stat_lrgAmnt;
                        } else {
                            stat_combat = stat_minAmnt;
                        };
                    }; // end is minus

                    break;
                case "dexterity":
                    if (inc == true) {
                        if (stat_dexterity <= (stat_maxAmnt - stat_lrgAmnt)) {
                            stat_dexterity += stat_lrgAmnt;
                        } else {
                            stat_dexterity = stat_maxAmnt;
                        };
                    } // end is increase
                    else {
                        if (stat_dexterity >= (stat_minAmnt + stat_lrgAmnt)) {
                            stat_dexterity -= stat_lrgAmnt;
                        } else {
                            stat_dexterity = stat_minAmnt;
                        };
                    }; //end is minus

                    break;
                case "mood":
                    if (inc == true) {
                        if (moodLevel <= (stat_maxAmnt - stat_lrgAmnt)) {
                            moodLevel += stat_lrgAmnt;
                        } else {
                            moodLevel = stat_maxAmnt;
                        };
                    } // end is plus
                    else {
                        if (moodLevel >= (stat_minAmnt + stat_lrgAmnt)) {
                            moodLevel -= stat_lrgAmnt;
                        } else {
                            moodLevel = stat_maxAmnt;
                        };
                    }; // end is minus
                    break;
            };

            break;

    };


}
// function to roll dice and reveal resultant number
