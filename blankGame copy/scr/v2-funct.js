/* CONTENTS
stockList
stockIDs
chasePlayer
gameOver
restartGame
castSpell
npcConversation
deathRevealsEtc
storeObjects
storeNPCs
storeConvewrsations
storeRooms
checkEvents

*/

// functions for new features
shoppingLists:
    function stockList() {
        var stockReturn = new Array();
        var itmCnt = 0;
        for (x = 0; x < Oobject.length; x++) {

            if (Oobject[x].originalRoom == varRID && Oobject[x].itemForSale == "y" && Oobject[x].isCarried != "y") { // object orig room is here, is for sale and is not carried

                stockReturn[itmCnt] = "Item: " + firstCap(Oobject[x].name) + ". Price: " + cshSy + Oobject[x].itemValue;

                itmCnt++;
            };
        };



        return stockReturn;
    }

function stockIDS() {
    var stockItems = new Array();
    var itmCnt = 0;
    for (x = 0; x < Oobject.length; x++) {
        if (Oobject[x].originalRoom == varRID && Oobject[x].itemForSale == "y" && Oobject[x].isCarried != "y") {
            stockItems[itmCnt] = Oobject[x].id;
            itmCnt++;
        };
    };
    return stockItems;
}

NPC_chasePlayer:
    /* after room displayed see if any npc in the room can chase the player.
    if there is, see what their goal is. check stats to see if their action (goal) can be achieved. Carry out action. Display relevant message. If the goal is capture or kill then send player to Room of death or end game.
    */
    var bolIsDead = false; // this is to stop the game hanging on return to afterEnter()
function chasePlayer() {
    var chaseReturn = null;
    for (x = 0; x < Opeeps.length; x++) {

        if (Opeeps[x].currentRoom == varRID && Opeeps[x].canChaseYN == "y" && Opeeps[x].hasChasedYN == 'n') { // is npc here and canChase?
            //npc's combat stat is 23 score out of 10
            chaseReturn = Opeeps[x].chaseMsg;



            // maybe save the game here just in case the player is killed

            // try and kill player 
            let scr1 = rollDice(parseFloat(Opeeps[x].combat), stat_combat);
            // true would be player win, false = npc win
            let scr2 = rollDice(parseFloat(Opeeps[x].combat), stat_combat);

            if (scr1 == false && scr2 == false) {
                // npc is the winner
                switch (Opeeps[x].chaseGoal) {
                    case "kill":


                        chaseReturn += "<br />" + Opeeps[x].chaseSuccess;
                        // death message is in the gameOver function
                        bolIsDead = true;
                        gameOver();
                        break;

                    case "capture":
                        // try and capture player - if caught effect the players stats
                        chaseReturn += "<br />" + Opeeps[x].chaseSuccess;
                        var npcComb = parseFloat(Opeeps[x].combat);
                        var spinNo = 0;
                        // get the number to use in giveRndmNumber
                        if (npcComb <= (stat_strength + stat_combat)) {
                            spinNo = (stat_strength + stat_combat) - npcComb;
                        } else {
                            spinNo = npcComb - (stat_strength + stat_combat);
                        };
                        var altNo = giveRndmNumber(spinNo);

                        changeStat("strength", altNo, "down");

                        break;

                    case "fight":
                        // try and fight player and effect the stats if player loses

                        var npcComb = parseFloat(Opeeps[x].combat);
                        var spinNo = 0;
                        // get the number to use in giveRndmNumber
                        if (npcComb <= (stat_strength + stat_combat)) {
                            spinNo = (stat_strength + stat_combat) - npcComb;
                            chaseReturn += "<br />" + Opeeps[x].chaseFail;
                            let altNo = giveRndmNumber(spinNo);
                            changeStat("strength", altNo, "up");
                        } else {
                            spinNo = npcComb - (stat_strength + stat_combat);
                            chaseReturn += "<br />" + Opeeps[x].chaseSuccess;
                            let altNo = giveRndmNumber(spinNo);
                            changeStat("strength", altNo, "down");
                        };




                        break;

                }; // end switch



            } else if (scr1 == false || scr2 == false) {
                // this is a tie
                switch (Opeeps[x].chaseGoal) {
                    case "kill":
                        chaseReturn += "<br />" + Opeeps[x].chaseDraw;
                        bolIsDead = false;
                        break;

                    case "capture":
                        chaseReturn += "<br />" + Opeeps[x].chaseDraw;
                        changeStat("strength", 1, "random");
                        break;

                    case "fight":
                        chaseReturn += "<br />" + Opeeps[x].chaseDraw;
                        changeStat("combat", 1, "random");
                        changeStat("strength", 1, "random");
                        break;
                }; //end switch


            } else {
                // this is player win   
                switch (Opeeps[x].chaseGoal) {
                    case "kill":
                        chaseReturn += "<br />" + Opeeps[x].chaseDraw;
                        bolIsDead = false;
                        break;

                    case "capture":
                        chaseReturn += "<br />" + Opeeps[x].chaseDraw;
                        // increase some of players stats
                        changeStat("strength", 1, "up");
                        break;

                    case "fight":
                        chaseReturn += "<br />" + Opeeps[x].chaseDraw;
                        // increase players stats  
                        changeStat("combat", 1, "up");
                        changeStat("strength", 1, "up");
                        break;
                }; //end switch


            };





            Opeeps[x].hasChasedYN = "y";
        };
    };

    return chaseReturn;
}

function gameOver() {
    STRresponse = killedMsg + "<br />Re-incarnation, back at the beginning in ten seconds";
    dispResp(STRresponse, 'It comes to us all in the end');
    document.getElementById("txtInput").style.display = "none";
    setTimeout(restartGame, 5000);

}


function restartGame() {
    document.getElementById("txtInput").style.display = "initial";
    startUp();
}


