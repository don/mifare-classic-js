#!/usr/bin/env node

var mifare = require('../ndef-mifare-classic');
    
mifare.format(function(err) {
    if (err) {
        console.log("Format failed ");
        console.log(err);
    } else {
        console.log("OK");
    }
});
