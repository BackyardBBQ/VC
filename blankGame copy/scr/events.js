// events are only for specific rooms

var Events = {
    type: 'weather',
    firstTxt: 'Now it starts to rain. The slow splish, splash does not take long to become a torrent of salty abuse upon your face',
    laterTxt: 'It is still raining',
    affect: '-1',
    needToBeInRoomID: null,
    occurence: 'never',
    alreadyDone: 'n'
};
// create your own events here
eventsDeclared:
    var rain = Object.create(Events);