//********************************** DO NOT ALTER BELOW THIS LINE *************************************
// function to use the spell
function castSpell(spellNm, roomId = undefined, objId = undefined, peepId = undefined) {
    {
        // the calling function needs to have worked out the peep and obj ids from the inputTxt and what is present
        var returnValue = "";


        for (var i = 0; i < Spell.length; i++) {
            if (Spell[i].name == spellNm) {
                returnValue = "";
                var objN = 9999;
                if (Spell[i].objNeeded != 'xx') {
                    objN = parseFloat(Spell[i].objNeeded);
                };

                if ((objN != 9999 && Oobject[objN][23] == 'y') || objN == 9999) { // spell scroll is held or no object / scroll is needed


                    if (Spell[i].alreadyUsed == 'y' && Spell[i].multiUse == 'y') {
                        returnValue = Spell[i].secondUse;
                    } else if (Spell[i].alreadyUsed == 'y' && Spell[i].multiUse == 'n') {
                        returnValue = magicDepletedTxt;
                    } else {
                        returnValue = Spell[i].useTxt;
                    };

                    //   else
                    //     {
                    // NOW USE THE SPELL

                    if (Spell[i].specificObjID == objId) {
                        returnValue = Spell[i].useTxt;
                        Spell[i].alreadyUsed = 'y';
                        if (Spell[i].destroyObjectID != 'xx') {
                            let oid = parseFloat(Spell[i].destroyObjectID);
                            if (Oobject[oid].isCarried == 'y' || Oobject[oid].currentRoom == roomId) {
                                Oobject[oid].isBroken = 'y';
                                dropFromInv(oid, true);
                                returnValue += "<br />The " + Oobject[oid].name + " " + magicDestroyTxt;
                            }; // end obj is here or carried

                        }; // end destroy obj
                        if (Spell[i].createObjID != "xx") {
                            let oid = parseFloat(Spell[i].createObjID);
                            if (Oobject[oid].currentRoom == 9999) {
                                Oobject[oid].currentRoom = roomId;
                                Oobject[oid].isHidden = 'n';
                                returnValue += "<br />" + Oobject[oid].prefix + " " + Oobject[oid].name + " " + magicCreatesObj;
                            };
                        }; // end create obj
                        if (Spell[i].createPersonID != "xx") {
                            let pid = parseFloat(Spell[i].createPersonID);
                            if (Opeeps[pid].currentRoom == 9999) {
                                Opeeps[pid].currentRoom = roomId;
                                returnValue += "<br />" + Opeeps[pid].name + " " + magicCreatesPeep;
                            };

                        }; // end create obj
                        if (Spell[i].killPerson == 'y' && peepId != undefined) {
                            if (Opeeps[peepId].currentRoom == roomId && Opeeps[peepId].isHiddenYN == 'n' && Opeeps[peepId].isDeadYN == 'n') {
                                Opeeps[peepId].currentRoom = 9999;
                                Opeeps[peepId].isDeadYN = 'y';
                                returnValue += "<br />" + magicKills + " " + Opeeps[peepId].call;
                            };
                        }; // end kill person

                    } // end use spell on obj
                    else if (Spell[i].specificPersonID == peepId) {
                        returnValue = Spell[i].useTxt;
                        Spell[i].alreadyUsed = 'y';
                        if (Spell[i].destroyObjectID != 'xx') {
                            let oid = parseFloat(Spell[i].destroyObjectID);
                            if (Oobject[oid].isCarried == 'y' || Oobject[oid].currentRoom == roomId) {
                                Oobject[oid].isBroken = 'y';
                                dropFromInv(oid, true);
                                returnValue += "<br />The " + Oobject[oid].name + " " + magicDestroyTxt;
                            }; // end obj is here or carried

                        }; // end destroy obj
                        if (Spell[i].createObjID != "xx") {
                            let oid = parseFloat(Spell[i].createObjID);
                            if (Oobject[oid].currentRoom == 9999) {
                                Oobject[oid].currentRoom = roomId;
                                Oobject[oid].isHidden = 'n';
                                returnValue += "<br />" + Oobject[oid].prefix + " " + Oobject[oid].name + " " + magicCreatesObj;
                            };
                        }; // end create obj
                        if (Spell[i].createPersonID != "xx") {
                            let pid = parseFloat(Spell[i].createPersonID);
                            if (Opeeps[pid].currentRoom == 9999) {
                                Opeeps[pid].currentRoom = roomId;
                                returnValue += "<br />" + Opeeps[pid].name + " " + magicCreatesPeep;
                            };

                        }; // end create person
                        if (Spell[i].killPerson == 'y' && peepId != undefined) {
                            if (Opeeps[peepId].currentRoom == roomId && Opeeps[peepId].isHiddenYN == 'n' && Opeeps[peepId].isDeadYN == 'n') {
                                Opeeps[peepId].currentRoom = 9999;
                                Opeeps[peepId].isDeadYN = 'y';
                                returnValue += "<br />" + magicKills + " " + Opeeps[peepId].call;
                            };
                        };
                    } else if (Spell[i].specificRoomID == roomId) {
                        returnValue = Spell[i].useTxt;
                        Spell[i].alreadyUsed = 'y';
                        if (Spell[i].destroyObjectID != 'xx') {
                            let oid = parseFloat(Spell[i].destroyObjectID);
                            if (Oobject[oid].isCarried == 'y' || Oobject[oid].currentRoom == roomId) {
                                Oobject[oid].isBroken = 'y';
                                dropFromInv(oid, true);
                                returnValue += "<br />The " + Oobject[oid].name + " " + magicDestroyTxt;
                            }; // end obj is here or carried

                        }; // end destroy obj
                        if (Spell[i].createObjID != "xx") {
                            let oid = parseFloat(Spell[i].createObjID);
                            if (Oobject[oid].currentRoom == 9999) {
                                Oobject[oid].currentRoom = roomId;
                                Oobject[oid].isHidden = 'n';
                                returnValue += "<br />" + Oobject[oid].prefix + " " + Oobject[oid].name + " " + magicCreatesObj;
                            };
                        }; // end create obj
                        if (Spell[i].createPersonID != "xx") {
                            let pid = parseFloat(Spell[i].createPersonID);
                            if (Opeeps[pid].currentRoom == 9999) {
                                Opeeps[pid].currentRoom = roomId;
                                returnValue += "<br />" + Opeeps[pid].name + " " + magicCreatesPeep;
                            };

                        }; // end create person
                        if (Spell[i].killPerson == 'y' && peepId != undefined) {
                            if (Opeeps[peepId].currentRoom == roomId && Opeeps[peepId].isHiddenYN == 'n' && Opeeps[peepId].isDeadYN == 'n') {
                                Opeeps[peepId].currentRoom = 9999;
                                Opeeps[peepId].isDeadYN = 'y';
                                returnValue += "<br />" + magicKills + " " + Opeeps[peepId].call;
                            };
                        };
                    } else if (Spell[i].specificObjID == 'xx' && Spell[i].specificPersonID == 'xx' && Spell[i].specificRoomID == 'xx' && Spell[i].transportTo == 'xx') {
                        returnValue = Spell[i].useTxt;
                        Spell[i].alreadyUsed = 'y';

                        if (Spell[i].destroyObjectID != 'xx') {
                            let oid = parseFloat(Spell[i].destroyObjectID);
                            if (Oobject[oid].isCarried == 'y' || Oobject[oid].currentRoom == roomId) {
                                Oobject[oid].isBroken = 'y';
                                dropFromInv(oid, true);
                                returnValue += "<br />The " + Oobject[oid].name + " " + magicDestroyTxt;
                            }; // end obj is here or carried

                        }; // end destroy obj
                        if (Spell[i].createObjID != "xx") {
                            let oid = parseFloat(Spell[i].createObjID);
                            if (Oobject[oid].currentRoom == 9999) {
                                Oobject[oid].currentRoom = roomId;
                                Oobject[oid].isHidden = 'n';
                                returnValue += "<br />" + Oobject[oid].prefix + " " + Oobject[oid].name + " " + magicCreatesObj;
                            };
                        }; // end create obj
                        if (Spell[i].createPersonID != "xx") {
                            let pid = parseFloat(Spell[i].createPersonID);
                            if (Opeeps[pid].currentRoom == 9999) {
                                Opeeps[pid].currentRoom = roomId;
                                returnValue += "<br />" + Opeeps[pid].name + " " + magicCreatesPeep;
                            };

                        }; // end create person
                        if (Spell[i].killPerson == 'y' && peepId != undefined) {
                            if (Opeeps[peepId].currentRoom == roomId && Opeeps[peepId].isHiddenYN == 'n' && Opeeps[peepId].isDeadYN == 'n') {
                                Opeeps[peepId].currentRoom = 9999;
                                Opeeps[peepId].isDeadYN = 'y';
                                returnValue += "<br />" + magicKills + " " + Opeeps[peepId].call;
                            };
                        };
                    } else if (Spell[i].specificObjID == 'xx' && Spell[i].specificPersonID == 'xx' && Spell[i].specificRoomID == 'xx' && Spell[i].transportTo != 'xx') { // any more spell types need to go in this else if and the type etc needs to be in here as not xx

                        // transport spell           
                        if (Spell[i].transportTo != 'xx') {
                            if (Spell[i].transportSelf == 'n') {

                                //transport npc
                                if (peepId != undefined && Opeeps[peepId].currentRoom == varRID) {
                                    if (Opeeps[peepId].isDeadYN == 'n') { // not dead
                                        Opeeps[peepId].currentRoom = Spell[i].transportTo;


                                    } else {
                                        returnValue += "<br />" + Spell[i].spellFail;
                                    };
                                } else if (peepId == undefined) {

                                    for (p = 0; p < Opeeps.length; p++) {
                                        if (Opeeps[p].currentRoom == varRID) {
                                            Opeeps[p].currentRoom = Spell[i].transportTo;

                                            break;
                                        };
                                    }; //end for loop
                                };


                            } else {
                                //transport player
                                let oldRID = varRID;
                                varRID = Spell[i].transportTo;
                                getThisRoom(varRID, returnValue, oldRID);

                            };
                        }; //end transport  
                    }; // end else if
                }; // end scroll carried or no scroll reqd


                //   };// end of not already used

            } // end spell scroll is held  
            else {
                returnValue = magicCantCast;
            }; // end scroll not held
        }; // end of IF spell name == name
    }; // end forEach function



    return returnValue;
}

