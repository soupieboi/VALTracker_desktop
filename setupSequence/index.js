const fs = require('fs')
const electron = require('electron')
const riotIPC = require('electron').ipcRenderer

function loadFade() {
    $('.setup-wrapper').fadeTo(950, 1);
}

function leaveFade() {
    $('.setup-wrapper').fadeTo(950, 0);
    setTimeout(function() {
        $('.setup-wrapper').css("display", "none");
    }, 1000)
}

function loadFade2() {
    setTimeout(function() {
        $('.setup-wrapper-2').fadeTo(950, 1);
    }, 1010)
}

function leaveFade2() {
    $('.setup-wrapper-2').fadeTo(950, 0);
    setTimeout(function() {
        $('.setup-wrapper-2').css("display", "none");
        $('.setup-wrapper-3').css("display", "block");
        $('.setup-wrapper-3').fadeTo(950, 1);
    }, 1000)
}

function leaveFade3() {
    $('.setup-wrapper-3').fadeTo(950, 0);
    setTimeout(function() {
        window.location.href = "../index.html"
    }, 1000)
}

const replaceText = (text) => {
    const element = document.getElementById("search-output");
    if (element) element.innerText = text
}

//////////////////////////////////////////////

function backFade() {
    $('.setup-wrapper-2').fadeTo(950, 0);
    setTimeout(function() {
        $('.setup-wrapper-2').css("display", "none");
    }, 1000)
}

const signInUrl = 'https://auth.riotgames.com/authorize?redirect_uri=https%3A%2F%2Fplayvalorant.com%2Fopt_in&client_id=play-valorant-web-prod&response_type=token%20id_token&nonce=1&scope=account%20openid';

var bearer;
var puuid;
var entitlement_token;
var id_token;
var requiredCookie;
var region;

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
        throw new Error(`Bad url: "${url}"`);
    }
}

async function showSignIn()
{
    return new Promise((resolve, reject) =>
    {
        const loginWindow = new electron.remote.BrowserWindow({
            show: false,
            width: 470,
            height: 880,
            autoHideMenuBar: true,
        });
        let foundToken = false;
        loginWindow.webContents.on('will-redirect', (event, url) =>
        {
            console.log('Login window redirecting...');
            if(!foundToken && url.startsWith('https://playvalorant.com/opt_in'))
            {
                console.log('Redirecting to url with tokens');
                const tokenData = getTokenDataFromURL(url);
                foundToken = true;
            
                loginWindow.webContents.session.cookies.get({domain: 'auth.riotgames.com'}).then(async riotcookies =>
                {
                    await Promise.all(riotcookies.map(cookie => loginWindow.webContents.session.cookies.remove(`https://${cookie.domain}${cookie.path}`, cookie.name)));
                    loginWindow.destroy();
                    resolve({
                        tokenData,
                        riotcookies,
                    });
                    riotcookies.forEach(riotcookie => {
                        if(riotcookie.name == "ssid") {
                            cookieString = riotcookie.value
                        }
                        console.log(JSON.parse(JSON.stringify(riotcookie)))
                    })
                    fs.writeFileSync(process.env.APPDATA + '/VALTracker/user_data/cookies.json', JSON.stringify(riotcookies))
                    fs.writeFileSync(process.env.APPDATA + '/VALTracker/user_data/tokenData.json', JSON.stringify(tokenData))
                });
            }
        });
        loginWindow.once('ready-to-show', () =>
        {
            loginWindow.show();
        });
        loginWindow.on('close', () =>
        {
            console.log('Login window was closed');
            reject('window closed');
        });
        window.loginWindow = loginWindow;
        loginWindow.loadURL(signInUrl);
    });
}

async function getPlayerUUID() {
    return (await (await this.fetch('https://auth.riotgames.com/userinfo', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + bearer,
            'Content-Type': 'application/json',
            'User-Agent': ''
        },
    })).json())['sub'];
}
    
async function getEntitlement() {
    return (await (await this.fetch('https://entitlements.auth.riotgames.com/api/token/v1', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + bearer,
            'Content-Type': 'application/json',
            'User-Agent': ''
        },
    })).json())['entitlements_token'];
}

async function getXMPPRegion() {
    return (await (await this.fetch("https://riot-geo.pas.si.riotgames.com/pas/v1/product/valorant", {
        "method": "PUT",
        "headers": {
          "cookie": requiredCookie,
          "Content-Type": "application/json",
          "Authorization": "Bearer " + bearer
        },
        "body": `{\"id_token\":\"${id_token}\"}`
    })).json());
}

async function getShopData() {
    return (await (await this.fetch('https://pd.' + region + '.a.pvp.net/store/v2/storefront/' + puuid, {
        method: 'GET',
        headers: {
            'X-Riot-Entitlements-JWT': entitlement_token,
            'Authorization': 'Bearer ' + bearer,
            'Content-Type': 'application/json',
            'User-Agent': ''
        },
    })).json());
}

async function getPlayerData() {
    return (await (await this.fetch('https://pd.' + region + '.a.pvp.net/account-xp/v1/players/' + puuid, {
        method: 'GET',
        headers: {
            'X-Riot-Entitlements-JWT': entitlement_token,
            'Authorization': 'Bearer ' + bearer,
            'Content-Type': 'application/json',
            'User-Agent': ''
        },
    })).json());
}

