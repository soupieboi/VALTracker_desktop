const {app, BrowserWindow, dialog} = require('electron');
const ipc = require('electron').ipcMain
const path = require('path');
const { autoUpdater } = require("electron-updater");
const log = require('electron-log');
const fs = require('fs');
const RPC = require('discord-rpc');
const { session } = require('electron')
const { Agent } = require('https');
const axios = require('axios').default;

const discordClient = new RPC.Client({transport: "ipc"});

const starting_activity = {
    details: "Starting VALTracker...",
    assets: {
        large_image: "valtracker_logo",
        large_text: "VALTracker.gg",
        //small_image: "",
        //small_text: "",
    },
    buttons: [
        {
            "label": "Download VALTracker",
            "url": "https://valtracker.gg"
        },
        {
            "label": "Join the Discord",
            "url": "https://discord.gg/aJfQ4yHysG"
        }
    ],
    timestamps: {start: Date.now()},
    instance: true
}

const hub_activity = {
    details: "Browsing Hub",
    assets: {
        large_image: "valtracker_logo",
        large_text: "VALTracker.gg",
        small_image: "user-home",
        small_text: "User Hub",
    },
    buttons: [
        {
            "label": "Download VALTracker",
            "url": "https://valtracker.gg"
        },
        {
            "label": "Join the Discord",
            "url": "https://discord.gg/aJfQ4yHysG"
        }
    ],
    timestamps: {start: Date.now()},
    instance: true
}

const skins_activity = {
    details: "Browsing Skins",
    assets: {
        large_image: "valtracker_logo",
        large_text: "VALTracker.gg",
        small_image: "gun",
        small_text: "Browsing Skins",
    },
    buttons: [
        {
            "label": "Download VALTracker",
            "url": "https://valtracker.gg"
        },
        {
            "label": "Join the Discord",
            "url": "https://discord.gg/aJfQ4yHysG"
        }
    ],
    timestamps: {start: Date.now()},
    instance: true
}

const bundles_activity = {
    details: "Browsing Bundles",
    assets: {
        large_image: "valtracker_logo",
        large_text: "VALTracker.gg",
        small_image: "gun",
        small_text: "Browsing Bundles",
    },
    buttons: [
        {
            "label": "Download VALTracker",
            "url": "https://valtracker.gg"
        },
        {
            "label": "Join the Discord",
            "url": "https://discord.gg/aJfQ4yHysG"
        }
    ],
    timestamps: {start: Date.now()},
    instance: true
}

const pprofile_acitivity = {
    details: "Browsing a player's profile",
    assets: {
        large_image: "valtracker_logo",
        large_text: "VALTracker.gg",
        small_image: "user-profile",
        small_text: "Browsing a player's profile",
    },
    buttons: [
        {
            "label": "Download VALTracker",
            "url": "https://valtracker.gg"
        },
        {
            "label": "Join the Discord",
            "url": "https://discord.gg/aJfQ4yHysG"
        }
    ],
    timestamps: {start: Date.now()},
    instance: true
}

const favmatches_acitivity = {
    details: "Browsing favourite matches",
    assets: {
        large_image: "valtracker_logo",
        large_text: "VALTracker.gg",
        small_image: "user-home",
        small_text: "Browsing favourite matches",
    },
    buttons: [
        {
            "label": "Download VALTracker",
            "url": "https://valtracker.gg"
        },
        {
            "label": "Join the Discord",
            "url": "https://discord.gg/aJfQ4yHysG"
        }
    ],
    timestamps: {start: Date.now()},
    instance: true
}

const playersearch_acitivity = {
    details: "Searching for a player",
    assets: {
        large_image: "valtracker_logo",
        large_text: "VALTracker.gg",
        small_image: "search",
        small_text: "Searching for a player",
    },
    buttons: [
        {
            "label": "Download VALTracker",
            "url": "https://valtracker.gg"
        },
        {
            "label": "Join the Discord",
            "url": "https://discord.gg/aJfQ4yHysG"
        }
    ],
    timestamps: {start: Date.now()},
    instance: true
}

