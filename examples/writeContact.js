#!/usr/bin/env node

var ndef = require('ndef'),
    mifare = require('..'),
    message,
    bytes,
    vcard;
    
vcard = 'BEGIN:VCARD\n' +
    'VERSION:2.1\n' +
    'N:Coleman;Don;;;\n' +
    'FN:Don Coleman\n' +
    'ORG:Chariot Solutions;\n' +
    'URL:http://chariotsolutions.com\n' +
    'TEL;WORK:215-358-1780\n' +
    'EMAIL;WORK:don@example.com\n' +
    'END:VCARD'
    
message = [
    ndef.mimeMediaRecord('text/x-vCard', vcard)
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
