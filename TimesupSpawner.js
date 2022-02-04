var LOCATION_ROOT_URL = Script.resolvePath("."); 
var timesUpID = Entities.addEntity( {
    type: "Model",
    name: "timesup",        
    modelURL: LOCATION_ROOT_URL + "timesup3.fbx?"+ Date.now(),
    serverScripts: LOCATION_ROOT_URL + "timesUpServer.js?" + Date.now(),
    position: Vec3.sum(MyAvatar.position, Vec3.multiplyQbyV(MyAvatar.orientation, { x: 0, y: 1.16, z: -4 })),  
    rotation: MyAvatar.orientation,  
    visible: true,            
    description: "",        
    lifetime: -1,            
    userData: JSON.stringify({
        grabbableKey: { grabbable: false, triggerable: false }
    } )                          
});
Script.stop();
