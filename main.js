// Import required modules
const {
    app,
    BrowserWindow
} = require('electron');
const ipc = require('electron').ipcMain
const path = require('path');
const {
    autoUpdater
} = require("electron-updater");
const log = require('electron-log');
const fs = require('fs');
const fs_extra = require('fs-extra');
const RPC = require('discord-rpc');
const {
    session
} = require('electron')
const {
    Agent
} = require('https');
const axios = require('axios').default;
const isDev = require('electron-is-dev');

// Import Discord RP settings
const discord_rps = require('./assets/js/modules/discord_rps.js');

// Initialize new RPC client
const discordClient = new RPC.Client({
    transport: "ipc"
});

//Login with Discord client
discordClient.login({
    clientId: "933753504558903406"
})

// Set activity after client is finished loading
discordClient.on("ready", () => {
    let onLoadData2 = fs.readFileSync(process.env.APPDATA + '/VALTracker/user_data/load_files/on_load.json')
    let loadData2 = JSON.parse(onLoadData2)
    if (loadData2.hasDiscordRPenabled == true) {
        discordClient.request("SET_ACTIVITY", {
            pid: process.pid,
            activity: discord_rps.starting_activity
        });
    } else if (loadData2.hasDiscordRPenabled == "anonymous") {
        discordClient.request("SET_ACTIVITY", {
            pid: process.pid,
            activity: discord_rps.anonymous_activity
        });
    } else if (loadData2.hasDiscordRPenabled == false) {}
})

// Change Discord RP if App requests it
ipc.on('changeDiscordRP', function (event, arg) {
    let onLoadData3 = fs.readFileSync(process.env.APPDATA + '/VALTracker/user_data/load_files/on_load.json')
    let loadData3 = JSON.parse(onLoadData3)
    if (loadData3.hasDiscordRPenabled == true) {
        switch (arg) {
            case "hub_activity":
                discordClient.request("SET_ACTIVITY", {
                    pid: process.pid,
                    activity: discord_rps.hub_activity
                });
                break;
            case "skins_activity":
                discordClient.request("SET_ACTIVITY", {
                    pid: process.pid,
                    activity: discord_rps.skins_activity
                });
                break;
            case "bundle_acitivity":
                discordClient.request("SET_ACTIVITY", {
                    pid: process.pid,
                    activity: discord_rps.bundles_activity
                });
                break;
            case "pprofile_acitivity":
                discordClient.request("SET_ACTIVITY", {
                    pid: process.pid,
                    activity: discord_rps.pprofile_acitivity
                });
                break;
            case "favmatches_activity":
                discordClient.request("SET_ACTIVITY", {
                    pid: process.pid,
                    activity: discord_rps.favmatches_acitivity
                });
                break;
            case "playersearch_acitivity":
                discordClient.request("SET_ACTIVITY", {
                    pid: process.pid,
                    activity: discord_rps.playersearch_acitivity
                });
                break;
            case "settings_activity":
                discordClient.request("SET_ACTIVITY", {
                    pid: process.pid,
                    activity: discord_rps.settings_acitivity
                });
                break;
            case "patchnotes_activity":
                discordClient.request("SET_ACTIVITY", {
                    pid: process.pid,
                    activity: discord_rps.patchnotes_acitivity
                });
                break;
        }
    } else if (loadData3.hasDiscordRPenabled == "anonymous") {
        discordClient.request("SET_ACTIVITY", {
            pid: process.pid,
            activity: discord_rps.anonymous_activity
        });
    }
});

// Set custom Protocol to start App
if (process.defaultApp) {
    if (process.argv.length >= 2) {
        app.setAsDefaultProtocolClient('valtracker-ptcl', process.execPath, [path.resolve(process.argv[1])])
    }
} else {
    app.setAsDefaultProtocolClient('valtracker-ptcl')
}

// Get instance lock
const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
    app.quit()
} else {
    app.on('second-instance', (event, CommandLine, workingDirectory) => {
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore()
            mainWindow.focus()
        }
    })
}

