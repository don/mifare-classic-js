#!/usr/bin/env node

var ndef = require('ndef'),
    mifare = require('../ndef-mifare-classic'),
    message,
    bytes,
    hueSettings;
  
// setting object for app the controls hue lights    
hueSettings = {
    "1": {
        "state": {
            "on": true,
            "bri": 65,
            "hue": 44591,
            "sat": 254
        }
    },
    "2": {
        "state": {
            "on": true,
            "bri": 254,
            "hue": 13122,
            "sat": 211
        }
    },
    "3": {
        "state": {
            "on": true,
            "bri": 255,
            "hue": 14922,
            "sat": 144
        }
    }
}
    
message = [
    ndef.mimeMediaRecord("text/hue", JSON.stringify(hueSettings));
];

bytes = ndef.encodeMessage(message);

mifare.write(bytes, function(err) {
    if (err) {
        console.log("Write failed ");
        console.log(err);
    } else {
        console.log("OK");
    }
});
