#!/usr/bin/env node

var ndef = require('ndef'),
    mifare = require('..');

mifare.read(function(err, buffer, uid) {
    if (err) {
        console.log("Read failed ");
        console.log(err);
    } else {
        var message = ndef.decodeMessage(buffer);

        console.log('\nTag UID is', uid);
        console.log("Found NDEF message with " + message.length +
            (message.length === 1 ? " record" : " records" ));
        console.log(ndef.stringify(message));
    }
})
