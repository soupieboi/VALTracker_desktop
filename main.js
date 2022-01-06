const {app, BrowserWindow} = require('electron');
const path = require('path');
const { autoUpdater } = require("electron-updater");
const log = require('electron-log');
const fs = require('fs');

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

let mainWindow;

function createWindow () {
    
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 800,
        minWidth: 1400,
        minHeight: 840,
        frame: false,
        backgroundColor: '#12171d',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            enableRemoteModule: true,
        }
    });

    var checkedFolder1 = app.getPath('userData') // '/settings'
    var checkedFolder2 = checkedFolder1 + '/settings/home' // '/settings'

    if (fs.existsSync(checkedFolder1)) { // Check for user data folder
        if(fs.existsSync(checkedFolder1 + '/settings')) { // Check for Settings Folder
            if(fs.existsSync(checkedFolder2)) { //Check for Home Folder in Settings folder
                var checkedPath1 = checkedFolder1 + '/settings/onLoad.json' //Var for onLoad.json
                var checkedPath2 = checkedFolder1 + '/settings/userData.json' //Var for userData.json
                var checkedPath3 = checkedFolder1 + '/settings/home/preferredMatchFilter.json' //Var for Home Match Filter json
                if(fs.existsSync(checkedPath1) && fs.existsSync(checkedPath2) && fs.existsSync(checkedPath3)) { // Check for 3 Base Files
                    let rawdata = fs.readFileSync(checkedFolder1 + '/settings/onLoad.json');
                    let data = JSON.parse(rawdata);
                    if(data.hasFinishedSetupSequence == false) { //If Base Files exist and onLoad returns false, load setup
                        var checkedFolder3 = checkedFolder1 + '/settings/playersearch' // '/playersearch folder'
                        var checkedPath4 = checkedFolder1 + '/settings/playersearch/preferredMatchFilter.json' //Preference File
                        if(fs.existsSync(checkedFolder3)) { //check for folder
                            if(fs.existsSync(checkedPath4)) { //check for file
                                mainWindow.loadFile('./setupSequence/index.html'); //load window
                            } else {
                                let matchFilterData = { 
                                    preferredMatchFilter: ""
                                };
                                 
                                let dataToWrite = JSON.stringify(matchFilterData);
                                fs.writeFileSync(checkedPath4, dataToWrite); //Create File
                                mainWindow.loadFile('./setupSequence/index.html'); //Load Setup
                            }
                        } else { //If folder does not exist
                            fs.mkdirSync(checkedFolder3); //create Folder
                            let matchFilterData = {
                                preferredMatchFilter: ""
                            };
                             
                            let dataToWrite = JSON.stringify(matchFilterData);
                            fs.writeFileSync(checkedPath4, dataToWrite); //create JSON File
                            mainWindow.loadFile('./setupSequence/index.html'); //Load Setup
                        }
                    } else {
                        var checkedFolder3 = checkedFolder1 + '/settings/playersearch' // '/playersearch folder'
                        var checkedPath4 = checkedFolder1 + '/settings/playersearch/preferredMatchFilter.json' //Preference File
                        if(fs.existsSync(checkedFolder3)) { //check for folder
                            if(fs.existsSync(checkedPath4)) { //check for file
                                log.info('YEP');
                                mainWindow.loadFile('./fakeLoadingIndex.html'); //load window
                            } else {
                                let matchFilterData = { 
                                    preferredMatchFilter: ""
                                };
                                 
                                let dataToWrite = JSON.stringify(matchFilterData);
                                fs.writeFileSync(checkedPath4, dataToWrite); //Create File
                                mainWindow.loadFile('./fakeLoadingIndex.html'); //Load Index
                            }
                        } else {
                            fs.mkdirSync(checkedFolder3); //create Folder
                            let matchFilterData = { 
                                preferredMatchFilter: ""
                            };
                             
                            let dataToWrite = JSON.stringify(matchFilterData);
                            fs.writeFileSync(checkedPath4, dataToWrite);
                            mainWindow.loadFile('./fakeLoadingIndex.html'); //Load Index
                        }
                    }
                } else { // Create Files and load setup
                    let onLoadFile = { 
                        hasFinishedSetupSequence: false
                    };
                     
                    let data = JSON.stringify(onLoadFile);
                    fs.writeFileSync(checkedFolder1 + '/settings/onLoad.json', data);
            
                    let userData = {
                        givenPlayerName: "",
                        givenPlayerTag: "",
                        foundPlayerUUID: ""
                    };
                     
                    let data2 = JSON.stringify(userData);
                    fs.writeFileSync(checkedFolder1 + '/settings/userData.json', data2);
            
                    let matchData = {
                        preferredMatchFilter: ""
                    };
                     
                    let data3 = JSON.stringify(matchData);
                    fs.writeFileSync(checkedFolder1 + '/settings/home/preferredMatchFilter.json', data3);
                    mainWindow.loadFile('./setupSequence/index.html'); 
                }
            } else { // Create Files and load setup
                fs.mkdirSync(checkedFolder2);
                let onLoadFile = { 
                    hasFinishedSetupSequence: false
                };
                 
                let data = JSON.stringify(onLoadFile);
                fs.writeFileSync(checkedFolder1 + '/settings/onLoad.json', data);
        
                let userData = {
                    givenPlayerName: "",
                    givenPlayerTag: "",
                    foundPlayerUUID: ""
                };
                 
                let data2 = JSON.stringify(userData);
                fs.writeFileSync(checkedFolder1 + '/settings/userData.json', data2);
        
                let matchData = {
                    preferredMatchFilter: ""
                };
                 
                let data3 = JSON.stringify(matchData);
                fs.writeFileSync(checkedFolder1 + '/settings/home/preferredMatchFilter.json', data3);
                mainWindow.loadFile('./setupSequence/index.html'); 
            }
        } else { // Create Files and load setup
            fs.mkdirSync(checkedFolder1 + '/settings');
            fs.mkdirSync(checkedFolder2);
            let onLoadFile = { 
                hasFinishedSetupSequence: false
            };
             
            let data = JSON.stringify(onLoadFile);
            fs.writeFileSync(checkedFolder1 + '/settings/onLoad.json', data);
    
            let userData = {
                givenPlayerName: "",
                givenPlayerTag: "",
                foundPlayerUUID: ""
            };
             
            let data2 = JSON.stringify(userData);
            fs.writeFileSync(checkedFolder1 + '/settings/userData.json', data2);
        
            let matchData = {
                preferredMatchFilter: ""
            };
             
            let data3 = JSON.stringify(matchData);
            fs.writeFileSync(checkedFolder1 + '/settings/home/preferredMatchFilter.json', data3);
            mainWindow.loadFile('./setupSequence/index.html'); 
        }
    } else { // Create Files and load setup
        fs.mkdirSync(checkedFolder1);
        fs.mkdirSync(checkedFolder1 + '/settings');
        fs.mkdirSync(checkedFolder2);
        let onLoadFile = { 
            hasFinishedSetupSequence: false
        };
         
        let data = JSON.stringify(onLoadFile);
        fs.writeFileSync(checkedFolder1 + '/settings/onLoad.json', data);

        let userData = {
            givenPlayerName: "",
            givenPlayerTag: "",
            foundPlayerUUID: ""
        };
         
        let data2 = JSON.stringify(userData);
        fs.writeFileSync(checkedFolder1 + '/settings/userData.json', data2);
        
        let matchData = {
            preferredMatchFilter: ""
        };
         
        let data3 = JSON.stringify(matchData);
        fs.writeFileSync(checkedFolder1 + '/settings/home/preferredMatchFilter.json', data3);
        mainWindow.loadFile('./setupSequence/index.html'); 
    }
    
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
    
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', function() {
    createWindow();
    autoUpdater.checkForUpdates();
});

function sendStatusToWindow(text) {
    log.info(text);
    mainWindow.webContents.send('message', text);
}

autoUpdater.on('checking-for-update', () => {
    sendStatusToWindow('Checking for update...');
})

autoUpdater.on('update-available', (info) => {
    sendStatusToWindow('Update available.');
    mainWindow.webContents.send('update-available');
})

autoUpdater.on('update-not-available', (info) => {
    sendStatusToWindow('Update not available.');
})

autoUpdater.on('error', (err) => {
    sendStatusToWindow('Error in auto-updater. ' + err);
})

autoUpdater.on('download-progress', (progressObj) => {
    let log_message = "Download speed: " + progressObj.bytesPerSecond;
    log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
    log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
    sendStatusToWindow(log_message);
    mainWindow.webContents.send('download-percent', progressObj.percent);
})

autoUpdater.on('update-downloaded', (info) => {
    sendStatusToWindow('Update downloaded');
    mainWindow.webContents.send('showUpdateWindow');
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});