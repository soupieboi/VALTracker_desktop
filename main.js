const {app, BrowserWindow} = require('electron');
const path = require('path');

let mainWindow;

function createWindow () {
    
    mainWindow = new BrowserWindow({
        width: 1100,
        height: 700,
        minWidth: 1100,
        minHeight: 700,
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

//electron-packager . --platform=win32 --arch=x64 VALTracker --overwrite
//node build_installer.js