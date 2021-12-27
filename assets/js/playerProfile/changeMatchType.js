const fs = require('fs');
$(document).ready(() => {
    setTimeout(function() {
        let rawdata = fs.readFileSync(process.env.APPDATA + '/VALTracker/settings/userData.json');
        let dataToRead = JSON.parse(rawdata);

        var playerName = dataToRead.playerName
        var playerTag = dataToRead.playerTag
        
        let rawdata2 = fs.readFileSync(process.env.APPDATA + '/VALTracker/settings/home/preferredMatchFilter.json');
        let dataToRead2 = JSON.parse(rawdata2);
        
        var filterData = dataToRead2.preferredMatchFilter
        if(filterData == "") {
            $('#home-stats-header').empty()
            $('#home-stats-header').append(`Stats of your last 5 Matches`)
        } else {
            let titleData = filterData[0].toUpperCase() + filterData.substr(1);
            $('#home-stats-header').empty()
            $('#home-stats-header').append(`Stats of your last 5 ${titleData} Matches`)
        }

        $("#selected-matchtype").change(function(){
            document.querySelectorAll('.match-wrapper').forEach(e => e.remove());
            var filterType = document.getElementById('selected-matchtype').value;
            if(filterType == "") {
                $.ajax({
                    dataType: "json",
                    url: `https://api.henrikdev.xyz/valorant/v3/matches/eu/${playerName}/${playerTag}`,
                    type: 'get',
                    success: function(data3, xhr) {
                        for(var count = 0; count < data3.data.length; count++) {
        
                            var ms = data3.data[count].metadata.game_length;
                            var d = new Date(1000*Math.round(ms/1000)); // round to nearest second
                            function pad(i) { return ('0'+i).slice(-2); }
                            var str = d.getUTCHours() + ':' + pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds());
                            //console.log(str);
                            //console.log(data3.data[count].metadata.game_start_patched);
                
                            var Matchcontainer = document.createElement("div");
                            Matchcontainer.className = "match-wrapper";
                
                            var matchmodeIcon = document.createElement("img");
                            matchmodeIcon.className = "match-mode-icon";
                            var matchmode = data3.data[count].metadata.mode
                            if(matchmode == "Unrated" || matchmode == "Competitive" || matchmode == "Custom Game") {
                                matchmodeIcon.setAttribute("src", "./assets/img/standard.png")
                            } else {
                                matchmodeIcon.setAttribute("src", `./assets/img/${matchmode.toLowerCase()}.png`)
                            }
                
                            var matchMap = document.createElement("img");
                            matchMap.className = "match-map";
                            //matchMap.src = `./assets/img/${data3.data[count].metadata.map.toLowerCase()}.png`
                            matchMap.setAttribute("src", `./assets/img/${data3.data[count].metadata.map.toLowerCase()}.png`)
                
                            var playedAgent = document.createElement("img");
                            playedAgent.className = "match-played-agent";
                
                            for(var playerCount = 0; playerCount < data3.data[count].players.all_players.length; playerCount++) {
                                if(data3.data[count].players.all_players[playerCount].name == playerName && data3.data[count].players.all_players[playerCount].tag == playerTag) {
                                    playedAgent.src = data3.data[count].players.all_players[playerCount].assets.agent.small;
                
                                    var matchKDA = document.createElement("span");
                                    matchKDA.className = "match-kda";
                                    matchKDA.appendChild(document.createTextNode("KDA: " + data3.data[count].players.all_players[playerCount].stats.kills + "/" + data3.data[count].players.all_players[playerCount].stats.deaths + "/" + data3.data[count].players.all_players[playerCount].stats.assists))
                
                                    var matchStanding = document.createElement("div");
                                    var result = document.createElement("span");
                                    result.className = "result-header"
                                    result.appendChild(document.createTextNode("RESULT"))
                                    matchStanding.appendChild(result)
                                    if(data3.data[count].teams.red == null) {
                                        if(data3.data[count].players.all_players[playerCount].stats.kills == 40) {
                                            matchStanding.className = "match-result-won";
                                            matchStanding.appendChild(document.createTextNode("WIN"));
                                        } else {
                                            matchStanding.className = "match-result-lost";
                                            matchStanding.appendChild(document.createTextNode("LOSE"));
                                        }
                                    } else {
                                        if(data3.data[count].players.all_players[playerCount].team == "Blue") {
                                            if(data3.data[count].teams.blue.rounds_won == data3.data[count].teams.blue.rounds_lost) {
                                                matchStanding.className = "match-result-draw";
                                                matchStanding.appendChild(document.createTextNode(data3.data[count].teams.blue.rounds_won + " : " + data3.data[count].teams.blue.rounds_lost));
                                            } else {
                                                if(data3.data[count].teams.blue.has_won == false) {
                                                    matchStanding.className = "match-result-lost";
                                                    matchStanding.appendChild(document.createTextNode(data3.data[count].teams.blue.rounds_won + " : " + data3.data[count].teams.blue.rounds_lost));
                                                } else {
                                                    matchStanding.className = "match-result-won";
                                                    matchStanding.appendChild(document.createTextNode(data3.data[count].teams.blue.rounds_won + " : " + data3.data[count].teams.blue.rounds_lost));
                                                }
                                            }
                                        } else {
                                            if(data3.data[count].teams.blue.rounds_won == data3.data[count].teams.blue.rounds_lost) {
                                                matchStanding.className = "match-result-draw";
                                                matchStanding.appendChild(document.createTextNode(data3.data[count].teams.blue.rounds_won + " : " + data3.data[count].teams.blue.rounds_lost));
                                            } else {
                                                if(data3.data[count].teams.red.has_won == false) {
                                                    matchStanding.className = "match-result-lost";
                                                    matchStanding.appendChild(document.createTextNode(data3.data[count].teams.red.rounds_won + " : " + data3.data[count].teams.red.rounds_lost));
                                                } else {
                                                    matchStanding.className = "match-result-won";
                                                    matchStanding.appendChild(document.createTextNode(data3.data[count].teams.red.rounds_won + " : " + data3.data[count].teams.red.rounds_lost));
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
                            startedOn.appendChild(document.createTextNode("Game duration: " + str));
                
                            Matchcontainer.appendChild(playedAgent);
                            Matchcontainer.appendChild(matchmodeIcon);
                            Matchcontainer.appendChild(matchKDA);
                            Matchcontainer.appendChild(matchStanding);
                            Matchcontainer.appendChild(startedOn);
                            Matchcontainer.appendChild(matchMap);
                            
                            var wrapper = document.getElementById("loading-layer");
                            var nextElement = document.getElementById("lastElement");
                            wrapper.insertBefore(Matchcontainer, nextElement);
                        }

                        let finishedData = {
                            preferredMatchFilter: filterType
                        };
                         
                        let data1 = JSON.stringify(finishedData);
                        fs.writeFileSync(process.env.APPDATA + '/VALTracker/settings/playersearch/preferredMatchFilter.json', data1);
                    }
                });
            } else {
                $.ajax({
                    dataType: "json",
                    url: `https://api.henrikdev.xyz/valorant/v3/matches/eu/${playerName}/${playerTag}?filter=${filterType}`,
                    type: 'get',
                    success: function(data3, xhr) {
                        for(var count = 0; count < data3.data.length; count++) {
        
                            var ms = data3.data[count].metadata.game_length;
                            var d = new Date(1000*Math.round(ms/1000)); // round to nearest second
                            function pad(i) { return ('0'+i).slice(-2); }
                            var str = d.getUTCHours() + ':' + pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds());
                            //console.log(str);
                            //console.log(data3.data[count].metadata.game_start_patched);
                
                            var Matchcontainer = document.createElement("div");
                            Matchcontainer.className = "match-wrapper";
                
                            var matchmodeIcon = document.createElement("img");
                            matchmodeIcon.className = "match-mode-icon";
                            var matchmode = data3.data[count].metadata.mode
                            if(matchmode == "Unrated" || matchmode == "Competitive" || matchmode == "Custom Game") {
                                matchmodeIcon.setAttribute("src", "./assets/img/standard.png")
                            } else {
                                matchmodeIcon.setAttribute("src", `./assets/img/${matchmode.toLowerCase()}.png`)
                            }
                
                            var matchMap = document.createElement("img");
                            matchMap.className = "match-map";
                            //matchMap.src = `./assets/img/${data3.data[count].metadata.map.toLowerCase()}.png`
                            matchMap.setAttribute("src", `./assets/img/${data3.data[count].metadata.map.toLowerCase()}.png`)
                
                            var playedAgent = document.createElement("img");
                            playedAgent.className = "match-played-agent";
                
                            for(var playerCount = 0; playerCount < data3.data[count].players.all_players.length; playerCount++) {
                                if(data3.data[count].players.all_players[playerCount].name == playerName && data3.data[count].players.all_players[playerCount].tag == playerTag) {
                                    playedAgent.src = data3.data[count].players.all_players[playerCount].assets.agent.small;
                
                                    var matchKDA = document.createElement("span");
                                    matchKDA.className = "match-kda";
                                    matchKDA.appendChild(document.createTextNode("KDA: " + data3.data[count].players.all_players[playerCount].stats.kills + "/" + data3.data[count].players.all_players[playerCount].stats.deaths + "/" + data3.data[count].players.all_players[playerCount].stats.assists))
                
                                    var matchStanding = document.createElement("div");
                                    var result = document.createElement("span");
                                    result.className = "result-header"
                                    result.appendChild(document.createTextNode("RESULT"))
                                    matchStanding.appendChild(result)
                                    if(data3.data[count].teams.red == null) {
                                        if(data3.data[count].players.all_players[playerCount].stats.kills == 40) {
                                            matchStanding.className = "match-result-won";
                                            matchStanding.appendChild(document.createTextNode("WIN"));
                                        } else {
                                            matchStanding.className = "match-result-lost";
                                            matchStanding.appendChild(document.createTextNode("LOSE"));
                                        }
                                    } else {
                                        if(data3.data[count].players.all_players[playerCount].team == "Blue") {
                                            if(data3.data[count].teams.blue.rounds_won == data3.data[count].teams.blue.rounds_lost) {
                                                matchStanding.className = "match-result-draw";
                                                matchStanding.appendChild(document.createTextNode(data3.data[count].teams.blue.rounds_won + " : " + data3.data[count].teams.blue.rounds_lost));
                                            } else {
                                                if(data3.data[count].teams.blue.has_won == false) {
                                                    matchStanding.className = "match-result-lost";
                                                    matchStanding.appendChild(document.createTextNode(data3.data[count].teams.blue.rounds_won + " : " + data3.data[count].teams.blue.rounds_lost));
                                                } else {
                                                    matchStanding.className = "match-result-won";
                                                    matchStanding.appendChild(document.createTextNode(data3.data[count].teams.blue.rounds_won + " : " + data3.data[count].teams.blue.rounds_lost));
                                                }
                                            }
                                        } else {
                                            if(data3.data[count].teams.blue.rounds_won == data3.data[count].teams.blue.rounds_lost) {
                                                matchStanding.className = "match-result-draw";
                                                matchStanding.appendChild(document.createTextNode(data3.data[count].teams.blue.rounds_won + " : " + data3.data[count].teams.blue.rounds_lost));
                                            } else {
                                                if(data3.data[count].teams.red.has_won == false) {
                                                    matchStanding.className = "match-result-lost";
                                                    matchStanding.appendChild(document.createTextNode(data3.data[count].teams.red.rounds_won + " : " + data3.data[count].teams.red.rounds_lost));
                                                } else {
                                                    matchStanding.className = "match-result-won";
                                                    matchStanding.appendChild(document.createTextNode(data3.data[count].teams.red.rounds_won + " : " + data3.data[count].teams.red.rounds_lost));
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
                            startedOn.appendChild(document.createTextNode("Game duration: " + str));
                
                            Matchcontainer.appendChild(playedAgent);
                            Matchcontainer.appendChild(matchmodeIcon);
                            Matchcontainer.appendChild(matchKDA);
                            Matchcontainer.appendChild(matchStanding);
                            Matchcontainer.appendChild(startedOn);
                            Matchcontainer.appendChild(matchMap);
                            
                            var wrapper = document.getElementById("loading-layer");
                            var nextElement = document.getElementById("lastElement");
                            wrapper.insertBefore(Matchcontainer, nextElement);
                        }
                        
                        let finishedData = {
                            preferredMatchFilter: filterType
                        };
                         
                        let data1 = JSON.stringify(finishedData);
                        fs.writeFileSync(process.env.APPDATA + '/VALTracker/settings/playersearch/preferredMatchFilter.json', data1);
                    }
                });
            }
        });
    }, 500)
});