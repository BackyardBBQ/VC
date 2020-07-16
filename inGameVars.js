/* CONTENTS
saveVars
Ovars=[]
rndmReplies=[]
changeMe
loadScript - depreciated
myPrettyCode - depreciated
loadJSfile
myCode
loadJSfile2
myCode2
setUpPage
elLoad
elChange
elOnBlur
varsInterface
setElStyle
setElTitStyle
makeVar
saveVars


*/


// scripts for manipulating the in game variables
//TODO NEXT: 1098 Time to save the variables to the file
// TODO: have a seperate window with game running in it
/*var saveVars = function (varType) {
    // use switch to set the correct vars
};*/
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

            declareDivContent("settingsHelp", 'set1', '<p>Q: What do I need to know about the colours?</p><p>A: Make sure your background colour and font colour contrast enough to be clearly visible. You don\'t want the text to fade into the background</p><hr />', true, "subMenuRow", "font-size:80%");
            declareDivContent("settingsHelp", 'set2', '<p>Q: What is Input back colour?</p><p>A: This is the background colour of the strip where the user enters their inputs. Again, make sure this contrasts with the font colour.</p><hr />', false, "subMenuRow", "font-size:80%");
            declareDivContent("settingsHelp", 'set3', '<p>Q: What does Title weight mean?</p><p>A: Weight is just another way of saying how bold something is. Normal is the usual strength of font. Bold is the normal bold whislt Bolder is even stronger.</p><hr />', false, "subMenuRow", "font-size:80%");
            declareDivContent("settingsHelp", 'set4', '<p>Q: What are the Misc layout switches about?</p><p>A: Icons on; if set to ON will display the graphical icons for saving and layout changes;<br />Dark mode allows for the default black and white display settings to be used;<br />Graphics on will switch the graphics for room, people and objects on.</p><hr />', false, "subMenuRow", "font-size:80%");
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

            declareDivContent("settingsHelp", 'set1', '<p>What are the first four stats used for?</p><p>A: These are generally used for deciding how well the player does in certain scenarios. The player\'s stats are used as a multiplier when internal dice are rolled against object\'s, npc\'s or decision making dice.</p><hr />', true, "subMenuRow", "font-size:80%");
            declareDivContent("settingsHelp", 'set2', '<p>Q: The Stats limit is for what exactly?</p><p>A: These set how much a Small, Medium or Large amount is when the "lazy" method of setting the variables is applied internally. Eg. if a max amount is 10 then a Large amount to be applied would be 4 or 5, a medium amoiunt would be 2 and a small amount woukld be 1.</p><hr />', false, "subMenuRow", "font-size:80%");
            declareDivContent("settingsHelp", 'set3', '<p>Q: What is a Problem message?</p><p>A: This section allows you to change the default text for the messages displayed when the player tries something but it fails to work due to the relative stat.</p><hr />', false, "subMenuRow", "font-size:80%");
            declareDivContent("settingsHelp", 'set4', '<p>Q: And the other Stat messages?</p><p>A: Here you can change the default text for messages displayed for the reasons stated.</p><hr />', false, "subMenuRow", "font-size:80%");


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

            declareDivContent("settingsHelp", 'set1', '<p>What are the Initial settings for?</p><p>A: Here you set the relative settings:<br />Pick limit is the number of attempts the player gets to pick the lock of something before the item they are using breaks or they get locked out,<br />Wgt allowance is the maximum weight of objects the player can initally carry in their inventory,<br />Inv limit is the maximum number of objects the player can initially carry,<br />Starting cash is the amount of money the player starts off with,<br />Starting room is where the game starts<br />Cash symbol is the character used to denote the currency,<br />Charisma effect is how much the player\'s charisma can potentially effect in game NPC\'s.</p><hr />', true, "subMenuRow", "font-size:80%");

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
            declareDivContent("settingsHelp", 'set1', '<p>What is pre move text?</p><p>A: When the player moves from one location to another this is the text displayed before the confirmation of the direction. The default for this is "You move".</p><hr />', true, "subMenuRow", "font-size:80%");
            declareDivContent("settingsHelp", 'set2', '<p>Q: When are "Can not move", "Which way" and "Clever" text displayed?</p><p>A: The user sees the Can not move message when they try to move in a direction which is blocked or not possible,<br />The Which way text is displyed if the player tries to move without inserting a direction,<br />The Clever message is displayed if the player tries to move by entering something clever such as "run".</p><hr />', false, "subMenuRow", "font-size:80%");
            declareDivContent("settingsHelp", 'set3', '<p>Q: What do "You said" and "Can see" do?</p><p>A: When the player inputs a line of text, the screen displays the contents of the "You said" variable before repeating what the player typed.<br />The player is then informed what is visible to them preceeded by the contents of the "Can see" variable.</p><hr />', false, "subMenuRow", "font-size:80%");
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

            declareDivContent("settingsHelp", 'set1', '<p>What does Also in list mean?</p><p>A: This is a list of commands the player can type which affect the game system but not the game They are an alternative to the graphic icons.</p><hr />', true, "subMenuRow", "font-size:80%");
            declareDivContent("settingsHelp", 'set2', '<p>Q: Are most of the fields obvious from their titles?</p><p>A: Yes, for example "Look again" is the text displayed before the description after the player enters "look" for the second time.</p><hr />', false, "subMenuRow", "font-size:80%");
            declareDivContent("settingsHelp", 'set3', '<p>Q: I am not sure about "Again alternastive". What is that?</p><p>A: In a response from the game,the word "again" might be displayed after a user does something more than once. This is where you can change the word "again" to something different if you wish.</p><hr />', false, "subMenuRow", "font-size:80%");
            declareDivContent("settingsHelp", 'set4', '<p>Q: Why is there two boxes for "Can\'t hide"?</p><p>A: This is one of a few sections where there is two parts to a response. Here the object name is placed between the two parts. The default text gives you a good idea of how this works.</p><hr />', false, "subMenuRow", "font-size:80%");
            declareDivContent("settingsHelp", 'set5', '<p>Q: "Sarcastic open"?</p><p>A: If the user tries to do something such as close an object which is already close and the game then opens it instead, the "Sarcastic open" text is displayed.</p><hr />', false, "subMenuRow", "font-size:80%");
            declareDivContent("settingsHelp", 'set6', '<p>Q: What is a "Wrong move word"?</p><p>A: This is used when a player tries to go to a different location but enters a word that is not recognised as an applicable verb.</p><hr />', false, "subMenuRow", "font-size:80%");
            declareDivContent("settingsHelp", 'set7', '<p>Q: What does "Too dark (multiple)" mean?</p><p>A: This is a list of possible responses when a room is too dark to see in.<br />Please ensure you separate each response with a comma. <b>DO NOT</b> put a space after the comma and avoid comma\'s in the actual text as this will split the sentence into two responses.</p><hr />', false, "subMenuRow", "font-size:80%");

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

            declareDivContent("settingsHelp", 'set1', '<p>So most of these are self explanatory?</p><p>A: Yes. "Blanked", probably needs a little explaining. This is the text shown when an NPC ignores advances from the player.</p><hr />', true, "subMenuRow", "font-size:80%");
            declareDivContent("settingsHelp", 'set2', '<p>Why are there two parts to "Resuscitate"?</p><p>A: There are two parts to the response here. The NPC name is palced between them whcih makes the response personal to the NPC.<br />And "Very dead" explains that no matter what is done the NPC will not be coming back from the great beyond.</p><hr />', false, "subMenuRow", "font-size:80%");

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

            declareDivContent("settingsHelp", 'set1', '<p>So most of these are self explanatory?</p><p>A: Yes. The field title explains their intentions.</p><hr />', true, "subMenuRow", "font-size:80%");
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
            declareDivContent("settingsHelp", 'set1', '<p>So most of these are self explanatory?</p><p>A: Yes. The field title explains their intentions.</p><hr />', true, "subMenuRow", "font-size:80%");
            declareDivContent("settingsHelp", 'set2', '<p>What is "No help" for?</p><p>A: If the player enters "help" in a room and there is no help set for that location, this text is displayed.</p><hr />', false, "subMenuRow", "font-size:80%");
            declareDivContent("settingsHelp", 'set3', '<p>I want to allow NPC\'s to wander about the game world freely, if such a setting is checked with that NPC</p><p>A: Simply make sure the "Allow wondering" switch is in the on position.<br />Ensure you have completed both parts of the "NPC wonder" text responses which complete the default resp[onse when an NPC wonders off from a room the player is in.</p><hr />', false, "subMenuRow", "font-size:80%");
            declareDivContent("settingsHelp", 'set4', '<p>What is "Carry to work" about?</p><p>A: This is the text displayed if a player tries to use an object that needs to be carried when used, and it is not currently carried.</p><hr />', false, "subMenuRow", "font-size:80%");
            declareDivContent("settingsHelp", 'set5', '<p>What should I put in "Killed"?</p><p>A: This should be a nice descriptive text of the player\'s character dying. If you want to insert a new line enter <b>" br "</b> including the space before and after the br.</p><hr />', false, "subMenuRow", "font-size:80%");
            declareDivContent("settingsHelp", 'set6', '<p>What should "Game won" be saying?</p><p>A: Listen, if the playuer has managed to complete your work of art (ie, the game) and has spent many hours battling the puzzles you have put in their way, you really should make sure this is a good piece of descriptive text.<br />If you want to insert a new line enter <b>" br "</b> including the space before and after the br.</p><hr />', false, "subMenuRow", "font-size:80%");
            declareDivContent("settingsHelp", 'set7', '<p>What are "Random responses"?</p><p>A: These are a list of ten possible respnses when the player enters something that does not compute. Instead of the repetetive "I don\'t understand", these responses are chosen at random. Much more intersting.</p><hr />', false, "subMenuRow", "font-size:80%");

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
            declareDivContent("settingsHelp", 'set1', '<p>So most of these are self explanatory?</p><p>A: Yes. All the Game date and time fields are number only so, for example, May would be "5".</p><hr />', true, "subMenuRow", "font-size:80%");
            declareDivContent("settingsHelp", 'set2', '<p>What is "Sunset message" and "Sunrise message"?</p><p>A: These are the messages displayed when the sunsets and rises respectively.</p><hr />', false, "subMenuRow", "font-size:80%");
            declareDivContent("settingsHelp", 'set3', '<p>What do I enter at "Second equals"?</p><p>A: If a game second was the same as a real world second, time would pass in real time and probably not what you require, so here you set how many seconds one game second equals.<br />eg. 1 game second to equal 1 minute then enter 60 (60 seconds in one minute).<br />1 game second = 1 hour, enter 3600 (60 secs x 60 mins)<br /> etc.</p><hr />', false, "subMenuRow", "font-size:80%");
            declareDivContent("settingsHelp", 'set4', '<p>If I do not want to use the clock, what do I do?</p><p>A: With the switch at "Use clock", turn it to the off position.</p><hr />', false, "subMenuRow", "font-size:80%");
    }; //end switch
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