var app_data;

function createFavMatches() {
    // Create /favourite_matches dir and all files in it
    fs.mkdirSync(app_data + '/user_data/favourite_matches');
    let favMatchesPointer = {
        "favourites": [{}]
    }
    fs.writeFileSync(app_data + '/user_data/favourite_matches/matches.json', JSON.stringify(favMatchesPointer));

    // Create /favourite_matches dir subfolders 
    fs.mkdirSync(app_data + '/user_data/favourite_matches/matches');
}

function createUserData() {
    // Create /user_data dir and all files in it
    fs.mkdirSync(app_data + '/user_data');
    let userData = {
        "playerName": "",
        "playerTag": "",
        "playerRegion": "",
        "playerUUID": "",
    };
    fs.writeFileSync(app_data + '/user_data/user_creds.json', JSON.stringify(userData));
}

function createHomeSettings() {
    // Create /home_settings dir and all files in it
    fs.mkdirSync(app_data + '/user_data/home_settings');
    let homeSettings = {
        "displayedUserName": "",
        "preferredMatchFilter": "",
    };
    fs.writeFileSync(app_data + '/user_data/home_settings/settings.json', JSON.stringify(homeSettings));
}

function createLoadFiles() {
    // Create /load_files dir and all files in it
    fs.mkdirSync(app_data + '/user_data/load_files');
    let loadFileData = {
        "hasFinishedSetupSequence": false,
        "hasDiscordRPenabled": true,
        "hasReadLatestPatchnotes": false,
    };
    fs.writeFileSync(app_data + '/user_data/load_files/on_load.json', JSON.stringify(loadFileData));
}

function createPlayerProfileSettings() {
    // Create /player_profile_settings dir and all files in it
    fs.mkdirSync(app_data + '/user_data/player_profile_settings');
    let playerProfileSettings = {
        "displayedUserName": "",
        "preferredMatchFilter": "",
    };
    fs.writeFileSync(app_data + '/user_data/player_profile_settings/settings.json', JSON.stringify(playerProfileSettings));
}

function createThemes() {
    if (!fs.existsSync(app_data + '/user_data/themes')) {
        fs.mkdirSync(app_data + '/user_data/themes');
    }
    let themesPointerFile = {
        "isCustomTheme": false,
        "themeName": "normal"
    }
    fs.writeFileSync(app_data + '/user_data/themes/color_theme.json', JSON.stringify(themesPointerFile));

    // Create /themes/preset_themes dir and all files in it
    if (!fs.existsSync(app_data + '/user_data/themes/preset_themes')) {
        fs.mkdirSync(app_data + '/user_data/themes/preset_themes');
    }
    const themes = require('./assets/js/modules/preset_themes');
    for (var i = 0; i < Object.keys(themes).length; i++) {
        fs.writeFileSync(app_data + `/user_data/themes/preset_themes/${Object.keys(themes)[i]}.json`, JSON.stringify(themes[Object.keys(themes)[i]]))
    }

    // Create /themes/custom_themes dir
    if (!fs.existsSync(app_data + '/user_data/themes/custom_themes')) {
        fs.mkdirSync(app_data + '/user_data/themes/custom_themes');
    }
}

function noFilesFound() {
    // Create /user_data dir and all files in it
    createUserData();

    // Create /favourite_matches dir and all files in it
    createFavMatches();

    // Create /home_settings dir and all files in it
    createHomeSettings();

    // Create /load_files dir and all files in it
    createLoadFiles();

    // Create /player_profile_settings dir and all files in it
    createPlayerProfileSettings();

    // Create /riot_games_data dir
    fs.mkdirSync(app_data + '/user_data/riot_games_data');

    // Create /shop_data dir
    fs.mkdirSync(app_data + '/user_data/shop_data');

    // Create /themes dir and all files in it
    createThemes();

    // Load Window with Setup Sequence
    mainWindow.loadFile('./setupSequence/index.html');
}

