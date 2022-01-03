const fs = require('fs')
const showdown  = require('showdown');
const converter = new showdown.Converter();

$(document).ready(() => {
    fs.readFile('PATCHNOTES.txt', 'utf8', (err, data) => {
        var html = converter.makeHtml(data);
        $('#patchnotes-wrapper').append(html)
    });
    var pathvar = document.location.pathname;
    var path2 = pathvar.substring(pathvar.indexOf('/'), pathvar.lastIndexOf('/'));
    var directoryName = path2.split("/").pop();
  
    if(directoryName == "CollectablePages") {
      var pjson = require('../package.json');
      $('#patchnotes-pageheader').append("Patchnotes for " + pjson.version)
    } else {
      var pjson = require('./package.json');
      $('#patchnotes-pageheader').append("Patchnotes for " + pjson.version)
    }
});