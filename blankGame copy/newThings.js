/* CONTENTS 
    addthings
    addToXml
    emptyRoom
    emptyObject
    emptyPeep
    emptyTalk
    

*/
function addThings(frm, cat) {
    // script to add
    switch (cat) {
        case "rooms":
            if (localStorage.getItem("saveAlertSeen") != 'true') {
                alert("Please ensure you select the game folder which contains the original file entitled 'rooms.xml', or your new room will not be saved!\nYou might want to back it up before committing the changes.\n\nThere is a short pause now, whilst the system does it's work. Dont Panic!");
                localStorage.setItem("saveAlertSeen", "true");
            };

            var data = addToXml(frm, cat);

            try {

                // lets try a blob
                var blob = new Blob([data], {
                    type: "text/xml"
                });
                saveAs(blob, "rooms.xml");

                fetchRoomNames("selRooms");
            } catch (e) {

                console.log(e);
            } finally {

            };
            break;
        case "objects":
            if (localStorage.getItem("saveAlertSeen") != 'true') {
                alert("Please ensure you select the game folder which contains the original file entitled 'objects.xml', or your new object will not be saved!\nYou might want to back it up before committing the changes.\n\nThere is a short pause now, whilst the system does it's work. Dont Panic!");
                localStorage.setItem("saveAlertSeen", "true");
            };
            var data = addToXml(frm, cat);


            try {

                // lets try a blob
                var blob = new Blob([data], {
                    type: "text/xml"
                });
                saveAs(blob, "objects.xml");

                fetchObjsNames("selObjects");
            } catch (e) {

                console.log(e);
            } finally {

            };
            break;
        case "peeps":
            if (localStorage.getItem("saveAlertSeen") != 'true') {
                alert("Please ensure you select the game folder which contains the original file entitled 'people.xml', or your new non playable character will not be saved!\nYou might want to back it up before committing the changes.\n\nThere is a short pause now, whilst the system does it's work. Dont Panic!");
                localStorage.setItem("saveAlertSeen", "true");
            };
            var data = addToXml(frm, cat);


            try {

                // lets try a blob
                var blob = new Blob([data], {
                    type: "text/xml"
                });
                saveAs(blob, "people.xml");

                fetchPeepsNames("selPeep");
            } catch (e) {

                console.log(e);
            } finally {

            };
            break;

        case "talk":
            if (localStorage.getItem("saveAlertSeen") != 'true') {
                alert("Please ensure you select the game folder which contains the original file entitled 'people.xml', or your new non playable character will not be saved!\nYou might want to back it up before committing the changes.\n\nThere is a short pause now, whilst the system does it's work. Dont Panic!");
                localStorage.setItem("saveAlertSeen", "true");
            };
            var data = addToXml(frm, cat);
            console.log(data);
            try {

                // lets try a blob
                var blob = new Blob([data], {
                    type: "text/xml"
                });
                saveAs(blob, "conversations.xml");

                fetchPeepsNames("selTalk");
            } catch (e) {

                console.log(e);
            } finally {

            };

            break;
    }
}

