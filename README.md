## Read and Write NDEF bytes to Mifare Classic Tags

This module reads and writes NDEF bytes to Mifare Classic NFC tags. The module is a wrapper around [libfreefare](https://code.google.com/p/libfreefare/) command line tools.

## Requires 

* [libfreefare](https://code.google.com/p/libfreefare/) 14219ab1451f7c4e4da51acb6f8524924ec039e6 or newer
* [libnfc](https://code.google.com/p/libnfc/) 1.7.0-rc7 or greater

## API

### mifare.read(callback)

* callback - function
    
    mifare.read(function (err, data) {
      if (err) throw err;
      var message = ndef.decodeMessage(buffer.toJSON());
      console.log(util.stringify(message));
    });
    
The callback is passed two arguments (err, data), where data is the contents of the file
    
### mifare.write(data, callback)
    
* bytes - byte array of ndef data
* callback - function
    
    mifare.write(bytes, function (err) {
      if (err) throw err;
      console.log("OK");
    });
    
### mifare.format(callback)

* callback - function
    
    mifare.format(function (err) {
      if (err) throw err;
      console.log("OK");
    });
