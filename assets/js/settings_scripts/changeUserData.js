const fs = require('fs')
var ipc = require('electron').ipcRenderer;
const replaceText = (text) => {
    const element = document.getElementById("replace-textspan");
    if (element) element.innerText = text
}
$(document).ready(() => {
    ipc.send('changeDiscordRP', `settings_activity`)
    let rawdata = fs.readFileSync(process.env.APPDATA + '/VALTracker/settings/userData.json');
    let dataToRead = JSON.parse(rawdata);
    $('#settings-username-input').val(dataToRead.playerName);
    $('#settings-usertag-input').val(dataToRead.playerTag);
    $('#change-userdata-button').on("click", function() {
        var newNameVal = document.getElementById('settings-username-input').value;
        var newTagVal = document.getElementById('settings-usertag-input').value;
        $.ajax({
            url: `https://api.henrikdev.xyz/valorant/v1/account/${newNameVal}/${newTagVal}`,
            type: 'get',
            success: function(data, xhr) {
                dataToRead.playerName = data.data.name
                dataToRead.playerTag = data.data.tag
                dataToRead.playerUUID = data.data.puuid
                dataToRead.playerRegion = data.data.region

                let dataToWrite = JSON.stringify(dataToRead);
                fs.writeFileSync(process.env.APPDATA + '/VALTracker/settings/userData.json', dataToWrite);
                replaceText('Settings Changed!');
                $('#settings-username-input').val(data.data.name);
                $('#settings-usertag-input').val(data.data.tag);
            },
            error: function(xhr) {
                if (xhr.status == 400) {
                    replaceText('400, Bad Request');
                }
                if (xhr.status == 401) {
                    replaceText('401, Unauthorized');
                }
                if (xhr.status == 403) {
                    replaceText('403, Name/Tag Missing!');
                }
                if (xhr.status == 404) {
                    replaceText('404, No player found!');
                }
                if (xhr.status == 405) {
                    replaceText('405, Not allowed!');
                }
                if (xhr.status == 415) {
                    replaceText('415, unsupported Media Type');
                }
                if (xhr.status == 429) {
                    replaceText('429, Rate limit exceeded, try again later');
                }
                if (xhr.status == 500) {
                    replaceText('500, Internal Server Error');
                }
                if (xhr.status == 502) {
                    replaceText('502, Bad Gateway');
                }
                if (xhr.status == 503) {
                    replaceText('503, Service unavailable');
                }
                if (xhr.status == 504) {
                    replaceText('504, Gateway timeout');
                }
            },
        });
    })
})