function moveOldFiles() {
    if (fs.existsSync(app_data + '/user_data/customThemes')) {
        if (!fs.existsSync(app_data + '/user_data/themes')) {
            fs.mkdirSync(app_data + '/user_data/themes');
        }
        fs.renameSync(app_data + '/user_data/customThemes', app_data + '/user_data/custom_themes');
        if (fs.existsSync(app_data + '/user_data/customThemes')) {
            fs.unlinkSync(app_data + `/user_data/customThemes`, (err) => {
                if (err) {
                    console.log(err);
                }
                console.log('deleted');
            })
        }
        if (fs.existsSync(app_data + '/user_data/themes/custom_themes')) {
            fs.unlinkSync(app_data + `/user_data/themes/custom_themes`, (err) => {
                if (err) {
                    console.log(err);
                }
                console.log('deleted');
            })
        }
        fs_extra.moveSync(app_data + '/user_data/custom_themes', app_data + '/user_data/themes/custom_themes', err => {
            if (err) return console.error(err);
        });
        fs.mkdirSync(app_data + '/user_data/themes/preset_themes');
        const themes = require('./assets/js/modules/preset_themes');
        for (var i = 0; i < Object.keys(themes).length; i++) {
            fs.writeFileSync(app_data + `/user_data/themes/preset_themes/${Object.keys(themes)[i]}.json`, themes[Object.keys(themes)[i]])
        }
    }

    if (fs.existsSync(app_data + '/user_data/favouriteMatches')) {
        if (!fs.existsSync(app_data + '/user_data/favourite_matches')) {
            fs.mkdirSync(app_data + '/user_data/favourite_matches')
        }
        if (fs.existsSync(app_data + '/user_data/favourite_matches/favouriteMatches')) {
            fs.unlinkSync(app_data + '/user_data/favourite_matches/favouriteMatches', (err) => {
                if (err) {
                    console.log(err);
                }
                console.log('deleted');
            })
        }
        fs_extra.moveSync(app_data + '/user_data/favouriteMatches', app_data + '/user_data/favourite_matches/favouriteMatches', err => {
            if (err) return console.error(err);
        });
        fs.renameSync(app_data + '/user_data/favourite_matches/favouriteMatches', app_data + '/user_data/favourite_matches/matches')
    }

    if (fs.existsSync(app_data + '/user_data/home')) {
        fs.renameSync(app_data + '/user_data/home', app_data + '/user_data/home_settings')
        fs.readdir(app_data + '/user_data/home_settings', (err, files) => {
            if (err) {
                console.log(err);
            } else {
                let newData = {}
                files.forEach(file => {
                    console.log(file)
                    let rawfile = fs.readFileSync(app_data + `/user_data/home_settings/${file}`);
                    let filedata = JSON.parse(rawfile)
                    newData[Object.keys(filedata)[0]] = filedata[Object.keys(filedata)[0]]
                    fs.unlinkSync(app_data + `/user_data/home_settings/${file}`, (err) => {
                        if (err) {
                            console.log(err);
                        }
                        console.log('deleted');
                    });
                })
                if (newData.displayedUserName == undefined) {
                    newData.displayedUserName = "";
                }
                fs.writeFileSync(app_data + '/user_data/home_settings/settings.json', JSON.stringify(newData))
            }
        })
    }

    if (fs.existsSync(app_data + '/user_data/colorTheme.json')) {
        let jsondata = fs.readFileSync(app_data + '/user_data/colorTheme.json')
        let olddata = JSON.parse(jsondata)

        if (olddata.loadCustomTheme == true) {
            createThemes();
            let themesPointerFile = {
                "isCustomTheme": true,
                "themeName": olddata.customThemeName
            }
            fs.writeFileSync(app_data + '/user_data/themes/color_theme.json', JSON.stringify(themesPointerFile));
        } else {
            createThemes();
            let newName = olddata.logo_style.toLowerCase()
            console.log(newName)
            if (newName == "default") {
                newName = "normal"
            }
            let themesPointerFile = {
                "isCustomTheme": false,
                "themeName": newName
            }
            fs.writeFileSync(app_data + '/user_data/themes/color_theme.json', JSON.stringify(themesPointerFile));
        }

        if (fs.existsSync(app_data + '/user_data/customThemes')) {
            fs.readdirSync(app_data + '/user_data/customThemes', (err, files) => {
                if (err) {
                    console.log(err);
                } else {
                    files.forEach(file => {
                        console.log(file)
                        if (fs.existsSync(app_data + `/user_data/themes/custom_themes/${file}`)) {
                            fs.unlinkSync(app_data + `/user_data/themes/custom_themes/${file}`, (err) => {
                                if (err) {
                                    console.log(err);
                                }
                                console.log('deleted');
                            })
                        }
                        fs_extra.moveSync(app_data + `/user_data/customThemes/${file}`, app_data + `/user_data/themes/custom_themes`, err => {
                            if (err) return console.error(err);
                        });
                    })
                }
            })

            fs.unlinkSync(app_data + `/user_data/customThemes`, (err) => {
                if (err) {
                    console.log(err);
                }
                console.log('deleted');
            })
        }

        fs.unlinkSync(app_data + `/user_data/colorTheme.json`, (err) => {
            if (err) {
                console.log(err);
            }
            console.log('deleted');
        })
    }

    if (fs.existsSync(app_data + '/user_data/cookies.json')) {
        if (!fs.existsSync(app_data + '/user_data/riot_games_data')) {
            fs.mkdirSync(app_data + '/user_data/riot_games_data');
        }
        if (fs.existsSync(app_data + '/user_data/riot_games_data/cookies.json')) {
            fs.unlinkSync(app_data + '/user_data/riot_games_data/cookies.json', (err) => {
                if (err) {
                    console.log(err);
                }
                console.log('deleted');
            })
        }
        fs_extra.moveSync(app_data + '/user_data/cookies.json', app_data + '/user_data/riot_games_data/cookies.json', err => {
            if (err) return console.error(err);
        });
    }

    if (fs.existsSync(app_data + '/user_data/tokenData.json')) {
        if (!fs.existsSync(app_data + '/user_data/riot_games_data')) {
            fs.mkdirSync(app_data + '/user_data/riot_games_data');
        }
        fs.renameSync(app_data + '/user_data/tokenData.json', app_data + '/user_data/token_data.json')
        if (fs.existsSync(app_data + '/user_data/riot_games_data/token_data.json')) {
            fs.unlinkSync(app_data + '/user_data/riot_games_data/token_data.json', (err) => {
                if (err) {
                    console.log(err);
                }
                console.log('deleted');
            })
        }
        fs_extra.moveSync(app_data + '/user_data/token_data.json', app_data + '/user_data/riot_games_data/token_data.json', err => {
            if (err) return console.error(err);
        });
    }

    if (fs.existsSync(app_data + '/user_data/current_shop.json')) {
        if (!fs.existsSync(app_data + '/user_data/shop_data')) {
            fs.mkdirSync(app_data + '/user_data/shop_data');
        }
        if (fs.existsSync(app_data + '/user_data/shop_data/current_shop.json')) {
            fs.unlinkSync(app_data + '/user_data/shop_data/current_shop.json', (err) => {
                if (err) {
                    console.log(err);
                }
                console.log('deleted');
            })
        }
        fs_extra.moveSync(app_data + '/user_data/current_shop.json', app_data + '/user_data/shop_data/current_shop.json', err => {
            if (err) return console.error(err);
        });
    }

    if (fs.existsSync(app_data + '/user_data/last_checked_date.json')) {
        if (!fs.existsSync(app_data + '/user_data/shop_data')) {
            fs.mkdirSync(app_data + '/user_data/shop_data');
        }
        if (fs.existsSync(app_data + '/user_data/shop_data/last_checked_date.json')) {
            fs.unlinkSync(app_data + '/user_data/shop_data/last_checked_date.json', (err) => {
                if (err) {
                    console.log(err);
                }
                console.log('deleted');
            })
        }
        fs_extra.moveSync(app_data + '/user_data/last_checked_date.json', app_data + '/user_data/shop_data/last_checked_date.json', err => {
            if (err) return console.error(err);
        });
    }

    if (fs.existsSync(app_data + '/user_data/favourites.json')) {
        if (!fs.existsSync(app_data + '/user_data/favourite_matches')) {
            fs.mkdirSync(app_data + '/user_data/favourite_matches');
        }
        fs.renameSync(app_data + '/user_data/favourites.json', app_data + '/user_data/matches.json')
        if (fs.existsSync(app_data + '/user_data/favourite_matches/matches.json')) {
            fs.unlinkSync(app_data + '/user_data/favourite_matches/matches.json', (err) => {
                if (err) {
                    console.log(err);
                }
                console.log('deleted');
            })
        }
        fs_extra.moveSync(app_data + '/user_data/matches.json', app_data + '/user_data/favourite_matches/matches.json', err => {
            if (err) return console.error(err);
        });
    }

    if (fs.existsSync(app_data + '/user_data/onLoad.json')) {
        if (!fs.existsSync(app_data + '/user_data/load_files')) {
            fs.mkdirSync(app_data + '/user_data/load_files');
        }
        fs.renameSync(app_data + '/user_data/onLoad.json', app_data + '/user_data/on_load.json')
        if (fs.existsSync(app_data + '/user_data/load_files/on_load.json')) {
            fs.unlinkSync(app_data + '/user_data/load_files/on_load.json', (err) => {
                if (err) {
                    console.log(err);
                }
                console.log('deleted');
            })
        }
        fs_extra.moveSync(app_data + '/user_data/on_load.json', app_data + '/user_data/load_files/on_load.json', err => {
            if (err) return console.error(err);
        });
    }

    if (fs.existsSync(app_data + '/user_data/userData.json')) {
        fs.renameSync(app_data + '/user_data/userData.json', app_data + '/user_data/user_creds.json')
    }
}