function addToXml(form, category) {
    switch (category) {
        case "rooms":
            var roomLoc = gameLocation + "/rooms.xml";
            var cntRms = countNodes(roomLoc, "room");
            // first make sure nothing is left empty

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
            var xmldata = ['<?xml version="1.0"?>'];
            xmldata.push("<rooms>");
            for (o = 1, max = Orooms.length; o < max; o++) {


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

            }; // end for


            xmldata.push("<room>");
            xmldata.push("<id>" + document.getElementById("RmID").value + "</id>");
            if (document.getElementById("RmName").value != "") {
                xmldata.push("<name>" + document.getElementById("RmName").value + "</name>");
            } else {
                xmldata.push("<name>Unnamed room</name>");
            };

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

            if (document.getElementById("darkDesc").value != "") {
                xmldata.push("<darkDescription>" + document.getElementById("darkDesc").value + "</darkDescription>");
            } else {
                xmldata.push("<darkDescription>xx</darkDescription>");
            };
            if (document.getElementById("exText").value != "") {
                xmldata.push("<exits>" + document.getElementById("exText").value + "</exits>");
            } else {
                xmldata.push("<exits>No exits visible</exits>");
            };

            xmldata.push("<Nto>" + document.getElementById("selN").value + "</Nto>");
            xmldata.push("<Sto>" + document.getElementById("selS").value + "</Sto>");
            xmldata.push("<Eto>" + document.getElementById("selE").value + "</Eto>");
            xmldata.push("<Wto>" + document.getElementById("selW").value + "</Wto>");
            xmldata.push("<Upto>" + document.getElementById("selUP").value + "</Upto>");
            xmldata.push("<Dto>" + document.getElementById("selD").value + "</Dto>");
            xmldata.push("<Into>" + document.getElementById("selIN").value + "</Into>");
            xmldata.push("<Outto>" + document.getElementById("selOUT").value + "</Outto>");

            if (localStorage.getItem("rmImRef") != "" && localStorage.getItem("rmImRef") != null) {
                // store the new image to the xml
                xmldata.push("<img>" + localStorage.getItem("rmImRef") + "</img>");

            } else {
                xmldata.push("<img>xx</img>");
            };
            localStorage.removeItem('rmImRef');
            if (document.getElementById("isRevealed").checked == true) {
                xmldata.push("<isRevealed>y</isRevealed>");
            } else {
                xmldata.push("<isRevealed>n</isRevealed>");
            };
            if (document.getElementById("RmBlockTxt").value != "") {
                xmldata.push("<blocking>" + document.getElementById("RmBlockTxt").value + "</blocking>");
            } else {
                xmldata.push("<blocking>xx</blocking>");
            };
            if (document.getElementById("shortDesc").value != "") {
                xmldata.push("<shortDesc>" + document.getElementById("shortDesc").value + "</shortDesc>");
            } else {
                xmldata.push("<shortDesc>Nothing to tell you really</shortDesc>");
            };

            if (document.getElementById("alreadyBeen").checked == true) {
                xmldata.push("<beenBefore>y</beenBefore>");
            } else {
                xmldata.push("<beenBefore>n</beenBefore>");
            };

            xmldata.push("<roomType>" + document.getElementById("RmType").value + "</roomType>");
            if (document.getElementById("helpHint").value != "") {
                xmldata.push("<helpHint>" + document.getElementById("helpHint").value + "</helpHint>");
            } else {
                xmldata.push("<helpHint>No help</helpHint>");
            };


            xmldata.push("</room>")


            // end the xml
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
            }; // end for

            //TODO check nothing is empty
            xmldata.push("<object>");
            xmldata.push("<id>" + document.getElementById("ObID").value + "</id>");

            // now do the push but from the form
            if (document.getElementById("ObName").value != "") {
                xmldata.push("<name>" + document.getElementById("ObName").value + "</name>");
            } else {
                xmldata.push("<name>unnamed</name>");
            };

            if (document.getElementById("ObDesc").value != "") {
                xmldata.push("<description>" + document.getElementById("ObDesc").value + "</description>");
            } else {
                xmldata.push("<description>nothing special</description>");
            };
            if (document.getElementById("ObW").value != "") {
                xmldata.push("<weight>" + document.getElementById("ObW").value + "</weight>");
            } else {
                xmldata.push("<weight>1</weight>");
            };
            if (document.getElementById("ObS").value != "") {
                xmldata.push("<spaces>" + document.getElementById("ObS").value + "</spaces>");
            } else {
                xmldata.push("<spaces>1</spaces>");
            };

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
                xmldata.push("<needsAnotherObjToWork>y</needsAnotherObjToWork>");
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
            //  xmldata.push("<revealAction>" + document.getElementById("ObRevealAction").value + "</revealAction>");
            xmldata.push("<revealAction>" + fillEmpty("ObRevealAction", "0") + "</revealAction>");

            xmldata.push("<revealRoom>" + fillEmpty("ObRevealRoom", "9999") + "</revealRoom>");


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
            if (document.getElementById("ObPrefix").value != "") {
                xmldata.push("<prefix>" + document.getElementById("ObPrefix").value + "</prefix>");
            } else {
                xmldata.push("<prefix>the</prefix>");
            };

            if (document.getElementById("ObCanBeGot").checked == true) {
                xmldata.push("<canGet>y</canGet>");
            } else {
                xmldata.push("<canGet>n</canGet>");
            };

            xmldata.push("<actionWhenUsed>" + document.getElementById("ObUseAction").value + "</actionWhenUsed>");
            if (document.getElementById("ObUseTxt").value != "") {
                xmldata.push("<resultOfUse>" + document.getElementById("ObUseTxt").value + "</resultOfUse>");
            } else {
                xmldata.push("<resultOfUse>It is used</resultOfUse>");
            };

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


            if (localStorage.getItem("rmImRef") != "" && localStorage.getItem("rmImRef") != null) {
                // store the new image to the xml
                xmldata.push("<img>" + localStorage.getItem("rmImRef") + "</img>");

            } else {
                xmldata.push("<img>x</img>");
            };
            localStorage.removeItem('rmImRef');
            if (document.getElementById("ObSt").value != "") {
                xmldata.push("<strength>" + document.getElementById("ObSt").value + "</strength>");
            } else {
                xmldata.push("<strength>0</strength>");
            }

            xmldata.push("<useAffects>" + document.getElementById("ObUseAffects").value + "</useAffects>");
            xmldata.push("<statEffect>" + document.getElementById("ObStatEff").value + "</statEffect>");
            xmldata.push("<personNeededForReveal>" + document.getElementById("ObPersonNeeded").value + "</personNeededForReveal>");

            xmldata.push("</object>");

            xmldata.push("</objects>");
            return xmldata.join("\n");


            break;
        case "peeps":
            //TODO - Here next save new
            // TODO: have chased needs to be added without any reference to the DOM
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
            var xmldata = ['<?xml version="1.0"?>'];
            xmldata.push("<people>");

            // loop thru the Object now
            for (o = 0, max = Opeeps.length; o < max; o++) {
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
            }; //end for
            xmldata.push("<person>");
            xmldata.push("<id>" + document.getElementById("pID").value + "</id>");
            xmldata.push(pushStuff("name", fillEmpty("pName", "anonymous person")));
            xmldata.push(pushStuff("call", fillEmpty("pCall", "anon")));
            xmldata.push(pushStuff("sex", fillEmpty("pSex", "it")));
            xmldata.push(pushStuff("age", fillEmpty("pAge", "18")));
            xmldata.push(pushStuff("height", fillEmpty("pHeight", "180")));
            xmldata.push(pushStuff("description", fillEmpty("pDesc", "boring really")));
            xmldata.push(pushStuff("stationaryText", fillEmpty("pStatTxt", "xx")));
            if (document.getElementById("canTalk").checked == true) {
                xmldata.push(pushStuff("canTalk", "y"));
            } else {
                xmldata.push(pushStuff("canTalk", "n"));
            };
            xmldata.push(pushStuff("defaultSay", fillEmpty("pDefaultSay", "xx")));
            if (document.getElementById("isFollowing").checked == true) {
                xmldata.push(pushStuff("isFollowing", "y"));
            } else {
                xmldata.push(pushStuff("isFollowing", "n"));
            };
            xmldata.push(pushStuff("followingText", fillEmpty("pFollowingText", "xx")));
            xmldata.push(pushStuff("currRoom", fillEmpty("pCurrentRoom", "9999")));
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
            xmldata.push(pushStuff("fightMessage", fillEmpty("pFightMess", "xx")));
            if (document.getElementById("pCanResuss").checked == true) {
                xmldata.push(pushStuff("canResuss", "y"));
            } else {
                xmldata.push(pushStuff("canResuss", "n"));
            };
            xmldata.push(pushStuff("resussMess", fillEmpty("pResussMess", "xx")));
            xmldata.push(pushStuff("killRevealsObjID", fillEmpty("pKillRevealsObjID", "xx")));
            if (document.getElementById("pIsDead").checked == true) {
                xmldata.push(pushStuff("isDead", "y"));
            } else {
                xmldata.push(pushStuff("isDead", "n"));
            };
            if (localStorage.getItem("rmImRef") != "" && localStorage.getItem("rmImRef") != null) {
                // store the new image to the xml
                xmldata.push("<img>" + localStorage.getItem("rmImRef") + "</img>");

            } else {
                xmldata.push("<img>x</img>");
            };
            localStorage.removeItem('rmImRef');
            xmldata.push(pushStuff("combat", fillEmpty("pCombat", "0")));
            xmldata.push(pushStuff("weariness", fillEmpty("pWeariness", "0")));
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
            xmldata.push(pushStuff("chaseGoal", fillEmpty("pChaseGoal", "xx")));
            xmldata.push(pushStuff("chaseMsg", fillEmpty("pChaseMess", "xx")));
            xmldata.push(pushStuff("chaseSuccess", fillEmpty("pChaseSuccess", "xx")));
            xmldata.push(pushStuff("chaseFail", fillEmpty("pChaseFail", "xx")));
            xmldata.push(pushStuff("chaseDraw", fillEmpty("pChaseDraw", "xx")));
            xmldata.push(pushStuff("haveChased", "n"));
            xmldata.push(pushStuff("submitItemID", fillEmpty("pSubmitObj", "xx")));
            xmldata.push(pushStuff("submitText", fillEmpty("pSubmitTxt", "xx")));

            xmldata.push("</person>");

            xmldata.push("</people>");
            return xmldata.join("\n");

            break;

        case "talk":
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
            }; // end for


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
            xmldata.push("</conversations>");
            return xmldata.join("\n");
            break;

    } // end of SWITCH
}

