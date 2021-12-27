const fs = require('fs')

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

//////////////////////////////////////////////

function backFade() {
    $('.setup-wrapper-2').fadeTo(950, 0);
    setTimeout(function() {
        $('.setup-wrapper-2').css("display", "none");
    }, 1000)
}

$(document).ready(() => {
    $('.setup-button-back').on("click", function() {
        backFade();
        setTimeout(function() {
            window.location.href = "";
        }, 1000)
    });

    loadFade();
    const replaceText = (text) => {
        const element = document.getElementById("search-output");
        if (element) element.innerText = text
      }
    
      // Execute a function when the user releases a key on the keyboard
      $("#playerNameSearch").keyup(function(event) {
        var inputValue = document.getElementById("playerNameSearch").value;
        if (event.keyCode === 13) {
          if (inputValue.indexOf('#') > -1) {
            $("#playerNameSearchButton").click();
          } else {
            replaceText("ERROR!\nRiot ID's require a #:\nRiot#NA1")
            document.getElementById("playerNameSearch").focus();
            document.getElementById("playerNameSearch").select();
          }
        }
      });
      document.getElementById("playerNameSearchButton").onclick = function(event) {
        var inputValue = document.getElementById("playerNameSearch").value;
        var searchedPlayerName = inputValue.substring(0, inputValue.indexOf("#"));
        var searchedPlayerTag = inputValue.substring(inputValue.indexOf("#") + 1);
    
        if(inputValue == "") {
          replaceText("Search Field empty.")
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
                            var testVar = process.env.APPDATA  + '/VALTracker/settings/onLoad.json'
                            fs.writeFileSync(testVar, data3);
                    
                            let userData = {
                                playerName: searchedPlayerName,
                                playerTag: searchedPlayerTag,
                                playerRegion: searchedRegion,
                                playerUUID: data.data.puuid
                            };
                             
                            let data2 = JSON.stringify(userData);
                            fs.writeFileSync(process.env.APPDATA + '/VALTracker/settings/userData.json', data2);
                        });
                        
                        $('.setup-button-next').on("click", function() {
                            leaveFade3();
                        });
                    },
                    error: function(xhr) {
                        //get the status code
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
            document.getElementById("playerNameSearch").focus();
            document.getElementById("playerNameSearch").select();
          }
        }
      };
});

    