function npcConversation(peepid, roomID) {
    var valRet = "";
    // loop thru conversations
    for (x = 0; x < Oconv.length; x++) {

        // if the conversation is for person npcID and for room roomID
        if (Oconv[x].p1ID == peepid && Oconv[x].roomID == roomID) {
            // if the conversation has not moved passed line one

            if (Oconv[x].line1 != "x") {

                console.log("first line not x");
                valRet = Opeeps[peepid].name + " says '" + firstCap(Oconv[x].line1) + "'";
                // get the conversation line 1 and mark it as read               
                Oconv[x].line1 = "x";
                break;
            }; // end if conv not psssed first line
        }; // end if this person and room
    }; //end for loop
    return valRet;

}

// below function called when want to see if death etc reveals obj or room etc
function deathRevealsEtc(peepId = undefined, roomID = undefined, objID = undefined) {
    var pid, rid, oid;
    var returnValue = "";
    var resultDone = false;
    pid = peepId;
    rid = roomID;
    oid = objID;
    // ***** first check to see if it is a submit scenario *******
    // in this case obj id would be the peep submitItemID
    if (oid != undefined && pid == undefined) {
        returnValue += cantUse + " " + Oobject[oid].name + " right now";
        if (Oobject[oid].personNeededForReveal != 'xx') { // is there a person id?
            pid = parseFloat(Oobject[oid].personNeededForReveal);
            if (Opeeps[pid].submissionItem == oid) { // does the submitItem of the peep match the obj id passed to function?
                if (Oobject[oid].isCarried == 'y') {
                    // is carried
                    returnValue = "<br />" + firstCap(Opeeps[pid].submissionTxt);
                    // submit text
                    if (Opeeps[pid].fightKillsYN == 'y' && Opeeps[pid].isDeadYN != 'y') {
                        // fight kills and peep not dead yet
                        Opeeps[pid].isDeadYN = 'y';
                        Opeeps[pid].description = " " + submittedTxt;
                        Opeeps[pid].canTalkYN = 'n';
                        Opeeps[pid].defaultSay = 'I am no threat to you anymore';
                        resultDone = true;
                    };
                    if (Opeeps[pid].killRevealsObjID != 'xx') {
                        // submit reveals an object
                        if (roomID == undefined) {
                            roomID = varRID;
                        };
                        let rid = parseFloat(Opeeps[pid].killRevealsObjID);
                        Oobject[rid].currentRoom = roomID;
                        Oobject[rid].isHidden = 'n';
                        returnValue = "<br />" + firstCap(Oobject[rid].prefix) + " " + Oobject[rid].name + " is revealed";
                        resultDone = true;
                    };
                }
            }
        };
    }; // end submit scenario

    // ****** now see if it is an actual death scenario *****
    if (resultDone == false) {
        if (pid != undefined) {
            returnValue += "You can not attack " + Opeeps[pid].name + " right now";
            if (Opeeps[pid].fightKillsYN == 'y') { // fight kills peep
                returnValue = "<br />" + firstCap(Opeeps[pid].fightMess);
                Opeeps[pid].canFightYN == 'n';
                let pNm = Opeeps[pid].name;
                Opeeps[pid].name = "The body of " + pNm;
                Opeeps[pid].description = " " + deadTxt;
                Opeeps[pid].canTalkYN = 'n';
                Opeeps[pid].defaultSay = deadNoTalk;
                Opeeps[pid].isFollowingYN = 'n';
                Opeeps[pid].isDeadYN = 'y';
                statCheck(statUse.MID, statType.STRENGTH, true);
                if (Opeeps[pid].killRevealsObjID != 'xx') { // kill reveals obj
                    let rid = parseFloat(Opeeps[pid].killRevealsObjID);
                    if (roomID == undefined) {
                        roomID = varRID;
                    };
                    Oobject[rid].currentRoom = roomID;
                    Oobject[rid].isHidden = 'n';
                    returnValue = "<br />" + firstCap(Oobject[rid].name) + " " + revealTxt + " " + Opeeps[pid].call + " dies";
                    if (Oobject[rid].isImportant == 'y') {
                        statCheck(statUse.MIN, statType.MOOD, true);
                    }
                } //end kill reveals objs 
            } else {
                returnValue = "<br />" + firstCap(Opeeps[pid].fightMess);
                Opeeps[pid].canFightYN = 'n';
                statCheck(statUse.MIN, statType.CHARISMA, false);
                statCheck(statUse.MIN, statType.MOOD, false);

            }; //end fight kills peep
            resultDone = true;
        }; // end peep id has been passed to functionm
    }; // end death scenario
    if (returnValue == "") {
        returnValue += "<br />Nothing happens now";
    };
    return returnValue;
}
var Oobject = [];