$(document).ready(() => {
    loadFade();
        $('#openRiotLogin').on("click", async function() {
            const data = await showSignIn();
            bearer = data.tokenData.accessToken;
            id_token = data.tokenData.id_token;

            riotIPC.send('setCookies', 'please')
            riotIPC.on('tdid', async function(event, arg) {
                console.log(arg)
                requiredCookie = "tdid=" + arg

                puuid = await getPlayerUUID();
                console.log(puuid);

                entitlement_token = await getEntitlement();

                var reagiondata = await getXMPPRegion();
                console.log(reagiondata)
                region = reagiondata.affinities.live
                
                var shopData = await getShopData();
                fs.writeFileSync(process.env.APPDATA + '/VALTracker/user_data/current_shop.json', JSON.stringify(shopData))
                console.log(shopData)

                Date.prototype.addSeconds = function(seconds) {
                    var copiedDate = new Date(this.getTime());
                    return new Date(copiedDate.getTime() + seconds * 1000);
                }
                
                var dateData = {
                    lastCkeckedDate: new Date().getTime(),
                    willLastFor: new Date().addSeconds(shopData.SkinsPanelLayout.SingleItemOffersRemainingDurationInSeconds)
                }
                fs.writeFileSync(process.env.APPDATA + '/VALTracker/user_data/last_checked_date.json', JSON.stringify(dateData))

                riotIPC.send('startReauthCycle', 'again')
                $.ajax({
                    url: `https://api.henrikdev.xyz/valorant/v1/by-puuid/mmr/${region}/${puuid}`,
                    type: 'get',
                    success: function(data, xhr) {
                        var searchedPlayerName = data.data.name
                        var searchedPlayerTag = data.data.tag
                        var searchedRegion = region;
                        
                        let finishedData = {
                            hasFinishedSetupSequence: true
                        };
                         
                        let data3 = JSON.stringify(finishedData);
                        var testVar = process.env.APPDATA  + '/VALTracker/user_data/onLoad.json'
                        fs.writeFileSync(testVar, data3);
                
                        let userData = {
                            playerName: searchedPlayerName,
                            playerTag: searchedPlayerTag,
                            playerRegion: searchedRegion,
                            playerUUID: puuid
                        };
                         
                        let data2 = JSON.stringify(userData);
                        fs.writeFileSync(process.env.APPDATA + '/VALTracker/user_data/userData.json', data2);
                        leaveFade();
                        leaveFade2();
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
            });
        })
                        
        $('.setup-button-finish').on("click", function() {
            leaveFade3();
        });
      /*document.getElementById("playerNameSearchButton").onclick = function(event) {
        $('#playersearch-loading-circle').css("display", "block")
        var inputValue = document.getElementById("playerNameSearch").value;
        var searchedPlayerName = inputValue.substring(0, inputValue.indexOf("#"));
        var searchedPlayerTag = inputValue.substring(inputValue.indexOf("#") + 1);
    
        if(inputValue == "") {
          replaceText("Search Field empty.")
          $('#playersearch-loading-circle').css("display", "none")
        } else {
            if (inputValue.indexOf('#') > -1) {
                replaceText("")
                event.preventDefault();
                var searchedPlayerName = inputValue.substring(0, inputValue.indexOf("#"));
                var searchedPlayerTag = inputValue.substring(inputValue.indexOf("#") + 1);
                var searchedRegion = document.getElementById('selected-region').value;
                $.ajax({
                    url: `https://api.henrikdev.xyz/valorant/v1/account/${searchedPlayerName}/${searchedPlayerTag}`,
                    type: 'get',
                    success: function(data, xhr) {
                        leaveFade();
                        
                        var playerRegion = searchedRegion;
                        
                        $('.player-pageheader').append(data.data.name + "#" + data.data.tag);
                        $('.player-card-img-setup').attr("src", data.data.card.small);
                        //console.log("Card: " + data.data.card.small);
                        $('.last-updated').append("Last updated: " + data.data.last_update);
                        $('.player-account-level').append("Account Level: " + data.data.account_level);
                        $('#player-region-span').append("Region: " + playerRegion.toUpperCase());

                        loadFade2();
    
                        $('.setup-button-next').on("click", function() {
                            leaveFade2();
                            
                            let finishedData = {
                                hasFinishedSetupSequence: true
                            };
                             
                            let data3 = JSON.stringify(finishedData);
                            var testVar = process.env.APPDATA  + '/VALTracker/user_data/onLoad.json'
                            fs.writeFileSync(testVar, data3);
                    
                            let userData = {
                                playerName: searchedPlayerName,
                                playerTag: searchedPlayerTag,
                                playerRegion: searchedRegion,
                                playerUUID: data.data.puuid
                            };
                             
                            let data2 = JSON.stringify(userData);
                            fs.writeFileSync(process.env.APPDATA + '/VALTracker/user_data/userData.json', data2);
                        });
                        
                        $('.setup-button-next').on("click", function() {
                            leaveFade3();
                        });
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
            } else {
                replaceText("ERROR!\nRiot ID's require a #:\nRiot#NA1")
                $('#playersearch-loading-circle').css("display", "none")
                document.getElementById("playerNameSearch").focus();
                document.getElementById("playerNameSearch").select();
            }
        }*/
    //};
});