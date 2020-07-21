// scripts for manipulating the in game variables
//TODO NEXT: 1098 Time to save the variables to the file
// TODO: have a seperate window with game running in it
var saveVars = function (varType) {
    // use switch to set the correct vars
};
var Ovars = [];
var rndmReplies = [];


// change a property from the Ovars object
var changeMe = function (param, newValue) {
    // check if it is one of the hard codes arrays first
    // if not, then edit the paramaters

    // check its not the rndmReplies array
    if (!param.includes("rndmReplies")) {
        Ovars[param] = newValue;
        console.log("New value of " + param + " = " + Ovars[param]);
    } else {
        var plen = param.length;
        var pleft = plen - 3;
        var arrName = param.substr(0, pleft);
        var ind = param.substr(plen - 2, 1);
        if (arrName == "rndmReplies") {
            rndmReplies[ind] = newValue;
        };
        console.log(rndmReplies[1]);


    };

}

//NOTE see below
// **************************************************************
// * CALL THE READFILE AND CHANGEME FUNCTIONS LIKE THIS         *
// * loadJSFile(fnm);                                           *
// * have fnm set to file name you are loading                  *
// * myCode();                                                  *
// * this contains everything you want done relating to this file
//   as the parent document bits are loaded asynchrolously      * 
//***************************************************************

// read the file and change the Ovars object properties

function loadScript(url, callback) {
    // Adding the script tag to the head as suggested before
    var head = document.head;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    // script.async = false;
    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}

var myPrettyCode = function () {
    // Here, do whatever you want
    // this one is basically empty because i am calling a file that declares vars


};

function loadJSfile(fnm) {
    var file = document.createElement('script');
    file.onreadystatechange = function () {
        if (this.readyState == 'complete') myCode();
    }
    file.onload = myCode;
    file.type = "text/javascript";
    file.src = fnm;
    document.getElementsByTagName("head")[0].appendChild(file)
}

function myCode() {
    // empty to load the variable definitions from external file
}

function loadJSfile2(fnm) {
    var file = document.createElement('script');
    file.onreadystatechange = function () {
        if (this.readyState == 'complete') myCode2();
    }
    file.onload = myCode2;
    file.type = "text/javascript";
    file.src = fnm;
    document.getElementsByTagName("head")[0].appendChild(file);

}


