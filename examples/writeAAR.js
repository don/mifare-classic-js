#!/usr/bin/env node

var ndef = require('ndef'),
    mifare = require('..'),
    message,
    bytes,
    vcard;
    
message = [
    ndef.record(ndef.TNF_EXTERNAL, 'android.com:pkg' , [], 'com.joelapenna.foursquared')
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
