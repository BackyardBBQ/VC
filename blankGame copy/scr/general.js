  /*
  Contents:
  graphSweitch
  login
  var initiations
  myTimer
  setItems
  startUp
  showTxt
  clearTxt
  typeTxt
  afterEnter
  moveNPCs
  getMood
  wonGame
  dispResp
  getThisRoom
  loadRequirements
  loadFinalGoal (this is the items for winning)
  checkReqs
  randomDarkObj
  randomDayMess
  randomReply
  showImg
  
  
  */

  /* NOTE: to make JS files work, make the brackets.json file include the following
     "linting.usePreferredOnly": true,
        "linting.prefer": ["JSHint"]    
    */

  function graphSwitch() {

      if (graphON == true) {

          // hide elements
          var elem = document.getElementById("imageRow");
          elem.style.display = "none";


          graphON = false;
          // change btn img and title

          var grEl = document.getElementById("btn_graphics");
          grEl.title = "Switch graphics on";
          grEl.style.backgroundImage = "url('art/screen_on.png')";
      } else {

          var elem = document.getElementById("imageRow");
          elem.style.display = "block";
          graphON = true;

          // change btn img and title
          var grEl = document.getElementById("btn_graphics");
          grEl.title = "Switch graphics off";
          grEl.style.backgroundImage = "url('art/screen_off.png')";
      };

  }

  function login() {
      var username = document.getElementById('uName').value;
      var password = document.getElementById('pwd').value;
      // time to check against xml file
      var validPwd = getXmlValue("bosses.xml", "person", "username", username, "password");

      if (validPwd == password) {
          updateVars('userName', username);
          window.location.replace("index2.html");
      } else {
          // error message
          var tri = callNumbVar('loginTries');
          tri++;
          updateVars('loginTries', tri);

          var el = document.getElementById('msgLine');
          var unm = document.getElementById('uName');

          if (tri > 1) {
              el.textContent = "Incorect details entered " + tri + " times";
          } else {
              el.textContent = "First details entered are incorrect";
          }
          unm.focus();
      }
      document.getElementById('uName').value = '';
      document.getElementById('pwd').value = '';

  }
  // Global variables
  var weightAllowance = 10;
  var invWeight = 0;
  var itemsLimit = 10;
  var invent = [];
  var cash = 100;
  var colMode = "dark"; // option to light when done
  var graphON = true;
  var moodLevel = 5; //out of 10 where 10 is happiest and 0 is raging fury. 5 is normal
  var statUse = {
      MIN: "min",
      MID: "mid",
      MAX: "max"
  };
  var statType = {
      CHARISMA: "charisma",
      STRENGTH: "strength",
      COMBAT: "combat",
      DEXTERITY: "dexterity",
      MOOD: "mood"
  };
  var pickAttempts = 0;
  var lightIsOn = false;

  // time vars - move the set up to authorvariables etc


  var mv = setInterval(mytimer, 1000);
  var timePlayed = 0;
  var gameTime = 0;
  var gameClock = new Date(gameY, gameM, gameD, gameH, gameM, 0);
  var gameDay = 0;
  document.title = thisgameName;

  function mytimer() {
      if (useClock == true) {


          gameClock.setSeconds(oneSecondEquals);

          // sun rise
          var sunriseDate = new Date(gameClock.getFullYear(), gameClock.getMonth(), gameClock.getDate(), gameClock.getHours(), gameClock.getMinutes(), 0);
          //sun set
          var sunsetDate = new Date(gameClock.getFullYear(), gameClock.getMonth(), gameClock.getDate(), gameClock.getHours(), gameClock.getMinutes(), 0);
          //set the times of sunset and sunrise
          sunriseDate.setHours(sunRiseH, sunRiseM, 0);
          sunsetDate.setHours(sunSetH, sunSetM, 0);

          //  console.log(gameClock.getHours() + ":" + gameClock.getMinutes() + " | " + sunriseDate.getHours() + ":" + sunriseDate.getMinutes());

          if (gameClock.getHours() == sunriseDate.getHours() && gameClock.getMinutes() == sunriseDate.getMinutes()) {
              showTxt(randomDayMess("sunrise"), "txtDisplay");
          };

          if (gameClock.getHours() == sunsetDate.getHours() && gameClock.getMinutes() == sunsetDate.getMinutes()) {
              showTxt(randomDayMess("sunset"), "txtDisplay");
          };
          // days 
          if (gameClock.getHours() == 0 && gameClock.getMinutes() == 0 && gameClock.getSeconds() == 0) {
              gameDay++;
          };

          var tEL = document.getElementById('theTime');
          var gh = "";
          if (gameClock.getHours() <= 9) {
              gh = "0" + gameClock.getHours();
          } else {
              gh = gameClock.getHours();
          };
          var gm = "";
          if (gameClock.getMinutes() <= 9) {
              gm = "0" + gameClock.getMinutes();
          } else {
              gm = gameClock.getMinutes();
          };
          tEL.textContent = "Day: " + gameDay + " Time: " +
              gh + ":" + gm + " hrs";

          // any more time functioms go here




      } else {
          var tEL = document.getElementById('theTime');
          tEL.style = "display:none;";

      }; // end useclock == true
  }

  function setItems() {
      var funds = cash;
      /* if (isNaN(funds)) {
           funds = parseInt(cash);
       };*/
      var fnds = funds;
      var el = document.getElementById('money');
      el.textContent = 'Funds: ' + cshSy + fnds;



  }

  function startUp() {
      // a load game function would call local storage variables and //arrays for objects etc
      // load the rooms into the array and display first room     
      //  typeTxt();
      showTxt('Loading start up stuff...', 'txtDisplay');

      // set the variables and display based upon authorVariables.js
      setUserVars();
      document.title = thisgameName;
      document.getElementById("siteTitle").innerHTML = firstCap(thisgameName);
      if (graphON == false) {
          graphON = true;
          systComm("textonly");
          var elB = document.getElementById('btn_graphics');
          elB.style.display = "none";
          elB.style.visibility = "collapse";
      };
      if (iconsOn == false) {
          var elI = document.getElementById('btn_graphics');
          elI.style.display = "none";
          elI.style.visibility = "collapse";
          var elS = document.getElementById('btn_save');
          elS.style.display = "none";
          elS.style.visibility = "collapse";
          var elL = document.getElementById('btn_load');
          elL.style.display = "none";
          elL.style.visibility = "collapse";
          var elQ = document.getElementById('btn_quit');
          elQ.style.display = "none";
          elQ.style.visibility = "collapse";
      };

      var elTab = document.getElementById('tbl');
      elTab.style.backgroundColor = pageCol;

      var elRT = document.getElementById('roomTitle');
      elRT.style.backgroundColor = titleBckgrndColor;
      elRT.style.fontFamily = titleFont;
      elRT.style.color = titleInk;
      elRT.style.fontSize = titleSize;
      elRT.style.fontWeight = titleWeight;

      var elTD = document.getElementById('txtDisplay');
      elTD.style.fontFamily = fontName;
      elTD.style.fontSize = fontSize;
      elTD.style.color = fontColor;
      elTD.style.backgroundColor = displayBckgrndColor;

      var elEx = document.getElementById('exitsDisplay');
      elEx.style.color = exitsInk;
      elEx.style.fontSize = exitsSize;
      elEx.style.backgroundColor = exitsBckgrndColor;
      elEx.style.fontFamily = exitsFont;


      // show (or not) stats at top
      var elM = document.getElementById('mood');
      if (showStats == true) {
          elM.textContent = "Mood: " + getMood(moodLevel);
      } else {
          elM.style.display = "none";
          elM.style.display = "collapse";
      };


      var elSt = document.getElementById('strngth');
      if (showStats == true) {
          elSt.textContent = "Strength: " + stat_strength + "/" + stat_maxAmnt;
      } else {
          elSt.style.display = "none";
          elSt.style.display = "collapse";
      };


      var elDx = document.getElementById('dxty');
      if (showStats == true) {
          elDx.textContent = "Dexterity: " + stat_dexterity + "/" + stat_maxAmnt;
      } else {
          elDx.style.display = "none";
          elDx.style.display = "collapse";
      };
      var elCm = document.getElementById('combat');
      if (showStats == true) {
          elCm.textContent = "Combat: " + stat_combat + "/" + stat_maxAmnt;
      } else {
          elCm.style.display = "none";
          elCm.style.display = "collapse";
      };
      var elCh = document.getElementById('charisma');
      if (showStats == true) {
          elCh.textContent = "Charisma: " + stat_charisma + "/" + stat_maxAmnt;
      } else {
          elCh.style.display = "none";
          elCh.style.display = "collapse";
      };


      setItems();
      showTxt('Loading map...', 'txtDisplay');

      storeRooms();
      showTxt('Loading world objects...', 'txtDisplay');

      storeObjects();
      showTxt('Loading characters...', 'txtDisplay');
      storeNPCs();

      storeConvewrsations();
      loadRequirements();
      loadFinalGoal();
      getThisRoom(startRoom, '');

  }

  function showTxt(theStr, elName) {

      /*  if (theStr.charAt(theStr.length - 1) == '.') {

            theStr = "";
        };*/
      // this allows for break to be added auto matically
      theStr = theStr.replace(/ br /gi, "<br />");

      var strElName = elName;
      document.getElementById(elName).innerHTML += theStr + '<br/>';

      window.scrollTo(0, document.body.scrollHeight);
      var elm = document.getElementById('txtInput');
      elm.focus();
  }

  function clearTxt(elName) {
      document.getElementById(elName).innerHTML = '';
      window.scrollTo(0, document.body.scrollHeight);
      var elm = document.getElementById('txtInput');
      elm.focus();
  }

  function typeTxt(thisTxt) {
      // this types but i can not find a way to add new line

      var txt = thisTxt;
      if (type_i < txt.length) {
          document.getElementById("txtDisplay").innerHTML += txt.charAt(type_i);
          type_i++;
          setTimeout(typeTxt, type_speed);
      }
  } // end of typeTxt
  var verbs = []; // do not move this


  function afterEnter() {
      tooDarkForObj = randomDarkObj();

      // is there an npc that canChase? Do this before any input is calculated. Not in getThisRoom because nothing would be displayed if it kills player

      var npcChase = chasePlayer();

      if (npcChase != null) {
          showTxt("<br />" + npcChase, "txtDisplay");
      };
      if (bolIsDead == false) {




          var inputTxt2 = document.getElementById('txtInput').value; // original input
          var inputTxt = inputTxt2.toLowerCase();
          var STRresponse = '';
          //nnow clear the input field
          document.getElementById('txtInput').value = '';
          // first check for keywords such as use light mode



          // is it  a direction?
          // remove the word go and synonms

          var removeMe = ['go ', 'walk ', 'walk to ', 'using ', 'using the ', 'run ', 'run to ', 'drive '];
          inputTxt = inputTxt.replace("enter", "in");
          inputTxt = inputTxt.replace("exit", "out");
          var removeCnt = removeMe.length;
          var rc = 0;

          do {
              inputTxt = inputTxt.replace(removeMe[rc], '');
              rc++;
          }
          while (rc < removeCnt);

          if (inputTxt == 'north' || inputTxt == 'south' || inputTxt == 'east' || inputTxt == 'west') {
              inputTxt = inputTxt.charAt(0);
          }

          if (inputTxt.length == 1) {
              switch (inputTxt) {
                  case "n":
                      moveTo(varRID, "n");
                      return;
                      break;
                  case "e":
                      moveTo(varRID, "e");
                      return;
                      break;
                  case "s":
                      moveTo(varRID, "s");
                      return;
                      break;
                  case "w":
                      moveTo(varRID, "w");
                      return;
                      break;
              }
          }
          // is it up or in?
          if (inputTxt.length == 2) {
              switch (inputTxt) {
                  case "up":
                      moveTo(varRID, "up");
                      return;
                      break;
                  case "in":
                      moveTo(varRID, "in");
                      return;
                      break;
              }
          }
          // is it down or out? :)
          if (inputTxt == 'down') {
              moveTo(varRID, "down");
              return;
          } else if (inputTxt == 'out') {
              moveTo(varRID, "out");
              return;
          }
          if (inputTxt.includes('in ')) {
              // loop thru rooms to see if the room name is also in the inputTxt, if it is then see if it is connected and revealed, to the currRoom
              let rmc = 1;
              var bolRF = false;
              do {
                  let rmNm = Oroom[rmc].name;


                  rmNm = rmNm.toLocaleLowerCase();

                  if (inputTxt.includes(rmNm)) {
                      if (Oroom[rmc].roomIsRevealed == 'y' && Oroom[rmc].outTo == varRID) {
                          // if the room is revealed and the out exit leads to the current room
                          bolRF = true; // stops random no response at end of function  
                          getThisRoom(rmc, moveTxt + 'into the ' + Oroom[rmc].name, varRID);

                      };
                      break;
                  };
                  rmc++;

              }
              while (rmc < Oroom.length);
              // no false return here as input could be something like "look in box"
          };
          if (inputTxt == 'i') {
              inputTxt = 'inventory';
              // dont leave the function - we want inventory picked up as a verb
          };
          // replace some other words
          Replacememnts:

              inputTxt = inputTxt.replace(/pick up /gi, 'get ');
          inputTxt = inputTxt.replace(/fetch /gi, 'get ');
          inputTxt = inputTxt.replace(/grab /gi, 'get ');
          inputTxt = inputTxt.replace(/take /gi, 'get ');
          inputTxt = inputTxt.replace(/bring /gi, 'get ');
          inputTxt = inputTxt.replace(/examine /gi, 'exam ');
          inputTxt = inputTxt.replace(/look at /gi, 'exam ');
          inputTxt = inputTxt.replace(/inspect /gi, 'exam ');

          inputTxt = inputTxt.replace(/try /gi, 'use ');
          inputTxt = inputTxt.replace(/try using /gi, 'use ');
          inputTxt = inputTxt.replace(/try using the /gi, 'use ');
          inputTxt = inputTxt.replace(/push /gi, 'use ');
          inputTxt = inputTxt.replace(/pull /gi, 'use ');
          inputTxt = inputTxt.replace(/get rid of /gi, 'drop ');
          inputTxt = inputTxt.replace(/hit /gi, 'fight ');
          inputTxt = inputTxt.replace(/punch /gi, 'fight ');
          inputTxt = inputTxt.replace(/kick /gi, 'fight ');
          inputTxt = inputTxt.replace(/scratch /gi, 'fight ');
          inputTxt = inputTxt.replace(/slap /gi, 'fight ');
          inputTxt = inputTxt.replace(/kill /gi, 'fight ');
          inputTxt = inputTxt.replace(/attack /gi, 'fight ');
          inputTxt = inputTxt.replace(/murder /gi, 'fight ');
          inputTxt = inputTxt.replace(/resuscitate /gi, 'resuss ');
          inputTxt = inputTxt.replace(/resus /gi, 'resuss ');
          inputTxt = inputTxt.replace(/mouth to mouth /gi, 'resuss');
          inputTxt = inputTxt.replace(/cpr /gi, 'resuss ');
          inputTxt = inputTxt.replace(/revive /gi, 'resuss ');
          inputTxt = inputTxt.replace(/shout /gi, 'say ');
          inputTxt = inputTxt.replace(/whisper /gi, 'say ');
          inputTxt = inputTxt.replace(/ask /gi, 'say ');
          inputTxt = inputTxt.replace(/call /gi, 'say ');
          inputTxt = inputTxt.replace(/communicate /gi, 'talk ');
          inputTxt = inputTxt.replace(/reply /gi, 'say ');
          inputTxt = inputTxt.replace(/consume /gi, 'eat ');
          inputTxt = inputTxt.replace(/munch on /gi, 'eat ');
          inputTxt = inputTxt.replace(/devour /gi, 'eat ');
          inputTxt = inputTxt.replace(/swig /gi, 'drink ');
          inputTxt = inputTxt.replace(/sip /gi, 'drink ');
          inputTxt = inputTxt.replace(/then/gi, 'and');
          inputTxt = inputTxt.replace(/build /gi, 'make ');
          inputTxt = inputTxt.replace(/mend /gi, 'fix ');
          inputTxt = inputTxt.replace(/repair /gi, 'fix ');
          inputTxt = inputTxt.replace(/destroy /gi, 'break ');
          inputTxt = inputTxt.replace(/burn /gi, 'break ');
          inputTxt = inputTxt.replace(/shut /gi, 'close ');
          inputTxt = inputTxt.replace(/undo /gi, 'open ');
          inputTxt = inputTxt.replace(/magic /gi, 'cast ');
          inputTxt = inputTxt.replace(/unlock /gi, "undo "); // stop props with lock
          inputTxt = inputTxt.replace(/ lock /gi, '');
          inputTxt = inputTxt.replace(/lock /gi, 'engage ');
          inputTxt = inputTxt.replace(/snap /gi, 'break ');
          inputTxt = inputTxt.replace(/smash /gi, 'break ');
          inputTxt = inputTxt.replace(/damage /gi, 'break ');
          inputTxt = inputTxt.replace(/put on /gi, 'wear ');
          inputTxt = inputTxt.replace(/take off /gi, 'remove ');

          //######### adverbs? ########################
          var adverbs = ['thoroughly', 'carefully', 'fast', 'gingerly', 'happily', 'sadly', 'lets', 'slowly', 'the']; // add more here
          var advCnt = adverbs.length;
          // now remove them all
          var ad = 0;
          do {
              if (inputTxt.includes(' ' + adverbs[ad] + ' ')) {
                  inputTxt = inputTxt.replace(adverbs[ad], '');
              };

              ad++;
          }
          while (ad < advCnt);
          //########### end of adverb removal ##############

          inventory:
              // is it inventory?



              // then split the sentence into individual words ###################
              var individWords = inputTxt.split(' '); // this makes an array of each remaining indiviual word in input
          //#################################################################
          verbs:

              verbs = ['look', 'exam', 'get', 'use', 'say', 'drop', 'eat', 'drink', 'fight', 'resuss', 'bring', 'make', 'buy', 'open', 'close', 'dance', 'enter', 'exit', 'fix', 'give', 'help', 'jump', 'leave', 'listen', 'move', 'nod', 'open', 'push', 'pull', 'read', 'send', 'sit', 'smile', 'buy', 'sell', 'stand', 'throw', 'turn', 'wait', 'write', 'inventory', 'switch', 'combine', 'engage', 'undo', 'cast', 'pick', 'break', 'wear', 'remove', 'talk']; // add to these as you want
          var verbCnt = verbs.length;

          var vb = 0;
          var theVerb = []; // keeps the verbs in an array

          var theVerbCnt = 0;
          individWords.forEach(function (words) {
              // is the word a verb? if it is put the word in theVerb var
              vb = 0; // set to 0 for each words
              do {

                  if (words == verbs[vb]) {
                      theVerb[theVerbCnt] = verbs[vb];
                      theVerbCnt++;
                      break;

                  };

                  vb++;
              }
              while (vb < verbCnt);

          });

          nouns:
              // no nouns array as they are objects or people
              // check if object or person wanted here
              // call function in commands.js relating to first verb and first noun. check in this function if possible to interact and how and with what result.

              // var obsCnt = Oobject.length;
              var obsCnt = Oobject.length;
          console.log(obsCnt);
          var peepCnt = Opeeps.length;
          var ob = 0;
          var pe = 0;
          var theOb = [];
          var theObCnt = 0;

          individWords.forEach(function (words) {
              ob = 0;

              do {

                  if (words == Oobject[ob].name) {

                      theOb[theObCnt] = Oobject[ob].name;

                      theObCnt++;
                      break;
                  }



                  ob++;

              }
              while (ob < obsCnt);

              // is the noun a person?
              if (theOb.length == 0) {
                  ob = 0;
                  do {
                      if (words == Opeeps[ob].call.toLowerCase() || words == Opeeps[ob].name.toLowerCase()) {

                          theOb[theObCnt] = Opeeps[ob].call; // add the peep call name to objects at index theObCnt

                          theObCnt++;

                          break;
                      };
                      ob++
                  }
                  while (ob < peepCnt);
              };

              if (theOb.length < theVerb.length && words == 'it') {
                  theOb[theObCnt] = theOb[theObCnt - 1];
                  theObCnt++;
              };
              if (words == 'all') {
                  let ob = 0;
                  // have to remove last verb as its going to be added again
                  let firstVb = theVerb.pop(); // sets firstvb to the last item in the array and then removes it from array

                  Oobject.forEach(function () {
                      if (Oobject[ob].isHidden == 'n' && (parseFloat(Oobject[ob].currentRoom) == varRID || Oobject[ob].isCarried == 'y')) {



                          theOb.push(Oobject[ob].name);


                          theVerb.push(firstVb);



                      };
                      ob++;
                  });
                  theObCnt = theOb.length;
                  theVerbCnt = theVerb.length;
              };


          });
          //see  paired them up
          var paircnt = 0;

          do {
              if (theVerbCnt == theObCnt) {
                  // same number iof verbs and nouns / objects


                  paircnt++;
                  break;
              } else {
                  // diff number of verbs and nouns
                  // if verbs is more than objects then add the last obj to any extra obj spaces
                  if (theOb.length < theVerb.length) {
                      theOb[theObCnt] = theOb[theObCnt - 1];

                      theObCnt++;
                  } else if (theOb.length > theVerb.length) {
                      // delete extra objects to be safe
                      let ll = theOb.length - theVerb.length;
                      for (x = ll; x < theOb.length; x++) {
                          theOb[x].remove;
                      };
                  };
              };
              break;
          }

          while (paircnt < theVerb.length);

          // ############# call the verb and noun functions ##########
          let vc = 0;
          theVerb.forEach(function (vrb) {
              // call functions here
              if (vc == 0) {
                  STRresponse = doEntry(theVerb[vc], theOb[vc], inputTxt);
              } else {
                  STRresponse += '. ' + doEntry(theVerb[vc], theOb[vc], inputTxt);
              };

              vc++;
          });

          // ############ end of function call ##############


          commands:
              var comms = ['save', 'load', 'quit', 'darkmode', 'lightmode', 'list', 'textonly', 'graphicson', 'stats', 'help'];
          var comCnt = comms.length;
          var cm = 0;
          var theCommand = '';
          individWords.forEach(function (words) {
              cm = 0;
              do {
                  if (words == comms[cm]) {
                      theCommand = comms[cm];
                      break;
                  };
                  cm++;
              }
              while (cm < comCnt);
          });
          if (theCommand != '') {
              STRresponse = systComm(theCommand);
              dispResp(STRresponse, inputTxt2);
              return;
          };
          // then work out the verbs and nouns and commands
          // and then send to relative function getting response in STRresponse var

          var numbWords = individWords.length;



          bespoke:
              // ****** at end of this function - Bespoke to individual game code *******




              // *********** check requirements ***********

              if (checkReqs(varRID) == true) {
                  wonGame();

              };
          moveNPCabout:

              if (allowWonder == "y") {

                  let newMsg = moveNPCs("false");
                  if (newMsg != null) {
                      STRresponse += "<br />" + newMsg;
                  };
              };
          response:
              // ######## response #########


              if (STRresponse == '' && bolRF == false) {
                  STRresponse = randomReply();
              };
          // display response and what you said!
          dispResp(STRresponse, inputTxt2);

          displayStats:
              var el = document.getElementById('inv');
          el.textContent = "Carrying: " + invent.length + "/" + itemsLimit;

          // also at end of StartUp()
          // show (or not) stats at top
          var elM = document.getElementById('mood');
          if (showStats == true) {
              elM.textContent = "Mood: " + getMood(moodLevel);
          } else {
              elM.style.display = "none";
              elM.style.display = "collapse";
          };


          var elSt = document.getElementById('strngth');
          if (showStats == true) {
              elSt.textContent = "Strength: " + stat_strength + "/" + stat_maxAmnt;
          } else {
              elSt.style.display = "none";
              elSt.style.display = "collapse";
          };


          var elDx = document.getElementById('dxty');
          if (showStats == true) {
              elDx.textContent = "Dexterity: " + stat_dexterity + "/" + stat_maxAmnt;
          } else {
              elDx.style.display = "none";
              elDx.style.display = "collapse";
          };
          var elCm = document.getElementById('combat');
          if (showStats == true) {
              elCm.textContent = "Combat: " + stat_combat + "/" + stat_maxAmnt;
          } else {
              elCm.style.display = "none";
              elCm.style.display = "collapse";
          };
          var elCh = document.getElementById('charisma');
          if (showStats == true) {
              elCh.textContent = "Charisma: " + stat_charisma + "/" + stat_maxAmnt;
          } else {
              elCh.style.display = "none";
              elCh.style.display = "collapse";
          };
      };
      var objDiv = document.getElementById("txtDisplay");
      objDiv.scrollTop = objDiv.scrollHeight;
  }

  function moveNPCs(plyrMoved, oldRoom = 0) {
      switch (plyrMoved) {
          case "true":
              // triggered when player moves rooms
              var npcMoved = false;
              var msgRtrn = null;
              for (x = 0; x < Opeeps.length; x++) { // loop thru all npcs



                  if (Opeeps[x].wondersYN == "n" && Opeeps[x].isFollowingYN == "y" && Opeeps[x].isHiddenYN == "n" && Opeeps[x].currentRoom == oldRoom) {
                      // player is following and not roaming and is visible and is here

                      if (oldRoom != 0) {
                          Opeeps[x].currentRoom = varRID;
                          let movetxt = Opeeps[x].followTxt;
                          // check npc doesnt say anything as he follow you


                          let npcCon = "";
                          npcCon = npcConversation(Opeeps[x].id, varRID);

                          if (npcCon != "") {
                              movetxt += "<br />" + npcCon;
                          };
                          showTxt("<br />" + movetxt, 'txtDisplay');
                          break;
                      };

                  }; // end IF
              }; // end for

              break;

          case "false":
              // only here if not triggered by player moving
              var npcMoved = false;
              var msgRtrn = null;
              for (x = 0; x < Opeeps.length; x++) {

                  if (Opeeps[x].wondersYN == "y" && Opeeps[x].isFollowingYN == "n" && Opeeps[x].isHiddenYN == "n") // npc can move about, is not following and is not hidden
                  {

                      // get npcs room. what exits are visible. roll dice to select which exit and then roll dice to see if they go through it (1 in wonderChance)
                      var npRm = Opeeps[x].currentRoom;
                      let cc = 10 / wanderChance;

                      if (rollDice(wanderChance, cc) == true) {
                          // now decide which exit in room

                          for (y = 7; y <= 14; y++) //7 to 14 are the exits to
                          {
                              let exName = '';
                              switch (y) {
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
                              };
                              if (Oroom[npRm][exName] != 0 && npcMoved == false) {
                                  let newR = Oroom[npRm][exName];
                                  if (Oroom[newR].roomIsRevealed == "y") // ensure new room is revealed
                                  {
                                      if (rollDice(2, 1) == true) {
                                          if (Opeeps[x].currentRoom == varRID) {
                                              msgRtrn = Opeeps[x].name + " " + wanderMsgPt1 + " " + Oroom[newR].name + " " + wanderMsgPt2;
                                          };
                                          Opeeps[x].currentRoom = parseFloat(Oroom[npRm][exName]);

                                          npcMoved = true;
                                          break;
                                      };
                                  }; // end is room revealed

                              };
                          };

                      };
                      return msgRtrn;
                  };
              }; // end for
              break;
      }

  }

  function getMood(mlvl) {
      var moodTxt = "Normal";
      switch (mlvl) {
          case 1:
              moodTxt = "Raging";
              break;
          case 2:
              moodTxt = "Very angry";
              break;
          case 3:
              moodTxt = "Angry";
              break;
          case 4:
              moodTxt = "Cross";
              break;
          case 5:
              moodTxt = "Normal";
              break;
          case 6:
              moodTxt = "Ok";
              break;
          case 7:
              moodTxt = "Happy";
              break;
          case 8:
              moodTxt = "Excited";
              break;
          case 9:
              moodTxt = "Thrilled";
              break;
          case 10:
              moodTxt = "Overjoyed";
              break;


      };
      return moodTxt;
  }

  function wonGame() {
      STRresponse = gameWonTxt;
      dispResp(STRresponse, 'Everything you needed to say');
      var elm = document.getElementById('txtInput');
      elm.parentNode.removeChild(elm);
      var elm2 = document.getElementById('btn_enter');
      elm2.parentNode.removeChild(elm2);
  }

  function dispResp(resp, origTxt) {
      var inpTxt = firstCap(origTxt);
      if (resp.charAt(resp.length) != '.' && resp != '') {

          resp += '.';
      };
      showTxt(youSaidTxt + ' ' + inpTxt + '.<br/>' + resp, 'txtDisplay');
      // scroll to bottom of text
      var scroll = document.getElementById('txtDisplay');
      scroll.scrollTop = scroll.scrollHeight;
      scroll.animate({
          scrollTop: scroll.scrollHeight
      });
      // end of scroll
      var elm = document.getElementById('txtInput');
      elm.focus();
      window.scrollTo(0, document.body.scrollHeight);
  }




  function getThisRoom(roomId, preTxt, oldRoom) {
      clearTxt('roomTitle');
      clearTxt('txtDisplay');
      clearTxt('exitsDisplay');
      varRID = parseFloat(roomId); //<---- most important---------

      //title

      console.log("room id: " + varRID + " " + Oroom[1].name);


      if (Oroom[varRID].roomIsRevealed == 'n') {
          getThisRoom(oldRoom, firstCap(Oroom[varRID].blockedTxt) + ' is preventing you going that way', oldRoom);
      } else {
          updateVars('strTxt', Oroom[varRID].name); // not used to display anything
          showTxt(Oroom[varRID].name, 'roomTitle');
          if (Oroom[varRID].isLitYN == 'y' || (Oroom[varRID].isLitYN == 'n' && lightIsOn == true)) {
              showTxt('There are exits: ' + Oroom[varRID].exits, 'exitsDisplay');
          } else {
              showTxt(tooDarkForExits, 'exitsDisplay');
          };






          /* instead of sending Oroom here make a string containing Oroom[varRID][2] and any other objects or points of interest*/
          if (preTxt != '') {

              if (Oroom[varRID].alreadyVisitedYN == 'n' && Oroom[varRID].isLitYN == 'y') {

                  showTxt(preTxt + '.<br/>' + firstCap(Oroom[varRID].description), 'txtDisplay');
                  Oroom[varRID].alreadyVisitedYN = 'y';
                  if (oldRoom != roomId) {
                      moveNPCs("true", oldRoom);
                  };


              } else if (Oroom[varRID].alreadyVisitedYN == 'y' && Oroom[varRID].isLitYN == 'y') {
                  showTxt(preTxt + '.<br/>' + firstCap(Oroom[varRID].shortDescription), 'txtDisplay');
                  Oroom[varRID].alreadyVisitedYN = 'y';
                  if (oldRoom != roomId) {
                      moveNPCs("true", oldRoom);
                  };
              } else if (Oroom[varRID].isLitYN == 'n' && lightIsOn == false) {
                  showTxt(preTxt + '.<br/>' + firstCap(Oroom[varRID].darkDescription), 'txtDisplay');
                  if (oldRoom != roomId) {
                      moveNPCs("true", oldRoom);
                  };
              } else if (Oroom[varRID].isLitYN == 'n' && lightIsOn == true) {
                  showTxt(preTxt + '.<br/>' + firstCap(Oroom[varRID].description), 'txtDisplay');
                  Oroom[varRID].alreadyVisitedYN = 'y';
                  if (oldRoom != roomId) {
                      moveNPCs("true", oldRoom);
                  };
              };

          } else {
              if (Oroom[varRID].alreadyVisitedYN == 'n' && Oroom[varRID].isLitYN == 'y') {

                  showTxt(firstCap(Oroom[varRID].description), 'txtDisplay');
                  Oroom[varRID].alreadyVisitedYN = 'y';
                  if (oldRoom != roomId) {
                      moveNPCs("true", oldRoom);
                  };

              } else if (Oroom[varRID].alreadyVisitedYN == 'y' && Oroom[varRID].isLitYN == 'y') {
                  showTxt(firstCap(Oroom[varRID].shortDescription), 'txtDisplay');
                  Oroom[varRID].alreadyVisitedYN = 'y';
                  if (oldRoom != roomId) {
                      moveNPCs("true", oldRoom);
                  };
              } else if (Oroom[varRID].isLitYN == 'n' && lightIsOn == false) {
                  showTxt(firstCap(Oroom[varRID].darkDescription), 'txtDisplay');
                  if (oldRoom != roomId) {
                      moveNPCs("true", oldRoom);
                  };
              } else if (Oroom[varRID].isLitYN == 'n' && lightIsOn == true) {
                  showTxt(firstCap(Oroom[varRID].description), 'txtDisplay');
                  Oroom[varRID].alreadyVisitedYN = 'y';
                  if (oldRoom != roomId) {
                      moveNPCs("true", oldRoom);
                  };
              };

          };

          if (Oroom[varRID].canBeDarkYN != 'y' || (Oroom[varRID].canBeDarkYN == 'y' && lightIsOn == 'y')) { // its not dark

              showImg("room", varRID);
          } else {
              elm = document.getElementById("imageRow");
              elm.style.backgroundImage = "none";

          };
          // see if there is an object or person here and then inform user *********

          //object-----------------------------------------
          /* as the objects and people are checked in every room, we must update the arrays as well as the object */

          var objCnt = Oobject.length;
          var objsHere = [];
          if (lightIsOn == true || Oroom[varRID].isLitYN == "y") // light on or room is lit
          {
              var lastObj = undefined;
              var oi = 0;
              do {
                  if (Oobject[oi].currentRoom == varRID && Oobject[oi].isHidden == 'n') //obj is here and not hidden
                  {
                      lastObj = oi;
                      objsHere.push(' ' + firstCap(Oobject[oi].prefix) + ' ' + Oobject[oi].name);
                  }; // end IF obj here and not hidden
                  oi++;
              }
              while (oi < objCnt);


          } else {
              showTxt(tooDarkForObj, 'txtDisplay');
          }; // end of light on or room is lit



          if (objsHere.length > 0) {
              showTxt(youCanSeeTxt + objsHere.toString(), 'txtDisplay');
              if (lastObj != undefined) {

                  showImg("object", lastObj);

              };
          };
          // person-----------------------------------------
          var peepCnt = Opeeps.length;
          console.log("peepcnt = " + peepCnt);
          var peepHere = [];
          if (peepCnt > 0) {
              if (Oroom[varRID].isLitYN == 'y' || lightIsOn == true) //room lit or light is on
              {
                  var pi = 0;
                  var lastPeep = undefined;
                  do {
                      if (Opeeps[pi].currentRoom == varRID) { // 33 = current room

                          lastPeep = pi;
                          peepHere.push(' ' + firstCap(Opeeps[pi].stationaryTxt) + ' is ' + Opeeps[pi].name);
                          // person name + person stationary text
                      };
                      pi++;
                  }
                  while (pi < peepCnt);
              } else {
                  showTxt("<br/>" + tooDarkForPeep, 'txtDisplay');
              }; // end of light is on or room is lit  
          };





          if (peepHere.length > 0) {
              var peepStrs = "";
              var pl = 0;
              do {
                  peepStrs += peepHere[pl].toString() + ".<br/>";
                  pl++;
              }
              while (pl < peepHere.length);
              //showTxt("<br/>" + peepHere.toString(), 'txtDisplay');
              showTxt("<br/>" + peepStrs, 'txtDisplay');
              if (lastPeep != undefined) {

                  showImg("peep", lastPeep);
              };

          };
      }; // end of entrance not prevented






      // check if room type has specific elements
      if (Oroom[varRID].roomType == "shop") {
          var shopStock = stockList();
          let stCnt = shopStock.length;

          var StockMess = "The shop is selling:";
          for (z = 0; z < stCnt; z++) {
              StockMess += "<br />" + shopStock[z];
          };
          showTxt("<br />" + StockMess, 'txtDisplay');
      };
      // put else statements for other types of buildings


      // ************* check for events ***********

      var resp = checkEvents(varRID);
      if (resp != '') {
          showTxt("<br />" + resp, 'txtDisplay');
      };
      // *********** check requirements ***********

      if (checkReqs(varRID) == true) {
          // check to see if game won
          wonGame();

      };


  } // end of getThisRoom function

  // the objects setup------------------------------------
  // now in v2-funct.js



  function loadRequirements() {
      // these are the things that are required for objects, rooms, people or 
      // completions. Check this array before reveals or completions
      var cntReq = countNodes("requirements.xml", "requirement");
      arrReqs = Create2DArray(cntReq);
      if (cntReq > 0) {
          var i = 0;
          do {
              // add the requirements to the array
              arrReqs[i][1] = getXmlValue('requirements.xml', 'requirement', 'id', i, 'id');
              arrReqs[i][2] = getXmlValue('requirements.xml', 'requirement', 'id', i, 'isComplete');
              arrReqs[i][3] = getXmlValue('requirements.xml', 'requirement', 'id', i, 'allowsAccessType');
              arrReqs[i][4] = getXmlValue('requirements.xml', 'requirement', 'id', i, 'allowsAccessToID');
              arrReqs[i][5] = getXmlValue('requirements.xml', 'requirement', 'id', i, 'reqObj1');
              arrReqs[i][6] = getXmlValue('requirements.xml', 'requirement', 'id', i, 'reqObj2');
              arrReqs[i][7] = getXmlValue('requirements.xml', 'requirement', 'id', i, 'reqObj3');
              arrReqs[i][8] = getXmlValue('requirements.xml', 'requirement', 'id', i, 'reqObj4');
              arrReqs[i][9] = getXmlValue('requirements.xml', 'requirement', 'id', i, 'reqObj5');
              arrReqs[i][10] = getXmlValue('requirements.xml', 'requirement', 'id', i, 'reqObj1On');
              arrReqs[i][11] = getXmlValue('requirements.xml', 'requirement', 'id', i, 'reqObj2On');
              arrReqs[i][12] = getXmlValue('requirements.xml', 'requirement', 'id', i, 'reqObj3On');
              arrReqs[i][13] = getXmlValue('requirements.xml', 'requirement', 'id', i, 'reqObj4On');
              arrReqs[i][14] = getXmlValue('requirements.xml', 'requirement', 'id', i, 'reqObj5On');
              arrReqs[i][15] = getXmlValue('requirements.xml', 'requirement', 'id', i, 'reqObj1Worn');
              arrReqs[i][16] = getXmlValue('requirements.xml', 'requirement', 'id', i, 'reqObj2Worn');
              arrReqs[i][17] = getXmlValue('requirements.xml', 'requirement', 'id', i, 'reqObj3Worn');
              arrReqs[i][18] = getXmlValue('requirements.xml', 'requirement', 'id', i, 'reqObj4Worn');
              arrReqs[i][19] = getXmlValue('requirements.xml', 'requirement', 'id', i, 'reqObj5Worn');
              arrReqs[i][20] = getXmlValue('requirements.xml', 'requirement', 'id', i, 'convPoint1');
              arrReqs[i][21] = getXmlValue('requirements.xml', 'requirement', 'id', i, 'convPoint2');
              arrReqs[i][22] = getXmlValue('requirements.xml', 'requirement', 'id', i, 'convPoint3');
              arrReqs[i][23] = getXmlValue('requirements.xml', 'requirement', 'id', i, 'convPoint4');
              arrReqs[i][24] = getXmlValue('requirements.xml', 'requirement', 'id', i, 'convPoint5');
              arrReqs[i][25] = getXmlValue('requirements.xml', 'requirement', 'id', i, 'personMet1');
              arrReqs[i][26] = getXmlValue('requirements.xml', 'requirement', 'id', i, 'personMet2');
              arrReqs[i][27] = getXmlValue('requirements.xml', 'requirement', 'id', i, 'personMet3');
              arrReqs[i][28] = getXmlValue('requirements.xml', 'requirement', 'id', i, 'personMet4');
              arrReqs[i][29] = getXmlValue('requirements.xml', 'requirement', 'id', i, 'personMet5');
              arrReqs[i][30] = getXmlValue('requirements.xml', 'requirement', 'id', i, 'reqPers1Alive');
              arrReqs[i][31] = getXmlValue('requirements.xml', 'requirement', 'id', i, 'reqPers2Alive');
              arrReqs[i][32] = getXmlValue('requirements.xml', 'requirement', 'id', i, 'reqPers3Alive');
              arrReqs[i][33] = getXmlValue('requirements.xml', 'requirement', 'id', i, 'reqPers4Alive');
              arrReqs[i][34] = getXmlValue('requirements.xml', 'requirement', 'id', i, 'reqPers5Alive');
              arrReqs[i][35] = getXmlValue('requirements.xml', 'requirement', 'id', i, 'reqPers1Dead');
              arrReqs[i][36] = getXmlValue('requirements.xml', 'requirement', 'id', i, 'reqPers2Dead');
              arrReqs[i][37] = getXmlValue('requirements.xml', 'requirement', 'id', i, 'reqPers3Dead');
              arrReqs[i][38] = getXmlValue('requirements.xml', 'requirement', 'id', i, 'reqPers4Dead');
              arrReqs[i][39] = getXmlValue('requirements.xml', 'requirement', 'id', i, 'reqPers5Dead');

              i++;
          }
          while (i < cntReq);
      };
  }
  var arrGoal = [];

  function loadFinalGoal() {

      arrGoal[1] = getXmlValue('win.xml', 'goal', 'id', 1, 'id');
      arrGoal[2] = getXmlValue('win.xml', 'goal', 'id', 1, 'roomID');
      arrGoal[3] = getXmlValue('win.xml', 'goal', 'id', 1, 'objHeld');
      arrGoal[4] = getXmlValue('win.xml', 'goal', 'id', 1, 'objRevealed');
      arrGoal[5] = getXmlValue('win.xml', 'goal', 'id', 1, 'objBroken');
      arrGoal[6] = getXmlValue('win.xml', 'goal', 'id', 1, 'objEaten');
      arrGoal[7] = getXmlValue('win.xml', 'goal', 'id', 1, 'cashReq');
      arrGoal[8] = getXmlValue('win.xml', 'goal', 'id', 1, 'personAlive');
      arrGoal[9] = getXmlValue('win.xml', 'goal', 'id', 1, 'personDead');
      arrGoal[10] = getXmlValue('win.xml', 'goal', 'id', 1, 'personRevealed');
      arrGoal[11] = getXmlValue('win.xml', 'goal', 'id', 1, 'conversationIDneeded');
      arrGoal[12] = getXmlValue('win.xml', 'goal', 'id', 1, 'convLineReached');
  }

  function checkReqs(roomId) {
      /* from AfterEnter check to see if any / all of the requirements have been met using the roomId variable and the people, object etc arrays */
      // look at the Goals objects - finalAct checks for end of game requirement

      /* single xml file for final goal which should be checked befoer all else */
      var bolGameWon = false;
      var fulfilled = 0;
      var needCompleted = 0;

      if (arrGoal[2] != 'xx') { // right room
          needCompleted++;

          if (arrGoal[2] == varRID) {
              bolGameWon = true;
              fulfilled++;
          } else {
              bolGameWon = false;
          };
      };
      if (arrGoal[3] != 'xx') { // obj held
          needCompleted++;
          let oid = parseFloat(arrGoal[3]);
          if (Oobject[oid].isCarried == 'y') {
              bolGameWon = true;
              fulfilled++;
          } else {
              bolGameWon = false;
          };
      };
      if (arrGoal[4] != 'xx') { // obj revealed
          needCompleted++;
          let oid = parseFloat(arrGoal[4]);
          if (Oobject[oid].isHidden == 'n') {
              bolGameWon = true;
              fulfilled++;
          } else {
              bolGameWon = false;
          };
      }; //end obj revealed
      if (arrGoal[5] != 'xx') { //obj broken
          needCompleted++;
          let oid = parseFloat(arrGoal[5]);
          if (Oobject[oid].isBroken == 'y') {
              bolGameWon = true;
              fulfilled++;
          } else {
              bolGameWon = false;
          };
      }; //end obj broken
      if (arrGoal[6] != 'xx') { //eaten
          needCompleted++;
          let oid = parseFloat(arrGoal[6]);
          if (Oobject[oid].isEaten == 'y') { //eaten
              bolGameWon = true;
              fulfilled++;
          } else {
              bolGameWon = false;
          };
      }; //end eaten
      if (arrGoal[7] != 'xx') { //cash req
          needCompleted++;
          let cshreq = parseFloat(arrGoal[7]).toFixed(2);
          if (cash >= cshreq) { // more cash than req
              bolGameWon = true;
              fulfilled++;
          } else {
              bolGameWon = false;
          };
      }; //end cash
      if (arrGoal[8] != 'xx') {
          needCompleted++;
          let pid = parseFloat(arrGoal[8]);
          if (Opeeps[pid].isDeadYN != 'y') { // not dead
              bolGameWon = true;
              fulfilled++;
          } else {
              bolGameWon = false;
          };

      }; // end person alive
      if (arrGoal[9] != 'xx') {
          needCompleted++;
          let pid = parseFloat(arrGoal[9]);
          if (Opeeps[pid].isDeadYN == 'y') { // is dead
              bolGameWon = true;
              fulfilled++;
          } else {
              bolGameWon = false;
          };
      }; // end person dead
      if (arrGoal[10] != 'xx') {
          needCompleted++;
          let pid = parseFloat(arrGoal[10]);
          if (Opeeps[pid].isHiddenYN != 'y') { // not hidden
              bolGameWon = true;
              fulfilled++;
          } else {
              bolGameWon = false;
          };
      }; //end person revealed
      if (arrGoal[11] != 'xx') { // conversation id\
          needCompleted++;
          let cid = parseFloat(arrGoal[11]);
          let convPt = parseFloat(arrGoal[12]);
          convPt -= 8;
          let goalProp = 'line' + convPt;
          console.log("goal: " + goalProp);
          if (Oconv[cid][goalProp] == 'x') { // conv polint reached
              bolGameWon = true;
              fulfilled++;
          } else {
              bolGameWon = false;
          };
      }; //end conv reached

      if (bolGameWon == true && needCompleted == fulfilled) {
          return true;
      } else {
          return false;
      };


  }
  randomStrings:

      function randomDarkObj() {
          var strReply = "";
          var dCnt = tooDarkForObjArr.length;

          var xx = Math.random();
          var x = xx * dCnt;

          for (z = 0; z <= dCnt; z++) {
              if (x < z) {

                  strReply = tooDarkForObjArr[z - 1];
                  break;
              };
          };

          return strReply;
      }

  function randomDayMess(sunType) {
      var strReply = "";

      switch (sunType) {
          case "sunrise":
              var mCnt = sunRiseMess.length;
              var xx = Math.random();
              var y = xx * mCnt;
              var z = 0;

              do {
                  if (y < z) {
                      strReply = sunRiseMess[z - 1];
                      break;
                  }
                  z++
              }
              while (z <= mCnt);
              break;

          case "sunset":
              var mCnt = sunSetMess.length;
              var xx = Math.random();
              var y = xx * mCnt;
              var z = 0;

              do {
                  if (y < z) {
                      strReply = sunSetMess[z - 1];
                      break;
                  }
                  z++
              }
              while (z <= mCnt);
              break;

      };
      return strReply;
  }

  function randomReply() {
      var strReply = "Really?"
      var xx = Math.random();
      var x = xx * 10;
      if (x < 1) {
          strReply = rndmReplies[0];
      } else if (x < 2) {
          strReply = rndmReplies[1];
      } else if (x < 3) {
          strReply = rndmReplies[2];
      } else if (x < 4) {
          strReply = rndmReplies[3];
      } else if (x < 5) {
          strReply = rndmReplies[4];
      } else if (x < 6) {
          strReply = rndmReplies[5];
      } else if (x < 7) {
          strReply = rndmReplies[6];
      } else if (x < 8) {
          strReply = rndmReplies[7];
      } else if (x < 9) {
          strReply = rndmReplies[8];
      } else if (x < 10) {
          strReply = rndmReplies[9];
      } else {
          strReply = "Try something else";
      };

      return strReply;
  };

  function showImg(strT, typeID) {
      // imgType = object/room/person
      // typeID = array index number
      var location = window.location.pathname;
      var directoryPath = location.substring(0, location.lastIndexOf("/") + 1);
      switch (strT) {
          case "object":
              if (Oobject[typeID].imgRef != "x" && graphON == true) {

                  if (Oobject[typeID].imageRef == null) {
                      elm = document.getElementById("smallPic2");
                      elm.style.backgroundImage = "none";
                      elm.style.visibility = "collapse";
                      elm.style.display = "none";
                  } else {
                      elm = document.getElementById("smallPic2");
                      elm.style.backgroundImage = "url('" + directoryPath + "imgs/" + Oobject[typeID].imgRef + "')";
                      elm.style.visibility = "visible";
                      elm.style.display = "block";
                  };

              } // end not "x"
              else {

                  elm = document.getElementById("smallPic2");
                  elm.style.backgroundImage = "none";
                  elm.style.visibility = "hidden";


              };
              break;

          case "room":
              if (Oroom[typeID].imgRef != "x" && graphON == true) {
                  elm = document.getElementById("imageRow");
                  elm.style.backgroundImage = "url('" + directoryPath + "imgs/" + Oroom[typeID].imgRef + "')";
              } else {
                  elm = document.getElementById("imageRow");
                  elm.style.backgroundImage = "none";
              };
              break;

          case "peep":
              if (Opeeps[typeID].image != "x" && graphON == true) {
                  if (Opeeps[typeID].image == null) {
                      elm = document.getElementById("smallPic1");
                      elm.style.backgroundImage = "none";
                      elm.style.visibility = "hidden";
                  } else {
                      elm = document.getElementById("smallPic1");
                      elm.style.backgroundImage = "url('" + directoryPath + "imgs/" + Opeeps[typeID].image + "')";
                      elm.style.visibility = "visible";
                  };

              } // end not "x"
              else {
                  elm = document.getElementById("smallPic1");
                  elm.style.backgroundImage = "none";
                  elm.style.visibility = "hidden";
              };
      }
  };
