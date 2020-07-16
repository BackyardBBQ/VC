/* CONTENTS
    electron set up
    fromToXml
    download
    downloadData


*/

// TODO NEXT line 537 save peep
// note that the fs package does not exist on a normal browser

const fs = require("fs");
//a dialog box module from electron
const {
    dialog
} = require("electron").remote;
// Also note that document does not exist in a normal node environment
// button click event
/*document.getElementById("mybutton").addEventListener("click", () => {
    const data = "Successfully wrote to the desktop"; // the data we want to save to the desktop
    //launch save dialog window
    dialog.showSaveDialog(filename => {
        //save file at the destination indicated by filename
        fs.writeFileSync(filename + ".txt", data, "utf-8", () => {
            console.log("attempted to write to the desktop");
        });
    });
});*/
/* gets xml and turns to js */

var convert = require('xml-js');
const electron = require('electron');
const {
    electronSend
} = electron;


function fromToXml(form, category) {
    // NOTE this needs to save all of the selected file from the array which was created when the object/room etc selection was made
    switch (category) {
        case "rooms":
            //you can still reference the document here

            //load all the rooms into memory
            var roomLoc = gameLocation + "/rooms.xml";
            var cntRms = countNodes(roomLoc, "room");

            var Orooms = [];


            OroomDecleration:
                if (cntRms > 0) {
                    var i = 1;
                    for (i = 1; i <= cntRms; i++) {


                        Orooms[i] = {
                            id: getXmlValue(roomLoc, 'room', 'id', i, 'id'),
                            name: getXmlValue(roomLoc, 'room', 'id', i, 'name'),
                            description: getXmlValue(roomLoc, 'room', 'id', i, 'description'),
                            isLitYN: getXmlValue(roomLoc, 'room', 'id', i, 'isLit'),
                            canBeDarkYN: getXmlValue(roomLoc, 'room', 'id', i, 'canBeDark'),
                            darkDescription: getXmlValue(roomLoc, 'room', 'id', i, 'darkDescription'),
                            exits: getXmlValue(roomLoc, 'room', 'id', i, 'exits'),
                            northTo: getXmlValue(roomLoc, 'room', 'id', i, 'Nto'),
                            eastTo: getXmlValue(roomLoc, 'room', 'id', i, 'Eto'),
                            southTo: getXmlValue(roomLoc, 'room', 'id', i, 'Sto'),
                            westTo: getXmlValue(roomLoc, 'room', 'id', i, 'Wto'),
                            upTo: getXmlValue(roomLoc, 'room', 'id', i, 'Upto'),
                            downTo: getXmlValue(roomLoc, 'room', 'id', i, 'Dto'),
                            inTo: getXmlValue(roomLoc, 'room', 'id', i, 'Into'),
                            outTo: getXmlValue(roomLoc, 'room', 'id', i, 'Outto'),
                            imgRef: getXmlValue(roomLoc, 'room', 'id', i, 'img'),
                            roomIsRevealed: getXmlValue(roomLoc, 'room', 'id', i, 'isRevealed'),
                            blockedTxt: getXmlValue(roomLoc, 'room', 'id', i, 'blocking'),
                            shortDescription: getXmlValue(roomLoc, 'room', 'id', i, 'shortDesc'),
                            alreadyVisitedYN: getXmlValue(roomLoc, 'room', 'id', i, 'beenBefore'),
                            roomType: getXmlValue(roomLoc, 'room', 'id', i, 'roomType'),
                            helpTxt: getXmlValue(roomLoc, 'room', 'id', i, 'helpHint')
                        }


                    }; //end for



                }; //end if




            // NOTE: first load all the rooms into the rooms Object - then cycle through them. If the id'd dont match write the Object properties
            // to the xml code. If id's match then add using the inputs code.
            var xmldata = ['<?xml version="1.0"?>'];
            xmldata.push("<rooms>");

            // loop thru the Object now
            for (o = 1; o < Orooms.length; o++) {

                if (Orooms[o].id != document.getElementById("RmID").value) {
                    // store unchanged data up to the room ID
                    xmldata.push("<room>");
                    xmldata.push("<id>" + Orooms[o].id + "</id>");
                    xmldata.push("<name>" + Orooms[o].name + "</name>");
                    xmldata.push("<description>" + Orooms[o].description + "</description>");
                    xmldata.push("<isLit>" + Orooms[o].isLitYN + "</isLit>");
                    xmldata.push("<canBeDark>" + Orooms[o].canBeDarkYN + "</canBeDark>");
                    xmldata.push("<darkDescription>" + Orooms[o].darkDescription + "</darkDescription>");
                    xmldata.push("<exits>" + Orooms[o].exits + "</exits>");
                    xmldata.push("<Nto>" + Orooms[o].northTo + "</Nto>");
                    xmldata.push("<Sto>" + Orooms[o].southTo + "</Sto>");
                    xmldata.push("<Eto>" + Orooms[o].eastTo + "</Eto>");
                    xmldata.push("<Wto>" + Orooms[o].westTo + "</Wto>");
                    xmldata.push("<Upto>" + Orooms[o].upTo + "</Upto>");
                    xmldata.push("<Dto>" + Orooms[o].downTo + "</Dto>");
                    xmldata.push("<Into>" + Orooms[o].inTo + "</Into>");
                    xmldata.push("<Outto>" + Orooms[o].outTo + "</Outto>");
                    xmldata.push("<img>" + Orooms[o].imgRef + "</img>");
                    xmldata.push("<isRevealed>" + Orooms[o].roomIsRevealed + "</isRevealed>");
                    xmldata.push("<blocking>" + Orooms[o].blockedTxt + "</blocking>");
                    xmldata.push("<shortDesc>" + Orooms[o].shortDescription + "</shortDesc>");
                    xmldata.push("<beenBefore>" + Orooms[o].alreadyVisitedYN + "</beenBefore>");
                    xmldata.push("<roomType>" + Orooms[o].roomType + "</roomType>");
                    xmldata.push("<helpHint>" + Orooms[o].helpTxt + "</helpHint>");







                    xmldata.push("</room>")
                } else {
                    // store the shown xml
                    xmldata.push("<room>");
                    xmldata.push("<id>" + document.getElementById("RmID").value + "</id>");
                    xmldata.push("<name>" + document.getElementById("RmName").value + "</name>");
                    xmldata.push("<description>" + document.getElementById("RmDesc").value + "</description>");
                    if (document.getElementById("isLit").checked == true) {
                        xmldata.push("<isLit>y</isLit>");
                    } else {
                        xmldata.push("<isLit>n</isLit>");
                    };
                    if (document.getElementById("canBeDark").checked == true) {
                        xmldata.push("<canBeDark>y</canBeDark>");
                    } else {
                        xmldata.push("<canBeDark>n</canBeDark>");
                    };


                    xmldata.push("<darkDescription>" + document.getElementById("darkDesc").value + "</darkDescription>");
                    xmldata.push("<exits>" + document.getElementById("exText").value + "</exits>");
                    xmldata.push("<Nto>" + document.getElementById("selN").value + "</Nto>");
                    xmldata.push("<Sto>" + document.getElementById("selS").value + "</Sto>");
                    xmldata.push("<Eto>" + document.getElementById("selE").value + "</Eto>");
                    xmldata.push("<Wto>" + document.getElementById("selW").value + "</Wto>");
                    xmldata.push("<Upto>" + document.getElementById("selUP").value + "</Upto>");
                    xmldata.push("<Dto>" + document.getElementById("selD").value + "</Dto>");
                    xmldata.push("<Into>" + document.getElementById("selIN").value + "</Into>");
                    xmldata.push("<Outto>" + document.getElementById("selOUT").value + "</Outto>");

                    if (Orooms[o].imgRef == 'x' || Orooms[o].imgRef == undefined || Orooms[o].imgRef != document.getElementById("RmIm").value) {
                        // store the new image to the xml
                        xmldata.push("<img>" + localStorage.getItem("rmImRef") + "</img>");

                    } else {
                        xmldata.push("<img>" + Orooms[o].imgRef + "</img>");
                    };
                    localStorage.removeItem('rmImRef');
                    if (document.getElementById("isRevealed").checked == true) {
                        xmldata.push("<isRevealed>y</isRevealed>");
                    } else {
                        xmldata.push("<isRevealed>n</isRevealed>");
                    };

                    xmldata.push("<blocking>" + document.getElementById("RmBlockTxt").value + "</blocking>");
                    xmldata.push("<shortDesc>" + document.getElementById("shortDesc").value + "</shortDesc>");
                    if (document.getElementById("alreadyBeen").checked == true) {
                        xmldata.push("<beenBefore>y</beenBefore>");
                    } else {
                        xmldata.push("<beenBefore>n</beenBefore>");
                    };

                    xmldata.push("<roomType>" + document.getElementById("RmType").value + "</roomType>");
                    xmldata.push("<helpHint>" + document.getElementById("helpHint").value + "</helpHint>");

                    xmldata.push("</room>")
                }
            }; // end for

            xmldata.push("</rooms>");
            return xmldata.join("\n");
            break;
        case "objects":
            var fileLoc = gameLocation + "/objects.xml";
            var cntObj = countNodes(fileLoc, "object");

            var Oobjects = [];
            OobjectDecleration:
                if (cntObj > 0) {
                    var iOb = 1;
                    for (i = 0; i < cntObj; i++) {
                        console.log("ob= " + i);
                        //NOTE: saving Peeps will need to use a second counter for the Object Opeeps, see below line
                        Oobjects[iOb] = { // need a different counter as the Object Oobjects starts at 1 and the xml object id starts as 0
                            id: getXmlValue(fileLoc, 'object', 'id', i, 'id'),
                            name: getXmlValue(fileLoc, 'object', 'id', i, 'name'),
                            description: getXmlValue(fileLoc, 'object', 'id', i, 'description'),
                            weight: getXmlValue(fileLoc, 'object', 'id', i, 'weight'),
                            spaces: getXmlValue(fileLoc, 'object', 'id', i, 'spaces'),
                            specialMess: getXmlValue(fileLoc, 'object', 'id', i, 'specialMess'),
                            isImportant: getXmlValue(fileLoc, 'object', 'id', i, 'isImportant'),
                            importantMess: getXmlValue(fileLoc, 'object', 'id', i, 'importantMessage'),
                            isOn: getXmlValue(fileLoc, 'object', 'id', i, 'isOn'),
                            needsSecondObj: getXmlValue(fileLoc, 'object', 'id', i, 'needsAnotherObjToWork'),
                            secondObjReq: getXmlValue(fileLoc, 'object', 'id', i, 'objUsesWith'),
                            multiUse: getXmlValue(fileLoc, 'object', 'id', i, 'multiUse'),
                            hasBeenUsed: getXmlValue(fileLoc, 'object', 'id', i, 'hasBeenUsed'),
                            canBeEaten: getXmlValue(fileLoc, 'object', 'id', i, 'canBeEaten'),
                            eatenObj: getXmlValue(fileLoc, 'object', 'id', i, 'eatenObject'),
                            isEaten: getXmlValue(fileLoc, 'object', 'id', i, 'isEaten'),
                            eatMessage: getXmlValue(fileLoc, 'object', 'id', i, 'eatMess'),
                            canBeBroken: getXmlValue(fileLoc, 'object', 'id', i, 'canBeBroken'),
                            breakMessage: getXmlValue(fileLoc, 'object', 'id', i, 'breakMess'),
                            brokenObject: getXmlValue(fileLoc, 'object', 'id', i, 'brokenObject'),
                            isBroken: getXmlValue(fileLoc, 'object', 'id', i, 'isBroken'),
                            originalRoom: getXmlValue(fileLoc, 'object', 'id', i, 'originalRoom'),
                            isCarried: getXmlValue(fileLoc, 'object', 'id', i, 'isCarried'),
                            isHidden: getXmlValue(fileLoc, 'object', 'id', i, 'isHidden'),
                            hiddenIn: getXmlValue(fileLoc, 'object', 'id', i, 'hiddenIn'),
                            hiddenUnder: getXmlValue(fileLoc, 'object', 'id', i, 'hiddenUnder'),
                            hiddenBehind: getXmlValue(fileLoc, 'object', 'id', i, 'hiddenBehind'),
                            objReqForReveal: getXmlValue(fileLoc, 'object', 'id', i, 'revealNeeds'),
                            revealAction: getXmlValue(fileLoc, 'object', 'id', i, 'revealAction'),
                            revealRoom: getXmlValue(fileLoc, 'object', 'id', i, 'revealRoom'),
                            isCombineable: getXmlValue(fileLoc, 'object', 'id', i, 'combineable'),
                            combineCreates: getXmlValue(fileLoc, 'object', 'id', i, 'combineCreates'),
                            combineDestroysThisObj: getXmlValue(fileLoc, 'object', 'id', i, 'combineDestroysMe'),
                            currentRoom: getXmlValue(fileLoc, 'object', 'id', i, 'currentRoom'),
                            prefix: getXmlValue(fileLoc, 'object', 'id', i, 'prefix'),
                            canBeGot: getXmlValue(fileLoc, 'object', 'id', i, 'canGet'),
                            actionWhenUsed: getXmlValue(fileLoc, 'object', 'id', i, 'actionWhenUsed'),
                            resultOfUseMess: getXmlValue(fileLoc, 'object', 'id', i, 'resultOfUse'),
                            mendsWith: getXmlValue(fileLoc, 'object', 'id', i, 'mendsW'),
                            examRevealsObj: getXmlValue(fileLoc, 'object', 'id', i, 'examRevealsObjID'),
                            itemForSale: getXmlValue(fileLoc, 'object', 'id', i, 'itemForSale'),
                            itemValue: getXmlValue(fileLoc, 'object', 'id', i, 'itemValue'),
                            sellerID: getXmlValue(fileLoc, 'object', 'id', i, 'sellByID'),
                            canBeStolen: getXmlValue(fileLoc, 'object', 'id', i, 'canBeStolen'),
                            isTradeable: getXmlValue(fileLoc, 'object', 'id', i, 'isTradeable'),
                            saleMessage: getXmlValue(fileLoc, 'object', 'id', i, 'saleMess'),
                            stealMessage: getXmlValue(fileLoc, 'object', 'id', i, 'stealMess'),
                            isOpen: getXmlValue(fileLoc, 'object', 'id', i, 'isOpen'),
                            openMessage: getXmlValue(fileLoc, 'object', 'id', i, 'openMess'),
                            objectRevealedAfterOpen: getXmlValue(fileLoc, 'object', 'id', i, 'openReveals'),
                            isCash: getXmlValue(fileLoc, 'object', 'id', i, 'isCash'),
                            isLocked: getXmlValue(fileLoc, 'object', 'id', i, 'isLocked'),
                            imageRef: getXmlValue(fileLoc, 'object', 'id', i, 'img'),
                            strength: getXmlValue(fileLoc, 'object', 'id', i, 'strength'),
                            useAffects: getXmlValue(fileLoc, 'object', 'id', i, 'useAffects'),
                            statEffectAmount: getXmlValue(fileLoc, 'object', 'id', i, 'statEffect'),
                            personNeededForReveal: getXmlValue(fileLoc, 'object', 'id', i, 'personNeededForReveal')

                        }
                        console.log("ob " + i + " finished");
                        iOb++;
                    }; // end for
                }; // end if
            var xmldata = ['<?xml version="1.0"?>'];
            xmldata.push("<objects>");
            for (o = 1; o < Oobjects.length; o++) {
                if (Oobjects[o].id != document.getElementById("ObID").value) {
                    xmldata.push("<object>");
                    xmldata.push("<id>" + Oobjects[o].id + "</id>");
                    xmldata.push("<name>" + Oobjects[o].name + "</name>");
                    xmldata.push("<description>" + Oobjects[o].description + "</description>");
                    xmldata.push("<weight>" + Oobjects[o].weight + "</weight>");
                    xmldata.push("<spaces>" + Oobjects[o].spaces + "</spaces>");
                    xmldata.push("<specialMess>" + Oobjects[o].specialMess + "</specialMess>");
                    xmldata.push("<isImportant>" + Oobjects[o].isImportant + "</isImportant>");
                    xmldata.push("<importantMessage>" + Oobjects[o].importantMess + "</importantMessage>");
                    xmldata.push("<isOn>" + Oobjects[o].isOn + "</isOn>");
                    xmldata.push("<needsAnotherObjToWork>" + Oobjects[o].needsSecondObj + "</needsAnotherObjToWork>");
                    xmldata.push("<objUsesWith>" + Oobjects[o].secondObjReq + "</objUsesWith>");
                    xmldata.push("<multiUse>" + Oobjects[o].multiUse + "</multiUse>");
                    xmldata.push("<hasBeenUsed>" + Oobjects[o].hasBeenUsed + "</hasBeenUsed>");
                    xmldata.push("<canBeEaten>" + Oobjects[o].canBeEaten + "</canBeEaten>");
                    xmldata.push("<eatenObject>" + Oobjects[o].eatenObj + "</eatenObject>");
                    xmldata.push("<isEaten>" + Oobjects[o].isEaten + "</isEaten>");
                    xmldata.push("<eatMess>" + Oobjects[o].eatMessage + "</eatMess>");
                    xmldata.push("<canBeBroken>" + Oobjects[o].canBeBroken + "</canBeBroken>");
                    xmldata.push("<breakMess>" + Oobjects[o].breakMessage + "</breakMess>");
                    xmldata.push("<brokenObject>" + Oobjects[o].brokenObject + "</brokenObject>");
                    xmldata.push("<isBroken>" + Oobjects[o].isBroken + "</isBroken>");
                    xmldata.push("<originalRoom>" + Oobjects[o].originalRoom + "</originalRoom>");
                    xmldata.push("<isCarried>" + Oobjects[o].isCarried + "</isCarried>");
                    xmldata.push("<isHidden>" + Oobjects[o].isHidden + "</isHidden>");
                    xmldata.push("<hiddenIn>" + Oobjects[o].hiddenIn + "</hiddenIn>");
                    xmldata.push("<hiddenUnder>" + Oobjects[o].hiddenUnder + "</hiddenUnder>");
                    xmldata.push("<hiddenBehind>" + Oobjects[o].hiddenBehind + "</hiddenBehind>");
                    xmldata.push("<revealNeeds>" + Oobjects[o].objReqForReveal + "</revealNeeds>");
                    xmldata.push("<revealAction>" + Oobjects[o].revealAction + "</revealAction>");
                    xmldata.push("<revealRoom>" + Oobjects[o].revealRoom + "</revealRoom>");
                    xmldata.push("<combineable>" + Oobjects[o].isCombineable + "</combineable>");
                    xmldata.push("<combineCreates>" + Oobjects[o].combineCreates + "</combineCreates>");
                    xmldata.push("<combineDestroysMe>" + Oobjects[o].combineDestroysThisObj + "</combineDestroysMe>");
                    xmldata.push("<currentRoom>" + Oobjects[o].currentRoom + "</currentRoom>");
                    xmldata.push("<prefix>" + Oobjects[o].prefix + "</prefix>");
                    xmldata.push("<canGet>" + Oobjects[o].canBeGot + "</canGet>");
                    xmldata.push("<actionWhenUsed>" + Oobjects[o].actionWhenUsed + "</actionWhenUsed>");
                    xmldata.push("<resultOfUse>" + Oobjects[o].resultOfUseMess + "</resultOfUse>");
                    xmldata.push("<mendsW>" + Oobjects[o].mendsWith + "</mendsW>");
                    xmldata.push("<examRevealsObjID>" + Oobjects[o].examRevealsObj + "</examRevealsObjID>");
                    xmldata.push("<itemForSale>" + Oobjects[o].itemForSale + "</itemForSale>");
                    xmldata.push("<itemValue>" + Oobjects[o].itemValue + "</itemValue>");
                    xmldata.push("<sellByID>" + Oobjects[o].sellerID + "</sellByID>");
                    xmldata.push("<canBeStolen>" + Oobjects[o].canBeStolen + "</canBeStolen>");
                    xmldata.push("<isTradeable>" + Oobjects[o].isTradeable + "</isTradeable>");
                    xmldata.push("<saleMess>" + Oobjects[o].saleMessage + "</saleMess>");
                    xmldata.push("<stealMess>" + Oobjects[o].stealMessage + "</stealMess>");
                    xmldata.push("<isOpen>" + Oobjects[o].isOpen + "</isOpen>");
                    xmldata.push("<openMess>" + Oobjects[o].openMessage + "</openMess>");
                    xmldata.push("<openReveals>" + Oobjects[o].objectRevealedAfterOpen + "</openReveals>");
                    xmldata.push("<isCash>" + Oobjects[o].isCash + "</isCash>");
                    xmldata.push("<isLocked>" + Oobjects[o].isLocked + "</isLocked>");
                    xmldata.push("<img>" + Oobjects[o].imageRef + "</img>");
                    xmldata.push("<strength>" + Oobjects[o].strength + "</strength>");
                    xmldata.push("<useAffects>" + Oobjects[o].useAffects + "</useAffects>");
                    xmldata.push("<statEffect>" + Oobjects[o].statEffectAmount + "</statEffect>");
                    xmldata.push("<personNeededForReveal>" + Oobjects[o].personNeededForReveal + "</personNeededForReveal>");


                    xmldata.push("</object>")
                } else {
                    xmldata.push("<object>");
                    xmldata.push("<id>" + document.getElementById("ObID").value + "</id>");

                    // now do the push but from the form
                    xmldata.push("<name>" + document.getElementById("ObName").value + "</name>");
                    if (document.getElementById("ObDesc").value != "") {
                        xmldata.push("<description>" + document.getElementById("ObDesc").value + "</description>");
                    } else {
                        xmldata.push("<description>xx</description>");
                    };
                    xmldata.push("<description>" + document.getElementById("ObDesc").value + "</description>");
                    xmldata.push("<weight>" + document.getElementById("ObW").value + "</weight>");
                    xmldata.push("<spaces>" + document.getElementById("ObS").value + "</spaces>");
                    if (document.getElementById("ObSpMess").value != "") {
                        xmldata.push("<specialMess>" + document.getElementById("ObSpMess").value + "</specialMess>");
                    } else {
                        xmldata.push("<specialMess>xx</specialMess>");
                    };

                    if (document.getElementById("isImp").checked == true) {
                        xmldata.push("<isImportant>y</isImportant>");
                    } else {
                        xmldata.push("<isImportant>n</isImportant>");
                    };
                    if (document.getElementById("ObImpMess").value != "") {
                        xmldata.push("<importantMessage>" + document.getElementById("ObImpMess").value + "</importantMessage>");
                    } else {
                        xmldata.push("<importantMessage>xx</importantMessage>");
                    };

                    if (document.getElementById("isOn").checked == true) {
                        xmldata.push("<isOn>y</isOn>");
                    } else {
                        xmldata.push("<isOn>n</isOn>");
                    };
                    if (document.getElementById("NeedObToWork").checked == true) {
                        xmldata.push("<needsAnotherObjToWork>y</needsNotherObjToWork>");
                    } else {
                        xmldata.push("<needsAnotherObjToWork>n</needsAnotherObjToWork>");
                    };
                    if (document.getElementById("ObReqToWork") != null && document.getElementById("ObReqToWork") != undefined) {
                        xmldata.push("<objUsesWith>" + document.getElementById("ObReqToWork").value + "</objUsesWith>");
                    } else {
                        xmldata.push("<objUsesWith>9999</objUsesWith>");
                    };

                    if (document.getElementById("objMultiUse").checked == true) {
                        xmldata.push("<multiUse>y</multiUse>"); // <--
                    } else {
                        xmldata.push("<multiUse>n</multiUse>");
                    };


                    xmldata.push("<hasBeenUsed>n</hasBeenUsed>");

                    if (document.getElementById("objCanBeEaten").checked == true) {
                        xmldata.push("<canBeEaten>y</canBeEaten>");
                    } else {
                        xmldata.push("<canBeEaten>n</canBeEaten>");
                    };


                    xmldata.push("<eatenObject>" + document.getElementById("ObAfterEaten").value + "</eatenObject>");
                    xmldata.push("<isEaten>n</isEaten>");
                    if (document.getElementById("ObEatMess").value != "") {
                        xmldata.push("<eatMess>" + document.getElementById("ObEatMess").value + "</eatMess>");
                    } else {
                        xmldata.push("<eatMess>xx</eatMess>");
                    };

                    if (document.getElementById("objCanBeBroken").checked == true) {
                        xmldata.push("<canBeBroken>y</canBeBroken>");
                    } else {
                        xmldata.push("<canBeBroken>n</canBeBroken>");
                    };
                    if (document.getElementById("ObBreakMess").value != "") {
                        xmldata.push("<breakMess>" + document.getElementById("ObBreakMess").value + "</breakMess>");
                    } else {
                        xmldata.push("<breakMess>xx</breakMess>");
                    };

                    xmldata.push("<brokenObject>" + document.getElementById("ObAfterBroken").value + "</brokenObject>");
                    xmldata.push("<isBroken>n</isBroken>");
                    xmldata.push("<originalRoom>" + document.getElementById("ObSelOrigRoom").value + "</originalRoom>");
                    if (document.getElementById("objCarried").checked == true) {
                        xmldata.push("<isCarried>y</isCarried>");
                    } else {
                        xmldata.push("<isCarried>n</isCarried>");
                    };
                    if (document.getElementById("objHidden").checked == true) {
                        xmldata.push("<isHidden>y</isHidden>");
                    } else {
                        xmldata.push("<isHidden>n</isHidden>");
                    }

                    xmldata.push("<hiddenIn>" + document.getElementById("ObHidIn").value + "</hiddenIn>");
                    xmldata.push("<hiddenUnder>" + document.getElementById("ObHidUnder").value + "</hiddenUnder>");
                    xmldata.push("<hiddenBehind>" + document.getElementById("ObHidBehind").value + "</hiddenBehind>");
                    xmldata.push("<revealNeeds>" + document.getElementById("ObRevealNeeds").value + "</revealNeeds>");
                    xmldata.push("<revealAction>" + document.getElementById("ObRevealAction").value + "</revealAction>");
                    if (document.getElementById("ObRevealRoom").value != null && document.getElementById("ObRevealRoom") != undefined) {
                        xmldata.push("<revealRoom>" + document.getElementById("ObRevealRoom").value + "</revealRoom>");
                    } else {
                        xmldata.push("<revealRoom>9999</revealRoom>");
                    }

                    if (document.getElementById("objCombineable").checked == true) {
                        xmldata.push("<combineable>y</combineable>");
                    } else {
                        xmldata.push("<combineable>n</combineable>");
                    };

                    xmldata.push("<combineCreates>" + document.getElementById("ObCombCreates").value + "</combineCreates>");
                    if (document.getElementById("ObCombDestMe").checked == true) {
                        xmldata.push("<combineDestroysMe>y</combineDestroysMe>");
                    } else {
                        xmldata.push("<combineDestroysMe>n</combineDestroysMe>");
                    };

                    xmldata.push("<currentRoom>" + document.getElementById("ObCurrRoom").value + "</currentRoom>");
                    xmldata.push("<prefix>" + document.getElementById("ObPrefix").value + "</prefix>");
                    if (document.getElementById("ObCanBeGot").checked == true) {
                        xmldata.push("<canGet>y</canGet>");
                    } else {
                        xmldata.push("<canGet>n</canGet>");
                    };

                    xmldata.push("<actionWhenUsed>" + document.getElementById("ObUseAction").value + "</actionWhenUsed>");
                    xmldata.push("<resultOfUse>" + document.getElementById("ObUseTxt").value + "</resultOfUse>");
                    xmldata.push("<mendsW>" + document.getElementById("ObMendsW").value + "</mendsW>");
                    xmldata.push("<examRevealsObjID>" + document.getElementById("ObExamRevs").value + "</examRevealsObjID>");
                    if (document.getElementById("ObCanBeSold").checked == true) {
                        xmldata.push("<itemForSale>y</itemForSale>");
                    } else {
                        xmldata.push("<itemForSale>y</itemForSale>");
                    }
                    if (document.getElementById("ObValue").value != "") {
                        xmldata.push("<itemValue>" + document.getElementById("ObValue").value + "</itemValue>");
                    } else {
                        xmldata.push("<itemValue>0</itemValue>");
                    };

                    xmldata.push("<sellByID>" + document.getElementById("ObSeller").value + "</sellByID>");

                    if (document.getElementById("ObCanBeStolen").checked == true) {
                        xmldata.push("<canBeStolen>y</canBeStolen>");
                    } else {
                        xmldata.push("<canBeStolen>n</canBeStolen>");
                    };
                    if (document.getElementById("ObCanBeTraded").checked == true) {
                        xmldata.push("<isTradeable>y</isTradeable>");
                    } else {
                        xmldata.push("<isTradeable>n</isTradeable>");
                    }
                    if (document.getElementById("ObSaleMess").value != "") {
                        xmldata.push("<saleMess>" + document.getElementById("ObSaleMess").value + "</saleMess>");
                    } else {
                        xmldata.push("<saleMess>xx</saleMess>");
                    };
                    if (document.getElementById("ObStoleMess").value != "") {
                        xmldata.push("<stealMess>" + document.getElementById("ObStoleMess").value + "</stealMess>");
                    } else {
                        xmldata.push("<stealMess>xx</stealMess>");
                    };

                    if (document.getElementById("ObOpen").checked == true) {
                        xmldata.push("<isOpen>y</isOpen>");
                    } else {
                        xmldata.push("<isOpen>n</isOpen>");
                    };
                    if (document.getElementById("ObOpenMess").value != "") {
                        xmldata.push("<openMess>" + document.getElementById("ObOpenMess").value + "</openMess>");
                    } else {
                        xmldata.push("<openMess>xx</openMess>");
                    };

                    xmldata.push("<openReveals>" + document.getElementById("ObOpenRevs").value + "</openReveals>");
                    if (document.getElementById("ObIsCash").checked == true) {
                        xmldata.push("<isCash>y</isCash>");
                    } else {
                        xmldata.push("<isCash>n</isCash>");
                    };
                    if (document.getElementById("ObIsLocked").checked == true) {
                        xmldata.push("<isLocked>y</isLocked>");
                    } else {
                        xmldata.push("<isLocked>y</isLocked>");
                    };


                    if (Oobjects[o].imageRef == 'x' || Oobjects[o].imageRef == undefined || Oobjects[o].imageRef != document.getElementById("ObIm").value) {
                        // store the new image to the xml
                        xmldata.push("<img>" + localStorage.getItem("rmImRef") + "</img>");

                    } else {
                        xmldata.push("<img>" + Oobjects[o].imageRef + "</img>");
                    };
                    localStorage.removeItem('rmImRef');
                    xmldata.push("<strength>" + document.getElementById("ObSt").value + "</strength>");
                    xmldata.push("<useAffects>" + document.getElementById("ObUseAffects").value + "</useAffects>");
                    xmldata.push("<statEffect>" + document.getElementById("ObStatEff").value + "</statEffect>");
                    xmldata.push("<personNeededForReveal>" + document.getElementById("ObPersonNeeded").value + "</personNeededForReveal>");

                    xmldata.push("</object>")
                }

            }; // end for
            xmldata.push("</objects>");
            return xmldata.join("\n");
            break;
        case "peeps":
            //NOTE: the hasChased node needs to be set to 'n' withour reference to the DOM
            //load all the rooms into memory
            var fileLoc = gameLocation + "/people.xml";
            var cntPeep = countNodes(fileLoc, "person");

            var Opeeps = [];
            OpeepsDecleration:
                if (cntPeep > 0) {
                    var i = 0;

                    for (i = 0; i < cntPeep; i++) {
                        // first peep is ID 0 and Opeeps[0] will equal this peep

                        Opeeps[i] = {
                            id: getXmlValue(fileLoc, 'person', 'id', i, 'id'),
                            name: getXmlValue(fileLoc, 'person', 'id', i, 'name'),
                            call: getXmlValue(fileLoc, 'person', 'id', i, 'call'),
                            sex: getXmlValue(fileLoc, 'person', 'id', i, 'sex'),
                            age: getXmlValue(fileLoc, 'person', 'id', i, 'age'),
                            height: getXmlValue(fileLoc, 'person', 'id', i, 'height'),
                            description: getXmlValue(fileLoc, 'person', 'id', i, 'description'),
                            stationaryText: getXmlValue(fileLoc, 'person', 'id', i, 'stationaryText'),
                            canTalkYN: getXmlValue(fileLoc, 'person', 'id', i, 'canTalk'),
                            defaultSay: getXmlValue(fileLoc, 'person', 'id', i, 'defaultSay'),
                            followsYN: getXmlValue(fileLoc, 'person', 'id', i, 'isFollowing'),
                            followingText: getXmlValue(fileLoc, 'person', 'id', i, 'followingText'),
                            currentRoom: getXmlValue(fileLoc, 'person', 'id', i, 'currRoom'),
                            isHiddenYN: getXmlValue(fileLoc, 'person', 'id', i, 'isHidden'),
                            canFightYN: getXmlValue(fileLoc, 'person', 'id', i, 'canFight'),
                            fightKillsYN: getXmlValue(fileLoc, 'person', 'id', i, 'fightKills'),
                            fightMessage: getXmlValue(fileLoc, 'person', 'id', i, 'fightMessage'),
                            canResussYN: getXmlValue(fileLoc, 'person', 'id', i, 'canResuss'),
                            resussMessage: getXmlValue(fileLoc, 'person', 'id', i, 'resussMess'),
                            objectRevealedAfterDeath: getXmlValue(fileLoc, 'person', 'id', i, 'killRevealsObjID'),
                            isDeadYN: getXmlValue(fileLoc, 'person', 'id', i, 'isDead'),
                            image: getXmlValue(fileLoc, 'person', 'id', i, 'img'),
                            combat: getXmlValue(fileLoc, 'person', 'id', i, 'combat'),
                            weariness: getXmlValue(fileLoc, 'person', 'id', i, 'weariness'),
                            wondersYN: getXmlValue(fileLoc, 'person', 'id', i, 'wonders'),
                            canChaseYN: getXmlValue(fileLoc, 'person', 'id', i, 'canChase'),
                            chaseGoal: getXmlValue(fileLoc, 'person', 'id', i, 'chaseGoal'),
                            chaseMessage: getXmlValue(fileLoc, 'person', 'id', i, 'chaseMsg'),
                            chaseSuccess: getXmlValue(fileLoc, 'person', 'id', i, 'chaseSuccess'),
                            chaseFail: getXmlValue(fileLoc, 'person', 'id', i, 'chaseFail'),
                            chaseDraw: getXmlValue(fileLoc, 'person', 'id', i, 'chaseDraw'),
                            haveChasedYN: getXmlValue(fileLoc, 'person', 'id', i, 'haveChased'),
                            submissionItem: getXmlValue(fileLoc, 'person', 'id', i, 'submitItemID'),
                            submissionText: getXmlValue(fileLoc, 'person', 'id', i, 'submitText')


                        } // end of Opeeps decleration


                    }; //end for



                }; //end if 
            // now all the properties of Opeeps are set lets start preparing the xml
            var xmldata = ['<?xml version="1.0"?>'];
            xmldata.push("<people>");

            // loop thru the Object now
            for (o = 0, max = Opeeps.length; o < max; o++) {
                if (Opeeps[o].id != document.getElementById("pID").value) {
                    xmldata.push("<person>");
                    xmldata.push("<id>" + Opeeps[o].id + "</id>");
                    xmldata.push(pushStuff("name", Opeeps[o].name));
                    xmldata.push(pushStuff("call", Opeeps[o].call));
                    xmldata.push(pushStuff("sex", Opeeps[o].sex));
                    xmldata.push(pushStuff("age", Opeeps[o].age));
                    xmldata.push(pushStuff("height", Opeeps[o].height));
                    xmldata.push(pushStuff("description", Opeeps[o].description));
                    xmldata.push(pushStuff("stationaryText", Opeeps[o].stationaryText));
                    xmldata.push(pushStuff("canTalk", Opeeps[o].canTalkYN));
                    xmldata.push(pushStuff("defaultSay", Opeeps[o].defaultSay));
                    xmldata.push(pushStuff("isFollowing", Opeeps[o].followsYN));
                    xmldata.push(pushStuff("followingText", Opeeps[o].followingText));
                    xmldata.push(pushStuff("currRoom", Opeeps[o].currentRoom));
                    xmldata.push(pushStuff("isHidden", Opeeps[o].isHiddenYN));
                    xmldata.push(pushStuff("canFight", Opeeps[o].canFightYN));
                    xmldata.push(pushStuff("fightKills", Opeeps[o].fightKillsYN));
                    xmldata.push(pushStuff("fightMessage", Opeeps[o].fightMessage));
                    xmldata.push(pushStuff("canResuss", Opeeps[o].canResussYN));
                    xmldata.push(pushStuff("resussMess", Opeeps[o].resussMessage));
                    xmldata.push(pushStuff("killRevealsObjID", Opeeps[o].objectRevealedAfterDeath));
                    xmldata.push(pushStuff("isDead", Opeeps[o].isDeadYN));
                    xmldata.push(pushStuff("img", Opeeps[o].image));
                    xmldata.push(pushStuff("combat", Opeeps[o].combat));
                    xmldata.push(pushStuff("weariness", Opeeps[o].weariness));
                    xmldata.push(pushStuff("wonders", Opeeps[o].wondersYN));
                    xmldata.push(pushStuff("canChase", Opeeps[o].canChaseYN));
                    xmldata.push(pushStuff("chaseGoal", Opeeps[o].chaseGoal));
                    xmldata.push(pushStuff("chaseMsg", Opeeps[o].chaseMessage));
                    xmldata.push(pushStuff("chaseSuccess", Opeeps[o].chaseSuccess));
                    xmldata.push(pushStuff("chaseFail", Opeeps[o].chaseFail));
                    xmldata.push(pushStuff("chaseDraw", Opeeps[o].chaseDraw));
                    xmldata.push(pushStuff("haveChased", Opeeps[o].haveChasedYN));
                    xmldata.push(pushStuff("submitItemID", Opeeps[o].submissionItem));
                    xmldata.push(pushStuff("submitText", Opeeps[o].submissionText));


                    xmldata.push("</person>")
                } else {
                    // store the shown xml
                    xmldata.push("<person>");
                    xmldata.push(pushStuff("id", Opeeps[o].id));
                    xmldata.push(pushStuff("name", document.getElementById("pName").value));

                    xmldata.push(pushStuff("call", document.getElementById("pCall").value));

                    xmldata.push(pushStuff("sex", document.getElementById("pSex").value));
                    xmldata.push(pushStuff("age", document.getElementById("pAge").value));
                    xmldata.push(pushStuff("height", document.getElementById("pHeight").value));
                    var pdesc = fillEmpty("pDesc", "xx");
                    xmldata.push(pushStuff("description", pdesc));
                    var statTxt = fillEmpty("pStatTxt", "xx");
                    xmldata.push(pushStuff("stationaryText", statTxt));
                    if (document.getElementById("canTalk").checked == true) {
                        xmldata.push(pushStuff("canTalk", "y"));
                    } else {
                        xmldata.push(pushStuff("canTalk", "n"));
                    }

                    var defSay = fillEmpty("pDefaultSay", "xx");
                    xmldata.push(pushStuff("defaultSay", defSay));
                    if (document.getElementById("isFollowing").checked == true) {
                        xmldata.push(pushStuff("isFollowing", "y"));
                    } else {
                        xmldata.push(pushStuff("isFollowing", "n"));
                    };

                    var follTxt = fillEmpty("pFollowingText", "xx");
                    xmldata.push(pushStuff("followingText", follTxt));
                    xmldata.push(pushStuff("currRoom", document.getElementById("pCurrentRoom").value));
                    if (document.getElementById("isHidden").checked == true) {
                        xmldata.push(pushStuff("isHidden", "y"));
                    } else {
                        xmldata.push(pushStuff("isHidden", "n"));
                    };
                    if (document.getElementById("pCanFight").checked == true) {
                        xmldata.push(pushStuff("canFight", "y"));
                    } else {
                        xmldata.push(pushStuff("canFight", "n"));
                    };
                    if (document.getElementById("pFightKills").checked == true) {
                        xmldata.push(pushStuff("fightKills", "y"));
                    } else {
                        xmldata.push(pushStuff("fightKills", "n"));
                    };

                    var fightMess = fillEmpty("pFightMess", "xx");
                    xmldata.push(pushStuff("fightMessage", fightMess));
                    if (document.getElementById("pCanResuss").checked == true) {
                        xmldata.push(pushStuff("canResuss", "y"));
                    } else {
                        xmldata.push(pushStuff("canResuss", "n"));
                    };

                    var resussMess = fillEmpty("pResussMess", "xx");
                    xmldata.push(pushStuff("resussMess", resussMess));
                    xmldata.push(pushStuff("killRevealsObjID", document.getElementById("pKillRevealsObjID").value));
                    if (document.getElementById("pIsDead").checked == true) {
                        xmldata.push(pushStuff("isDead", "y"));
                    } else {
                        xmldata.push(pushStuff("isDead", "n"));
                    };

                    if (Opeeps[o].imageRef == 'x' || Opeeps[o].imageRef == undefined || Opeeps[o].imageRef != document.getElementById("PeIm").value) {
                        // store the new image to the xml
                        xmldata.push("<img>" + localStorage.getItem("rmImRef") + "</img>");

                    } else {
                        xmldata.push("<img>" + Opeeps[o].imageRef + "</img>");
                    };
                    localStorage.removeItem('rmImRef');

                    xmldata.push(pushStuff("combat", document.getElementById("pCombat").value));
                    xmldata.push(pushStuff("weariness", document.getElementById("pWeariness").value));
                    if (document.getElementById("canWonder").checked == true) {
                        xmldata.push(pushStuff("wonders", "y"));
                    } else {
                        xmldata.push(pushStuff("wonders", "n"));
                    };
                    if (document.getElementById("canChase").checked == true) {
                        xmldata.push(pushStuff("canChase", "y"));
                    } else {
                        xmldata.push(pushStuff("canChase", "n"));
                    };

                    xmldata.push(pushStuff("chaseGoal", document.getElementById("pChaseGoal").value));
                    var chaseMess = fillEmpty("pChaseMess", "xx");
                    xmldata.push(pushStuff("chaseMsg", chaseMess));
                    var chaseSucc = fillEmpty("pChaseSuccess", "xx");
                    xmldata.push(pushStuff("chaseSuccess", chaseSucc));
                    var chaseFail = fillEmpty("pChaseFail", "xx");
                    xmldata.push(pushStuff("chaseFail", chaseFail));
                    var chaseDraw = fillEmpty("pChaseDraw", "xx");
                    xmldata.push(pushStuff("chaseDraw", chaseDraw));
                    xmldata.push(pushStuff("haveChased", "n"));
                    xmldata.push(pushStuff("submitItemID", document.getElementById("pSubmitObj").value));
                    var submitTxt = fillEmpty("pSubmitTxt", "xx");

                    xmldata.push(pushStuff("submitText", submitTxt));



                    xmldata.push("</person>")
                }; // end if
            }; // end for

            xmldata.push("</people>");
            return xmldata.join("\n");
            break;
        case "talk":
            // add here
            var fileLoc = gameLocation + "/conversations.xml";
            var cntPeep = countNodes(fileLoc, "conversation");
            var thisTalkObj = [];
            if (cntPeep > 0) {
                var i = 0;

                for (i = 0; i < cntPeep; i++) {
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
                        objRevealLine: defaultVals(getXmlValue(fileLoc, 'conversation', 'id', i, 'objRevealLine'), "0"),
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
                };
            }; // end if

            var xmldata = ['<?xml version="1.0"?>'];
            xmldata.push("<conversations>");
            for (o = 0, max = thisTalkObj.length; o < max; o++) {
                if (thisTalkObj[o].id != document.getElementById("conID").value) {
                    xmldata.push("<conversation>");
                    xmldata.push(pushStuff("id", thisTalkObj[o].id));
                    xmldata.push(pushStuff("onePersonOnly", thisTalkObj[o].onePersonOnly));

                    for (x = 1; x <= 5; x++) {
                        var fpNm = "forPerson" + x;
                        xmldata.push(pushStuff(fpNm, thisTalkObj[o][fpNm]));
                    };
                    xmldata.push(pushStuff("numbLines", thisTalkObj[o].numbLines));
                    for (z = 1; z <= 10; z++) {
                        var lnA = "line" + z;
                        xmldata.push(pushStuff(lnA, thisTalkObj[o][lnA]));



                    };
                    for (zz = 1; zz <= 10; zz++) {
                        var resB = "line" + zz + "Resp";
                        xmldata.push(pushStuff(resB, thisTalkObj[o][resB]));
                    };
                    xmldata.push(pushStuff("roomOnlyID", thisTalkObj[o].roomOnlyID));
                    xmldata.push(pushStuff("objRevealLine", thisTalkObj[o].objRevealLine));
                    xmldata.push(pushStuff("revealObjID", thisTalkObj[o].revealObjID));
                    for (c = 1; c <= 10; c++) {

                        var hpB = "help" + c;
                        xmldata.push(pushStuff(hpB, thisTalkObj[o][hpB]));
                    };
                    xmldata.push("</conversation>");
                } else {
                    xmldata.push("<conversation>");
                    xmldata.push(pushStuff("id", document.getElementById("conID").value));
                    var elOP = document.getElementById("onePersonOnly");
                    if (elOP.checked == true) {
                        xmldata.push(pushStuff("onePersonOnly", "y"));
                    } else {
                        xmldata.push(pushStuff("onePersonOnly", "n"));
                    };

                    for (x = 1; x <= 5; x++) {
                        var fp = "forPerson" + x;
                        xmldata.push(pushStuff(fp, fillEmpty(fp, "x")));
                    };
                    xmldata.push(pushStuff("numbLines", document.getElementById("numbLines").value));
                    for (z = 1; z <= 10; z++) {
                        var lnA = "line" + z;
                        xmldata.push(pushStuff(lnA, fillEmpty(lnA, "x")));



                    };
                    for (zz = 1; zz <= 10; zz++) {
                        var resA = "Resp" + zz;
                        var resB = "line" + zz + "Resp";
                        xmldata.push(pushStuff(resB, fillEmpty(resA, "x")));
                    };
                    xmldata.push(pushStuff("roomOnlyID", document.getElementById("roomOnlyID").value));
                    xmldata.push(pushStuff("objRevealLine", fillEmpty("objRevealLine", "0")));
                    xmldata.push(pushStuff("revealObjID", fillEmpty("revealObjID", "xx")));
                    for (c = 1; c <= 10; c++) {
                        var hpA = "Help" + c;
                        var hpB = "help" + c;
                        xmldata.push(pushStuff(hpB, fillEmpty(hpA, "xx")));
                    };
                    xmldata.push("</conversation>");
                }; // end if
            }; // end for
            xmldata.push("</conversations>");
            return xmldata.join("\n");
            break;

        case "win":
            // check at least one requirement is set to win game
            if (document.getElementById("room").selectedIndex == 0 && document.getElementById("objHeld").selectedIndex == 0 && document.getElementById("objRevealed").selectedIndex == 0 && document.getElementById("objBroke").selectedIndex == 0 && document.getElementById("objEaten").selectedIndex == 0 && document.getElementById("cashAmnt").value == "0" && document.getElementById("npcDead").selectedIndex == 0 && document.getElementById("npcRevealed").selectedIndex == 0 && document.getElementById("convID").selectedIndex == 0) {
                return false;
            } else {




                var fileLoc = gameLocation + "/win.xml";
                var cntWin = 1;
                var winObj = [];
                var xmldata = ['<?xml version="1.0"?>'];
                xmldata.push("<winningDecision>");
                xmldata.push("<goal>");
                xmldata.push(pushStuff("id", "1"));
                xmldata.push(pushStuff("roomID", fillEmpty("room", "xx")));
                xmldata.push(pushStuff("objHeld", fillEmpty("objHeld", "xx")));
                xmldata.push(pushStuff("objRevealed", fillEmpty("objRevealed", "xx")));
                xmldata.push(pushStuff("objBroken", fillEmpty("objBroke", "xx")));
                xmldata.push(pushStuff("objEaten", fillEmpty("objEaten", "xx")));
                var ctxt = document.getElementById("cashAmnt");
                if (isNaN(ctxt.value)) {
                    xmldata.push(pushStuff("cashReq", "xx"));
                } else {
                    if (document.getElementById("cashAmnt") == "0") {
                        xmldata.push(pushStuff("cashReq", "xx"));
                    } else {
                        xmldata.push(pushStuff("cashReq", fillEmpty("cashAmnt", "xx")));
                    };
                };

                xmldata.push(pushStuff("personAlive", fillEmpty("npcAlive", "xx")));
                xmldata.push(pushStuff("personDead", fillEmpty("npcDead", "xx")));
                xmldata.push(pushStuff("personRevealed", fillEmpty("npcRevealed", "xx")));
                xmldata.push(pushStuff("conversationIDneeded", fillEmpty("convID", "xx")));
                if (document.getElementById("convLine") == "0") {
                    xmldata.push(pushStuff("convLineReached", "xx"));
                } else {
                    xmldata.push(pushStuff("convLineReached", fillEmpty("convLine", "xx")));
                };
                xmldata.push("</goal>");
                xmldata.push("</winningDecision>");
                return xmldata.join("\n");
            }; // end if



            break;
    }; // end switch


}