// Set global mainWindow variable
let mainWindow;

// Create Main Window and check for folders/files
function createWindow() {

    mainWindow = new BrowserWindow({
        width: 1400,
        height: 800,
        minWidth: 1400,
        minHeight: 840,
        frame: false,
        backgroundColor: '#12171d',
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
        }
    });

    app_data = app.getPath('userData')

    if (fs.existsSync(app_data + '/settings')) {
        fs.renameSync(app_data + '/settings', app_data + '/user_data')
    }

    moveOldFiles();

    if (!fs.existsSync(app_data + '/user_data')) {
        noFilesFound();
    } else {
        if (!fs.existsSync(app_data + '/user_data/favourite_matches')) {
            createFavMatches();
        }

        if (!fs.existsSync(app_data + '/user_data/home_settings')) {
            createHomeSettings();
        }

        if (!fs.existsSync(app_data + '/user_data/load_files')) {
            createLoadFiles();
        }

        if (!fs.existsSync(app_data + '/user_data/player_profile_settings')) {
            createPlayerProfileSettings();
        }

        if (!fs.existsSync(app_data + '/user_data/riot_games_data')) {
            fs.mkdirSync(app_data + '/user_data/riot_games_data');
        }

        if (!fs.existsSync(app_data + '/user_data/shop_data')) {
            fs.mkdirSync(app_data + '/user_data/shop_data');
        }

        if (!fs.existsSync(app_data + '/user_data/themes')) {
            createThemes();
        }
        mainWindow.loadFile('./fakeLoadingIndex.html');
    }

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

