#!/usr/bin/env node

var ndef = require('ndef'),
    mifare = require('..');

mifare.read(function(err, buffer, uid) {
    if (err) {
        console.log("Read failed ");
        console.log(err);
    } else {
        // decodeMessage expects and array of bytes e.g. [0x03, 0x13, 0xd1]
        var bytes = buffer.toJSON().data;
        var message = ndef.decodeMessage(bytes);

        console.log('Tag UID is', uid);
        console.log("Found NDEF message with " + message.length +
            (message.length === 1 ? " record" : " records" ));
        console.log(ndef.stringify(message));
    }
})
