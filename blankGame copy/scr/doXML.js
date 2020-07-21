function readXml(xmlFile){

var xmlDoc;

if(typeof window.DOMParser != "undefined") {
    xmlhttp=new XMLHttpRequest();
    xmlhttp.open("GET",xmlFile,false);
    if (xmlhttp.overrideMimeType){
        xmlhttp.overrideMimeType('text/xml');
    }
    xmlhttp.send();
    xmlDoc=xmlhttp.responseXML;
}
else{
    xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
    xmlDoc.async="false";
    xmlDoc.load(xmlFile);
}
var tagObj=xmlDoc.getElementsByTagName("person");
var typeValue = tagObj[0].getElementsByTagName("first")[0].childNodes[0].nodeValue;
var titleValue = tagObj[0].getElementsByTagName("last")[0].childNodes[0].nodeValue;
    // try to store in local var if required
    //localStorage.setItem("xmlFirstname", typeValue);
    
    
    var tagCnt = tagObj.length;
    localStorage.setItem("xmlCnt", tagCnt);
  
  var bossArr = Create2DArray(tagCnt);
    
   for(var i=0; i<tagCnt; ++i)
        {
            typeValue = tagObj[i].getElementsByTagName("first")[0].childNodes[0].nodeValue;
            titleValue = tagObj[i].getElementsByTagName("last")[0].childNodes[0].nodeValue;
            bossArr[i][0]=typeValue;          
           /* localStorage.setItem("names", JSON.stringify(bossArr)); */
            bossArr[i][1]=titleValue;
                   localStorage.setItem("names", JSON.stringify(bossArr));
     // retrieve the localStorage items:
            //var storedNames = JSON.parse(localStorage.getItem("names"));
        }
     return bossArr;   
}

// lets try and make this so the params can be the file and the parent tag. Then we can get each child tag name
// and save them into the array

function getXmlValue(xmlFile, nodeParent, nodeName, valueToFind, nodeToGetValueOf)
{
    var xmlDoc;
 // check valid
    if(typeof window.DOMParser != "undefined") {
    xmlhttp=new XMLHttpRequest();
    xmlhttp.open("GET",xmlFile,false);
    if (xmlhttp.overrideMimeType){
        xmlhttp.overrideMimeType('text/xml');
    }
    xmlhttp.send();
    xmlDoc=xmlhttp.responseXML;
}
else{
    xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
    xmlDoc.async="false";
    xmlDoc.load(xmlFile);
    
}
    
var tagObj=xmlDoc.getElementsByTagName(nodeParent);
var tagCnt = tagObj.length;
var returnValue = null;
    for(var i=0; i<tagCnt; ++i)
        {
            if(tagObj[i].getElementsByTagName(nodeName)[0].childNodes[0].nodeValue == valueToFind)
                {
                    //NB You can not write to xml file without using server side code 
                   returnValue = tagObj[i].getElementsByTagName(nodeToGetValueOf)[0].childNodes[0].nodeValue;
                    break;
                }
        }
return returnValue;
}

function countNodes(xmlFile, nodeName)
{
    if(typeof window.DOMParser != "undefined") {
    xmlhttp=new XMLHttpRequest();
    xmlhttp.open("GET",xmlFile,false);
    if (xmlhttp.overrideMimeType){
        xmlhttp.overrideMimeType('text/xml');
    }
    xmlhttp.send();
    xmlDoc=xmlhttp.responseXML;
   }
else{
    xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
    xmlDoc.async="false";
    xmlDoc.load(xmlFile);
    
    }
    
   var tagObj=xmlDoc.getElementsByTagName(nodeName);
var elCnt = xmlDoc.documentElement.childElementCount;
var tagCnt = tagObj.length;
    return tagCnt;
}
