/* golbal functions. localStorage only accepts STRINGS so this will need converting */
function updateVars(varName, varValue)
{
  
var strVarName = varName;
   localStorage.setItem(strVarName, varValue); 
  
}
function addStringVar(varName, varValue)
{
    var newBit = varValue;
    var strVarName = varName;
    var oldBit = localStorage.getItem(strVarName);
    var combinedStr = oldBit + ' ' + newBit;
    localStorage.setItem(strVarName, combinedStr);
}

function firstCap(strS)
{
    if (strS.length > 0)
        {
            var letOne = strS.charAt(0).toUpperCase();
            var strSS = strS.slice(1,strS.length);
            var newStr = letOne + strSS;
            return newStr;
        }
    else
        {
          return strS.charAt(0).toUpperCase();  
        
        };
}
function callVar(varN)
{
    // for expected string result
    var xxx = varN;
    if (localStorage.getItem(varN) != null)
    {
        varN = localStorage.getItem(varN); 
    }
   else
       {
           varN = null;
           
       }
   return varN;
}
function callNumbVar(varN)
{
    // for expected number result
    if (localStorage.getItem(varN) != null)
        {
            varN = parseFloat(localStorage.getItem(varN));
        }
    else
        {
            varN = 0;
        }
    return varN;
}
function loadVars()
{
    var userName = callVar('userName');
    
    
}

function firstLoad()
{
    // loop thru all localStorage items and remove them if this is the first load
    if (localStorage.getItem('familySetUp') == null)
        {
            for (var i=0, iC=localStorage.length; i<iC; ++i)
              {
                    var storageKey = localStorage.key(i);
                    var storageNm = localStorage.key(i).name;
                    localStorage.removeItem(storageNm);
                  
               }
            localStorage.setItem('familySetUp', 'y')
           
        }
}
function Create2DArray(rows) {
  var arr = [];

  for (var i=0;i<rows;i++) {
     arr[i] = [];
  }

  return arr;
    /*
    call this with this:
var arr = Create2DArray(100);

arr[50][2] = 5;
arr[70][5] = 7454;
*/
}

function addToInv(objID, isReplace=false, oldObjID = 0)
{
             
    
    var retVar = false;
    if (isReplace==false)
        {
            if (invent.length < itemsLimit)// enough room
            {
               
            let invPlc = invent.length ++;
                            // add to inventory
            invent[invPlc] = Oobject[objID].name;
            invWeight = parseFloat(Oobject[objID].weight);

            Oobject[objID].isCarried='y';
            Oobject[objID].currentRoom=9999;
            retVar=true;  
            }// end of enough room
            else
                {
                    retVar=false;
                };// end of not enough room
          
        }
    else
        {
           //drop the item first
              let ioID = 0;
                  invent.forEach(function(nm)
                    {
                    if (nm==Oobject[oldObjID].name)
                  {
                      ioID=parseFloat(invent.indexOf(nm));

                  };

                    });

            invent.splice(ioID,1);
            invent.sort();
            let invPlc = invent.length ++;
                // add to inventory
            invent[invPlc] = Oobject[objID].name;
            invWeight = parseFloat(Oobject[objID].weight);

            Oobject[oldObjID].isCarried='n';
            Oobject[oldObjID].currentRoom=varRID;
            Oobject[objID].isCarried='y'; 
            Oobject[objID].currentRoom=9999;
            retVar=true;
        };
    var el=document.getElementById('inv');
    el.textContent="Carrying: " + invent.length + "/" + itemsLimit;
    return retVar;
    
};