function emptyRoom() {

    // first empty all the text boxes
    var elements = document.getElementById("frmRooms").elements;

    for (var i = 0, element; element = elements[i++];) {
        if (element.type === "text" || element.type == "textarea")
            element.value = "";
    };
    document.getElementById("roomStart").style.visibility = "collapse";
    document.getElementById("roomStart").style.display = "none";
    document.getElementById("frmRooms").style.visibility = "visible";
    document.getElementById("frmRooms").style.display = "block";
    // now set the dropboxes to the default
    fetchRoomNames(["selN", "selE", "selS", "selW", "selUP", "selD", "selIN", "selOUT"]);

    document.getElementById("selN").value = "0";

    document.getElementById("selE").value = "0";

    document.getElementById("selS").value = "0";

    document.getElementById("selW").value = "0";

    document.getElementById("selUP").value = "0";

    document.getElementById("selD").value = "0";

    document.getElementById("selIN").value = "0";

    document.getElementById("selOUT").value = "0";

    var roomLoc = gameLocation + "/rooms.xml";
    var cntRms = countNodes(roomLoc, "room");
    let newID = cntRms + 1;
    document.getElementById("RmID").value = newID; // this will be used when adding the room
    document.getElementById("btnSub").style.visibility = "hidden";
    document.getElementById("btnRnew").style.visibility = "visible";
    var frmN = document.getElementById("showRoom");
    frmN.addEventListener("keyup", function (event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            document.getElementById("btnRnew").click();
        }
    });
}