const settings_acitivity = {
    details: "Editing settings",
    assets: {
        large_image: "valtracker_logo",
        large_text: "VALTracker.gg",
        small_image: "settings",
        small_text: "Editing settings",
    },
    buttons: [
        {
            "label": "Download VALTracker",
            "url": "https://valtracker.gg"
        },
        {
            "label": "Join the Discord",
            "url": "https://discord.gg/aJfQ4yHysG"
        }
    ],
    timestamps: {start: Date.now()},
    instance: true
}

const patchnotes_acitivity = {
    details: "Browsing the patchnotes",
    assets: {
        large_image: "valtracker_logo",
        large_text: "VALTracker.gg",
        small_image: "patchnotes",
        small_text: "Browsing patchnotes",
    },
    buttons: [
        {
            "label": "Download VALTracker",
            "url": "https://valtracker.gg"
        },
        {
            "label": "Join the Discord",
            "url": "https://discord.gg/aJfQ4yHysG"
        }
    ],
    timestamps: {start: Date.now()},
    instance: true
}

const anonymous_activity = {
    details: "Browsing VALTracker",
    assets: {
        large_image: "valtracker_logo",
        large_text: "VALTracker.gg",
        //small_image: "",
        //small_text: "",
    },
    buttons: [
        {
            "label": "Open VALTracker",
            "url": "valtracker-ptcl://open"
        },
        {
            "label": "Download VALTracker",
            "url": "https://valtracker.gg"
        }
    ],
    timestamps: {start: Date.now()},
    instance: true
}

discordClient.on("ready", () => {
    let onLoadData2 = fs.readFileSync(process.env.APPDATA + '/VALTracker/user_data/onLoad.json')
    let loadData2 = JSON.parse(onLoadData2)
    if(loadData2.hasDiscordRPenabled == true) {
        discordClient.request("SET_ACTIVITY", {pid: process.pid, activity: starting_activity});
    }
    else if(loadData2.hasDiscordRPenabled == "anonymous") {
        discordClient.request("SET_ACTIVITY", {pid: process.pid, activity: anonymous_activity});
    } else if(loadData2.hasDiscordRPenabled == false) {
    }
})

ipc.on('changeDiscordRP', function(event, arg) {
    let onLoadData3 = fs.readFileSync(process.env.APPDATA + '/VALTracker/user_data/onLoad.json')
    let loadData3 = JSON.parse(onLoadData3)
    if(loadData3.hasDiscordRPenabled == true) {
        switch(arg) {
            case "hub_activity":
                discordClient.request("SET_ACTIVITY", {pid: process.pid, activity: hub_activity});
                break;
            case "skins_activity":
                discordClient.request("SET_ACTIVITY", {pid: process.pid, activity: skins_activity});
                break;
            case "bundle_acitivity":
                discordClient.request("SET_ACTIVITY", {pid: process.pid, activity: bundles_activity});
                break;
            case "pprofile_acitivity":
                discordClient.request("SET_ACTIVITY", {pid: process.pid, activity: pprofile_acitivity});
                break;
            case "favmatches_activity":
                discordClient.request("SET_ACTIVITY", {pid: process.pid, activity: favmatches_acitivity});
                break;
            case "playersearch_acitivity":
                discordClient.request("SET_ACTIVITY", {pid: process.pid, activity: playersearch_acitivity});
                break;
            case "settings_activity":
                discordClient.request("SET_ACTIVITY", {pid: process.pid, activity: settings_acitivity});
                break;
            case "patchnotes_activity":
                discordClient.request("SET_ACTIVITY", {pid: process.pid, activity: patchnotes_acitivity});
                break;
        }
    }
    else if(loadData3.hasDiscordRPenabled == "anonymous") {
        discordClient.request("SET_ACTIVITY", {pid: process.pid, activity: anonymous_activity});
    }
});

discordClient.login({ clientId: "933753504558903406" })

if(process.defaultApp) {
    if(process.argv.length >= 2) {
        app.setAsDefaultProtocolClient('valtracker-ptcl', process.execPath, [path.resolve(process.argv[1])])
    }
} else {
    app.setAsDefaultProtocolClient('valtracker-ptcl')
}

const gotTheLock = app.requestSingleInstanceLock()

