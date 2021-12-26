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
        minHeight: 800,
        frame: false,
        backgroundColor: '#12171d',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            enableRemoteModule: true,
        }
    });
    var checkedFolder1 = './settings'

    if (fs.existsSync(checkedFolder1)) {
        var checkedPath1 = './settings/onLoad.json'
        var checkedPath2 = './settings/userData.json'
        if(fs.existsSync(checkedPath1) && fs.existsSync(checkedPath2)) {
            let rawdata = fs.readFileSync('./settings/onLoad.json');
            let data = JSON.parse(rawdata);
            if(data.hasFinishedSetupSequence == false) {
                mainWindow.loadFile('./setupSequence/index.html'); 
            } else {
                mainWindow.loadFile('./index.html');
            }
        } else {
            let onLoadFile = { 
                hasFinishedSetupSequence: false
            };
             
            let data = JSON.stringify(onLoadFile);
            fs.writeFileSync('./settings/onLoad.json', data);
    
            let userData = {
                givenPlayerName: "",
                givenPlayerTag: "",
                foundPlayerUUID: ""
            };
             
            let data2 = JSON.stringify(userData);
            fs.writeFileSync('./settings/userData.json', data2);
            mainWindow.loadFile('./setupSequence/index.html'); 
        }
    } else {
        fs.mkdirSync(checkedFolder1);
        let onLoadFile = { 
            hasFinishedSetupSequence: false
        };
         
        let data = JSON.stringify(onLoadFile);
        fs.writeFileSync('./settings/onLoad.json', data);

        let userData = {
            givenPlayerName: "",
            givenPlayerTag: "",
            foundPlayerUUID: ""
        };
         
        let data2 = JSON.stringify(userData);
        fs.writeFileSync('./settings/userData.json', data2);
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

//npm run build