var updateCheck;

app.on('ready', async function () {
    createWindow();
    if(!isDev) {
        autoUpdater.checkForUpdates();
        updateCheck = setInterval(function () {
            autoUpdater.checkForUpdates();
        }, 600000)
    }
    let onLoadData = fs.readFileSync(process.env.APPDATA + '/VALTracker/user_data/load_files/on_load.json')
    let loadData = JSON.parse(onLoadData)
    if (loadData.hasDiscordRPenabled == undefined) {
        loadData.hasDiscordRPenabled = true;
        var dataToWriteDown = JSON.stringify(loadData)
        fs.writeFileSync(process.env.APPDATA + '/VALTracker/user_data/load_files/on_load.json', dataToWriteDown)
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

ipc.on('setCookies', function (event, arg) {
    log.info(arg)
    session.defaultSession.cookies.get({})
        .then((cookies) => {
            cookies.forEach(cookie => {
                if (cookie.name == "tdid") {
                    event.sender.send('tdid', cookie.value)
                }
            })
        }).catch((error) => {
            log.info(error)
        })
})

ipc.on('getSSIDCookie', async function (event, arg) {
    var rawData = fs.readFileSync(process.env.APPDATA + '/VALTracker/user_data/riot_games_data/cookies.json')
    var data = JSON.parse(rawData)
    for (var i = 0; i < data.length; i++) {
        if (data[i].name == "ssid") {
            value = data[i].value;
            expDate = data[i].expirationDate;
            event.sender.send('ssid', data[i].value + " // " + data[i].expirationDate)
        }
    }
})
var newTokenData;
var cycleRunning = false;

function getTokenDataFromURL(url) {
    try {
        const searchParams = new URLSearchParams((new URL(url)).hash.slice(1));
        return {
            accessToken: searchParams.get('access_token'),
            expiresIn: searchParams.get('expires_in'),
            id_token: searchParams.get('id_token'),
        };
    } catch (err) {
        throw new Error(err);
    }
}
ipc.on('startReauthCycle', async function (event, arg) {
    async function reauthCycle() {
        if (!fs.existsSync(process.env.APPDATA + '/VALTracker/user_data/riot_games_data/cookies.json')) {
            const newCookiesFile = {}
            fs.writeFileSync(process.env.APPDATA + '/VALTracker/user_data/riot_games_data/cookies.json', JSON.stringify(newCookiesFile))
        }
        var rawCookies = fs.readFileSync(process.env.APPDATA + '/VALTracker/user_data/riot_games_data/cookies.json');
        var bakedCookies = JSON.parse(rawCookies);

        var ssid;

        var jsontype = typeof bakedCookies[0] === "string";

        //check if json is object or array

        if (jsontype == true) {
            for (var i = 0; i < bakedCookies.length; i++) {
                if (bakedCookies[i].includes("ssid=")) {
                    //console.log(bakedCookies[i])
                    ssid = bakedCookies[i]
                }
            }
        } else {
            for (var i = 0; i < bakedCookies.length; i++) {
                if (bakedCookies[i].name == "ssid") {
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

        const agent = new Agent({
            ciphers: ciphers.join(':'),
            honorCipherOrder: true,
            minVersion: 'TLSv1.2'
        });

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
        if (access_tokens.data.response == undefined) {
            event.sender.send('reauthFail')
        } else {
            fs.writeFileSync(process.env.APPDATA + '/VALTracker/user_data/riot_games_data/cookies.json', JSON.stringify(access_tokens.headers['set-cookie']))
            //const newSSID = access_tokens.headers['set-cookie']
            event.sender.send('reauthSuccess', access_tokens.data.response.parameters.uri)
            newTokenData = getTokenDataFromURL(access_tokens.data.response.parameters.uri);
            return newTokenData
        }
    };
    const newURI = await reauthCycle();
    console.log(newURI)
    if (cycleRunning == false) {
        setInterval(reauthCycle, (newTokenData.expiresIn - 300) * 1000)
        console.log("CYCLE STARTED")
        cycleRunning = true;
    }
})