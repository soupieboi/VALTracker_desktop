const path = require('path');
$(document).ready(() => {
    let rawuserdata = fs.readFileSync(process.env.APPDATA + '/VALTracker/settings/userData.json');
    let userdataToRead = JSON.parse(rawuserdata);

    var playerName = userdataToRead.playerName
    var playerTag = userdataToRead.playerTag
    let favrawdata = fs.readFileSync(process.env.APPDATA + '/VALTracker/settings/favourites.json');
    let dataToRead = JSON.parse(favrawdata);

    var matchIDarray = [];
    for(var count = 0; count < dataToRead.favourites.length; count++) {
        var matchID = dataToRead.favourites[count].MatchID
        matchIDarray.push(matchID)
        if(dataToRead.favourites[count] == undefined) { //No saved matches found at all
            $('.loading-icon').fadeTo(150, 0)
            setTimeout(function() {
                $('.loading-icon').css("display", "none");
                $('.loading-layer-fallback').css("opacity", "0");
                $('.loading-layer-fallback').css("display", "block");
                $('.loading-layer-fallback').fadeTo(150, 1)
            }, 200)
        } else { //saved match found
            if(dataToRead.favourites[count].MatchID == undefined) {
                continue;
            }
            var checkedFolder = process.env.APPDATA + `/VALTracker/settings/favouriteMatches` 
            if(fs.existsSync(checkedFolder)) { //Check for folder of saved match data
                var checkedPath = process.env.APPDATA + `/VALTracker/settings/favouriteMatches/${matchID}.json`
                if(fs.existsSync(checkedPath)) { //check for downloaded match data of current match
                    let rawmatchdata = fs.readFileSync(process.env.APPDATA + `/VALTracker/settings/favouriteMatches/${matchID}.json`);
                    const data = JSON.parse(rawmatchdata);

                    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

                    var ms = data.data.metadata.game_length;
                    var d = new Date(1000*Math.round(ms/1000)); // round to nearest second
                    function pad(i) { return ('0'+i).slice(-2); }
                    var str = d.getUTCHours() + ':' + pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds());

                    var Matchcontainer = document.createElement("div");
                    Matchcontainer.className = "match-wrapper";
        
                    var matchmodeIcon = document.createElement("img");
                    matchmodeIcon.className = "match-mode-icon";
                    var matchmode = data.data.metadata.mode
                    if(matchmode == "Unrated" || matchmode == "Competitive" || matchmode == "Custom Game") {
                        matchmodeIcon.setAttribute("src", "./assets/img/standard.png")
                    } else {
                        matchmodeIcon.setAttribute("src", `./assets/img/${matchmode.toLowerCase()}.png`)
                    }
        
                    var matchMap = document.createElement("img");
                    matchMap.className = "match-map";
                    //matchMap.src = `./assets/img/${data.data[count].metadata.map.toLowerCase()}.png`
                    matchMap.setAttribute("src", `./assets/img/${data.data.metadata.map.toLowerCase()}.png`)
        
                    var playedAgent = document.createElement("img");
                    playedAgent.className = "match-played-agent";
        
                    for(var playerCount = 0; playerCount < data.data.players.all_players.length; playerCount++) {
                        if(data.data.players.all_players[playerCount].name == playerName && data.data.players.all_players[playerCount].tag == playerTag) {

                            if(matchmode == "Competitive") {
                                var matchRRwrapper = document.createElement("div");
                                matchRRwrapper.className = "match-rr-wrapper";
    
                                var matchRRimg = document.createElement("img");
                                matchRRimg.className = "match-rr-img-pp";
                                var rankIcons = [
                                    './assets/img/iron_1.png', './assets/img/iron_2.png', './assets/img/iron_3.png', 
                                    './assets/img/bronze_1.png', './assets/img/bronze_2.png', './assets/img/bronze_3.png', 
                                    './assets/img/silver_1.png', './assets/img/silver_2.png', './assets/img/silver_3.png', 
                                    './assets/img/gold_1.png', './assets/img/gold_2.png', './assets/img/gold_3.png', 
                                    './assets/img/plat_1.png', './assets/img/plat_2.png', './assets/img/plat_3.png', 
                                    './assets/img/dia_1.png', './assets/img/dia_2.png', './assets/img/dia_3.png', 
                                    './assets/img/immortal_1.png', './assets/img/immortal_2.png', './assets/img/immortal_3.png', 
                                    './assets/img/radiant.png',
                                    './assets/img/unranked.png',
                                ]
                                matchRRimg.setAttribute("src", `${rankIcons[data.data.players.all_players[playerCount].currenttier -3]}`)
        
                                matchRRwrapper.appendChild(matchRRimg)
    
                                var matchRRspan = document.createElement("span");
                            }

                            playedAgent.src = data.data.players.all_players[playerCount].assets.agent.small;
        
                            var matchKDA = document.createElement("span");
                            matchKDA.className = "match-kda";
                            matchKDA.appendChild(document.createTextNode("KDA: " + data.data.players.all_players[playerCount].stats.kills + "/" + data.data.players.all_players[playerCount].stats.deaths + "/" + data.data.players.all_players[playerCount].stats.assists))
        
                            var matchStanding = document.createElement("div");
                            var result = document.createElement("span");
                            result.className = "result-header"
                            result.appendChild(document.createTextNode("RESULT"))
                            matchStanding.appendChild(result)
                            if(data.data.teams.red == null) {
                                if(data.data.players.all_players[playerCount].stats.kills == 40) {
                                    matchStanding.className = "match-result-won-favmatch";
                                    matchStanding.appendChild(document.createTextNode("WIN"));
                                } else {
                                    matchStanding.className = "match-result-lost-favmatch";
                                    matchStanding.appendChild(document.createTextNode("LOSE"));
                                }
                            } else {
                                if(data.data.players.all_players[playerCount].team == "Blue") {
                                    if(data.data.teams.blue.rounds_won == data.data.teams.blue.rounds_lost) {
                                        matchStanding.className = "match-result-draw-favmatch";
                                        matchRRspan.className = `match-rr-pp-draw`;
                                        matchRRspan.setAttribute("id", "match-rr-id-"+ count);
                                        matchStanding.appendChild(document.createTextNode(data.data.teams.blue.rounds_won + " : " + data.data.teams.blue.rounds_lost));
                                    } else {
                                        if(data.data.teams.blue.has_won == false) {
                                            matchStanding.className = "match-result-lost-favmatch";
                                            matchRRspan.className = `match-rr-pp-lose`;
                                            matchRRspan.setAttribute("id", "match-rr-id-"+ count);
                                            matchStanding.appendChild(document.createTextNode(data.data.teams.blue.rounds_won + " : " + data.data.teams.blue.rounds_lost));
                                        } else {
                                            matchStanding.className = "match-result-won-favmatch";
                                            matchRRspan.className = `match-rr-pp-win`;
                                            matchRRspan.setAttribute("id", "match-rr-id-"+ count);
                                            matchStanding.appendChild(document.createTextNode(data.data.teams.blue.rounds_won + " : " + data.data.teams.blue.rounds_lost));
                                        }
                                    }
                                } else {
                                    if(data.data.teams.blue.rounds_won == data.data.teams.blue.rounds_lost) {
                                        matchStanding.className = "match-result-draw-favmatch";
                                        matchRRspan.className = `match-rr-pp-draw`;
                                        matchRRspan.setAttribute("id", "match-rr-id-"+ count);
                                        matchStanding.appendChild(document.createTextNode(data.data.teams.blue.rounds_won + " : " + data.data.teams.blue.rounds_lost));
                                    } else {
                                        if(data.data.teams.red.has_won == false) {
                                            matchStanding.className = "match-result-lost-favmatch";
                                            matchRRspan.className = `match-rr-pp-lose`;
                                            matchRRspan.setAttribute("id", "match-rr-id-"+ count);
                                            matchStanding.appendChild(document.createTextNode(data.data.teams.red.rounds_won + " : " + data.data.teams.red.rounds_lost));
                                        } else {
                                            matchStanding.className = "match-result-won-favmatch";
                                            matchRRspan.className = `match-rr-pp-win`;
                                            matchRRspan.setAttribute("id", "match-rr-id-"+ count);
                                            matchStanding.appendChild(document.createTextNode(data.data.teams.red.rounds_won + " : " + data.data.teams.red.rounds_lost));
                                        }
                                    }
                                }
                            }
                        } else {
                            continue;
                        }
                    }
        
                    var startedOn = document.createElement("span");
                    startedOn.className = "match-time";
                    startedOn.appendChild(document.createTextNode(data.data.metadata.game_start_patched));
                    var hiddenMatchID = document.createElement("span");
                    hiddenMatchID.className = "hidden-matchid"
                    hiddenMatchID.appendChild(document.createTextNode(data.data.metadata.matchid))
                    Matchcontainer.appendChild(hiddenMatchID);
                    Matchcontainer.setAttribute("onclick", "loadMatchView(this.firstChild.textContent)")
                    Matchcontainer.appendChild(playedAgent);
                    Matchcontainer.appendChild(matchmodeIcon);
                    Matchcontainer.appendChild(matchKDA);
                    Matchcontainer.appendChild(matchStanding);
                    Matchcontainer.appendChild(startedOn);
                    if(matchmode == "Competitive") {
                        matchRRwrapper.appendChild(matchRRspan)
                        Matchcontainer.appendChild(matchRRwrapper);
                    }
                    Matchcontainer.appendChild(matchMap);
                    
                    var wrapper = document.getElementById("loading-layer");
                    var nextElement = document.getElementById("lastElement");
                    wrapper.insertBefore(Matchcontainer, nextElement);
                    
                    setTimeout(function() {
                        $('.loading-icon').css("display", "none");
                        $('.loading-layer').css("opacity", "0");
                        $('.loading-layer').css("display", "block");
                        $('.loading-layer').fadeTo(150, 1)
                    }, 200)

                    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

                } else { //Folder but no Match found
                    $.ajax({
                        dataType: "json",
                        url: `https://api.henrikdev.xyz/valorant/v2/match/${matchID}`,
                        type: 'get',
                        async: false,
                        success: function(APIdata, xhr) {
                            console.log("NO MATCH FOUND, DOWNLOADING DATA")
                            fs.writeFileSync(checkedPath, JSON.stringify(APIdata));
                            window.location.href = ""
                        }
                    });
                }
            } else { //No folder found
                fs.mkdirSync(checkedFolder)
                $.ajax({
                    dataType: "json",
                    url: `https://api.henrikdev.xyz/valorant/v2/match/${matchID}`,
                    type: 'get',
                    async: false,
                    success: function(APIdata, xhr) {
                        console.log("NO FOLDER FOUND, CREATING FOLDER AND DOWNLOADING DATA")
                        fs.writeFileSync(checkedPath, JSON.stringify(APIdata));
                        window.location.href = ""
                    }
                });
            }
        }
    }
    fs.readdir(process.env.APPDATA + `/VALTracker/settings/favouriteMatches`, (err, files) => {
        if(err) {
            console.log(err);
        } else {
            files.forEach(file => {
                if(!matchIDarray.includes(path.parse(file).name)) {
                    const deleteFile = process.env.APPDATA + `/VALTracker/settings/favouriteMatches/` + file
                    fs.unlink(deleteFile, (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('Deleted ' + file);
                        }
                    })
                }
            })
        }
    })
})