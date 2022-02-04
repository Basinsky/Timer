(function () {    
    var self;
    var selfPosition;    
    var timesUpAID;
    var timesUpBID;
    var textID;    
    var interval;    
    var currentTime = 0;    
    var TOTAL_TIME_SECONDS = 120;
    var WAIT_UNTILL_LOADED = 2000;
    var SECOND_MS = 1000;
    var BOTTOM_POSITION = -2.04;
    var START_LENGTH = 0.01;
    var CLICK_VOLUME = 0.1;
    var GONG_VOLUME = 0.1;    
    var isCounting = false;
    var signID;
    var counterID;    
    var counterLength;
    var SCALE = 2.21; 
    var isPlayedOnce = true;
    var LOCATION_ROOT_URL = Script.resolvePath(".");    
    var clickSound = SoundCache.getSound( LOCATION_ROOT_URL + "108336__qat__click-01-fast.mp3");

    var gongSound = SoundCache.getSound(LOCATION_ROOT_URL + "411370__m160__gong-01.wav");       

    this.remotelyCallable = [
        "receiveDataFromStart",
        "receiveDataFromStop",
        "receiveDataFromReset",        
        "receiveDataFromA",
        "receiveDataFromB"           
    ];  

    this.preload = function (entityID) {        
        self = entityID;
        selfPosition = Entities.getEntityProperties(self,["position"]).position;
        print(self);            
    };

    this.unload = function () {
        Script.clearInterval(interval);
    };
        
    this.receiveDataFromStart = function() {              
        isCounting = true;               
    };

    this.receiveDataFromStop = function() {                        
        isCounting = false;                
    };

    this.receiveDataFromReset = function() {                       
        Entities.editEntity(signID,{color: { r: 0, g: 0, b: 0 }});
        Entities.editEntity(counterID,{
            localDimensions: { x: 0.43, y: 0.01, z: 0.43 },
            localPosition: { x: 0, y: -2.04 ,z: 0.029 }   
        });          
        Entities.editEntity(textID, { text: TOTAL_TIME_SECONDS });
        counterLength = 0;            
        isPlayedOnce = true;
        currentTime = 0;
        isCounting = false;              
    };

    this.receiveDataFromA = function() {                            
        Entities.editEntity(signID,{color: { r: 0, g: 0, b: 0 }});
        Entities.editEntity(counterID,{
            localDimensions: { x: 0.43, y: 0.01, z: 0.43 },
            localPosition: { x: 0, y: -2.04 ,z: 0.029 }   
        });
        var timesUpUserdataA = JSON.parse(Entities.getEntityProperties(timesUpAID,["userData"]).userData);
        TOTAL_TIME_SECONDS = timesUpUserdataA.time;            
        Entities.editEntity(textID, { text: TOTAL_TIME_SECONDS });
        counterLength = 0;          
        isPlayedOnce = true;
        currentTime = 0;
        isCounting = false;     
                
    };
    this.receiveDataFromB = function() {              
        Entities.editEntity(signID,{color: { r: 0, g: 0, b: 0 }});
        Entities.editEntity(counterID,{
            localDimensions: { x: 0.43, y: 0.01, z: 0.43 },
            localPosition: { x: 0, y: -2.04 ,z: 0.029 }   
        });
        var timesUpUserdataB = JSON.parse(Entities.getEntityProperties(timesUpBID,["userData"]).userData);
        TOTAL_TIME_SECONDS = timesUpUserdataB.time;            
        Entities.editEntity(textID, { text: TOTAL_TIME_SECONDS });
        counterLength = 0;            
        isPlayedOnce = true;
        currentTime = 0; 
        isCounting = false;                
    };
    
    function createTimesUp() {  
        var tempRotation = Quat.fromPitchYawRollRadians(0, 0, 0);
        Entities.addEntity( {
            type: "Model",
            name: "timesupstart",
            parentID: self,
            script: LOCATION_ROOT_URL + "timesupStartButton.js?" + Date.now(),        
            modelURL: LOCATION_ROOT_URL + "timesupStart.fbx?"+ Date.now(),
            localPosition: { x: 0.5335, y: -0.2143, z: 0.02 },  
            localRotation: tempRotation,
            localDimensions: { x: 0.2, y: 0.2, z: 0.024 }, 
            visible: true,            
            description: "",        
            lifetime: -1,            
            userData: JSON.stringify({
                grabbableKey: { grabbable: false, triggerable: true }                         
            })
        });

        Entities.addEntity( {
            type: "Model",
            name: "timesupstop",
            parentID: self,
            script: LOCATION_ROOT_URL + "timesupStopButton.js?" + Date.now(),        
            modelURL: LOCATION_ROOT_URL + "timesupStop.fbx?"+ Date.now(),
            localPosition: { x: 0.5335, y: -0.6019, z: 0.02 },
            localDimensions: { x: 0.2, y: 0.2, z: 0.024 },    
            localRotation: tempRotation,  
            visible: true,            
            description: "",          
            lifetime: -1,            
            userData: JSON.stringify({
                grabbableKey: { grabbable: false, triggerable: true }                         
            })
        });

        Entities.addEntity( {
            type: "Model",
            name: "timesupreset",
            parentID: self,
            script: LOCATION_ROOT_URL + "timesupResetButton.js?" + Date.now(),        
            modelURL: LOCATION_ROOT_URL + "timesupReset.fbx?"+ Date.now(),
            localPosition: { x: 0.5335, y: -0.9803, z: 0.02 },  
            localRotation: tempRotation,
            localDimensions: { x: 0.2, y: 0.2, z: 0.024 },    
            visible: true,            
            description: "",        
            lifetime: -1,            
            userData: JSON.stringify({
                grabbableKey: { grabbable: false, triggerable: true }                         
            })
        });

        timesUpAID = Entities.addEntity( {
            type: "Model",
            name: "timesupA",
            parentID: self,
            script: LOCATION_ROOT_URL + "timesupAButton.js?" + Date.now(),        
            modelURL: LOCATION_ROOT_URL + "timesupA.fbx?"+ Date.now(),
            localPosition: { x: -0.5129, y: -0.2114, z: 0.02 },    
            localRotation: tempRotation,
            localDimensions: { x: 0.2, y: 0.2, z: 0.024 },    
            visible: true,            
            description: "",        
            lifetime: -1,            
            userData: JSON.stringify({
                grabbableKey: { grabbable: false, triggerable: false },
                time: 120            
            })
        });

        timesUpBID = Entities.addEntity( {
            type: "Model",
            name: "timesupB",
            parentID: self,
            script: LOCATION_ROOT_URL + "timesupBButton.js?" + Date.now(),        
            modelURL: LOCATION_ROOT_URL + "timesupB.fbx?"+ Date.now(),
            localPosition: { x: -0.5103, y: -0.5984, z: 0.02 },  
            localRotation: tempRotation,
            localDimensions: { x: 0.2, y: 0.2, z: 0.024 },    
            visible: true,            
            description: "",        
            lifetime: -1,            
            userData: JSON.stringify({
                grabbableKey: { grabbable: false, triggerable: false },
                time: 60            
            })
        });

        textID = Entities.addEntity({
            type: "Text",
            parentID: self,        
            name: "timesuptext",             
            text: TOTAL_TIME_SECONDS,     
            localPosition: { x: 0, y: 0.45, z: 0.0921 },
            lineHeight: 0.1,
            leftMargin: 0,
            topMargin: 0,   
            localRotation: tempRotation,        
            localDimensions: { x: 0.19, y: 0.11, z: 0.01},    
            textColor: { r: 255, g: 255, b: 255 },
            backgroundColor: { r: 255, g: 255, b: 255 },
            backgroundAlpha: 0,     
            lifetime: -1,               
            userData: "{ \"grabbableKey\": { \"grabbable\": false} }"       
        }); 

        tempRotation = Quat.fromPitchYawRollRadians(-Math.PI/2, 0, 0);
        signID = Entities.addEntity( {
            type: "Shape",        
            shape: "Cylinder",                       
            name: "timesUpSign",        
            description: "",
            parentID: self,           
            localPosition: { x: 0 , y: 1.36 , z: 0.0268 },
            localRotation: tempRotation,       
            lifetime: -1,
            color: { r: 0, g: 0, b: 0 },
            alpha: 1,
            localDimensions: { x: 1.28, y: 0.13, z: 1.28 },
            collisionless: true,
            visible: true,
            userData: "{ \"grabbableKey\": { \"grabbable\": false, \"triggerable\": false } }"    
        });        
        
        counterID = Entities.addEntity( {
            type: "Shape",        
            shape: "Cylinder",                       
            name: "timesUpCounter",        
            description: "",
            parentID: self,           
            localPosition: { x: 0, y: BOTTOM_POSITION ,z: 0.029 },          
            lifetime: -1,
            color: { r: 255,g: 0,b: 255 },
            alpha: 1,
            localDimensions: { x: 0.43, y: 0.01, z: 0.43 },
            collisionless: true,
            visible: true,
            userData: "{ \"grabbableKey\": { \"grabbable\": false, \"triggerable\": false}}"    
        });      
    }
    
    function timesUp() {
        Entities.editEntity(signID, { color: { r: 255, g: 255, b: 255 } });        
        Audio.playSound(gongSound, { volume: GONG_VOLUME, position: selfPosition });
        isCounting = false;
        isPlayedOnce = false;           
        currentTime = 0;
    }
     
    function counting() {
        Audio.playSound(clickSound, { volume: CLICK_VOLUME, position: selfPosition });        
        currentTime = currentTime + 1;            
        counterLength = currentTime / TOTAL_TIME_SECONDS;
        Entities.editEntity(counterID,{
            localDimensions: { x: 0.43, y: START_LENGTH + counterLength * SCALE, z: 0.43 },
            localPosition: { x: 0, y: BOTTOM_POSITION + (counterLength / 2) * SCALE , z: 0.029 }
        });
        Entities.editEntity(textID, { text: TOTAL_TIME_SECONDS - currentTime });
    }

    function setInterval() {
        interval = Script.setInterval(function () {        
            if (currentTime > TOTAL_TIME_SECONDS - 1 && isPlayedOnce) {            
                timesUp();       
            }
            if (isCounting && isPlayedOnce) {  
                counting();           
            }
        }, SECOND_MS);
    }

    Script.scriptEnding.connect(function() {
        Entities.deleteEntity(self);        
        Script.clearInterval(interval);
    }); 
    
    Script.setTimeout(function () {       
        var entities = Entities.findEntities({ x: 0, y: 0, z: 0 }, 10000);               
        for (var i in entities) {  
            var entProps = Entities.getEntityProperties(entities[i]);                  
            if (entProps.name === "timesup" && entProps.description === "") {
                createTimesUp();
                print("found timesup");
                Entities.editEntity(entProps.id,{description: "running"});                                     
            }
        }              
    }, 500);     
    
    Script.setTimeout(function () {
        setInterval();        
    }, WAIT_UNTILL_LOADED);     
});