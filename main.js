const {app, autoUpdater, BrowserWindow} = require('electron');
const path = require('path');

let mainWindow;

function createWindow () {
    
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        backgroundColor: '#FFF',
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
    var updateApp = require('update-electron-app');

    updateApp({
        updateInterval: '1 hour',
        notifyUser: true
    });
    createWindow();
    setInterval(() => {
        autoUpdater.checkForUpdates()
    }, 30000)
});

autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
    //
})

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