if(!gotTheLock) {
    app.quit()
} else {
    app.on('second-instance', (event, CommandLine, workingDirectory) => {
        if(mainWindow) {
            if(mainWindow.isMinimized()) mainWindow.restore()
            mainWindow.focus()
        }
    })
}

app.on('open-url', (event, url) => {
    dialog.showErrorBox('Welcome Back', `You arrived from: ${url}`)
})

const client = require('https');

function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        client.get(url, (res) => {
            if (res.statusCode === 200) {
                res.pipe(fs.createWriteStream(filepath))
                    .on('error', reject)
                    .once('close', () => resolve(filepath));
            } else {
                // Consume response data to free up memory
                res.resume();
                reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));

            }
        });
    });
}

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
            contextIsolation: false,
        }
    });

    var checkedFolder1 = app.getPath('userData') // '/settings'
    var checkedFolder2 = checkedFolder1 + '/user_data/home' // '/settings'
    if(!fs.existsSync(checkedFolder1 + '/user_data')) {
        fs.mkdirSync(checkedFolder1 + '/user_data');
        fs.mkdirSync(checkedFolder2);
        let onLoadFile = { 
            hasFinishedSetupSequence: false,
            hasDiscordRPenabled: true,
            hasReadLatestPatchnotes: false,
        };
         
        let data = JSON.stringify(onLoadFile);
        fs.writeFileSync(checkedFolder1 + '/user_data/onLoad.json', data);

        let userData = {
            givenPlayerName: "",
            givenPlayerTag: "",
            foundPlayerUUID: ""
        };
         
        let data2 = JSON.stringify(userData);
        fs.writeFileSync(checkedFolder1 + '/user_data/userData.json', data2);
        
        let matchData = {
            preferredMatchFilter: ""
        };
         
        let data3 = JSON.stringify(matchData);
        fs.writeFileSync(checkedFolder1 + '/user_data/home/preferredMatchFilter.json', data3);
        mainWindow.loadFile('./setupSequence/index.html'); 
    }

    if(!fs.existsSync(process.env.APPDATA + "/VALTracker/user_data/customThemes")) {
        fs.mkdirSync(process.env.APPDATA + "/VALTracker/user_data/customThemes")
    }

    if (fs.existsSync(checkedFolder1)) { // Check for user data folder
        if(fs.existsSync(checkedFolder1 + '/settings')) {
            fs.renameSync(checkedFolder1 + '/settings', checkedFolder1 + '/user_data')
        }
        if(fs.existsSync(checkedFolder1 + '/user_data')) { // Check for Settings Folder
            if(fs.existsSync(checkedFolder2)) { //Check for Home Folder in Settings folder
                var checkedPath1 = checkedFolder1 + '/user_data/onLoad.json' //Var for onLoad.json
                var checkedPath2 = checkedFolder1 + '/user_data/userData.json' //Var for userData.json
                var checkedPath3 = checkedFolder1 + '/user_data/home/preferredMatchFilter.json' //Var for Home Match Filter json
                if(fs.existsSync(checkedPath1) && fs.existsSync(checkedPath2) && fs.existsSync(checkedPath3)) { // Check for 3 Base Files
                    let rawdata = fs.readFileSync(checkedFolder1 + '/user_data/onLoad.json');
                    let data = JSON.parse(rawdata);
                    if(data.hasFinishedSetupSequence == false) { //If Base Files exist and onLoad returns false, load setup
                        var checkedFolder3 = checkedFolder1 + '/user_data/playersearch' // '/playersearch folder'
                        var checkedPath4 = checkedFolder1 + '/user_data/playersearch/preferredMatchFilter.json' //Preference File
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
                        var checkedFolder3 = checkedFolder1 + '/user_data/playersearch' // '/playersearch folder'
                        var checkedPath4 = checkedFolder1 + '/user_data/playersearch/preferredMatchFilter.json' //Preference File
                        if(fs.existsSync(checkedFolder3)) { //check for folder
                            if(fs.existsSync(checkedPath4)) { //check for file
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
                    fs.writeFileSync(checkedFolder1 + '/user_data/onLoad.json', data);
            
                    let userData = {
                        givenPlayerName: "",
                        givenPlayerTag: "",
                        foundPlayerUUID: ""
                    };
                     
                    let data2 = JSON.stringify(userData);
                    fs.writeFileSync(checkedFolder1 + '/user_data/userData.json', data2);
            
                    let matchData = {
                        preferredMatchFilter: ""
                    };
                     
                    let data3 = JSON.stringify(matchData);
                    fs.writeFileSync(checkedFolder1 + '/user_data/home/preferredMatchFilter.json', data3);
                    mainWindow.loadFile('./setupSequence/index.html'); 
                }
            } else { // Create Files and load setup
                fs.mkdirSync(checkedFolder2);
                let onLoadFile = { 
                    hasFinishedSetupSequence: false,
                    hasDiscordRPenabled: true
                };
                 
                let data = JSON.stringify(onLoadFile);
                fs.writeFileSync(checkedFolder1 + '/user_data/onLoad.json', data);
        
                let userData = {
                    givenPlayerName: "",
                    givenPlayerTag: "",
                    foundPlayerUUID: ""
                };
                 
                let data2 = JSON.stringify(userData);
                fs.writeFileSync(checkedFolder1 + '/user_data/userData.json', data2);
        
                let matchData = {
                    preferredMatchFilter: ""
                };
                 
                let data3 = JSON.stringify(matchData);
                fs.writeFileSync(checkedFolder1 + '/user_data/home/preferredMatchFilter.json', data3);
                mainWindow.loadFile('./setupSequence/index.html'); 
            }
        } else { // Create Files and load setup
            fs.mkdirSync(checkedFolder1 + '/user_data');
            fs.mkdirSync(checkedFolder2);
            let onLoadFile = { 
                hasFinishedSetupSequence: false,
                hasDiscordRPenabled: true
            };
             
            let data = JSON.stringify(onLoadFile);
            fs.writeFileSync(checkedFolder1 + '/user_data/onLoad.json', data);
    
            let userData = {
                givenPlayerName: "",
                givenPlayerTag: "",
                foundPlayerUUID: ""
            };
             
            let data2 = JSON.stringify(userData);
            fs.writeFileSync(checkedFolder1 + '/user_data/userData.json', data2);
        
            let matchData = {
                preferredMatchFilter: ""
            };
             
            let data3 = JSON.stringify(matchData);
            fs.writeFileSync(checkedFolder1 + '/user_data/home/preferredMatchFilter.json', data3);
            mainWindow.loadFile('./setupSequence/index.html'); 
        }
    } else { // Create Files and load setup
        fs.mkdirSync(checkedFolder1);
        fs.mkdirSync(checkedFolder1 + '/user_data');
        fs.mkdirSync(checkedFolder2);
        let onLoadFile = { 
            hasFinishedSetupSequence: false,
            hasDiscordRPenabled: true
        };
         
        let data = JSON.stringify(onLoadFile);
        fs.writeFileSync(checkedFolder1 + '/user_data/onLoad.json', data);

        let userData = {
            givenPlayerName: "",
            givenPlayerTag: "",
            foundPlayerUUID: ""
        };
         
        let data2 = JSON.stringify(userData);
        fs.writeFileSync(checkedFolder1 + '/user_data/userData.json', data2);
        
        let matchData = {
            preferredMatchFilter: ""
        };
         
        let data3 = JSON.stringify(matchData);
        fs.writeFileSync(checkedFolder1 + '/user_data/home/preferredMatchFilter.json', data3);
        mainWindow.loadFile('./setupSequence/index.html'); 
    }

    if(!fs.existsSync(process.env.APPDATA + '/VALTracker/user_data/colorTheme.json')) {
        var dataToWrite = {
            "app_color": "#12171d",
            "app_subcolor_1": "#1b222b",
            "app_subcolor_2": "#242e3a",
            "gradient_left": "#c80043",
            "gradient_right": "#6f00ff",
            "box_shadow": "0 0 2.5px rgba(255, 0, 67, 0.7), 0 0 10px rgba(255, 0, 67, 0.7), 0 0 30px rgba(255, 0, 67, 0.7)",
            "text_shadow": "0 0 5px rgba(255, 0, 67, 0.6), 0 0 20px rgba(255, 0, 67, 0.6), 0 0 60px rgba(255, 0, 67, 0.6)",
            "button_color": "#c80043",
            "button_hover_color": "#ff0055",
            "logo_style": "default",
            "button_color_var": "#ffffff",
            "global_color": "#ffffff",
            "loadCustomTheme": false
        }
    
        fs.writeFileSync(process.env.APPDATA + '/VALTracker/user_data/colorTheme.json', JSON.stringify(dataToWrite))
    }

    let rawColorData = fs.readFileSync(process.env.APPDATA + '/VALTracker/user_data/colorTheme.json');
    let colorData = JSON.parse(rawColorData);
    
    const folderToCheck = process.env.APPDATA + "/VALTracker/img"
    if(!fs.existsSync(folderToCheck)) {
        fs.mkdirSync(folderToCheck);
    }
    
    if(colorData.logo_style == undefined) {
        if(!fs.existsSync(process.env.APPDATA + `/VALTracker/img/VALTracker_Logo_default.png`)) {
            downloadImage(`https://valtracker.gg/app_img/iconss/VALTracker_Logo_default.png`, process.env.APPDATA + `/VALTracker/img/VALTracker_Logo_default.png`)
        }
    
        var iconInterval = setInterval(changeIcon, 100)
    
        function changeIcon() {
            if(fs.existsSync(process.env.APPDATA + `/VALTracker/img/VALTracker_Logo_default.png`)) {
                mainWindow.setIcon(process.env.APPDATA + `/VALTracker/img/VALTracker_Logo_default.png`)
                clearInterval(iconInterval);
            }
        }
    } else {
        if(!fs.existsSync(process.env.APPDATA + `/VALTracker/img/VALTracker_Logo_${colorData.logo_style}.png`)) {
            downloadImage(`https://valtracker.gg/app_img/iconss/VALTracker_Logo_${colorData.logo_style}.png`, process.env.APPDATA + `/VALTracker/img/VALTracker_Logo_${colorData.logo_style}.png`)
        }
    
        var iconInterval = setInterval(changeIcon, 100)
    
        function changeIcon() {
            if(fs.existsSync(process.env.APPDATA + `/VALTracker/img/VALTracker_Logo_${colorData.logo_style}.png`)) {
                mainWindow.setIcon(process.env.APPDATA + `/VALTracker/img/VALTracker_Logo_${colorData.logo_style}.png`)
                clearInterval(iconInterval);
            }
        }
    }

    process.env.MAIN_WINDOW_ID = mainWindow.id;
    
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

var updateCheck;

app.on('ready', async function() {
    createWindow();
    updateCheck = setInterval(function() {
        autoUpdater.checkForUpdates();
    }, 1800000)
    let onLoadData = fs.readFileSync(process.env.APPDATA + '/VALTracker/user_data/onLoad.json')
    let loadData = JSON.parse(onLoadData)
    if(loadData.hasDiscordRPenabled == undefined) {
        loadData.hasDiscordRPenabled = true;
        var dataToWriteDown = JSON.stringify(loadData)
        fs.writeFileSync(process.env.APPDATA + '/VALTracker/user_data/onLoad.json', dataToWriteDown)
    }
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
    window.clearInterval(updateCheck);
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

ipc.on('changeTrayIcon', function(event, arg) {
    var filename = arg.substring(arg.lastIndexOf('/')+1);
    var hasFoundFile = false;
    fs.readdir(process.env.APPDATA + "/VALTracker/img", (err, files) => {
        files.forEach(file => {
            if(filename == file) {
                hasFoundFile = true;
                mainWindow.setIcon(process.env.APPDATA + `/VALTracker/img/${filename}`)
            }
        });
        if(hasFoundFile !== true) {
            downloadImage(`https://valtracker.gg/app_img/iconss/${filename}`, process.env.APPDATA + `/VALTracker/img/${filename}`)
        }
    });

    var iconInterval = setInterval(changeIcon, 100)

    function changeIcon() {
        if(fs.existsSync(process.env.APPDATA + `/VALTracker/img/${filename}`)) {
            mainWindow.setIcon(process.env.APPDATA + `/VALTracker/img/${filename}`)
            clearInterval(iconInterval);
        }
    }
});

ipc.on('setCookies', function(event, arg) {
    log.info(arg)
    session.defaultSession.cookies.get({})
    .then((cookies) => {
        cookies.forEach(cookie => {
            if(cookie.name == "tdid") {
                event.sender.send('tdid', cookie.value)
            }
        })
    }).catch((error) => {
        log.info(error)
    })
})

var value;
var expDate;

ipc.on('getSSIDCookie', async function(event, arg) {
    var rawData = fs.readFileSync(process.env.APPDATA + '/VALTracker/user_data/cookies.json')
    var data = JSON.parse(rawData)
    for(var i = 0; i < data.length; i++) {
        if(data[i].name == "ssid") {
            value = data[i].value;
            expDate = data[i].expirationDate;
            event.sender.send('ssid', data[i].value + " // " + data[i].expirationDate)
        }
    }
})
var newTokenData;
var cycleRunning = false;
function getTokenDataFromURL(url)
{
    try
    {
        const searchParams = new URLSearchParams((new URL(url)).hash.slice(1));
        return {
            accessToken: searchParams.get('access_token'),
            expiresIn: searchParams.get('expires_in'),
            id_token: searchParams.get('id_token'),
        };
    }
    catch(err)
    {
        throw new Error(err);
    }
}
ipc.on('startReauthCycle', async function (event, arg) {
    async function reauthCycle() {
        var rawCookies = fs.readFileSync(process.env.APPDATA + '/VALTracker/user_data/cookies.json');
        var bakedCookies = JSON.parse(rawCookies);
    
        var ssid;
    
        var jsontype = typeof bakedCookies[0] === "string";
    
        //check if json is object or array
    
        if(jsontype == true) {
            for(var i = 0; i < bakedCookies.length; i++) {
                if(bakedCookies[i].includes("ssid=")) {
                    //console.log(bakedCookies[i])
                    ssid = bakedCookies[i]
                }
            }
        } else {
            for(var i = 0; i < bakedCookies.length; i++) {
                if(bakedCookies[i].name == "ssid") {
                    //console.log(bakedCookies)
                    ssid = `ssid=${bakedCookies[i].value}; Domain=${bakedCookies[i].domain}; Path=${bakedCookies[i].path}; hostOnly=${bakedCookies[i].hostOnly}; secure=${bakedCookies[i].secure}; httpOnly=${bakedCookies[i].httpOnly}; session=${bakedCookies[i].session}; sameSite=${bakedCookies[i].sameSite};`
                }
            }
        }
    
        const ciphers = [
            'TLS_CHACHA20_POLY1305_SHA256',
            'TLS_AES_128_GCM_SHA256',
            'TLS_AES_256_GCM_SHA384',
            'TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256'
        ];
    
        const agent = new Agent({ ciphers: ciphers.join(':'), honorCipherOrder: true, minVersion: 'TLSv1.2' });
    
        const access_tokens = await axios.post('https://auth.riotgames.com/api/v1/authorization', {
            client_id: "play-valorant-web-prod",
            nonce: 1,
            redirect_uri: "https://playvalorant.com/opt_in",
            response_type: "token id_token",
            scope: "account openid"
        }, { 
            headers: {
                Cookie: ssid,
                'User-Agent': 'RiotClient/43.0.1.4195386.4190634 rso-auth (Windows; 10;;Professional, x64)'
            },
            httpsAgent: agent
        });
    
        //console.log(access_tokens.headers['set-cookie'])
        //console.log(access_tokens.data.response)
        //console.log(access_tokens)
        if(access_tokens.data.response == undefined) {
            event.sender.send('reauthFail')
        } else {
            fs.writeFileSync(process.env.APPDATA + '/VALTracker/user_data/cookies.json', JSON.stringify(access_tokens.headers['set-cookie']))
            //const newSSID = access_tokens.headers['set-cookie']
            event.sender.send('reauthSuccess', access_tokens.data.response.parameters.uri)
            newTokenData = getTokenDataFromURL(access_tokens.data.response.parameters.uri);
            return newTokenData
        }
    };
    const newURI = await reauthCycle();
    console.log(newURI)
    if(cycleRunning == false) {
        setInterval(reauthCycle, (newTokenData.expiresIn - 300) * 1000)
        console.log("CYCLE STARTED")
        cycleRunning = true;
    }
})