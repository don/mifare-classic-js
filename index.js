var spawn = require('child_process').spawn,
    fs = require('fs'),
    fileName = 'ndef.bin'; // TODO use temp files

function defaultCallback(err) {
    if (err) { throw err; }
}

function defaultReadCallback(err, data) {
    if (err) { throw err; }
    console.log(data);
}

// callback(err, data)
// data is stream of ndef bytes from the tag
function read(callback) {

    var errorMessage = "",
        result = "",          // string for stdout from process
        readMifareClassic = spawn('mifare-classic-read-ndef', [ '-y', '-o', fileName]);

    if (!callback) { callback = defaultReadCallback; }

    readMifareClassic.stdout.on('data', function (data) {
        process.stdout.write(data + "");
        result += data;
    });

    readMifareClassic.stderr.on('data', function (data) {
        errorMessage += data;
        // console.log('stderr: ' + data);
    });

    readMifareClassic.on('close', function (code) {
        if (!result.includes('Found')) {    // If stdout does not contain
            errorMessage = "No tag found";  // "Found"
        }                                   // then there should be an error
        if (code === 0 && errorMessage.length === 0) {
            fs.readFile(fileName, function (err, data) {
                callback(err, data);
                fs.unlinkSync(fileName);
            });
        } else {
            callback(errorMessage);
        }
    });
}

// callback(err)
function write(data, callback) {

    var buffer = Buffer.from(data),
        errorMessage = "",
        result = "";

    if (!callback) { callback = defaultCallback; }

    fs.writeFile(fileName, buffer, function(err) {
        if (err) callback(err);
        writeMifareClassic = spawn('mifare-classic-write-ndef', [ '-y', '-i', fileName]);

        writeMifareClassic.stdout.on('data', function (data) {
            process.stdout.write(data + "");
            result += data;
        });

        writeMifareClassic.stderr.on('data', function (data) {
            errorMessage += data;
            //console.log('stderr: ' + data);
        });

        writeMifareClassic.on('close', function (code) {
            if (!result.includes('Found')) {    // If stdout does not contain
                errorMessage = "No tag found";  // "Found"
            }                                   // then there should be an error
            if (code === 0 && errorMessage.length === 0) {
                callback(null);
                fs.unlinkSync(fileName);
            } else {
                callback(errorMessage);
            }
        });
    });
}

function format(callback) {

    var errorMessage,
      result;

    if (!callback) { callback = defaultCallback; }

    formatMifareClassic = spawn('mifare-classic-format', [ '-y']);

    formatMifareClassic.stdout.on('data', function (data) {
        process.stdout.write(data + "");
        result += data;
    });
    
    formatMifareClassic.stderr.on('data', function (data) {
        errorMessage += data;
        // console.log('stderr: ' + data);
    });

    formatMifareClassic.on('close', function (code) {
        if (!result.includes('Found')) {    // If stdout does not contain
            errorMessage = "No tag found";  // "Found"
        }                                   // then there should be an error
        if (code === 0 && errorMessage.length === 0) {
            callback(null);
        } else {
            callback(errorMessage);
        }
    });
}

module.exports = {
    read: read,
    write: write,
    format: format
};