function storeObjects() {
    var cntObjs = countNodes("objects.xml", "object");

    OobjectDecleration:
        if (cntObjs > 0) {
            var i = 0;


            // objects start at 0
            for (i = 0; i < cntObjs; i++) {
                //set up some default content in case xml fields left blank
                var Oid, Oname, Odesc, Oweigh, Ospaces, OspM, OisImp, OisOn;
                try {
                    Oid = getXmlValue('objects.xml', 'object', 'id', i, 'id');
                } catch (e) {
                    //Catch Statement
                    console.log("No id is specified in object number: " + i);

                };
                try {
                    Ospaces = getXmlValue('objects.xml', 'object', 'id', i, 'spaces');
                } catch (e) {
                    //Catch Statement
                    Ospaces = '1';
                };
                try {
                    OspM = getXmlValue('objects.xml', 'object', 'id', i, 'specialMess');
                } catch (e) {
                    //Catch Statement
                    OspM = 'xx';
                };
                try {
                    Oname = getXmlValue('objects.xml', 'object', 'id', i, 'name');
                } catch (e) {
                    //Catch Statement
                    Oname = 'Unnamed object';
                };
                try {
                    Odesc = getXmlValue('objects.xml', 'object', 'id', i, 'description');
                } catch (e) {
                    //Catch Statement
                    Odesc = 'nothing exceptional';
                };
                try {
                    Oweigh = getXmlValue('objects.xml', 'object', 'id', i, 'weight');
                } catch (e) {
                    //Catch Statement
                    Oweigh = '1';
                };
                try {
                    OisImp = getXmlValue('objects.xml', 'object', 'id', i, 'isImportant');
                } catch (e) {
                    //Catch Statement
                    OisImp = 'n';
                };
                try {
                    OisOn = getXmlValue('objects.xml', 'object', 'id', i, 'isOn');
                } catch (e) {
                    //Catch Statement
                    OisOn = 'xx';
                };
                var OimpMess, Onaotw, Oouw;
                try {
                    OimpMess = getXmlValue('objects.xml', 'object', 'id', i, 'importantMessage');
                } catch (e) {
                    //Catch Statement
                    OimpMess = 'xx';
                };
                try {
                    Onaotw = getXmlValue('objects.xml', 'object', 'id', i, 'needsAnotherObjToWork');
                } catch (e) {
                    //Catch Statement
                    Onaotw = 'n';
                };
                try {
                    Oouw = getXmlValue('objects.xml', 'object', 'id', i, 'objUsesWith');
                } catch (e) {
                    //Catch Statement
                    Oouw = '9999';
                };
                var OmuU, OhasBu, OcBe;
                try {
                    OmuU = getXmlValue('objects.xml', 'object', 'id', i, 'multiUse');
                } catch (e) {
                    //Catch Statement
                    OmuU = 'n';
                };
                try {
                    OhasBu = getXmlValue('objects.xml', 'object', 'id', i, 'hasBeenUsed');
                } catch (e) {
                    //Catch Statement
                    OhasBu = 'n';
                };
                try {
                    OcBe = getXmlValue('objects.xml', 'object', 'id', i, 'canBeEaten');
                } catch (e) {
                    //Catch Statement
                    OcBe = 'n';
                };
                var Oeo, OisE, OeMess, OcanBB;
                try {
                    Oeo = getXmlValue('objects.xml', 'object', 'id', i, 'eatenObject');
                } catch (e) {
                    //Catch Statement
                    Oeo = 'xx';
                };
                try {
                    OisE = getXmlValue('objects.xml', 'object', 'id', i, 'isEaten');
                } catch (e) {
                    //Catch Statement
                    OisE = 'n';
                };
                try {
                    OeMess = getXmlValue('objects.xml', 'object', 'id', i, 'eatMess');
                } catch (e) {
                    //Catch Statement
                    OeMess = 'xx';
                };
                try {
                    OcanBB = getXmlValue('objects.xml', 'object', 'id', i, 'canBeBroken');
                } catch (e) {
                    //Catch Statement
                    OcanBB = 'n';
                };
                var OBmess, ObObj, OisB, OorigR;
                try {
                    OBmess = getXmlValue('objects.xml', 'object', 'id', i, 'breakMess');
                } catch (e) {
                    //Catch Statement
                    OBmess = 'xx';
                };
                try {
                    ObObj = getXmlValue('objects.xml', 'object', 'id', i, 'brokenObject');
                } catch (e) {
                    //Catch Statement
                    ObObj = 'xx';
                };
                try {
                    OisB = getXmlValue('objects.xml', 'object', 'id', i, 'isBroken');
                } catch (e) {
                    //Catch Statement
                    OisB = 'n';
                };
                try {
                    OorigR = getXmlValue('objects.xml', 'object', 'id', i, 'originalRoom');
                } catch (e) {
                    //Catch Statement
                    OisB = '9999';
                };
                var OisCar, OisHid, OhidIn, OhidU;
                try {
                    OisCar = getXmlValue('objects.xml', 'object', 'id', i, 'isCarried');
                } catch (e) {
                    //Catch Statement
                    OisCar = 'n';
                };
                try {
                    OisHid = getXmlValue('objects.xml', 'object', 'id', i, 'isHidden');
                } catch (e) {
                    //Catch Statement
                    OisHid = 'isHidden';
                };
                try {
                    OhidIn = getXmlValue('objects.xml', 'object', 'id', i, 'hiddenIn');
                } catch (e) {
                    //Catch Statement
                    OhidIn = '9999';
                };
                try {
                    OhidU = getXmlValue('objects.xml', 'object', 'id', i, 'hiddenUnder');
                } catch (e) {
                    //Catch Statement
                    OhidU = '9999';
                };
                var OhidB, OrevN, OrevAc, OrevRm;
                try {
                    OhidB = getXmlValue('objects.xml', 'object', 'id', i, 'hiddenBehind');
                } catch (e) {
                    //Catch Statement
                    OhidB = '9999';
                };
                try {
                    OrevN = getXmlValue('objects.xml', 'object', 'id', i, 'revealNeeds');
                } catch (e) {
                    //Catch Statement
                    OrevN = 'xx';
                };
                try {
                    OrevAc = getXmlValue('objects.xml', 'object', 'id', i, 'revealAction');
                } catch (e) {
                    //Catch Statement
                    OrevAc = 'xx';
                };
                try {
                    OrevRm = getXmlValue('objects.xml', 'object', 'id', i, 'revealRoom');
                } catch (e) {
                    //Catch Statement
                    OrevRm = 'xx';
                };
                var Ocomb, OcomCr, OcombDest, OcurrRm;
                try {
                    Ocomb = getXmlValue('objects.xml', 'object', 'id', i, 'combineable');
                } catch (e) {
                    //Catch Statement
                    Ocomb = 'n';
                };
                try {
                    OcomCr = getXmlValue('objects.xml', 'object', 'id', i, 'combineCreates');
                } catch (e) {
                    //Catch Statement
                    OcomCr = '9999';
                };
                try {
                    OcombDest = getXmlValue('objects.xml', 'object', 'id', i, 'combineDestrysMe');
                } catch (e) {
                    //Catch Statement
                    OcombDest = 'n';
                };
                try {
                    OcurrRm = getXmlValue('objects.xml', 'object', 'id', i, 'currentRoom');
                } catch (e) {
                    //Catch Statement
                    OcurrRm = '9999';
                };
                var Opr, OcanGt, OactWU, OresUs;
                try {
                    Opr = getXmlValue('objects.xml', 'object', 'id', i, 'prefix');
                } catch (e) {
                    //Catch Statement
                    Opr = 'a';
                };
                try {
                    OcanGt = getXmlValue('objects.xml', 'object', 'id', i, 'canGet');
                } catch (e) {
                    //Catch Statement
                    OcanGt = 'xx';
                };
                try {
                    OactWU = getXmlValue('objects.xml', 'object', 'id', i, 'actionWhenUsed');
                } catch (e) {
                    //Catch Statement
                    OactWU = 'xx';
                };
                try {
                    OresUs = getXmlValue('objects.xml', 'object', 'id', i, 'resultOfUse');
                } catch (e) {
                    //Catch Statement
                    OresUs = 'xx';
                };
                var OMndW, OexRevO, OiFS, OiVal;
                try {
                    OMndW = getXmlValue('objects.xml', 'object', 'id', i, 'mendsW');
                } catch (e) {
                    //Catch Statement
                    OMndW = 'xx';
                };
                try {
                    OexRevO = getXmlValue('objects.xml', 'object', 'id', i, 'examRevealsObjID');
                } catch (e) {
                    //Catch Statement
                    OexRevO = 'xx';
                };
                try {
                    OiFS = getXmlValue('objects.xml', 'object', 'id', i, 'itemForSale');
                } catch (e) {
                    //Catch Statement
                    OiFS = 'n';
                };
                try {
                    OiVal = getXmlValue('objects.xml', 'object', 'id', i, 'itemValue');
                } catch (e) {
                    //Catch Statement
                    OiVal = '0';
                };
                var OsellBy, OcnBStln, OisTrade, OsaleMs;
                try {
                    OsellBy = getXmlValue('objects.xml', 'object', 'id', i, 'sellByID');
                } catch (e) {
                    //Catch Statement
                    OsellBy = 'xx';
                };
                try {
                    OcnBStln = getXmlValue('objects.xml', 'object', 'id', i, 'canBeStolen');
                } catch (e) {
                    //Catch Statement
                    OcnBStln = 'n';
                };
                try {
                    OisTrade = getXmlValue('objects.xml', 'object', 'id', i, 'isTradeable');
                } catch (e) {
                    //Catch Statement
                    OisTrade = 'n';
                };
                try {
                    OsaleMs = getXmlValue('objects.xml', 'object', 'id', i, 'saleMess');
                } catch (e) {
                    //Catch Statement
                    OsaleMs = 'xx';
                };
                var OstealM, OisOp, OopMess, OopRev;
                try {
                    OstealM = getXmlValue('objects.xml', 'object', 'id', i, 'stealMess');
                } catch (e) {
                    //Catch Statement
                    OstealM = 'xx';
                };
                try {
                    OisOp = getXmlValue('objects.xml', 'object', 'id', i, 'isOpen');
                } catch (e) {
                    //Catch Statement
                    OisOp = 'xx';
                };
                try {
                    OopMess = getXmlValue('objects.xml', 'object', 'id', i, 'openMess');
                } catch (e) {
                    //Catch Statement
                    OopMess = 'xx';
                };
                try {
                    OopRev = getXmlValue('objects.xml', 'object', 'id', i, 'OpenReveals');
                } catch (e) {
                    //Catch Statement
                    OopRev = 'xx';
                };
                var OisCsh, OisLk, Oimg, Ostrn;
                try {
                    OisCsh = getXmlValue('objects.xml', 'object', 'id', i, 'isCash');
                } catch (e) {
                    //Catch Statement
                    OisCsh = 'n';
                };
                try {
                    OisLk = getXmlValue('objects.xml', 'object', 'id', i, 'isLocked');
                } catch (e) {
                    //Catch Statement
                    OisLk = 'n';
                };
                try {
                    Oimg = getXmlValue('objects.xml', 'object', 'id', i, 'img');
                } catch (e) {
                    //Catch Statement
                    Oimg = 'x';
                };
                try {
                    Ostrn = getXmlValue('objects.xml', 'object', 'id', i, 'strength');
                } catch (e) {
                    //Catch Statement
                    Ostrn = 'xx';
                };
                var OuAff, OstEff, OpNFR;
                try {
                    OuAff = getXmlValue('objects.xml', 'object', 'id', i, 'useAffects');
                } catch (e) {
                    //Catch Statement
                    OuAff = 'xx';
                };
                try {
                    OstEff = getXmlValue('objects.xml', 'object', 'id', i, 'statEffect');
                } catch (e) {
                    //Catch Statement
                    OstEff = '0.1';
                };
                try {
                    OpNFR = getXmlValue('objects.xml', 'object', 'id', i, 'personNeededForReveal');
                } catch (e) {
                    //Catch Statement
                    OpNFR = 'xx';
                };
                Oobject[i] = {
                    id: getXmlValue('objects.xml', 'object', 'id', i, 'id'),
                    name: Oname,
                    description: Odesc,
                    weight: Oweigh,
                    spaces: Ospaces,
                    specialMess: OspM,
                    isImportant: OisImp,
                    importantMessage: OimpMess,
                    isOn: OisOn,
                    needsAnotherObjToWork: Onaotw,
                    objUsesWith: Oouw,
                    multiUse: OmuU,
                    hasBeenUsed: OhasBu,
                    canBeEaten: OcBe,
                    eatenObject: Oeo,
                    isEaten: OisE,
                    eatMess: OeMess,
                    canBeBroken: OcanBB,
                    breakMess: OBmess,
                    brokenObject: ObObj,
                    isBroken: OisB,
                    originalRomm: OorigR,
                    isCarried: OisCar,
                    isHidden: OisHid,
                    hiddenIn: OhidIn,
                    hiddenUnder: OhidU,
                    hiddenBehind: OhidB,
                    revealNeeds: OrevN,
                    revealAction: OrevAc,
                    revealRoom: OrevRm,
                    combineable: Ocomb,
                    combineCreates: OcomCr,
                    combineDestroysMe: OcombDest,
                    currentRoom: OcurrRm,
                    prefix: Opr,
                    canGet: OcanGt,
                    actionWhenUsed: OactWU,
                    resultOfUse: OresUs,
                    mendsWith: OMndW,
                    examRevealsObjID: OexRevO,
                    itemForSaleYN: OiFS,
                    itemValue: OiVal,
                    sellerID: OsellBy,
                    canBeStolen: OcnBStln,
                    isTradeable: OisTrade,
                    saleMess: OsaleMs,
                    stealMess: OstealM,
                    isOpen: OisOp,
                    openMess: OopMess,
                    openReveals: OopRev,
                    isCash: OisCsh,
                    isLocked: OisLk,
                    imgRef: Oimg,
                    strength: Ostrn,
                    useAffects: OuAff,
                    statEffect: OstEff,
                    personNeededForReveal: OpNFR
                };
                if (Oobject[i].isCarried == 'y') {
                    addToInv(i, false);
                };

            } // end for loop

            // access the object using Oobject[idnumber].property


        };

}
var Opeeps = [];

