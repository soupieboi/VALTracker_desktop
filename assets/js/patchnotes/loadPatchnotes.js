const fs = require('fs')
const showdown = require('showdown');
const converter = new showdown.Converter();
const ipc = require('electron').ipcRenderer;

$(document).ready(() => {
    ipc.send('changeDiscordRP', `patchnotes_activity`)
    var pathvar = document.location.pathname;
    var path2 = pathvar.substring(pathvar.indexOf('/'), pathvar.lastIndexOf('/'));
    var directoryName = path2.split("/").pop();

    if (directoryName == "CollectablePages") {
        var pjson = require('../package.json');
        $('#patchnotes-pageheader').append("Patchnotes for " + pjson.version)
    } else {
        var pjson = require('./package.json');
        $('#patchnotes-pageheader').append("Patchnotes for " + pjson.version)
    }
    $.ajax({
        url: `https://raw.githubusercontent.com/SpiritLetsPlays/VALTracker_src/main/PATCHNOTES.md`,
        type: 'get',
        success: function (data, xhr) {
            var html = converter.makeHtml(data);
            $('#patchnotes-wrapper').append(html);
        },
        error: function (jqXHR) {
            createErrorCard(this.url, jqXHR.status);
        }
    });
});