function myCode2() {

    setUserVars();


    // set the storage item so the object is not loaded with the values from the file again


    Ovars[0] = {
        // interface
        pageCol: pageCol,
        fontName: fontName,
        fontSize: fontSize,
        fontColor: fontColor,
        displayBckgrndColor: displayBckgrndColor,
        titleInk: titleInk,
        titleSize: titleSize,
        titleBckgrndColor: titleBckgrndColor,
        titleFont: titleFont,
        titleWeight: titleWeight,
        exitsInk: exitsInk,
        exitsSize: exitsSize,
        exitsBckgrndColor: exitsBckgrndColor,
        exitsFont: exitsFont,
        iconsOn: iconsOn,
        colMode: colMode,
        graphON: graphON,
        // stats
        stat_charisma: stat_charisma,
        stat_combat: stat_combat,
        stat_dexterity: stat_dexterity,
        stat_strength: stat_strength,
        stat_smallAmnt: stat_smallAmnt,
        stat_medAmnt: stat_medAmnt,
        stat_lrgAmnt: stat_lrgAmnt,
        stat_maxAmnt: stat_maxAmnt,
        stat_minAmnt: stat_minAmnt,
        showStats: showStats,
        moodLevel: moodLevel,
        // * stats text
        stat_noDexterity: stat_noDexterity,
        stat_noCharisma: stat_noCharisma,
        stat_noCombat: stat_noCombat,
        stat_noStrength: stat_noStrength,
        stat_noMagic: stat_noMagic,
        stat_noDextTwoObjects: stat_noDextTwoObjects,
        tooManyPickFailsTxt: tooManyPickFailsTxt,
        stat_increaedTxt: stat_increaedTxt,
        stat_decreasesTxt: stat_decreasesTxt,
        // initial settings
        max_pickFails: max_pickFails,
        weightAllowance: weightAllowance,
        invWeight: invWeight, // this is the ingame current weight
        itemsLimit: itemsLimit,
        cash: cash,
        startRoom: startRoom,
        cshSy: cshSy,
        buySell_variant: buySell_variant,
        //text
        // ** movement
        moveTxt: moveTxt, // dont forget the space
        cantGo: cantGo,
        whichDir: whichDir,
        cleverTxt: cleverTxt,
        youSaidTxt: youSaidTxt,
        youCanSeeTxt: youCanSeeTxt,
        // ** objects 
        listAlsoTxt: listAlsoTxt,
        carryingTxt: carryingTxt,
        newObjVis: newObjVis,
        notHere: notHere,
        noCapacity: noCapacity,
        cantGet: cantGet,
        getWhat: getWhat,
        lookAgain: lookAgain,
        combineTxt: combineTxt,
        destroytxt: destroytxt,
        objDrop: objDrop,
        dropTxt: dropTxt,
        cantDrop: cantDrop,
        mendTxt: mendTxt,
        noMend: noMend,
        litThe: litThe,
        unlitThe: unlitThe,
        extingThe: extingThe,
        cantUse: cantUse,
        againTxt: againTxt,
        cantHide: cantHide,
        cantHidePT2: cantHidePT2,
        isHid: isHid,
        useTxt: useTxt,
        unlockTxt: unlockTxt,
        lockTxt: lockTxt,
        pickLockTxt: pickLockTxt,
        lockedTxt: lockedTxt,
        abmonishLocked: abmonishLocked,
        openTxt: openTxt,
        cantOpen: cantOpen,
        inInvTxt: inInvTxt,
        notFitInInv: notFitInInv,
        putInInv: putInInv,
        cantBuy: cantBuy,
        canBuy: canBuy,
        exchText: exchText,
        buyNoMore: buyNoMore,
        soldTxt: soldTxt,
        cantSell: cantSell,
        alwaysYours: alwaysYours,
        notYoursToSell: notYoursToSell,
        putOnFloor: putOnFloor,
        closeTxt: closeTxt,
        notOpen: notOpen,
        visAfterRead: visAfterRead,
        alreadyUsed: alreadyUsed,
        turnFail: turnFail,
        alreadyWrittenOn: alreadyWrittenOn,
        writtenOnTxt: writtenOnTxt,
        tooDarkForObj: tooDarkForObj,
        tooDarkForObjArr: tooDarkForObjArr,
        tooDarkForPeep: tooDarkForPeep,
        tooDarkForExits: tooDarkForExits,
        fixedTxt: fixedTxt,
        cantSend: cantSend,
        cantThrow: cantThrow,
        throwtxt: throwtxt,
        throwTxtPT2: throwTxtPT2,
        doesntThrow: doesntThrow,
        fliesFail: fliesFail,
        fliesFailToFloor: fliesFailToFloor,
        // ** peeps
        noPeepTalk: noPeepTalk,
        talkError: talkError,
        talkWrongRoom: talkWrongRoom,
        peepSaysZero: peepSaysZero,
        peepBlanks: peepBlanks,
        deadTxt: deadTxt,
        deadNoTalk: deadNoTalk,
        revealTxt: revealTxt,
        noFight: noFight,
        resussTxt: resussTxt,
        resussTxtPT2: resussTxtPT2,
        noResuss: noResuss,
        dontResuss: dontResuss,
        notDead: notDead,
        sellerGone: sellerGone,
        danceTxt: danceTxt,
        givenTxt: givenTxt,
        cantGive: cantGive,
        swapTxt: swapTxt,
        nothingCanDo: nothingCanDo,
        jumpTxt: jumpTxt,
        nodTxt: nodTxt,
        wonSit: wonSit,
        sitTxt: sitTxt,
        smileTxt: smileTxt,
        standTxt: standTxt,
        dontWait: dontWait,
        cantWrite: cantWrite,
        notSeen: notSeen,
        // food and drink
        eatTxt: eatTxt,
        eatNoMore: eatNoMore,
        drinkTxt: drinkTxt,
        drinkNoMore: drinkNoMore,
        // ** Misc
        gameWonTxt: gameWonTxt,
        magicKills: magicKills,
        magicCreatesObj: magicCreatesObj,
        magicCreatesPeep: magicCreatesPeep,
        magicDepletedTxt: magicDepletedTxt,
        magicCantCast: magicCantCast,
        magicDestroyTxt: magicDestroyTxt,
        allowWonder: allowWonder,
        wanderMsgPt1: wanderMsgPt1,
        wanderMsgPt2: wanderMsgPt2,
        noHelpMsg: noHelpMsg,
        killedMsg: killedMsg,
        submittedTxt: submittedTxt,
        noFighting: noFighting,
        hereNotCarried: hereNotCarried,
        // Timer
        gameY: gameY,
        gameM: gameM,
        gameD: gameD,
        gameH: gameH,
        gameMi: gameM,
        sunRiseH: sunRiseH,
        sunRiseM: sunRiseM,
        sunSetH: sunSetH,
        sunSetM: sunSetM,
        sunRiseMess: sunRiseMess,
        sunSetMess: sunSetMess,
        oneSecondEquals: oneSecondEquals,
        useClock: useClock





        // dont forget the arrays too
    }
    // hard code and name arrays
    rndmReplies = [];
    rndmReplies[0] = "Sorry, I did not understand that";
    rndmReplies[1] = "That makes no sense to me";
    rndmReplies[2] = "Try arranging your words into something I can understand";
    rndmReplies[3] = "Alert! Gobldegook warning. Try agin";
    rndmReplies[4] = "Nope. That did not translate very well";
    rndmReplies[5] = "The trouble with me is that I require perfection. What did you mean?";
    rndmReplies[6] = "I'm sure you mean something important. Unfortunately I did not understand you";
    rndmReplies[7] = "Nope. Try that again";
    rndmReplies[8] = "That means nothing to me..... Oh Vienna!";
    rndmReplies[9] = "If you keep seeing this message, try checking you spelling and try words like examine, look, get, inventory, say. This might help";

    // Note: select which elements to display based upon  which form is visible
    /*var pgSel;
    if (localStorage.getItem("setSect") == "interface") {
        pgSel = "interface";
    } else if (localStorage.getItem("setSect") == "stats") {
        pgSel = "stats";
    };
    
     if (document.getElementById("divInterfaceSettings").style.visibility == "visible") {
         pgSel = "interface";

     };
     if (document.getElementById("divStatsSettings").style.visibility == "visible") {
         pgSel = "stats";
         alert(pgSel);
     };*/

    // call the function to set up the values of the elements
    setUpPage(localStorage.getItem("setSect"));

    localStorage.setItem("OvarsSet", "true");

}