function storeNPCs() {
    var cntP = countNodes("people.xml", "person");

    OPeepDecleration:
        if (cntP > 0) {
            var i = 0;
            // NPCs start at 0
            for (i = 0; i < cntP; i++) {
                var Pname, Pcall, Psex, P_age;
                try {
                    Pname = getXmlValue('people.xml', 'person', 'id', i, 'name');
                } catch (e) {
                    Pname = 'Anon';
                };
                try {
                    Pcall = getXmlValue('people.xml', 'person', 'id', i, 'call');
                } catch (e) {
                    Pcall = 'xx';
                };
                try {
                    Psex = getXmlValue('people.xml', 'person', 'id', i, 'sex');
                } catch (e) {
                    Psex = 'he';
                };
                try {
                    P_age = getXmlValue('people.xml', 'person', 'id', i, 'age');
                } catch (e) {
                    P_age = '18';
                };
                var Pheight, Pdescript, PstatTxt, PcanTalk, PdefSay;
                try {
                    Pheight = getXmlValue('people.xml', 'person', 'id', i, 'height');
                } catch (e) {
                    Pheight = '180';
                };
                try {
                    Pdescript = getXmlValue('people.xml', 'person', 'id', i, 'description');
                } catch (e) {
                    Pdescript = 'just boring';
                };
                try {
                    PstatTxt = getXmlValue('people.xml', 'person', 'id', i, 'stationaryText');
                } catch (e) {
                    PstatTxt = 'Also here';
                };
                try {
                    PcanTalk = getXmlValue('people.xml', 'person', 'id', i, 'canTalk');
                } catch (e) {
                    PcanTalk = 'n';
                };
                try {
                    PdefSay = getXmlValue('people.xml', 'person', 'id', i, 'defaultSay');
                } catch (e) {
                    PdefSay = 'xx';
                };
                var PisFol, PfollTxt, PcurrR, PisHid, PcanFight;
                try {
                    PisFol = getXmlValue('people.xml', 'person', 'id', i, 'isFollowing');
                } catch (e) {
                    PisFol = 'n';
                };
                try {
                    PfollTxt = getXmlValue('people.xml', 'person', 'id', i, 'followingText');
                } catch (e) {
                    PfollTxt = 'xx';
                };
                try {
                    PcurrR = getXmlValue('people.xml', 'person', 'id', i, 'currRoom');
                } catch (e) {
                    PcurrR = '9999';
                };
                try {
                    PisHid = getXmlValue('people.xml', 'person', 'id', i, 'isHidden');
                } catch (e) {
                    PisHid = 'n';
                };
                try {
                    PcanFight = getXmlValue('people.xml', 'person', 'id', i, 'canFight');
                } catch (e) {
                    PcanFight = 'n';
                };
                var PfightK, PfightMs, PcanRes, PresMs, PkillRO;
                try {
                    PfightK = getXmlValue('people.xml', 'person', 'id', i, 'fightKills');
                } catch (e) {
                    PfightK = 'n';
                };
                try {
                    PfightMs = getXmlValue('people.xml', 'person', 'id', i, 'fightMessage');
                } catch (e) {
                    PfightMs = 'xx';
                };
                try {
                    PcanRes = getXmlValue('people.xml', 'person', 'id', i, 'canResuss');
                } catch (e) {
                    PcanRes = 'n';
                };
                try {
                    PresMs = getXmlValue('people.xml', 'person', 'id', i, 'resussMess');
                } catch (e) {
                    PresMs = 'xx';
                };
                try {
                    PkillRO = getXmlValue('people.xml', 'person', 'id', i, 'killRevealsObjID');
                } catch (e) {
                    PkillRO = 'xx';
                };
                var PisDead, Pimg, Pcombat, Pwearines, Pwonders;
                try {
                    PisDead = getXmlValue('people.xml', 'person', 'id', i, 'isDead');
                } catch (e) {
                    PisDead = 'n';
                };
                try {
                    Pimg = getXmlValue('people.xml', 'person', 'id', i, 'img');
                } catch (e) {
                    Pimg = 'xx';
                };
                try {
                    Pcombat = getXmlValue('people.xml', 'person', 'id', i, 'combat');
                } catch (e) {
                    Pcombat = '1';
                };
                try {
                    Pwearines = getXmlValue('people.xml', 'person', 'id', i, 'weariness');
                } catch (e) {
                    Pwearines = '1';
                };
                try {
                    Pwonders = getXmlValue('people.xml', 'person', 'id', i, 'wonders');
                } catch (e) {
                    Pwonders = 'n';
                };
                var PcanChs, PchaseGl, PchaseMs, PchaseSucc, PchaseFail;
                try {
                    PcanChs = getXmlValue('people.xml', 'person', 'id', i, 'canChase');
                } catch (e) {
                    PcanChs = 'n';
                };
                try {
                    PchaseGl = getXmlValue('people.xml', 'person', 'id', i, 'chaseGoal');
                } catch (e) {
                    PchaseGl = 'xx';
                };
                try {
                    PchaseMs = getXmlValue('people.xml', 'person', 'id', i, 'chaseMsg');
                } catch (e) {
                    PchaseMs = 'xx';
                };
                try {
                    PchaseSucc = getXmlValue('people.xml', 'person', 'id', i, 'chaseSuccess');
                } catch (e) {
                    PchaseSucc = 'xx';
                };
                try {
                    PchaseFail = getXmlValue('people.xml', 'person', 'id', i, 'chaseFail');
                } catch (e) {
                    PchaseFail = 'xx';
                };
                var PchaseDr, PhaveChased, PsubmitItem, PsubmitTxt;
                try {
                    PchaseDr = getXmlValue('people.xml', 'person', 'id', i, 'chaseDraw');
                } catch (e) {
                    PchaseDr = 'xx';
                };
                try {
                    PhaveChased = getXmlValue('people.xml', 'person', 'id', i, 'haveChased');
                } catch (e) {
                    PhaveChased = 'n';
                };
                try {
                    PsubmitItem = getXmlValue('people.xml', 'person', 'id', i, 'submitItemID');
                } catch (e) {
                    PsubmitItem = 'xx';
                };
                try {
                    PsubmitTxt = getXmlValue('people.xml', 'person', 'id', i, 'submitText');
                } catch (e) {
                    PsubmitTxt = 'xx';
                };

                Opeeps[i] = {
                    id: getXmlValue('people.xml', 'person', 'id', i, 'id'),
                    name: Pname,
                    call: Pcall,
                    sex: Psex,
                    age: P_age,
                    height: Pheight,
                    description: Pdescript,
                    stationaryTxt: PstatTxt,
                    canTalkYN: PcanTalk,
                    defaultSay: PdefSay,
                    isFollowingYN: PisFol,
                    followTxt: PfollTxt,
                    currentRoom: PcurrR,
                    isHiddenYN: PisHid,
                    canFightYN: PcanFight,
                    fightKillsYN: PfightK,
                    fightMess: PfightMs,
                    canResussYN: PcanRes,
                    resussMess: PresMs,
                    killRevealsObjID: PkillRO,
                    isDeadYN: PisDead,
                    image: Pimg,
                    combat: Pcombat,
                    weariness: Pwearines,
                    wondersYN: Pwonders,
                    canChaseYN: PcanChs,
                    chaseGoal: PchaseGl,
                    chaseMsg: PchaseMs,
                    chaseSuccess: PchaseSucc,
                    chaseFail: PchaseFail,
                    chaseDraw: PchaseDr,
                    hasChasedYN: PhaveChased,
                    submissionItem: PsubmitItem,
                    submissionTxt: PsubmitTxt
                }

            }; // end for
        }; // end if

} // end storeNPCs
var Oconv = [];

