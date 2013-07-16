#!/usr/bin/env node

var ndef = require('ndef'),
    mifare = require('../ndef-mifare-classic'),
    message,
    bytes;
    
// a smart poster's payload is an NDEF message    
message = [
    ndef.smartPoster(
        [
            ndef.uriRecord("http://shop.oreilly.com/product/0636920021193.do"),
            ndef.textRecord("Beginning NFC")            
        ]
    ),
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