function emptyObject() {
    var elements = document.getElementById("frmObjects").elements;

    for (var i = 0, element; element = elements[i++];) {
        if (element.type === "text" || element.type == "textarea")
            element.value = "";
    };
    document.getElementById("obStart").style.visibility = "collapse";
    document.getElementById("obStart").style.display = "none";
    document.getElementById("frmObjects").style.visibility = "visible";
    document.getElementById("frmObjects").style.display = "block";

    fetchObjsNames("ObReqToWork");
    document.getElementById("ObReqToWork").value = "9999";
    fetchObjsNames("ObAfterEaten");
    document.getElementById("ObAfterEaten").value = "xx";
    fetchObjsNames("ObAfterBroken");
    document.getElementById("ObAfterBroken").value = "xx";
    fetchRoomNames("ObSelOrigRoom");
    document.getElementById("ObSelOrigRoom").value = "9999";
    fetchObjsNames("ObHidIn");
    document.getElementById("ObHidIn").value = "9999";
    fetchObjsNames("ObHidUnder");
    document.getElementById("ObHidUnder").value = "9999";
    fetchObjsNames("ObHidBehind");
    document.getElementById("ObHidBehind").value = "9999";
    fetchObjsNames("ObRevealNeeds");
    document.getElementById("ObRevealNeeds").value = "9999";
    document.getElementById("ObRevealAction").value = "0";
    fetchRoomNames("ObRevealRoom");
    document.getElementById("ObRevealRoom").value = "9999";
    fetchObjsNames("ObCombCreates");
    document.getElementById("ObCombCreates").value = "xx";
    fetchRoomNames("ObCurrRoom");
    document.getElementById("ObCurrRoom").value = "9999";
    document.getElementById("ObUseAction").value = "xx";
    fetchObjsNames("ObMendsW");
    document.getElementById("ObMendsW").value = "xx";
    fetchObjsNames("ObExamRevs");
    document.getElementById("ObExamRevs").value = "xx";
    fetchPeepsNames("ObSeller");
    document.getElementById("ObSeller").value = "xx";
    fetchObjsNames("ObOpenRevs");
    document.getElementById("ObOpenRevs").value = "xx";

    fetchObjsNames("ObUseAffects");
    document.getElementById("ObUseAffects").value = "xx";
    fetchPeepsNames("ObPersonNeeded");
    document.getElementById("ObPersonNeeded").value = "xx";

    document.getElementById("ObStatEff").value = "0";
    document.getElementById("ObValue").value = "0";
    document.getElementById("ObW").value = "0";
    document.getElementById("ObS").value = "0";
    document.getElementById("ObSt").value = "0";

    document.getElementById("frmObjHidIn").style.visibility = "collapse";
    document.getElementById("frmObjHidIn").style.display = "none";
    document.getElementById("frmObjHidUnder").style.visibility = "collapse";
    document.getElementById("frmObjHidUnder").style.display = "none";
    document.getElementById("frmObjHidBehind").style.visibility = "collapse";
    document.getElementById("frmObjHidBehind").style.display = "none";

    document.getElementById("frmObOpenMess").style.visibility = "collapse";
    document.getElementById("frmObOpenMess").style.display = "none";
    document.getElementById("frmObOpenRevs").style.visibility = "collapse";
    document.getElementById("frmObOpenRevs").style.display = "none";
    document.getElementById("frmIsLocked").style.display = "none";
    document.getElementById("frmIsLocked").style.visibility = "collapse";

    var roomLoc = gameLocation + "/objects.xml";
    var cntObs = countNodes(roomLoc, "object");
    let newID = cntObs; // as objects id starts at 0 this is the correct new id number
    document.getElementById("ObID").value = newID; // this will be used when adding the room
    document.getElementById("btnOSub").style.visibility = "hidden";
    document.getElementById("btnOnew").style.visibility = "visible";

    var frmN = document.getElementById("showObjects");
    frmN.addEventListener("keyup", function (event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            document.getElementById("btnOnew").click();
        }
    });

}