function storeConvewrsations() {
    var cntCons = countNodes("conversations.xml", "conversation");

    OconvDecleration:
        if (cntCons > 0) {
            var i = 0;


            // conversations start at index 0
            for (i = 0; i < cntCons; i++) {
                var ConePonly, Cperson1, Cperson2, Cperson3;
                try {
                    ConePonly = getXmlValue('conversations.xml', 'conversation', 'id', i, 'onePersonOnly');
                } catch (e) {
                    ConePonly = 'n';
                };
                try {
                    Cperson1 = getXmlValue('conversations.xml', 'conversation', 'id', i, 'forPerson1');
                } catch (e) {
                    Cperson1 = 'x';
                };
                try {
                    Cperson2 = getXmlValue('conversations.xml', 'conversation', 'id', i, 'forPerson2');
                } catch (e) {
                    Cperson2 = 'x';
                };
                try {
                    Cperson3 = getXmlValue('conversations.xml', 'conversation', 'id', i, 'forPerson3');
                } catch (e) {
                    Cperson3 = 'x';
                };
                var Cperson4, Cperson5, CnumbLines, Cline1, Cline2;
                try {
                    Cperson4 = getXmlValue('conversations.xml', 'conversation', 'id', i, 'forPerson4');
                } catch (e) {
                    Cperson4 = 'x';
                };
                try {
                    Cperson5 = getXmlValue('conversations.xml', 'conversation', 'id', i, 'forPerson5');
                } catch (e) {
                    Cperson5 = 'x';
                };
                try {
                    CnumbLines = getXmlValue('conversations.xml', 'conversation', 'id', i, 'numbLines');
                } catch (e) {
                    CnumbLines = '1';
                };
                try {
                    Cline1 = getXmlValue('conversations.xml', 'conversation', 'id', i, 'line1');
                } catch (e) {
                    Cline1 = 'x';
                };
                try {
                    Cline2 = getXmlValue('conversations.xml', 'conversation', 'id', i, 'line2');
                } catch (e) {
                    Cline2 = 'x';
                };
                var Cline3, Cline4, Cline5, Cline6, Cline7;
                try {
                    Cline3 = getXmlValue('conversations.xml', 'conversation', 'id', i, 'line3');
                } catch (e) {
                    Cline3 = 'x';
                };
                try {
                    Cline4 = getXmlValue('conversations.xml', 'conversation', 'id', i, 'line4');
                } catch (e) {
                    Cline4 = 'x';
                };
                try {
                    Cline5 = getXmlValue('conversations.xml', 'conversation', 'id', i, 'line5');
                } catch (e) {
                    Cline5 = 'x';
                };
                try {
                    Cline6 = getXmlValue('conversations.xml', 'conversation', 'id', i, 'line6');
                } catch (e) {
                    Cline6 = 'x';
                };
                try {
                    Cline7 = getXmlValue('conversations.xml', 'conversation', 'id', i, 'line7');
                } catch (e) {
                    Cline7 = 'x';
                };
                var Cline8, Cline9, Cline10, Cl1R, Cl2R;
                try {
                    Cline8 = getXmlValue('conversations.xml', 'conversation', 'id', i, 'line8');
                } catch (e) {
                    Cline8 = 'x';
                };
                try {
                    Cline9 = getXmlValue('conversations.xml', 'conversation', 'id', i, 'line9');
                } catch (e) {
                    Cline9 = 'x';
                };
                try {
                    Cline10 = getXmlValue('conversations.xml', 'conversation', 'id', i, 'line10');
                } catch (e) {
                    Cline10 = 'x';
                };
                try {
                    Cl1R = getXmlValue('conversations.xml', 'conversation', 'id', i, 'line1Resp');
                } catch (e) {
                    Cl1R = 'x';
                };
                try {
                    Cl2R = getXmlValue('conversations.xml', 'conversation', 'id', i, 'line2Resp');
                } catch (e) {
                    Cl2R = 'x';
                };
                var Cl3R, Cl4R, Cl5R, Cl6R, Cl7R;
                try {
                    Cl3R = getXmlValue('conversations.xml', 'conversation', 'id', i, 'line3Resp');
                } catch (e) {
                    Cl3R = 'x';
                };
                try {
                    Cl4R = getXmlValue('conversations.xml', 'conversation', 'id', i, 'line4Resp');
                } catch (e) {
                    Cl4R = 'x';
                };
                try {
                    Cl5R = getXmlValue('conversations.xml', 'conversation', 'id', i, 'line5Resp');
                } catch (e) {
                    Cl5R = 'x';
                };
                try {
                    Cl6R = getXmlValue('conversations.xml', 'conversation', 'id', i, 'line6Resp');
                } catch (e) {
                    Cl6R = 'x';
                };
                try {
                    Cl7R = getXmlValue('conversations.xml', 'conversation', 'id', i, 'line7Resp');
                } catch (e) {
                    Cl7R = 'x';
                };
                var Cl8R, Cl9R, Cl10R, CrmOnly, CrevObj;
                try {
                    Cl8R = getXmlValue('conversations.xml', 'conversation', 'id', i, 'line8Resp');
                } catch (e) {
                    Cl8R = 'x';
                };
                try {
                    Cl9R = getXmlValue('conversations.xml', 'conversation', 'id', i, 'line9Resp');
                } catch (e) {
                    Cl9R = 'x';
                };
                try {
                    Cl10R = getXmlValue('conversations.xml', 'conversation', 'id', i, 'line10Resp');
                } catch (e) {
                    Cl10R = 'x';
                };
                try {
                    CrmOnly = getXmlValue('conversations.xml', 'conversation', 'id', i, 'roomOnlyID');
                } catch (e) {
                    CrmOnly = 'x';
                };
                try {
                    CrevObj = getXmlValue('conversations.xml', 'conversation', 'id', i, 'revealObjID');
                } catch (e) {
                    CrevObj = 'xx';
                };
                var CobjRevL, C1help, C2help, C3help, C4help;
                try {
                    CobjRevL = getXmlValue('conversations.xml', 'conversation', 'id', i, 'objRevealLine');
                } catch (e) {
                    CobjRevL = 'xx';
                };
                try {
                    C1help = getXmlValue('conversations.xml', 'conversation', 'id', i, 'help1');
                } catch (e) {
                    C1help = 'x';
                };
                try {
                    C2help = getXmlValue('conversations.xml', 'conversation', 'id', i, 'help2');
                } catch (e) {
                    C2help = 'x';
                };
                try {
                    C3help = getXmlValue('conversations.xml', 'conversation', 'id', i, 'help3');
                } catch (e) {
                    C3help = 'x';
                };
                try {
                    C4help = getXmlValue('conversations.xml', 'conversation', 'id', i, 'help4');
                } catch (e) {
                    C4help = 'x';
                };
                var C5help, C6help, C7help, C8help, C9help;
                try {
                    C5help = getXmlValue('conversations.xml', 'conversation', 'id', i, 'help5');
                } catch (e) {
                    C5help = 'x';
                };
                try {
                    C6help = getXmlValue('conversations.xml', 'conversation', 'id', i, 'help6');
                } catch (e) {
                    C6help = 'x';
                };
                try {
                    C7help = getXmlValue('conversations.xml', 'conversation', 'id', i, 'help7');
                } catch (e) {
                    C7help = 'x';
                };
                try {
                    C8help = getXmlValue('conversations.xml', 'conversation', 'id', i, 'help8');
                } catch (e) {
                    C8help = 'x';
                };
                try {
                    C9help = getXmlValue('conversations.xml', 'conversation', 'id', i, 'help9');
                } catch (e) {
                    C9help = 'x';
                };
                var C10help;
                try {
                    C10help = getXmlValue('conversations.xml', 'conversation', 'id', i, 'help10');
                } catch (e) {
                    C10help = 'x';
                };

                Oconv[i] = {
                    id: getXmlValue('conversations.xml', 'conversation', 'id', i, 'id'),
                    onePersonYN: ConePonly,
                    p1ID: Cperson1,
                    p2ID: Cperson2,
                    p3ID: Cperson3,
                    p4ID: Cperson4,
                    p5ID: Cperson5,
                    numberLines: CnumbLines,
                    line1: Cline1,
                    line2: Cline2,
                    line3: Cline3,
                    line4: Cline4,
                    line5: Cline5,
                    line6: Cline6,
                    line7: Cline7,
                    line8: Cline8,
                    line9: Cline9,
                    line10: Cline10,
                    line1Resp: Cl1R,
                    line2Resp: Cl2R,
                    line3Resp: Cl3R,
                    line4Resp: Cl4R,
                    line5Resp: Cl5R,
                    line6Resp: Cl6R,
                    line7Resp: Cl7R,
                    line8Resp: Cl8R,
                    line9Resp: Cl9R,
                    line10Resp: Cl10R,
                    roomID: CrmOnly,
                    objRevealedID: CrevObj,
                    help1: C1help,
                    help2: C2help,
                    help3: C3help,
                    help4: C4help,
                    help5: C5help,
                    help6: C6help,
                    help7: C7help,
                    help8: C8help,
                    help9: C9help,
                    help10: C10help
                }

            }; // end for


        } // end storeConversations
}
var Oroom = [];

