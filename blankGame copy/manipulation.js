UNIVERSAL_FUNCTIONS:
    /* index:
    elLd
    onChangeFunc (toggle switch)
    setIndexZero
    setSlider
    slideChange
    seeMe
    pushStuff
    fillEmpty
    defaultVals
    multipleElsShow
     
     */


    FORM_ELEMENTS:
    // set an document element to proeprty of an object (set label value too)
    var elLd = function (el, objID, objProp, lblName, lblText) { //doc element, object name, object property, lable name (opt), lable text(opt)
        //load any objects property
        //objID is the object and property sent to function
        var elm = document.getElementById(el);
        elm.value = objID[objProp];
        if (lblName != undefined) {
            document.getElementById(lblName).innerHTML = lblText + ": " + objID[objProp];
        };
    };

// snippet shortcut = onCh

// 1) this function listens for click on a toggle switch
// 2) it checks to see if the element being checked should take the action of ON
// 3) it then takes the element id's from the array elArray and makes them visible or invisible.
function onChangeFunc(el, elArray, onIsOn) {
    //onIsOn == if el is ON the elArray's will be visible

    if (document.getElementById(el).checked == true) {
        for (i = 0, max = elArray.length; i < max; i++) {
            if (onIsOn === false) {
                document.getElementById(elArray[i]).style.visibility = "collapse";
                document.getElementById(elArray[i]).style.display = "none";
            } else {
                document.getElementById(elArray[i]).style.visibility = "visible";
                document.getElementById(elArray[i]).style.display = "block";
            }; // end onIsOn IF

        }; // end for
    } else if (document.getElementById(el).checked == false) {
        for (i = 0, max = elArray.length; i < max; i++) {
            if (onIsOn === true) {
                document.getElementById(elArray[i]).style.visibility = "collapse";
                document.getElementById(elArray[i]).style.display = "none";
            } else {
                document.getElementById(elArray[i]).style.visibility = "visible";
                document.getElementById(elArray[i]).style.display = "block";
            }; // end onIsOn IF

        }; // end for
    };

}

// set a drop down or other doc element to index 0
function setIndexZero(el) { // sets select lists to index 0
    var listEl = document.getElementById(el);
    listEl.selectedIndex = "0";
}
// set a slider to an amount (can be object proeprty) and set label to value
function setSlider(el, amnt, elLabel) { // sets the element (el) to the value (amnt), elLabel is optional
    var elNm = document.getElementById(el);
    // get rid of px for this 
    amnt = amnt.replace('px', '');

    var amntInt;
    // as well as numerical values the function can change max, mid or min into the required value and apply it
    if (amnt === "mid") {
        var x = elNm.max;
        var y = elNm.min;
        var z = x - y;
        var zz = z / 2;
        amntInt = y + zz;
        elNm.value = amntInt;
    } else if (amnt === "max") {
        elNm.value = elNm.max;
    } else if (amnt === "min") {
        if (elNm.value != undefined) {
            elNm.value = elNm.min;
        } else {
            elNm.value = "0";
        };

    } else {
        try {
            elNm.value = amnt;
        } catch (e) {
            var mn = elNm.min;
            elNm.value = mn;
        } finally {

        }
    }; // end if

    // if elLabel has a value, add the value to the end of it
    if (elLabel != undefined || elLabel != null) {
        document.getElementById(elLabel).innerHTML += ": " + elNm.value;
    };

}
// set lbl to value of element
function slideChange(el, lbl, lblTxt) {

    document.getElementById(lbl).innerHTML = lblTxt + ": " + document.getElementById(el).value;

}
// switches doc elements to visible (true) or invisible(false)
var seeMe = function (el, boolSee) {
    // element name, make visible true/false
    var elm = document.getElementById(el);
    if (boolSee == true) {
        elm.style.visibility = "visible";
        elm.style.display = "block";
    } else {
        elm.style.visibility = "collapse";
        elm.style.display = "none";
    }
};



//push stuff to xml by adding the tags
function pushStuff(nodeNm, objProp) {
    var pushStr = "<" + nodeNm + ">" + objProp + "</" + nodeNm + ">";
    return pushStr;
}
// f an element is empty fill it with the default value
DEALING_WITH_EMPTY:
    function fillEmpty(el, defaultFill) { // if a text field (el) is empty then it is set to the value (defaultFill)
        var currFill = document.getElementById(el).value;
        if (currFill == "" || currFill == null || currFill == undefined) {
            return defaultFill;
        } else {
            return currFill;
        };
    }
// if an object proeprty has a null value, return the default value
function defaultVals(objProp, defVal) { // if an object property is nothing return the default value (defVal)
    if (objProp == null || objProp == undefined || objProp == "") {
        return defVal;
    } else { // if its not empty return the original value (objProp)
        return objProp;
    };
}

MANIPULATIONS:
    // take the element value and either make the elements with name at targetSt from start value to end value either visible or invisible - useful if you have lots of fields that need become visible when a value has changed elsewhere
    function multipleELsShow(elNm, targetSt, stV, endV) {
        //element that has changed, start of target element name, start and end values
        var nl = elNm.value;
        for (x = stV; x < endV; x++) {
            var elz = x + 1;
            var els = targetSt + elz;
            if (nl > x) {
                seeMe(els, true);
            } else {
                seeMe(els, false);
            };
        };


    };