function emptyPeep() {
    // first empty all the text boxes
    var elements = document.getElementById("frmPeople").elements;

    for (var i = 0, element; element = elements[i++];) {
        if (element.type === "text" || element.type == "textarea")
            element.value = "";
    };
    document.getElementById("peepStart").style.visibility = "collapse";
    document.getElementById("peepStart").style.display = "none";
    document.getElementById("frmPeople").style.visibility = "visible";
    document.getElementById("frmPeople").style.display = "block";
    // now set the dropboxes to the default
    fetchRoomNames("pCurrentRoom");
    setIndexZero("pCurrentRoom");
    fetchObjsNames("pKillRevealsObjID");
    setIndexZero("pKillRevealsObjID");
    setIndexZero("pChaseGoal");
    fetchObjsNames("pSubmitObj");
    setIndexZero("pSubmitObj");
    setSlider("pAge", "40", "divPage");
    setSlider("pHeight", "mid", "divPheight");
    setSlider("pCombat", "min", "divPcombat");
    setSlider("pWeariness", "mid", "divPweariness");
    if (document.getElementById("pSubmitObj").selectedIndex != 0) {
        var shw = document.getElementById("divSubmitTxt");
        shw.style.visibility = "visible";
        shw.style.display = "block";
    } else {
        var shw = document.getElementById("divSubmitTxt");
        shw.style.visibility = "collapse";
        shw.style.display = "none";
    };

    var fileLoc = gameLocation + "/people.xml";
    var cntNds = countNodes(fileLoc, "person");
    let newID = cntNds;
    document.getElementById("pID").value = newID; // this will be used when adding the room
    document.getElementById("btnPSub").style.visibility = "hidden";
    document.getElementById("btnPnew").style.visibility = "visible";
    var frmN = document.getElementById("showPeople");
    frmN.addEventListener("keyup", function (event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            document.getElementById("btnPnew").click();
        }
    });
}

