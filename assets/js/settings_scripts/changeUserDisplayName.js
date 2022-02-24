const replaceText2 = (text) => {
    const element2 = document.getElementById("replace-textspan-2");
    if (element2) element2.innerText = text
}
$(document).ready(() => {
    ipc.send('changeDiscordRP', `settings_activity`)
    var usernameSettingsFile = process.env.APPDATA + '/VALTracker/user_data/home_settings/settings.json'
    if(!fs.existsSync(usernameSettingsFile)) {
        let newUserName = {
            displayedUserName: ""
        };
         
        let dataToWrite = JSON.stringify(newUserName);
        fs.writeFileSync(usernameSettingsFile, dataToWrite); //Create File
    }
    
    let rawdata = fs.readFileSync(process.env.APPDATA + '/VALTracker/user_data/home_settings/settings.json');
    let dataToRead = JSON.parse(rawdata);
    $('#settings-home-username-input').val(dataToRead.displayedUserName);
    $('#change-home-username-button').on("click", function() {
        var newNameVal = document.getElementById('settings-home-username-input').value;
        dataToRead.displayedUserName = newNameVal;

        let dataToWrite = JSON.stringify(dataToRead);
        fs.writeFileSync(usernameSettingsFile, dataToWrite);

        $('#settings-home-username-input').val(dataToRead.displayedUserName);
        replaceText2("Displayed Username changed!")
    })
    $('#reset-home-username-button').on("click", function() {
        dataToRead.displayedUserName = "";

        let dataToWrite = JSON.stringify(dataToRead);
        fs.writeFileSync(usernameSettingsFile, dataToWrite);
        
        $('#settings-home-username-input').val("");
        replaceText2("Displayed Username reset!")
    })
})