function download(frm, cat) {
    // NOTE this process is called by the submit button for the form, onclick event currently.

    // NOTE DOWNLOAD(FRM, CAT) the different selections from "cat" need to be completed in this SWITCH
    switch (cat) {
        case "rooms":
            alert("There is a short pause now, whilst the system does it's work. Dont Panic!");

            var data = fromToXml(frm, cat);
            try {
                // lets try a blob
                var blob = new Blob([data], {
                    type: "text/xml"
                });
                saveAs(blob, "rooms.xml");
            } catch (e) {

                console.log(e);
            } finally {

            };
            break;
        case "objects":
            alert("There is a short pause now, whilst the system does it's work. Dont Panic!");
            var data = fromToXml(frm, cat);

            try {

                // lets try a blob
                var blob = new Blob([data], {
                    type: "text/xml"
                });
                saveAs(blob, "objects.xml");
            } catch (e) {

                console.log(e);
            } finally {

            };
            break;
        case "peeps":
            alert("There is a short pause now, whilst the system does it's work. Dont Panic!");
            var data = fromToXml(frm, cat);

            try {

                // lets try a blob
                var blob = new Blob([data], {
                    type: "text/xml"
                });
                saveAs(blob, "people.xml");
            } catch (e) {

                console.log(e);
            } finally {

            };
            break;
        case "settings":
            alert("There is a short pause now, whilst the system does it's work. Dont Panic!");
            var data = saveVars(frm);
            try {

                // lets try a blob
                var blob = new Blob([data], {
                    type: "text/javascript"
                });
                saveAs(blob, "authorVariables.js");
            } catch (e) {

                console.log(e);
            } finally {

            };
            break;


        case "talk":
            alert("There is a short pause now, whilst the system does it's work. Dont Panic!");
            var data = fromToXml(frm, cat);
            try {

                // lets try a blob
                var blob = new Blob([data], {
                    type: "text/javascript"
                });
                saveAs(blob, "conversations.xml");
            } catch (e) {

                console.log(e);
            } finally {

            };


            break;
        case "win":

            var data = fromToXml(frm, cat);
            if (data == false) {
                console.log("data returns false");
                document.getElementById("msgBar").innerHTML = "You need to set at least one winning requirement for the game to work!";
                seeMe("msgArea", true);
                window.scrollBy(0, 100);
            } else {
                alert("There is a short pause now, whilst the system does it's work. Dont Panic!");
                try {

                    // lets try a blob
                    var blob = new Blob([data], {
                        type: "text/javascript"
                    });
                    saveAs(blob, "win.xml");
                } catch (e) {

                    console.log(e);
                } finally {

                };
                document.getElementById("room").selectedIndex = 0;
                document.getElementById("objHeld").selectedIndex = 0;
                document.getElementById("objRevealed").selectedIndex = 0;
                document.getElementById("objBroke").selectedIndex = 0;
                document.getElementById("objEaten").selectedIndex = 0;
                document.getElementById("cashAmnt").value = "0";
                document.getElementById("npcDead").selectedIndex = 0;
                document.getElementById("npcRevealed").selectedIndex = 0;
                document.getElementById("convID").selectedIndex = 0;
                document.getElementById("convLineTip").value = "0";
                seeMe("showReqs", false);
                seeMe("subReqs", false);
            }; // end if





    }; //end SWITCH



}

function downloadData(contentType, data, filename) {
    // you CAN NOT prevent the save-as pop up box in iOS
    var link = document.createElement("A");

    link.setAttribute("href", encodeURI("data:" + contentType + "," + data));
    link.setAttribute("style", "display:none");
    link.setAttribute("download", filename);
    console.log(link.attributes.getNamedItem("download"));
    document.body.appendChild(link); //needed for firefox
    link.click();
    setTimeout(function () {
        document.body.removeChild(link); //only to remove the temporal link
    }, 1000);

}