function emptyTalk() {

    // first empty all the text boxes
    var elements = document.getElementById("frmTalk").elements;

    for (var i = 0, element; element = elements[i++];) {
        if (element.type === "text" || element.type == "textarea")
            element.value = "";
    };

    seeMe("conStart", false);
    seeMe("frmTalk", true);
    seeMe("btnTSub", false);
    seeMe("btnTnew", true);
    // now set the dropboxes to the default
    document.getElementById("onePersonOnly").checked = false;

    for (x = 1; x <= 5; x++) {

        var obNm = "forPerson" + x;
        fetchPeepsNames(obNm);
        fillEmpty(obNm, "x");

    };
    var elNL = document.getElementById("numbLines");
    elNL.value = "10";
    for (z = 1; z <= 10; z++) {
        var lnNm = "line" + z;
        var rsNm = "Resp" + z;
        var hpNm = "Help" + z;
        document.getElementById(lnNm).value = "";
        document.getElementById(rsNm).value = "";
        document.getElementById(hpNm).value = "";
    };
    document.getElementById("roomOnlyID").value = "x";
    document.getElementById("objRevealLine").value = "0";
    document.getElementById("revealObjID").value = "xx";
    fetchRoomNames("roomOnlyID");
    fetchObjsNames("revealObjID");
    var fileLoc = gameLocation + "/conversations.xml";
    var cntRms = countNodes(fileLoc, "conversation");
    let newID = cntRms;
    document.getElementById("conID").value = newID; // this will be used when adding the room
    document.getElementById("onePersonOnly").onclick = function () {
        onChangeFunc("onePersonOnly", ["frmP2", "frmP3", "frmP4", "frmP5"], false);
    };

    elNL.onchange = function () {
        slideChange("numbLines", "divNumbLines", "No. lines");
        // if > 1 then show 2, if > 2 then show three etc with elses
        // line elmenets
        multipleELsShow(elNL, "divL", 0, 10);


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



        document.getElementById("objRevealLine").max = elNL.value;
    }; // end elNL change func *****************************



    var frmN = document.getElementById("showTalk");
    frmN.addEventListener("keyup", function (event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            document.getElementById("btnTnew").click();
        }
    });
}