function storeRooms() {
    var cntRms = countNodes("rooms.xml", "room");
    console.log("room count " + cntRms);
    OroomDecleration:
        if (cntRms > 0) {
            var i = 0;
            for (i = 1; i <= cntRms; i++) {

                var Rname, Rdesc, RlitYN, RcanBeDarkYN;
                try {
                    Rname = getXmlValue('rooms.xml', 'room', 'id', i, 'name');
                } catch (e) {

                    Rname = "Empty room"
                };
                try {
                    Rdesc = getXmlValue('rooms.xml', 'room', 'id', i, 'description');
                } catch (e) {
                    Rdesc = "Nothing to see";
                };
                try {
                    RlitYN = getXmlValue('rooms.xml', 'room', 'id', i, 'isLit');
                } catch (e) {
                    RlitYN = 'y';
                };
                try {
                    RcanBeDarkYN = getXmlValue('rooms.xml', 'room', 'id', i, 'canBeDark');
                } catch (e) {
                    RcanBeDarkYN = 'n';
                };
                var RdarkDesc, Rexits, Rn, R_e, Rs;
                try {
                    RdarkDesc = getXmlValue('rooms.xml', 'room', 'id', i, 'darkDescription');
                } catch (e) {
                    RdarkDesc = '0';
                };
                try {
                    Rexits = getXmlValue('rooms.xml', 'room', 'id', i, 'exits');
                } catch (e) {
                    Rexits = 'You can go this way';
                };
                try {
                    Rn = getXmlValue('rooms.xml', 'room', 'id', i, 'Nto');
                } catch (e) {
                    Rn = '0';
                };
                try {
                    R_e = getXmlValue('rooms.xml', 'room', 'id', i, 'Eto');
                } catch (e) {
                    R_e = '0';
                };
                try {
                    Rs = getXmlValue('rooms.xml', 'room', 'id', i, 'Sto');
                } catch (e) {
                    Rs = 'n';
                };
                var Rw, Rup, RDwn, R_in, R_out;
                try {
                    Rw = getXmlValue('rooms.xml', 'room', 'id', i, 'Wto');
                } catch (e) {
                    Rw = '0';
                };
                try {
                    Rup = getXmlValue('rooms.xml', 'room', 'id', i, 'Upto');
                } catch (e) {
                    Rup = '0';
                };
                try {
                    RDwn = getXmlValue('rooms.xml', 'room', 'id', i, 'Dto');
                } catch (e) {
                    RDwn = '0';
                };
                try {
                    R_in = getXmlValue('rooms.xml', 'room', 'id', i, 'Into');
                } catch (e) {
                    R_in = '0';
                };
                try {
                    R_out = getXmlValue('rooms.xml', 'room', 'id', i, 'Outto');
                } catch (e) {
                    R_out = '0';
                };
                var Rimg, Rrev, Rblock, RshortDesc, RbeenBefore;
                try {
                    Rimg = getXmlValue('rooms.xml', 'room', 'id', i, 'img');
                } catch (e) {
                    Rimg = 'x';
                };
                try {
                    Rrev = getXmlValue('rooms.xml', 'room', 'id', i, 'isRevealed');
                } catch (e) {
                    Rrev = 'y';
                };
                try {
                    Rblock = getXmlValue('rooms.xml', 'room', 'id', i, 'blocking');
                } catch (e) {
                    Rblock = 'xx';
                };
                try {
                    RshortDesc = getXmlValue('rooms.xml', 'room', 'id', i, 'shortDesc');
                } catch (e) {
                    RshortDesc = 'still nothing';
                };
                try {
                    RbeenBefore = getXmlValue('rooms.xml', 'room', 'id', i, 'beenBefore');
                } catch (e) {
                    RbeenBefore = 'n';
                };
                var RroomType, Rhelp;
                try {
                    RroomType = getXmlValue('rooms.xml', 'room', 'id', i, 'roomType');
                } catch (e) {
                    RroomType = 'outside';
                };
                try {
                    Rhelp = getXmlValue('rooms.xml', 'room', 'id', i, 'helpHint');
                } catch (e) {
                    Rhelp = 'No help from me';
                };

                Oroom[i] = {
                    id: getXmlValue('rooms.xml', 'room', 'id', i, 'id'),
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

            }; //end for
        }; //end if
} // end functionm

function checkEvents(roomId) {
    /* check to see if any of the events are called.
      this function is called after all objs and peeps displayed in getThisRoom in general.js
      
      The poiont of this is so that things appropriate to rooms can occur very time or at random times. The example in room 1 sets the players moodlevel but you can have it do anything really. 
      
      */


    // so decide which rooms you want which events to occur and if random or have a subsequent effect, then put that in under the room id
    var returnValue = '';
    var xx = Math.random();
    var cntr = xx * 10; // this means it will be a number between 0 and 10
    switch (roomId) {
        case 1:
            if (cntr <= 2) // gives it 1 in 5 chance
            {
                if (rain.alreadyDone == 'n') {
                    returnValue = rain.firstTxt;
                    rain.alreadyDone = "y";
                    let md = parseFloat(rain.affect);
                    moodLevel += md;
                } else {
                    returnValue = rain.laterTxt;
                };
            };


            break;
        case 2:
            if (cntr <= 2) // gives it 1 in 5 chance
            {
                if (sunny.alreadyDone == 'n') {
                    returnValue = sunny.firstTxt;
                    sunny.alreadyDone = "y";
                    let md = parseFloat(rain.affect);
                    moodLevel += md;
                } else {
                    returnValue = sunny.laterTxt;
                };
            };


            break;
    };



    return returnValue;
}
