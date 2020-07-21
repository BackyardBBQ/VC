var Goals = {
    completed:'n',
    accessType:'room',
    allowsAccessToID:0,
    object1Required:null,
    object2Required:null,
    object3Required:null,
    object4Required:null,
    object5Required:null,
    object1HasToBeOn:'n',
     object2HasToBeOn:'n',
     object3HasToBeOn:'n',
     object4HasToBeOn:'n',
     object5HasToBeOn:'n',
    object1HasToBeWorn:'n',
    object2HasToBeWorn:'n',
    object3HasToBeWorn:'n',
    object4HasToBeWorn:'n',
    object5HasToBeWorn:'n',
    happensInConvID:null, // things that happen at conversation points
    atConvPoint1:null,
    atConvPoint2:null,
    atConvPoint3:null,
    atConvPoint4:null,
    atConvPoint5:null,
    triggerdByPerson1:null, // can be triggered by more than one person
    triggerdByPerson2:null,
    triggerdByPerson3:null,
    triggerdByPerson4:null,
    triggerdByPerson5:null,
    person1ReqLiving:'n', // do they have to be alive to trigger it
    person2ReqLiving:'n',
    person3ReqLiving:'n',
    person4ReqLiving:'n',
    person5ReqLiving:'n',
    person1ReqDead:'n', // do they have to be dead to trigger it
    person2ReqDead:'n',
    person3ReqDead:'n',
    person4ReqDead:'n',
    person5ReqDead:'n',
    completedMessage:null
};
// for the thing that is needed to end the game add this to the Goals object 'finalAct'


var finalAct = Object.create(Goals);
finalAct.accessType='end game';

// generally use this other than for finalAct to make things happen that are not covered by rest of code. In the section 'bespoke' in the afterEnter function in general.js