// ******* set the element settings here ********
var setUpPage = function (PageSection) {
    console.log("selecter: " + PageSection);
    switch (PageSection) {
        case "interface":

            // NOTE: add these properties to the form elements in the code called by the submenu buttons
            //load the object properties for the interface form elements
            document.getElementById("bgcPick").value = Ovars[0].pageCol;
            document.getElementById("fntName").value = Ovars[0].fontName;

            setSlider("fntSize", Ovars[0].fontSize, "lbl_fntSize");
            document.getElementById("forePick").value = Ovars[0].fontColor;
            document.getElementById("dispPick").value = Ovars[0].displayBckgrndColor;
            document.getElementById("titlePick").value = Ovars[0].titleInk;
            document.getElementById("titleFont").value = Ovars[0].titleFont;
            setSlider("titSize", Ovars[0].titleSize, "lbl_titSize");
            document.getElementById("titBackPick").value = Ovars[0].titleBckgrndColor;
            document.getElementById("titleWeight").value = Ovars[0].titleWeight;
            document.getElementById("exitBackPick").value = Ovars[0].exitsBckgrndColor;
            document.getElementById("exitPick").value = Ovars[0].exitsInk;
            document.getElementById("exitFont").value = Ovars[0].exitsFont;
            document.getElementById("exitSize").value = Ovars[0].exitsSize;
            var slideIco = document.getElementById("iconsBool");
            if (Ovars[0].iconsOn == true) {
                slideIco.checked = true;
            } else {
                slideIco.checked = false;
            };
            var slideCol = document.getElementById("darkBool");
            if (Ovars[0].colMode == 'dark') {
                slideCol.checked = true;
            } else {
                slideCol.checked = false
            };
            slideCol.disabled = true;
            var slideGraph = document.getElementById("graphBool");
            if (Ovars[0].graphON == true) {
                slideGraph.checked = true;
            } else {
                slideGraph.checked = false
            };




            // set the onchange update
            document.getElementById("bgcPick").onchange = function () {
                Ovars[0].pageCol = document.getElementById("bgcPick").value;
                setElStyle("divTextSample");
            };
            document.getElementById("fntName").onchange = function () {
                Ovars[0].fontName = document.getElementById("fntName").value;
                setElStyle("divTextSample");
            };
            elChange("fntSize", "fontSize", "lbl_fntSize", "Font size: ");





            document.getElementById("forePick").onchange = function () {
                Ovars[0].fontColor = document.getElementById("forePick").value;
                setElStyle("divTextSample");
            };
            document.getElementById("dispPick").onchange = function () {
                Ovars[0].displayBckgrndColor = document.getElementById("dispPick").value;
                setElStyle("divTextSample");
            };
            document.getElementById("titlePick").onchange = function () {
                Ovars[0].titleInk = document.getElementById("titlePick").value;
                setElTitStyle("divTitleSample");
            };
            document.getElementById("titleFont").onchange = function () {
                Ovars[0].titleFont = document.getElementById("titleFont").value;
                setElTitStyle("divTitleSample");
            };
            elChange("titSize", "titleSize", "lbl_titSize", "Title size: ");

            document.getElementById("titBackPick").onchange = function () {
                Ovars[0].titleBckgrndColor = document.getElementById("titBackPick").value;
                setElTitStyle("divTitleSample");

            };
            document.getElementById("titleWeight").onchange = function () {
                Ovars[0].titleWeight = document.getElementById("titleWeight").value;
                setElTitStyle("divTitleSample");
            };
            document.getElementById("exitBackPick").onchange = function () {
                Ovars[0].exitsBckgrndColor = document.getElementById("exitBackPick").value;

            };
            document.getElementById("exitPick").onchange = function () {
                Ovars[0].exitsInk = document.getElementById("exitPick").value;

            };
            document.getElementById("exitFont").onchange = function () {
                Ovars[0].exitsFont = document.getElementById("exitFont").value;

            };

            elChange("exitSize", "exitsSize", "lbl_exitSize", "Exits size: ");
            slideIco.onchange = function () {
                if (slideIco.checked == true) {
                    Ovars[0].iconsOn = true;
                } else {
                    Ovars[0].iconsOn = false;
                };
            };
            slideCol.onchange = function () {
                if (slideCol.checked == true) {
                    Ovars[0].colMode = true;
                } else {
                    Ovars[0].colMode = false;
                };
            };
            slideGraph.onchange = function () {
                if (slideGraph.checked == true) {
                    Ovars[0].graphON = true;
                } else {
                    Ovars[0].graphON = false;
                };
            };

            break;
        case "stats":
            // load the stats form elements

            var statCh = document.getElementById("statCharisma");
            statCh.attributes.max = Ovars[0].stat_maxAmnt;

            // load stuff into the elements
            elLoad("statCharisma", "stat_charisma", "lbl_charisma", "Charisma");
            elLoad("statCombat", "stat_combat", "lbl_combat", "Combat");
            elLoad("statDexterity", "stat_dexterity", "lbl_dexterity", "Dexterity");
            elLoad("statStrength", "stat_strength", "lbl_strength", "Strength");
            elLoad("statSmallAmount", "stat_smallAmnt", "lbl_smallAmount", "Small amnt");
            elLoad("staMedAmount", "stat_medAmnt", "lbl_medAmount", "Medium amnt");
            elLoad("statLargeAmount", "stat_lrgAmnt", "lbl_largeAmount", "Large amnt");
            elLoad("noDexterity", "stat_noDexterity");
            elLoad("noCharisma", "stat_noCharisma");
            elLoad("noCombat", "stat_noCombat");
            elLoad("noStrength", "stat_noStrength");
            elLoad("noMagic", "stat_noMagic");
            elLoad("noDextTwoObjs", "stat_noDextTwoObjects");
            elLoad("tooManyLockPicks", "tooManyPickFailsTxt");
            elLoad("statIncreased", "stat_increaedTxt");
            elLoad("statDecreased", "stat_decreasesTxt");




            // NOTE elLoad(form element name, object property name, opt: label name, opt: label text)

            // what happens when focus moves away from the element
            // sliders, drop downs etc
            elChange("statCharisma", "stat_charisma", "lbl_charisma", "Charisma");
            elChange("statCombat", "stat_combat", "lbl_combat", "Combat");
            elChange("statDexterity", "stat_dexterity", "lbl_dexterity", "Dexterity");
            elChange("statStrength", "stat_strength", "lbl_strength", "Strength");
            elChange("statSmallAmount", "stat_smallAmnt", "lbl_smallAmount", "Small amnt");
            elChange("staMedAmount", "stat_medAmnt", "lbl_medAmount", "Medium amnt");
            elChange("statLargeAmount", "stat_lrgAmnt", "lbl_largeAmount", "Large amnt");

            // text boxes, switch boxes etc
            elOnBlur("noDexterity", "stat_noDexterity");
            elOnBlur("noCharisma", "stat_noCharisma");
            elOnBlur("noCombat", "stat_noCombat");
            elOnBlur("noStrength", "stat_noStrength");
            elOnBlur("noMagic", "stat_noMagic");
            elOnBlur("noDextTwoObjs", "stat_noDextTwoObjects");
            elOnBlur("tooManyLockPicks", "tooManyPickFailsTxt");
            elOnBlur("statIncreased", "stat_increaedTxt");
            elOnBlur("statDecreased", "stat_decreasesTxt");




            break;

        case "initial":
            elLoad("maxPickFails", "max_pickFails", "lbl_maxPickAttempts", "Pick limit");
            elLoad("weightAllowance", "weightAllowance", "lbl_weightAllowance", "Wght allowance");
            elLoad("itemsLimit", "itemsLimit", "lbl_itemsLimit", "Inv limit");
            elLoad("cash", "cash");
            fetchRoomNames("startRoom");
            elLoad("startRoom", "startRoom");
            elLoad("cashSymb", "cshSy");
            elLoad("buySellVariant", "buySell_variant", "lbl_buySellVariant", "Charisma effect");
            elChange("maxPickFails", "max_pickFails", "lbl_maxPickAttempts", "Pick limit");
            elChange("weightAllowance", "weightAllowance", "lbl_weightAllowance", "Wght allowance");
            elChange("itemsLimit", "itemsLimit", "lbl_itemsLimit", "Inv limit");
            elChange("startRoom", "startRoom");
            elChange("buySellVariant", "buySell_variant", "lbl_buySellVariant", "Charisma effect");


            elOnBlur("cash", "cash");
            elOnBlur("cashSymb", "cshSy");
            break;

        case "moveTxt":
            elLoad("moveTxt", "moveTxt");
            elLoad("cantGo", "cantGo");
            elLoad("whichDir", "whichDir");
            elLoad("cleverTxt", "cleverTxt");
            elLoad("youSaidTxt", "youSaidTxt");
            elLoad("youCanSeeTxt", "youCanSeeTxt");

            elOnBlur("cantGo", "cantGo"); // on save add space at end
            elOnBlur("moveTxt", "moveTxt"); //on save add space at end
            elOnBlur("whichDir", "whichDir");
            elOnBlur("cleverTxt", "cleverTxt");
            elOnBlur("youSaidTxt", "youSaidTxt"); // at <br>to beginning of the text if not there
            elOnBlur("youCanSeeTxt", "youCanSeeTxt"); // as above

            break;

        case "objects":
            // make sure you check to see if this section is visible at line approx 311. This is how the correct case is selected here!
            elLoad("listAlsoTxt", "listAlsoTxt");
            elLoad("carryingTxt", "carryingTxt");
            elLoad("newObjVis", "newObjVis");
            elLoad("notHere", "notHere");
            elLoad("noCapacity", "noCapacity");
            elLoad("cantGet", "cantGet");
            elLoad("getWhat", "getWhat");
            elLoad("lookAgain", "lookAgain");
            elLoad("combineTxt", "combineTxt");
            elLoad("destroyTxt", "destroytxt");
            elLoad("objDrop", "objDrop");
            elLoad("dropTxt", "dropTxt");
            elLoad("cantDrop", "cantDrop");
            elLoad("mendTxt", "mendTxt");
            elLoad("noMend", "noMend");
            elLoad("litThe", "litThe");
            elLoad("unlitThe", "unlitThe");
            elLoad("extingThe", "extingThe");
            elLoad("cantUse", "cantUse");
            elLoad("againTxt", "againTxt");
            elLoad("cantHide", "cantHide");
            elLoad("cantHidePT2", "cantHidePT2");
            elLoad("isHid", "isHid");
            elLoad("useTxt", "useTxt");
            elLoad("unlockTxt", "unlockTxt");
            elLoad("lockTxt", "lockTxt");
            elLoad("pickLockTxt", "pickLockTxt");
            elLoad("lockedTxt", "lockedTxt");
            elLoad("abmonishLocked", "abmonishLocked");
            elLoad("openTxt", "openTxt");
            elLoad("cantOpen", "cantOpen");
            elLoad("inInvTxt", "inInvTxt");
            elLoad("notFitInInv", "notFitInInv");
            elLoad("putInInv", "putInInv");
            elLoad("cantBuy", "cantBuy");
            elLoad("canBuy", "canBuy");
            elLoad("exchText", "exchText");
            elLoad("buyNoMore", "buyNoMore");
            elLoad("soldTxt", "soldTxt");
            elLoad("cantSell", "cantSell");
            elLoad("alwaysYours", "alwaysYours");
            elLoad("notYoursToSell", "notYoursToSell");
            elLoad("putOnFloor", "putOnFloor");
            elLoad("closeTxt", "closeTxt");
            elLoad("notOpen", "notOpen");
            elLoad("visAfterRead", "visAfterRead");
            elLoad("alreadyUsed", "alreadyUsed");
            elLoad("turnFail", "turnFail");
            elLoad("alreadyWrittenOn", "alreadyWrittenOn");
            elLoad("writtenOnTxt", "writtenOnTxt");
            elLoad("tooDarkForObj", "tooDarkForObj");
            elLoad("tooDarkForObjArr", "tooDarkForObjArr");
            elLoad("tooDarkForPeep", "tooDarkForPeep");
            elLoad("tooDarkForExits", "tooDarkForExits");
            elLoad("fixedTxt", "fixedTxt");
            elLoad("cantSend", "cantSend");
            elLoad("cantThrow", "cantThrow");
            elLoad("throwTxt", "throwtxt");
            elLoad("throwTxtPT2", "throwTxtPT2");
            elLoad("doesntThrow", "doesntThrow");
            elLoad("fliesFail", "fliesFail");
            elLoad("fliesFailToFloor", "fliesFailToFloor");


            elOnBlur("listAlsoTxt", "listAlsoTxt");
            elOnBlur("carryingTxt", "carryingTxt");
            elOnBlur("newObjVis", "newObjVis");
            elOnBlur("notHere", "notHere");
            elOnBlur("noCapacity", "noCapacity");
            elOnBlur("cantGet", "cantGet");
            elOnBlur("getWhat", "getWhat");
            elOnBlur("lookAgain", "lookAgain");
            elOnBlur("combineTxt", "combineTxt");
            elOnBlur("destroyTxt", "destroytxt");
            elOnBlur("objDrop", "objDrop");
            elOnBlur("dropTxt", "dropTxt");
            elOnBlur("cantDrop", "cantDrop");
            elOnBlur("mendTxt", "mendTxt");
            elOnBlur("noMend", "noMend");
            elOnBlur("litThe", "litThe");
            elOnBlur("unlitThe", "unlitThe");
            elOnBlur("extingThe", "extingThe");
            elOnBlur("cantUse", "cantUse");
            elOnBlur("againTxt", "againTxt");
            elOnBlur("cantHide", "cantHide");
            elOnBlur("cantHidePT2", "cantHidePT2");
            elOnBlur("isHid", "isHid");
            elOnBlur("useTxt", "useTxt");
            elOnBlur("unlockTxt", "unlockTxt");
            elOnBlur("lockTxt", "lockTxt");
            elOnBlur("pickLockTxt", "pickLockTxt");
            elOnBlur("lockedTxt", "lockedTxt");
            elOnBlur("abmonishLocked", "abmonishLocked");
            elOnBlur("openTxt", "openTxt");
            elOnBlur("cantOpen", "cantOpen");
            elOnBlur("inInvTxt", "inInvTxt");
            elOnBlur("notFitInInv", "notFitInInv");
            elOnBlur("putInInv", "putInInv");
            elOnBlur("cantBuy", "cantBuy");
            elOnBlur("canBuy", "canBuy");
            elOnBlur("exchText", "exchText");
            elOnBlur("buyNoMore", "buyNoMore");
            elOnBlur("soldTxt", "soldTxt");
            elOnBlur("cantSell", "cantSell");
            elOnBlur("alwaysYours", "alwaysYours");
            elOnBlur("notYoursToSell", "notYoursToSell");
            elOnBlur("putOnFloor", "putOnFloor");
            elOnBlur("closeTxt", "closeTxt");
            elOnBlur("notOpen", "notOpen");
            elOnBlur("visAfterRead", "visAfterRead");
            elOnBlur("alreadyUsed", "alreadyUsed");
            elOnBlur("turnFail", "turnFail");
            elOnBlur("alreadyWrittenOn", "alreadyWrittenOn");
            elOnBlur("writtenOnTxt", "writtenOnTxt");
            elOnBlur("tooDarkForObj", "tooDarkForObj");
            elOnBlur("tooDarkForObjArr", "tooDarkForObjArr");
            elOnBlur("tooDarkForPeep", "tooDarkForPeep");
            elOnBlur("tooDarkForExits", "tooDarkForExits");
            elOnBlur("fixedTxt", "fixedTxt");
            elOnBlur("cantSend", "cantSend");
            elOnBlur("cantThrow", "cantThrow");
            elOnBlur("throwTxt", "throwtxt");
            elOnBlur("throwTxtPT2", "throwTxtPT2");
            elOnBlur("doesntThrow", "doesntThrow");
            elOnBlur("fliesFail", "fliesFail");
            elOnBlur("fliesFailToFloor", "fliesFailToFloor");


            break;

        case "peeps":
            elLoad("noPeepTalk", "noPeepTalk");
            elLoad("talkError", "talkError");
            elLoad("talkWrongRoom", "talkWrongRoom");
            elLoad("peepSaysZero", "peepSaysZero");
            elLoad("peepBlanks", "peepBlanks");
            elLoad("deadTxt", "deadTxt");
            elLoad("deadNoTalk", "deadNoTalk");
            elLoad("revealTxt", "revealTxt");
            elLoad("noFight", "noFight");
            elLoad("resussTxt", "resussTxt");
            elLoad("resussTxtPT2", "resussTxtPT2");
            elLoad("noResuss", "noResuss");
            elLoad("dontResuss", "dontResuss");
            elLoad("notDead", "notDead");
            elLoad("sellerGone", "sellerGone");
            elLoad("danceTxt", "danceTxt");
            elLoad("givenTxt", "givenTxt");
            elLoad("cantGive", "cantGive");
            elLoad("swapTxt", "swapTxt");
            elLoad("nothingCanDo", "nothingCanDo");
            elLoad("jumpTxt", "jumpTxt");
            elLoad("nodTxt", "nodTxt");
            elLoad("wontSit", "wonSit");
            elLoad("sitTxt", "sitTxt");
            elLoad("smileTxt", "smileTxt");
            elLoad("standTxt", "standTxt");
            elLoad("dontWait", "dontWait");
            elLoad("cantWrite", "cantWrite");
            elLoad("notSeen", "notSeen");


            elOnBlur("noPeepTalk", "noPeepTalk");
            elOnBlur("talkError", "talkError");
            elOnBlur("talkWrongRoom", "talkWrongRoom");
            elOnBlur("peepSaysZero", "peepSaysZero");
            elOnBlur("peepBlanks", "peepBlanks");
            elOnBlur("deadNoTalk", "deadNoTalk");
            elOnBlur("revealTxt", "revealTxt");
            elOnBlur("noFight", "noFight");
            elOnBlur("resussTxt", "resussTxt");
            elOnBlur("resussTxtPT2", "resussTxtPT2");
            elOnBlur("noResuss", "noResuss");
            elOnBlur("dontResuss", "dontResuss");
            elOnBlur("notDead", "notDead");
            elOnBlur("sellerGone", "sellerGone");
            elOnBlur("danceTxt", "danceTxt");
            elOnBlur("givenTxt", "givenTxt");
            elOnBlur("cantGive", "cantGive");
            elOnBlur("swapTxt", "swapTxt");
            elOnBlur("nothingCanDo", "nothingCanDo");
            elOnBlur("jumpTxt", "jumpTxt");
            elOnBlur("nodTxt", "nodTxt");
            elOnBlur("wontSit", "wonSit");
            elOnBlur("sitTxt", "sitTxt");
            elOnBlur("smileTxt", "smileTxt");
            elOnBlur("standTxt", "standTxt");
            elOnBlur("dontWait", "dontWait");
            elOnBlur("cantWrite", "cantWrite");
            elOnBlur("notSeen", "notSeen");



            break;

        case "fnd":
            elLoad("eatTxt", "eatTxt");
            elLoad("eatNoMore", "eatNoMore");
            elLoad("drinkTxt", "drinkTxt");
            elLoad("drinkNoMore", "drinkNoMore");

            elOnBlur("eatTxt", "eatTxt");
            elOnBlur("eatNoMore", "eatNoMore");
            elOnBlur("drinkTxt", "drinkTxt");
            elOnBlur("drinkNoMore", "drinkNoMore");

            break;

        case "misc":

            elLoad("noHelpMsg", "noHelpMsg");
            elLoad("magicCreatesObj", "magicCreatesObj");
            elLoad("magicKills", "magickills");
            elLoad("magicCreatesPeep", "magicCreatesPeep");
            elLoad("magicDepletedTxt", "magicDepletedTxt");
            elLoad("magicCantCast", "magicCantCast");
            elLoad("allowWonder", "allowWonder");
            if (Ovars[0].allowWonder === "y") {
                document.getElementById("allowWonder").checked = true;
            } else {
                document.getElementById("allowWonder").checked = false;
            };
            if (document.getElementById("allowWonder").checked == true) {

                seeMe("divWanderMsgPt1", true);
                seeMe("divWanderMsgPt2", true);
                elLoad("wanderMsgPt1", "wanderMsgPt1");
                elLoad("wanderMsgPt2", "wanderMsgPt2");
                elOnBlur("wanderMsgPt1", "wanderMsgPt1");
                elOnBlur("wanderMsgPt2", "wanderMsgPt2");

            } else {

                seeMe("divWanderMsgPt1", false);
                seeMe("divWanderMsgPt2", false);
            };
            elLoad("submittedTxt", "submittedTxt");
            elLoad("noFighting", "noFighting");
            elLoad("hereNotCarried", "hereNotCarried");
            elLoad("killedMsg", "killedMsg");
            elLoad("gameWonTxt", "gameWonTxt");


            document.getElementById("allowWonder").onchange = function () {
                onChangeFunc(this.getAttribute("id"), ["divWanderMsgPt1", "divWanderMsgPt2"], true);
                elLoad("wanderMsgPt1", "wanderMsgPt1");
                elLoad("wanderMsgPt2", "wanderMsgPt2");
                elOnBlur("wanderMsgPt1", "wanderMsgPt1");
                elOnBlur("wanderMsgPt2", "wanderMsgPt2");
            };
            for (x = 1; x <= 10; x++) {
                var elNm = "reply" + x;
                var arrI = x - 1;

                document.getElementById(elNm).value = rndmReplies[arrI];

            };

            elOnBlur("noHelpMsg", "noHelpMsg");
            elOnBlur("magicCreatesObj", "magicCreatesObj");
            elOnBlur("magicKills", "magickills");
            elOnBlur("magicCreatesPeep", "magicCreatesPeep");
            elOnBlur("magicDepletedTxt", "magicDepletedTxt");
            elOnBlur("magicCantCast", "magicCantCast");
            elOnBlur("allowWonder", "allowWonder");
            if (document.getElementById("allowWonder").checked == true) {
                Ovars[0].allowWonder = "y";
            } else {
                Ovars[0].allowWonder = "n";
            };
            // wander messages are in the IF bit above
            elOnBlur("submittedTxt", "submittedTxt");
            elOnBlur("noFighting", "noFighting");
            elOnBlur("hereNotCarried", "hereNotCarried");
            elOnBlur("killedMsg", "killedMsg");
            elOnBlur("gameWonTxt", "gameWonTxt");


            break;

        case "time":
            elLoad("gameY", "gameY");
            elLoad("gameM", "gameM");
            elLoad("gameD", "gameD");
            elLoad("sunRiseH", "sunRiseH");
            elLoad("sunRiseM", "sunRiseM");
            elLoad("sunSetH", "sunSetH");
            elLoad("sunSetM", "sunSetM");
            elLoad("sunRiseMess", "sunRiseMess");
            elLoad("sunSetMess", "sunSetMess");
            elLoad("oneSecondEquals", "oneSecondEquals");
            if (Ovars[0].useClock === true) {
                document.getElementById("useClock").checked = true;
            } else {
                document.getElementById("useClock").checked = false;
            };


            elOnBlur("gameY", "gameY");
            elOnBlur("gameM", "gameM");
            elOnBlur("gameD", "gameD");
            elOnBlur("sunRiseH", "sunRiseH");
            elOnBlur("sunRiseM", "sunRiseM");
            elOnBlur("sunSetH", "sunSetH");
            elOnBlur("sunSetM", "sunSetM");
            elOnBlur("sunRiseMess", "sunRiseMess");
            elOnBlur("sunSetMess", "sunSetMess");
            elOnBlur("oneSecondEquals", "oneSecondEquals");
            if (document.getElementById("useClock").checked == true) {
                Ovars[0].useClock = true;
            } else {
                Ovars[0].useClock = false;
            };
    };
}

