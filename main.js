const {app, BrowserWindow} = require('electron');
const path = require('path');
const { autoUpdater } = require('electron-updater');
const isDev = require('electron-is-dev');
const fs = require('fs')

//Logger
autoUpdater.logger = require('electron-log');
autoUpdater.logger.transports.file.level = 'info';

autoUpdater.on('checking-for-update', () => {
    console.log("Checking for Updates...");
});

autoUpdater.on('update-available', (info) => {
    console.log("Update available!");
    console.log("Version: ", info.version);
    console.log("Release Date: ");
});

autoUpdater.on('update-not-available', () => {
    console.log("No Update found.");
});

autoUpdater.on('download-progress', (progress) => {
    console.log(`Progress: ${Math.floor(progress.percent)}`);
});

autoUpdater.on('update-downloaded', (info) => {
    console.log("Update downloaded. App will restart.");
    autoUpdater.quitAndInstall();
});

autoUpdater.on('error', (error) => {
    console.log(error);
});

const windows = {};

let mainWindow;

function createWindow () {
    
    mainWindow = new BrowserWindow({
        width: 1100,
        height: 700,
        minWidth: 1100,
        minHeight: 700,
        frame: false,
        backgroundColor: '#2d2d2d',
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
    if(!isDev) {
        autoUpdater.checkForUpdates();
    }
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