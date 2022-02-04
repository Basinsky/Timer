(function () {         
    var findTimesUpID;   
    var avatarName;
    var avatarUUID;       
    var props;
    var SEARCH_RADIUS = 20;
    var searchPosition;
    var searchLocation = MyAvatar.position;
    var isTimesUpFound = false;
    var self;
    

    this.preload = function (entityID) {
        self = entityID;       
        searchPosition = Entities.getEntityProperties(self, 'position').position;
        searchLocation = { x: searchPosition.x, y: searchPosition.y,z: searchPosition.z };        
        print(JSON.stringify("searchloc"+searchLocation.x));       
    };
    
    function findTimesUp() {
        var entities = Entities.findEntities(searchLocation, SEARCH_RADIUS);
        for (var i in entities) {
            props = Entities.getEntityProperties(entities[i]);                  
            if (props.name === "timesup") {
                findTimesUpID = props.id;
                print(JSON.stringify("Stop Button Found timesups" + findTimesUpID));
                isTimesUpFound = true;                     
            }
        }        
    }
    
    function sendDataTotimesup() {
        avatarName = MyAvatar.displayName;
        avatarUUID = MyAvatar.sessionUUID;             
        if (findTimesUpID) {
            Entities.callEntityServerMethod(             
                findTimesUpID, 
                "receiveDataFromStop",
                [avatarName,avatarUUID]
            );
            print(JSON.stringify("Try to send stop " + avatarName + " to " + findTimesUpID));
        }    
    }

    function click() {        
        if (isTimesUpFound === false) {
            print(JSON.stringify("timesup Found Button " + avatarName));
            findTimesUp();        
        }
        sendDataTotimesup();        
    }

    this.startNearTrigger = click;
    this.startFarTrigger = click;
    this.clickDownOnEntity = click;
});