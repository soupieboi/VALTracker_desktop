const {app, BrowserWindow} = require('electron');
const path = require('path');
import { autoUpdater } from "electron-updater"

let mainWindow;

function createWindow () {
    
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        minWidth: 1200,
        minHeight: 800,
        frame: false,
        backgroundColor: '#12171d',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            enableRemoteModule: true,
        }
    });

    mainWindow.loadFile('./index.html');
    
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', function() {
    createWindow();
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

const sendStatusToWindow = (text) => {
    log.info(text);
    if(mainWindow) {
        mainWindow.webContents.send('message', text)
    }
}

autoUpdater.on('checking-for-update', () => {
    sendStatusToWindow('Checking for update...');
});

autoUpdater.on('update-available', info => {
    sendStatusToWindow('Update found.');
});

autoUpdater.on('update-not-available', info => {
    sendStatusToWindow('No updates found.');
});

autoUpdater.on('error', err => {
    sendStatusToWindow(`Encuntered an Error while updating: ${err.toString()}`);
});

autoUpdater.on('download-progress', progressObj => {
    sendStatusToWindow(`Download speed: ${progressObj.bytesPerSecond} - Downloaded ${progressObj.percent}%`);
});

autoUpdater.on('update-downloaded', info => {
    sendStatusToWindow('Update downloaded, will install now.');
    autoUpdater.quitAndInstall();
});

//npm run build