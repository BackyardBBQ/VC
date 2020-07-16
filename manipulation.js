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
    allLetters
    declareDivContent
    -trying to animate transitions
        getHeight
        show
    emptyMe
    GetSiteRoot
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
        }
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
            } // end onIsOn IF

        } // end for
    } else if (document.getElementById(el).checked == false) {
        for (i = 0, max = elArray.length; i < max; i++) {
            if (onIsOn === true) {
                document.getElementById(elArray[i]).style.visibility = "collapse";
                document.getElementById(elArray[i]).style.display = "none";
            } else {
                document.getElementById(elArray[i]).style.visibility = "visible";
                document.getElementById(elArray[i]).style.display = "block";
            } // end onIsOn IF

        } // end for
    }

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
        }

    } else {
        try {
            elNm.value = amnt;
        } catch (e) {
            var mn = elNm.min;
            elNm.value = mn;
        } finally {

        }
    } // end if

    // if elLabel has a value, add the value to the end of it
    if (elLabel != undefined || elLabel != null) {
        document.getElementById(elLabel).innerHTML += ": " + elNm.value;
    }


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
function fillEmpty(el, defaultFill) { // if a text field (el) is empty then it is set to the value (defaultFill)
    var currFill = document.getElementById(el).value;
    if (currFill == "" || currFill == null || currFill == undefined) {
        return defaultFill;
    } else {
        return currFill;
    }
}
// if an object proeprty has a null value, return the default value
function defaultVals(objProp, defVal) { // if an object property is nothing return the default value (defVal)
    if (objProp == null || objProp == undefined || objProp == "") {
        return defVal;
    } else { // if its not empty return the original value (objProp)
        return objProp;
    }
}

MANIPULATIONS:
    // take the element value and either make the elements with name at targetSt from start value to end value either visible or invisible - useful if you have lots of fields that need become visible when a value has changed elsewhere
    function multipleELsShow(elNm, targetSt, stV, endV) {
        // eg "myElementChanged", "targetEl", 1, 5
        //element that has changed, start of target element name, start and end values
        var nl = elNm.value;
        for (x = stV; x < endV; x++) {
            var elz = x + 1;
            var els = targetSt + elz;
            if (nl > x) {
                seeMe(els, true);
            } else {
                seeMe(els, false);
            }
        }


    }

function allLetter(inputtxt) {

    var letters = /^[A-Za-z]+$/;
    if (inputtxt.value.match(letters)) {

        return true;
    } else {

        return false;
    }
}
var declareDivContent = function (divNm, childNm, divTxt, bolOverwrite, classNm, styleChange) { // div name, child div name, div content, should this overwrite existing content of div?, css class name (optional), extra styling (optional)
    var thisDiv = document.getElementById(divNm);


    if (bolOverwrite == true) {
        thisDiv.innerHTML = "<div id='" + childNm + "'>";
        var thisChild = document.getElementById(childNm);
        if (classNm != undefined && classNm != null) {
            thisChild.setAttribute("class", classNm);
        }
        if (styleChange != undefined && styleChange != null) {
            thisChild.setAttribute("style", styleChange)
        }
        thisChild.innerHTML += divTxt;
        thisDiv.innerHTML += "</div";
    } else {
        thisDiv.innerHTML += "<div id='" + childNm + "'>";
        var thisChild = document.getElementById(childNm);
        if (classNm != undefined && classNm != null) {
            thisChild.setAttribute("class", classNm);
        }
        if (styleChange != undefined && styleChange != null) {
            thisChild.setAttribute("style", styleChange)
        }
        thisChild.innerHTML += divTxt;
        thisDiv.innerHTML += "</div";
    }


};
// trying to animate transitions for rows
// Show an element
var show = function (elem) {

    // Get the natural height of the element
    var getHeight = function () {
        elem.style.display = 'block'; // Make it visible
        var height = elem.scrollHeight + 'px'; // Get it's height
        elem.style.display = ''; //  Hide it again
        return height;
    };

    var height = getHeight(); // Get the natural height
    elem.classList.add('is-visible'); // Make the element visible
    elem.style.height = height; // Update the max-height

    // Once the transition is complete, remove the inline max-height so the content can scale responsively
    window.setTimeout(function () {
        elem.style.height = '';
    }, 350);
    elem.focus();
};

// Hide an element
var hide = function (elem) {

    // Give the element a height to change from
    elem.style.height = elem.scrollHeight + 'px';

    // Set the height back to 0
    window.setTimeout(function () {
        elem.style.height = '0';
    }, 1);

    // When the transition is complete, hide it
    window.setTimeout(function () {
        elem.classList.remove('is-visible');
    }, 350);

};

// Toggle element visibility
var toggle = function (elem, timing) {

    // If the element is visible, hide it
    if (elem.classList.contains('is-visible')) {
        hide(elem);
        return;
    }

    // Otherwise, show it
    elem.focus();
    show(elem);
    elem.scrollIntoView();


};
var slideMe = function (el, showMe) {
    if (showMe == true) {
        show(document.getElementById(el));
    } else {
        hide(document.getElementById(el));
    }

};
var emptyMe = function (elName) {
    document.getElementById(elName).value = "";
};
var cbOFF = function (el) {
    document.getElementById(el).checked = false;
};

function GetSiteRoot() {
    var rootPath = window.location.protocol + "//" + window.location.host + "/";

    if (window.location.hostname == "localhost") {
        var path = window.location.pathname;
        if (path.indexOf("/") == 0) {
            path = path.substring(1);
        }
        path = path.split("/", 1);
        if (path != "") {
            rootPath = rootPath + path + "/";
        }
    } else {
        //rootPath = window.location.pathname + "/";
        var fullPath = window.location.pathname;
        var r = /[^\/]*$/;
        var goodPath = fullPath.replace(r, "");
        rootPath = goodPath;
    }
    return rootPath;
}
