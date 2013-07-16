#!/usr/bin/env node

var ndef = require('ndef'),
    mifare = require('../ndef-mifare-classic'),
    message,
    bytes;
        
message = [
    ndef.uriRecord("http://nfc-tools.org"),
    ndef.textRecord("Hello from nodejs"),
    ndef.emptyRecord()
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