// load the document elements values from object
var elLoad = function (el, objProp, lblName, lblText) {
    var elm = document.getElementById(el);
    elm.value = Ovars[0][objProp];
    if (lblName != undefined) {
        document.getElementById(lblName).innerHTML = lblText + ": " + Ovars[0][objProp];
    };
};

// listen for onChange events and change object and labels accordingly
var elChange = function (el, objProp, lblName, lblText) {
    var elm = document.getElementById(el);
    elm.onchange = function () {
        Ovars[0][objProp] = elm.value;
        if (lblName != undefined) {
            document.getElementById(lblName).innerHTML = lblText + ": " + Ovars[0][objProp];
        };

    };

};
// listen for onblur (move away from input)
var elOnBlur = function (el, objProp) {
    var elm = document.getElementById(el);
    elm.onblur = function () {
        if (elm.value != "") {
            Ovars[0][objProp] = elm.value;

        };
    };

};
// set up the page
function varsInterface(section) { // called by menu button

    // clear the unwanted elements\
    var xx = document.getElementById("showSettings").querySelectorAll(".frmEnclosure");
    for (i = 0, max = xx.length; i < max; i++) {
        xx[i].style.visibility = "collapse";
        xx[i].style.display = "none";
    };
    // load the section based upon which section has been submitted from menu button

    switch (section) {
        case "interface":
            localStorage.setItem("setSect", "interface");
            //invisible elements

            seeMe("divStatsSettings", false);
            seeMe("divInterfaceSettings", true);
            seeMe("divInitialSettings", false);
            seeMe("divObjectSettings", false);
            seeMe("divNPCSettings", false);
            seeMe("divFnDSettings", false);
            seeMe("divMovementSettings", false);
            seeMe("divMiscSettings", false);
            seeMe("divTimerSettings", false);
            document.getElementById("btnSetSub").disabled = false; // this makes the save btn active
            break;
        case "stats":
            localStorage.setItem("setSect", "stats");

            seeMe("divStatsSettings", true);
            seeMe("divInterfaceSettings", false);
            seeMe("divInitialSettings", false);
            seeMe("divObjectSettings", false);
            seeMe("divNPCSettings", false);
            seeMe("divFnDSettings", false);
            seeMe("divMovementSettings", false);
            seeMe("divMiscSettings", false);
            seeMe("divTimerSettings", false);
            document.getElementById("btnSetSub").disabled = false;
            break;
        case "initial":
            localStorage.setItem("setSect", "initial");

            seeMe("divStatsSettings", false);
            seeMe("divInterfaceSettings", false);
            seeMe("divInitialSettings", true);
            seeMe("divObjectSettings", false);
            seeMe("divNPCSettings", false);
            seeMe("divFnDSettings", false);
            seeMe("divMovementSettings", false);
            seeMe("divMiscSettings", false);
            seeMe("divTimerSettings", false);
            document.getElementById("btnSetSub").disabled = false;
            break;
        case "moveTxt":
            localStorage.setItem("setSect", "moveTxt");

            seeMe("divStatsSettings", false);
            seeMe("divInterfaceSettings", false);
            seeMe("divInitialSettings", false);
            seeMe("divObjectSettings", false);
            seeMe("divNPCSettings", false);
            seeMe("divFnDSettings", false);
            seeMe("divMiscSettings", false);
            seeMe("divTimerSettings", false);
            seeMe("divMovementSettings", true);
            document.getElementById("btnSetSub").disabled = false;
            break;

        case "objects":
            localStorage.setItem("setSect", "objects");
            seeMe("divStatsSettings", false);
            seeMe("divInterfaceSettings", false);
            seeMe("divInitialSettings", false);
            seeMe("divMovementSettings", false);
            seeMe("divNPCSettings", false);
            seeMe("divFnDSettings", false);
            seeMe("divMiscSettings", false);
            seeMe("divTimerSettings", false);
            seeMe("divObjectSettings", true);
            document.getElementById("btnSetSub").disabled = false;
            break;

        case "peeps":

            localStorage.setItem("setSect", "peeps");
            seeMe("divStatsSettings", false);
            seeMe("divInterfaceSettings", false);
            seeMe("divInitialSettings", false);
            seeMe("divMovementSettings", false);
            seeMe("divObjectSettings", false);
            seeMe("divFnDSettings", false);
            seeMe("divMiscSettings", false);
            seeMe("divTimerSettings", false);
            seeMe("divNPCSettings", true);
            document.getElementById("btnSetSub").disabled = false;
            break;

        case "fnd":
            localStorage.setItem("setSect", "fnd");
            seeMe("divStatsSettings", false);
            seeMe("divInterfaceSettings", false);
            seeMe("divInitialSettings", false);
            seeMe("divMovementSettings", false);
            seeMe("divObjectSettings", false);
            seeMe("divNPCSettings", false);
            seeMe("divMiscSettings", false);
            seeMe("divTimerSettings", false);
            seeMe("divFnDSettings", true);
            document.getElementById("btnSetSub").disabled = false;
            break;

        case "misc":
            localStorage.setItem("setSect", "misc");
            seeMe("divStatsSettings", false);
            seeMe("divInterfaceSettings", false);
            seeMe("divInitialSettings", false);
            seeMe("divMovementSettings", false);
            seeMe("divObjectSettings", false);
            seeMe("divNPCSettings", false);
            seeMe("divFnDSettings", false);
            seeMe("divTimerSettings", false);

            seeMe("divMiscSettings", true);
            document.getElementById("btnSetSub").disabled = false;
            break;

        case "time":
            localStorage.setItem("setSect", "time");
            seeMe("divStatsSettings", false);
            seeMe("divInterfaceSettings", false);
            seeMe("divInitialSettings", false);
            seeMe("divMovementSettings", false);
            seeMe("divObjectSettings", false);
            seeMe("divNPCSettings", false);
            seeMe("divMiscSettings", false);
            seeMe("divFnDSettings", false);

            seeMe("divTimerSettings", true);
            document.getElementById("btnSetSub").disabled = false;
            break;


    };


    // if the file has not been loaded and the vars from game not set, then load them
    if (localStorage.getItem("OvarsSet") != "true") {
        //NOTE if you RELOAD the page, the Ovars object will be reset and the whole lot will not work.
        loadJSfile(localStorage.getItem("gameFolder") + "/scr/varDefinitions.js");
        loadJSfile2(localStorage.getItem("gameFolder") + "/scr/authorVariables.js");

    } else {
        // the object was set when page loaded and button clicked so everything should be still set
        console.log("hoipefully " + Ovars[0].stat_noDexterity);
        setUpPage(localStorage.getItem("setSect"));
    };

    // this just gets rid of the initial page view and akes the form visible
    document.getElementById("settingsStart").style.visibility = "collapse";
    document.getElementById("settingsStart").style.display = "none";
    if (document.getElementById("frmSettings").style.visibility != "visible") {
        document.getElementById("frmSettings").style.visibility = "visible";
        document.getElementById("frmSettings").style.display = "block";
    };

    document.getElementById("btnSetSub").style.visibility = "visible";






}


