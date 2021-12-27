$(document).ready(() => {
    setTimeout(function() {
        let rawdata = fs.readFileSync('./settings/userData.json');
        let dataToRead = JSON.parse(rawdata);

        let rawdata2 = fs.readFileSync('./settings/home/preferredMatchFilter.json');
        let dataToRead2 = JSON.parse(rawdata2);

        var playerName = dataToRead.playerName
        var playerTag = dataToRead.playerTag
        if(dataToRead2.preferredMatchFilter == "") {
            $.ajax({
                dataType: "json",
                url: `https://api.henrikdev.xyz/valorant/v3/matches/eu/${playerName}/${playerTag}`,
                type: 'get',
                success: function(data3, xhr) {
                    for(var count = 0; count < data3.data.length; count++) {
            
                        var Matchcontainer = document.createElement("div");
                        Matchcontainer.className = "home-matchtile";
            
                        var matchmodeIcon = document.createElement("img");
                        matchmodeIcon.className = "match-mode-icon-home";
                        var matchmode = data3.data[count].metadata.mode
                        if(matchmode == "Unrated" || matchmode == "Competitive" || matchmode == "Custom Game") {
                            matchmodeIcon.setAttribute("src", "./assets/img/standard.png")
                        } else {
                            matchmodeIcon.setAttribute("src", `./assets/img/${matchmode.toLowerCase()}.png`)
                        }
            
                        var matchMap = document.createElement("span");
                        matchMap.className = "match-map-home";
                        matchMap.appendChild(document.createTextNode(`Map: ${data3.data[count].metadata.map}`));
            
                        var playedAgent = document.createElement("img");
                        playedAgent.className = "match-played-agent-home";
            
                        for(var playerCount = 0; playerCount < data3.data[count].players.all_players.length; playerCount++) {
                            if(data3.data[count].players.all_players[playerCount].name == playerName && data3.data[count].players.all_players[playerCount].tag == playerTag) {
                                playedAgent.src = data3.data[count].players.all_players[playerCount].assets.agent.small;
            
                                var matchKDA = document.createElement("span");
                                matchKDA.className = "match-kda-home";
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
    
                                //////////////////////////////////////////////////////////////////////
    
                                sessionStorage.setItem(`addToTotal_score-${count}`, data3.data[count].players.all_players[playerCount].stats.score)
                                sessionStorage.setItem(`addToTotal_kills-${count}`, data3.data[count].players.all_players[playerCount].stats.kills)
                                sessionStorage.setItem(`addToTotal_deaths-${count}`, data3.data[count].players.all_players[playerCount].stats.deaths)
                                sessionStorage.setItem(`addToTotal_assists-${count}`, data3.data[count].players.all_players[playerCount].stats.assists)
                                sessionStorage.setItem(`addToTotal_dmg-${count}`, data3.data[count].players.all_players[playerCount].damage_made)
                                var headshots_before = 0;
                                var bodyshots_before = 0;
                                var legshots_before = 0;
                                for(var roundCount = 0; roundCount < data3.data[count].rounds.length; roundCount++) {
                                    for(var playerCount2 = 0; playerCount2 < data3.data[count].rounds[roundCount].player_stats.length; playerCount2++) {
                                        if(data3.data[count].rounds[roundCount].player_stats[playerCount2].player_display_name == playerName + "#" + playerTag) {
                                           headshots_before = headshots_before + parseInt(data3.data[count].rounds[roundCount].player_stats[playerCount2].headshots)
                                           bodyshots_before = bodyshots_before + parseInt(data3.data[count].rounds[roundCount].player_stats[playerCount2].bodyshots)
                                           legshots_before = legshots_before + parseInt(data3.data[count].rounds[roundCount].player_stats[playerCount2].legshots)
                                           break;
                                        } else {
                                            continue;
                                        }
                                    }
                                }
                                sessionStorage.setItem(`headshot-counter-${count}`, headshots_before)
                                sessionStorage.setItem(`bodyshot-counter-${count}`, bodyshots_before)
                                sessionStorage.setItem(`legshot-counter-${count}`, legshots_before)
                            } else {
                                continue;
                            }
                        }
            
                        Matchcontainer.appendChild(playedAgent);
                        Matchcontainer.appendChild(matchmodeIcon);
                        Matchcontainer.appendChild(matchKDA);
                        Matchcontainer.appendChild(matchStanding);
                        Matchcontainer.appendChild(matchMap);
                        
                        var wrapper = document.getElementById("last-matches");
                        var nextElement = document.getElementById("lastElement");
                        wrapper.insertBefore(Matchcontainer, nextElement);
                                        
                        $('.loading-icon').fadeTo(150, 0)
                        setTimeout(function() {
                            $('.loading-icon').css("display", "none");
                            $('.loading-layer').css("opacity", "0");
                            $('.loading-layer').css("display", "block");
                            $('.loading-layer').fadeTo(150, 1)
                        }, 200)
                    }
                    var headshots_mid = 0;
                    var bodyshots_mid = 0;
                    var legshots_mid = 0;
                    for(var totalShotCount = 0; totalShotCount < 5; totalShotCount++) {
                        headshots_mid = headshots_mid + parseInt(sessionStorage.getItem(`headshot-counter-${totalShotCount}`))
                        bodyshots_mid = bodyshots_mid + parseInt(sessionStorage.getItem(`bodyshot-counter-${totalShotCount}`))
                        legshots_mid = legshots_mid + parseInt(sessionStorage.getItem(`legshot-counter-${totalShotCount}`))
                    }
                    var headshots_after = headshots_mid / 5;
                    var bodyshots_after = bodyshots_mid / 5;
                    var legshots_after = legshots_mid / 5;
                    var totalShotsHit = headshots_after + bodyshots_after + legshots_after;
                    $('.home-avg-headshots').append(" " + Math.floor((headshots_after / totalShotsHit) * 100) + "%")
                    $('.home-avg-bodyshots').append(" " + Math.floor((bodyshots_after / totalShotsHit) * 100) + "%")
                    $('.home-avg-legshots').append(" " + Math.floor((legshots_after / totalShotsHit) * 100) + "%")
                }
            });
        } else {
            var filterType = dataToRead2.preferredMatchFilter
            console.log(filterType)
            $.ajax({
                dataType: "json",
                url: `https://api.henrikdev.xyz/valorant/v3/matches/eu/${playerName}/${playerTag}?filter=${filterType}`,
                type: 'get',
                success: function(data3, xhr) {
                    for(var count = 0; count < data3.data.length; count++) {
            
                        var Matchcontainer = document.createElement("div");
                        Matchcontainer.className = "home-matchtile";
            
                        var matchmodeIcon = document.createElement("img");
                        matchmodeIcon.className = "match-mode-icon-home";
                        var matchmode = data3.data[count].metadata.mode
                        if(matchmode == "Unrated" || matchmode == "Competitive" || matchmode == "Custom Game") {
                            matchmodeIcon.setAttribute("src", "./assets/img/standard.png")
                        } else {
                            matchmodeIcon.setAttribute("src", `./assets/img/${matchmode.toLowerCase()}.png`)
                        }
            
                        var matchMap = document.createElement("span");
                        matchMap.className = "match-map-home";
                        matchMap.appendChild(document.createTextNode(`Map: ${data3.data[count].metadata.map}`));
            
                        var playedAgent = document.createElement("img");
                        playedAgent.className = "match-played-agent-home";
            
                        for(var playerCount = 0; playerCount < data3.data[count].players.all_players.length; playerCount++) {
                            if(data3.data[count].players.all_players[playerCount].name == playerName && data3.data[count].players.all_players[playerCount].tag == playerTag) {
                                playedAgent.src = data3.data[count].players.all_players[playerCount].assets.agent.small;
            
                                var matchKDA = document.createElement("span");
                                matchKDA.className = "match-kda-home";
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
    
                                //////////////////////////////////////////////////////////////////////
    
                                sessionStorage.setItem(`addToTotal_score-${count}`, data3.data[count].players.all_players[playerCount].stats.score)
                                sessionStorage.setItem(`addToTotal_kills-${count}`, data3.data[count].players.all_players[playerCount].stats.kills)
                                sessionStorage.setItem(`addToTotal_deaths-${count}`, data3.data[count].players.all_players[playerCount].stats.deaths)
                                sessionStorage.setItem(`addToTotal_assists-${count}`, data3.data[count].players.all_players[playerCount].stats.assists)
                                sessionStorage.setItem(`addToTotal_dmg-${count}`, data3.data[count].players.all_players[playerCount].damage_made)
                                var headshots_before = 0;
                                var bodyshots_before = 0;
                                var legshots_before = 0;
                                for(var roundCount = 0; roundCount < data3.data[count].rounds.length; roundCount++) {
                                    for(var playerCount2 = 0; playerCount2 < data3.data[count].rounds[roundCount].player_stats.length; playerCount2++) {
                                        if(data3.data[count].rounds[roundCount].player_stats[playerCount2].player_display_name == playerName + "#" + playerTag) {
                                           headshots_before = headshots_before + parseInt(data3.data[count].rounds[roundCount].player_stats[playerCount2].headshots)
                                           bodyshots_before = bodyshots_before + parseInt(data3.data[count].rounds[roundCount].player_stats[playerCount2].bodyshots)
                                           legshots_before = legshots_before + parseInt(data3.data[count].rounds[roundCount].player_stats[playerCount2].legshots)
                                           break;
                                        } else {
                                            continue;
                                        }
                                    }
                                }
                                sessionStorage.setItem(`headshot-counter-${count}`, headshots_before)
                                sessionStorage.setItem(`bodyshot-counter-${count}`, bodyshots_before)
                                sessionStorage.setItem(`legshot-counter-${count}`, legshots_before)
                            } else {
                                continue;
                            }
                        }
            
                        Matchcontainer.appendChild(playedAgent);
                        Matchcontainer.appendChild(matchmodeIcon);
                        Matchcontainer.appendChild(matchKDA);
                        Matchcontainer.appendChild(matchStanding);
                        Matchcontainer.appendChild(matchMap);
                        
                        var wrapper = document.getElementById("last-matches");
                        var nextElement = document.getElementById("lastElement");
                        wrapper.insertBefore(Matchcontainer, nextElement);
                                        
                        $('.loading-icon').fadeTo(150, 0)
                        setTimeout(function() {
                            $('.loading-icon').css("display", "none");
                            $('.loading-layer').css("opacity", "0");
                            $('.loading-layer').css("display", "block");
                            $('.loading-layer').fadeTo(150, 1)
                        }, 200)
                    }
                    var headshots_mid = 0;
                    var bodyshots_mid = 0;
                    var legshots_mid = 0;
                    for(var totalShotCount = 0; totalShotCount < 5; totalShotCount++) {
                        headshots_mid = headshots_mid + parseInt(sessionStorage.getItem(`headshot-counter-${totalShotCount}`))
                        bodyshots_mid = bodyshots_mid + parseInt(sessionStorage.getItem(`bodyshot-counter-${totalShotCount}`))
                        legshots_mid = legshots_mid + parseInt(sessionStorage.getItem(`legshot-counter-${totalShotCount}`))
                    }
                    var headshots_after = headshots_mid / 5;
                    var bodyshots_after = bodyshots_mid / 5;
                    var legshots_after = legshots_mid / 5;
                    var totalShotsHit = headshots_after + bodyshots_after + legshots_after;
                    $('.home-avg-headshots').append(" " + Math.floor((headshots_after / totalShotsHit) * 100) + "%")
                    $('.home-avg-bodyshots').append(" " + Math.floor((bodyshots_after / totalShotsHit) * 100) + "%")
                    $('.home-avg-legshots').append(" " + Math.floor((legshots_after / totalShotsHit) * 100) + "%")
                }
            });
        }
    }, 250)
})