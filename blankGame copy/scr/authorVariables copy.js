// game author can set global variables and program specific variables here
// all the definitions are in varDefinitions.js

settings:
    // now load them into the game. Change the values HERE only
    function setUserVars() {
        // displays
        pageCol = "black"; // colour of background

        //----- text display area where room description is shown ----
        fontName = "Arial";
        fontSize = "14px";
        fontColor = "#ffffff";
        displayBckgrndColor = "#000000";
        // ----- room title bar ------
        titleInk = "#ffffff";
        titleSize = "18px";
        titleBckgrndColor = "darkgreen";
        titleFont = "Arial";
        titleWeight = "normal";
        // ----- exits display area -----
        exitsInk = "yellow";
        exitsSize = "16px";
        exitsBckgrndColor = "darkslategreen";
        exitsFont = "Arial";
        // stat starting levels
        stat_charisma = 1;
        stat_combat = 5;
        stat_dexterity = 1;
        stat_strength = 3;
        // stat altering amounts
        stat_smallAmnt = 1;
        stat_medAmnt = 2;
        stat_lrgAmnt = 3;
        stat_maxAmnt = 10;
        stat_minAmnt = 0;

        iconsOn = true; //<--- the graphics, save, load, quit icons
        showStats = true; //<---- the stats at top of screen
        //game variables
        max_pickFails = 3;
        weightAllowance = 10;
        invWeight = 0;
        itemsLimit = 10;
        invent = [];
        cash = 100;
        colMode = "dark";
        graphON = true;
        moodLevel = 5;
        startRoom = 1;
        cshSy = "$";
        buySell_variant = 2; // the amount ply loses when charisma fails in trade
        // text responses
        //what is said when you move to a new room...
        moveTxt = "You stroll "; // dont forget the space
        //what is said if movement in a certain direction is not possible
        cantGo = "If there is no exit that way, you can't go ";
        //text displaying the system type commands that do not enter into game
        listAlsoTxt = "Also: textonly (switch off graphics), graphicson (switch graphics on), lightmode (change colours to light background), darkmode (colours to dark background), quit, save, load, stats";
        //what is said at beginning of inventory
        carryingTxt = "You are carrying:";
        //whe you look at something and something else is revealed; the text for that
        newObjVis = "becomes visible after you examine the"; //format: "NEWOBJ newObjVis OBJ_EXAMINED"
        //when player tries to interact with an object that is not in the room or carried
        notHere = "There is nothing anything like that here";
        //text when there is no room in players inventory to pick something up
        noCapacity = "You do not have capacity to pick "; // word "up" is added to end of the sentence after the object name
        //when player tries to pick something up that it cannot get
        cantGet = "You can not pick "; // word "up" added to end of sentence
        //an attempt to get an object fails because the object is not recognised
        getWhat = "I have no idea what you want me to get";
        //text after player manually looks at room 
        lookAgain = "Always good to take a second butchers";
        //when tqo objects are combined
        combineTxt = "are pushed and pulled, waggled about and forced together until they combine, to form"; // OBJs placed at beginning and end of text
        //when an object is destroyed
        destroytxt = "is damaged beyond repair in the process"; //OBJ placed at beginning of sentence
        //when an object is dropped from inventory (2 options)
        objDrop = "is dropped to the floor"; // OBJ at beginning
        dropTxt = "You drop the"; //OBJ at end. Universal drop
        //when playewr cannot drop an object
        cantDrop = "You can not drop that"; // universal no drop
        //when an object is repaired
        mendTxt = "has been repaired, using the"; // OBJ at begin & end
        //when an object cannot be repaired
        noMend = "cannot be repaired at the moment"; //OBJ at begin
        //when player lights an objects
        litThe = "You have lit the"; // OBJ at end
        //when player extinguishes an object when they try to light it
        unlitThe = "was already lit, it has now been extinguished"; // words "As the" and OBJ are placed at begin
        //when object extinguished correctly
        extingThe = "You have extinguished the"; //OBJ at end
        //when player tries to use an object they cannot
        cantUse = "You cannot use the"; // OBJ at end
        //word(s) to replace the word AGAIN in responses
        againTxt = "again"; // used to replace the word "again", if you want to
        //when player tries to hide an object that cannot be hidden (2 parts, before and after the object name)
        cantHide = "You cannot hide the"; // OBJ at end. Universal cant hide
        cantHidePT2 = "here. Try finding something to hide it behind, under or in"; // used when adding extra to cant hide sentence. OBJ goes between cantHide and cantHidePT2
        //when object is hidden
        isHid = "is now hidden"; //OBJ at begin
        //when player uses an object
        useTxt = "You use the";
        //when an attempt is made to unlock something
        unlockTxt = "to unlock the";
        //when attempt made to lock something
        lockTxt = "to lock the";
        //when a lock is picked
        pickLockTxt = "Pulling two thin bits of metal from no-where, you carfeully pick the lock, and open the"; //obj at end
        //when an object is locked and will not open
        lockedTxt = "is locked, so it will not open"; //OBJ at begin
        //text after player tries to do something opposite to what should be done
        abmonishLocked = "which is what I presume you meant, being that it was already unlocked";
        //when something is already open
        openTxt = "is already open"; //OBJ at begin
        //cannot open object text
        cantOpen = "You cannot open something that you cannot see or do not carry";
        //when player tries to talk about something that conversation does not allow here or with any present person
        noPeepTalk = "There is nobody here who wants to listen to you go on about that"; // universal wrong person to talk to about something without giving that away
        //when no conversation can take place here
        talkError = "There is nobody here who can understand that sort of thing";
        //when attempt made at conversation but in wrong specified room
        talkWrongRoom = "You really cannot talk about that here";
        //when NPG has no response 
        peepSaysZero = "has nothing else to say about this";
        //before NG starts conversation
        peepBlanks = "just looks at you blankly"; //person at begin
        //when somethign eaten
        eatTxt = "You eat the";
        //when eaten enough of an object
        eatNoMore = "You cannot eat anymore of the";
        //when something is drunk
        drinkTxt = "You take one massive gulp after another until you have finished drinking the"; //OBJ at end
        //when no more drinking of object allowed
        drinkNoMore = "You cannot drink anymore of the"; //OBJ at end
        //when something is in your inventory text
        inInvTxt = "is in your inventory";
        //when something is too big for inventory
        notFitInInv = "does not fit in your inventory so it lays on the floor"; //OBJ at begin
        //extra description of dead NPG
        deadTxt = "is dead. The body twitches occasionaly but so far there has been no bodily evacuations"; // "The body of " PERSON_NAME goes at begin
        //when player tries to talk to dead bnody
        deadNoTalk = "The body is not very talkative";
        revealTxt = " is revealed as "; //OBJ at begin, PERSON at end
        //when NPG does not fight
        noFight = "does not want to fight you. Good job for you really"; //PERSON at begin
        //when player resuscitates a dead NPG (2 parts)
        resussTxt = "Your mouths lock together in an airtight seal as you blow lungs full of recycled air into the body of"; //PERSON at end
        resussTxtPT2 = "amazingly though, that with the continuous chest pumps (to the rhythm of Staying Alive) brings life into the corpse until it is no longer a corpse. You have saved the life of"; // PERSON at end
        //player cannot resuss NPG
        noResuss = "No matter how hard you try, you cannot resuscitate"; //PERSON at end
        //game tries to tell player no point trying to resuss
        dontResuss = "There is no point tying to resuscitate"; //PERSON at end
        //when player tries to resuss a not dead NPG
        notDead = "is not dead. Are you some kind of masachist?"; //PERSON at begin
        //something cannot be purchased
        cantBuy = "You cannot buy the "; //OBJ at end. Universal cantBuy
        //item can be bought for followed by price of object
        canBuy = "You can buy it for";
        //text at end of sentence telling player no vendor about
        sellerGone = "currently as the vendor is not here";
        //trade complete text
        exchText = "You trade"; // amount of money at end
        //purchased item put into inventory
        putInInv = "It is placed into your inventory";
        //no more of item to buy
        buyNoMore = "You cannot buy anymore of the";
        //item has been sold
        soldTxt = "You have succesfully sold the";
        //item cannot be sold
        cantSell = "You cannot sell the";
        //text telling player they cannoyt sell an item they own
        alwaysYours = "Once owned, forever yours.... unless you decided to drop it, burn it, use it with something else or break it";
        //player  tries to sell something they do not possess
        notYoursToSell = "What are you thinking of? You cannot sell something you do not own. Are you a banker or something?";
        //item placed on floor after purchasing (usually because inventory is full)
        putOnFloor = "which you place on the floor, near you";
        //player closes item
        closeTxt = "is now firmly closed";
        //plaer tries to close an object that is already closed
        notOpen = "is not open and so cannot be closed";
        //player dances
        danceTxt = "You waggle your arms around, bend the knees in some sort of rhythm and twist your hips. Some people might call it dancing, others would call it an embarrasment";
        //item fixed with another object
        fixedTxt = "has been fixed, using the"; //OBJ at begin and end
        //item given to NPG
        givenTxt = "You have given the";
        //cannot give item to NPG
        cantGive = "You cannot give the";
        //giveing obj and receiving another
        swapTxt = "Hoping you are doing the right thing, you hand over the";
        //try to hjelp NPG but it does not work
        nothingCanDo = "There is nothing you can do for";
        //jump text
        jumpTxt = "You take a good, long squat and jump as high as you can, but it has no effect";
        //player is asked where they want to go
        whichDir = "Which direction do you want to go?";
        //nod text
        nodTxt = "You nod ferociously. I hope that helped. It did nothing here apart from giving you a headache";
        //object becomes visible after another object is read
        visAfterRead = "becomes visible after you read and examine the"; //OBJ at begin and end
        //cannot sent an object
        cantSend = "There is no-where to send the"; //OBJ at end
        //NPG will not sit on floor
        wonSit = "does not like the look of the ground, so refuses and remains standing."; // PERSON at begin
        //player sits
        sitTxt = "You dust off the ground under your feet. Then you crouch down, before finally sitting on the floor. It is very uncomfortable, so you stand up again. Life is too short for being uncomfortable";
        //player smiles
        smileTxt = "They say a smile can touch the soul, but your smile has no effect on anybody other than yourself, and all it does to you is make your face ache";
        //player stands
        standTxt = "Remembering your days in the armed forces, you pull your shoulders back and stand erect and stiff. You look straight ahead, waiting for the passby of some superior officer, but none comes and you revert back to your normal, flacid self";
        //object cannot be thrown
        cantThrow = "You really cannot throw the";
        //throw object text (2 parts)
        throwtxt = "You hurl the"; //OBJ at end
        throwTxtPT2 = "and it flies, like a bird man, soaring higher and higher, until.... THUD, it hits something very hard which breaks it. Damn, it was fyling so well too. You walk to the remains and see"; //REVEALED OBJ at end
        //player fails trying to throw an object
        doesntThrow = "tries to fly when you throw it, but instead it just drops to the floor. You kind of feeel embarrassed for it";
        //object does not fly well
        fliesFail = "into the air and it flies baby, flies. And then it doesn't! It comes crashing down and something sounds like it breaks. You pick it up and put it in your inventory";
        //object fails in throw and falls onto floor
        fliesFailToFloor = "into the air and it flies baby, flies. And then it doesn't! It comes crashing down and something sounds like it breaks. It lies on the floor, almost daring you to pick it up";
        //object has been used an is now useless
        alreadyUsed = "has already been used and cannot be used again"; //OBJ at begin
        //player uses word "TURN" and is instructed to use GO etc
        turnFail = "cannot be seen anywhere near by.<br />If you wanted to turn in a direction, try just saying, for example 'North'"; //OBJ at begin
        //anything other than GO or WALK etc is described as pointless
        cleverTxt = "is just a clever way of walking";
        //player tries to wait and this is the result
        dontWait = "Why would you wait? Just get on with it!";
        //plaer tries rto write with an object that doesn not write
        cantWrite = "You cannot write with the";
        //player tries to write on something that has already been written on
        alreadyWrittenOn = "You add more to the";
        //something or someone is nowhere near
        notSeen = "is nowhere to be seen";
        //player has won text message. Make it good!
        gameWonTxt = "Well, that is that.You have succesfully completed and beaten the game. I hope you are proud of yourself. I know I am. Take courage brave warrior and go forth into your life encouraged by the knowledge you have defeated the almighty game"; // meesage when game won
        //after player types something this is displayed along with the command, before the response.
        youSaidTxt = "<br />You said:"; // displayed after every input
        //text before list of things player can see (remember the  <br /> here)
        youCanSeeTxt = "<br />You can see"; // before list of objects seen
        // rndmReplies are the responses if input is not understood
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
        // magic
        //player casts magic spell which kills NPG
        magicKills = "Clouds gather and darken above you. A thunderous crash reverbarates off of every bone in your body, before light, so bright it blindens you, covers the world. When it abates there is no more"; // name of peep at end
        //magic creates an object
        magicCreatesObj = "appears in a puff of blue smoke"; // obj at begin
        //magic creates an NPG
        magicCreatesPeep = "appears in front of you with a loud PLOP"; //peep at begin
        //magic in spell has run out
        magicDepletedTxt = "The spell has been depleted and cannot be used again";
        //player tries to cast spell but does not have the spell
        magicCantCast = "You do not hold the relevant spell to cast that";
        //magic desstroys an object
        magicDestroyTxt = "disappears in a puff of green smoke"; //obj at begin
        //STATS
        //something did not work because players desxterity was too low
        stat_noDexterity = "Your dexterity let you down there I'm afraid";
        //something did not work because players charisma was too low
        stat_noCharisma = "You failed there because your charisma was too low. When engaging with people who are a little weary you need to have a high charisma level to charm them";
        //something did not work because players combat stat was too low
        stat_noCombat = "Fighting is not going to work for you when your combat stats are so low. It is like watching an octopus trying to pick up a tiny slab of butter";
        //something did not work because players strength was too low
        stat_noStrength = "Some serious working out is required because your strength is too low";
        //something did not work because players charisma and dexterity combined was too low
        stat_noMagic = "You try hard to cast the spell but you dexterity and charisma levels are making it difficult. Try again or gain more experience before trying";
        //combining objects failed because players dexterity was too low
        stat_noDextTwoObjects = "When combining two objects your dexterity battles the strength of both objects and has to beat them both";
        //player has tried to pick a lock too many times and is not barred from trying again
        tooManyPickFailsTxt = "Oh dear. you've tried to pick the locks with no success too many times. The items you were using have broken and you wont be able to try that again";
        //when an object has somethign written on by player, the words and this text is added to the description
        writtenOnTxt = "are written on it";
        //when stat increased this is the notification
        stat_increaedTxt = "increased to"; //stat name at beginning, new value at end
        //when stat decreased this is the notification
        stat_decreasesTxt = "decreased to"; //stat name at beginning, new value at end
        allowWonder = "y"; //can NPCs walk about
        wanderChance = 5; // dice rolled to 1 in this var chance of moving room
        wanderMsgPt1 = "has wandered off to"; //before is NPC name and after is the room name
        wanderMsgPt2 = "whilst you have been busy here"; //this can be left blank
        noHelpMsg = "There is nothing I can say that will help you here"; //message if no help in this room
        killedMsg = "Oh no! A dark figure looms before you. He wears a hooded cloak and holds a large sythe in one boney, white hand. 'YOUR TIME HAS COME', the figure declares. As you wonder if the traditional challenge to a game of chess is worth a try (even though you dont know the rules), you see your body is starting to fade and the world about you becomes very black. Blacker than black, more like a non colour. br People will remember you. Problem is they will remember you as the detective who failed to catch a killer! br Why not try again!"; //message when you are killed
        tooDarkForObj = "ss";
        tooDarkForObjArr = ["It is too dark to see if anything is here", "Fumbling around in the dark is a blind man's folly", "You can not see if there are any objects here", "Darkness covers the world and you can see nothing in the nothingness"];
        tooDarkForPeep = "It is so dark, you can not see anyone";
        tooDarkForExits = "It is too dark to see any exits. You have to feel your way out";
        oneSecondEquals = 60; // use this set one real second to this multiplication
        // For some reason the game vars have to be set in varDefinitions.
        gameY = 2020;
        gameM = 3; //0=Jan, 11=Dec
        gameD = 27;
        gameH = 07; //24 hr clock
        gameM = 05;
        //set messages for new day and end of day - below are set here
        sunRiseH = 7;
        sunRiseM = 10;
        sunSetH = 7;
        sunSetM = 30;
        sunRiseMess = ["The sun rises over the horizon and a new day dawns", "A subtle change in the temperature, lets you know that that day is breaking", "Birds singing and dew drops forming tells you the day has broken", "Sun rays peep over the horizon and you know the dawn has broken"];
        sunSetMess = ["The sun sets forcing darkness upon the world", "A drop in the temperature and you just know the sun has set", "As a darkness covers the land the sounds of the day disappear like money on a Disney vacation"];
        useClock = true; // set to true if you want to use the clock
        submittedTxt = "is very subservient, having given you free access";
        noFighting = "Look at you, fighting windmills in your mind! You can only fight creatures and people";
        hereNotCarried = "Items that need to be held and are lying on the ground are not going to work";


    }