function dropFromInv(nid, isDestroyed = false)
{
    var retVar = false;
     if (Oobject[nid].isCarried =='y')
                          {
          let ioID = 0;
          invent.forEach(function(nm)
            {
            if (nm==Oobject[nid].name)
          {
              ioID=parseFloat(invent.indexOf(nm));

          };

            });

    invent.splice(ioID,1);
    invent.sort();
          
    Oobject[nid].isCarried='n';
        if (isDestroyed==true)
            {
              Oobject[nid].currentRoom=9999;  
            }
            else
                {
                   Oobject[nid].currentRoom=varRID;   
                }; //end of is Destroyed
        if (Oobject[nid].isCash=='y')//is cash?
            {
                cash -= parseFloat(Oobject[nid].itemValue);
                var el = document.getElementById('money');
                el.textContent="Funds: " + cshSy + cash.toFixed(2);
                window.scrollTo(0,document.body.scrollHeight);
                var elm = document.getElementById('txtInput');
                elm.focus();
            };
         retVar=true;               
      };
    var el=document.getElementById('inv');
    el.textContent="Carrying: " + invent.length + "/" + itemsLimit;
    return retVar;
};
function rollDice(relevantVar = 1, userStat=1)
{
   
    var returnWinner=false; // computer win
    var xx=Math.random();
    xx=Math.random();
    var compScore = (xx * 10) * relevantVar;
    var yy=Math.random();
    var plyrScore = (yy * 10) * userStat;
   
    if (compScore >= plyrScore)
        {
            returnWinner=false;
        }
    else 
        {
            returnWinner=true;
        };
    return returnWinner;
    
}
function giveRndmNumber(topNo = 10)
{
    var rndNo = Math.random();
    rndNo=Math.random();
    var retNo = (rndNo * 10) * topNo;
    
    return retNo;
}
// this function adds or decreases the specified stats when called from commands.js
function changeStat(statNm, alterAmnt=0, upDwnRndm="up")
{
    
   
    var strRet=undefined;
    if (upDwnRndm=="random")
        {
            if (rollDice()==true)
                {
                    upDwnRndm="up";
                }
            else
                {
                    upDwnRndm="down";
                };
        };
    switch (upDwnRndm)
        {
            case "up":
                if (statNm=="charisma" && stat_charisma <= stat_maxAmnt - alterAmnt)
                    {
                        
                       stat_charisma += alterAmnt; 
                        strRet = "Charisma " + stat_increaedTxt + ": " + stat_charisma;
                    }
                else if (statNm=="charisma" && stat_charisma > stat_maxAmnt - alterAmnt)
                    {
                       stat_charisma = stat_maxAmnt; 
                        strRet = "Charisma " + stat_increaedTxt + ": " + stat_charisma;
                    }
                else if (statNm=="dexterity" && stat_dexterity <= stat_maxAmnt - alterAmnt)
                    {
                        stat_dexterity += alterAmnt;
                        strRet="Dexterity " + stat_increaedTxt + ": " + stat_dexterity;
                    }
                else if (statNm=="dexterity" && stat_dexterity > stat_maxAmnt - alterAmnt)
                    {
                        stat_dexterity = stat_maxAmnt;
                        strRet="Dexterity " + stat_increaedTxt + ": " + stat_dexterity;
                    }
                else if (statNm=="combat" && stat_combat <= stat_maxAmnt - alterAmnt)
                    {
                        stat_combat += alterAmnt;
                        strRet="Combat " + stat_increaedTxt + ": " + stat_combat;
                    }
                else if (statNm=="combat" && stat_combat > stat_maxAmnt - alterAmnt)
                    {
                        stat_combat = stat_maxAmnt;
                        strRet="Combat " + stat_increaedTxt + ": " + stat_combat;
                    }
                else if (statNm=="strength" && stat_strength <= stat_maxAmnt - alterAmnt)
                    {
                        stat_strength += alterAmnt;
                        strRet="Strength " + stat_increaedTxt + ": " + stat_strength;
                    }
                else if (statNm=="strength" && stat_strength > stat_maxAmnt - alterAmnt)
                    {
                        stat_strength = stat_maxAmnt;
                        strRet="Strength " + stat_increaedTxt + ": " + stat_strength;
                    };
                break;
                
            case "down":
                if (statNm=="charisma" && stat_charisma >= stat_minAmnt + alterAmnt)
                    {
                        stat_charisma -= alterAmnt;
                        strRet = "Charisma " + stat_decreasesTxt + ": " + stat_charisma;
                    }
                else if (statNm=="charisma" && stat_charisma < stat_minAmnt + alterAmnt)
                    {
                        stat_charisma=stat_minAmnt;
                        strRet="Charisma " + stat_decreasesTxt + ": " + stat_charisma;
                    };
                if (statNm=="dexterity" && stat_dexterity >= stat_minAmnt + alterAmnt)
                    {
                        stat_dexterity -= alterAmnt;
                        strRet = "Dexterity " + stat_decreasesTxt + ": " + stat_dexterity;
                    }
                else if (statNm=="dexterity" && stat_dexterity < stat_minAmnt + alterAmnt)
                    {
                        stat_dexterity=stat_minAmnt;
                        strRet="Dexterity " + stat_decreasesTxt + ": " + stat_dexterity;
                    };
                if (statNm=="combat" && stat_combat >= stat_minAmnt + alterAmnt)
                    {
                        stat_combat -= alterAmnt;
                        strRet = "Combat " + stat_decreasesTxt + ": " + stat_combat;
                    }
                else if (statNm=="combat" && stat_combat < stat_minAmnt + alterAmnt)
                    {
                        stat_combat=stat_minAmnt;
                        strRet="Combat " + stat_decreasesTxt + ": " + stat_combat;
                    };
                if (statNm=="strength" && stat_strength >= stat_minAmnt + alterAmnt)
                    {
                        stat_strength -= alterAmnt;
                        strRet = "Strength " + stat_decreasesTxt + ": " + stat_strength;
                    }
                else if (statNm=="strength" && stat_strength < stat_minAmnt + alterAmnt)
                    {
                        stat_strength=stat_minAmnt;
                        strRet="Strength " + stat_decreasesTxt + ": " + stat_strength;
                    };
                break;
        };
    
    var el = document.getElementById('strngth');
                el.textContent="Strength: " + stat_strength + "/" + stat_maxAmnt;
    var el2=document.getElementById('dxty');
                el2.textContent="Dexterity: " + stat_dexterity + "/" + stat_maxAmnt;
    var el3=document.getElementById("combat");
                el3.textContent="Combat: " + stat_combat + "/" + stat_maxAmnt;
    var el4=document.getElementById("charisma");
                el4.textContent="Charisma: " + stat_charisma + "/" + stat_maxAmnt;
    return strRet;
}