function setElStyle(el) {
    var elem = document.getElementById(el);
    elem.style.backgroundColor = Ovars[0].pageCol;
    elem.style.color = Ovars[0].fontColor;
    elem.style.fontFamily = Ovars[0].fontName;
    elem.style.fontSize = Ovars[0].fontSize;
}

function setElTitStyle(el) {
    var elem = document.getElementById(el);
    // elem.style.backgroundColor = Ovars[0].titleBckgrndColor;
    elem.style.color = Ovars[0].titleInk;
    elem.style.fontFamily = Ovars[0].titleFont;
    elem.style.fontSize = Ovars[0].titleSize;
    elem.style.fontWeight = Ovars[0].titleWeight;
}

function makeVar(varNm, propNam) {
    var rSt
    if (propNam != null && propNam != undefined) {
        if (Ovars[0][propNam] == true || Ovars[0][propNam] == false) {
            rSt = varNm + ' = ' + Ovars[0][propNam] + ';';
        } else {

            rSt = varNm + ' = "' + Ovars[0][propNam] + '";';
        };

    } else {
        if (Ovars[0][varNm] == true || Ovars[0][varNm] == false) {
            rSt = varNm + ' = ' + Ovars[0][varNm] + ';';
        } else {

            rSt = varNm + ' = "' + Ovars[0][varNm] + '";';
        };

    };
    return rSt;
}
var saveVars = function (frm) {
    // note: need to do soething about arrays - tooDarkForObjectArr needs to seperate the commas etc and ensure it is placed in an array
    // note 2:any arrays that are not added to etc can be removed from the editing process because it is enough they are declared in varDefinitions.js
    // save to file. this is like the whole downloadData function in app.js only for js file

    var fileLoc = gameLocation + "/scr/authorVariables.js";
    var settData = ['settings:\n'];
    settData.push("function setUserVars() {");

    // loop thru Ovars[0] properties and save them as variables
    Object.getOwnPropertyNames(Ovars[0]).forEach(
        function (val, idx, array) {

            settData.push(makeVar(val));
            // console.log(val + ' -> ' + Ovars[0][val]);
        }
    );
    // the rndmReplies are not part of the object so have to be done here
    for (x = 1; x <= 10; x++) {
        var i = x - 1;
        var vrNm = 'rndmReplies[' + i + '] = "';
        settData.push(vrNm + rndmReplies[i] + '";');
    };


    settData.push("}");

    return settData.join("\n");


}
