$(document).ready(() => {
    setTimeout(function() {
        let rawdata = fs.readFileSync(process.env.APPDATA + '/VALTracker/settings/userData.json');
        let dataToRead = JSON.parse(rawdata);

        var playerName = dataToRead.playerName
        var playerTag = dataToRead.playerTag
        var playerRegion = dataToRead.playerRegion
        
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
            document.querySelectorAll('.home-matchtile').forEach(e => e.remove());
            var filterType = document.getElementById('selected-matchtype').value;
            if(filterType == "") {
                $.ajax({
                    dataType: "json",
                    url: `https://api.henrikdev.xyz/valorant/v3/matches/${playerRegion}/${playerName}/${playerTag}`,
                    type: 'get',
                    success: function(data3, xhr) {
                        var totalRoundCount = 0;
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

                            totalRoundCount = totalRoundCount + data3.data[count].rounds.length
                
                            for(var playerCount = 0; playerCount < data3.data[count].players.all_players.length; playerCount++) {
                                if(data3.data[count].players.all_players[playerCount].name == playerName && data3.data[count].players.all_players[playerCount].tag == playerTag) {
        
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

                                    if(matchmode == "Competitive") {
                                        var matchRRwrapper = document.createElement("div");
                                        matchRRwrapper.className = "match-rr-wrapper";
            
                                        var matchRRimg = document.createElement("img");
                                        matchRRimg.className = "match-rr-img";
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
                                        matchRRimg.setAttribute("src", `${rankIcons[data3.data[count].players.all_players[playerCount].currenttier -3]}`)
                
                                        matchRRwrapper.appendChild(matchRRimg)
            
                                        var matchRRspan = document.createElement("span");
                                    }

                                    playedAgent.src = `assets/img/${data3.data[count].players.all_players[playerCount].character}.png`;
                
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
                                        if(data3.data[count].rounds[data3.data[count].rounds.length -1].end_type == "Surrendered") {
                                            if(data3.data[count].players.all_players[playerCount].team == data3.data[count].rounds[data3.data[count].rounds.length -1].winning_team) {
                                                matchStanding.className = "match-result-won";
                                                if(matchmode == "Competitive") {
                                                    matchRRspan.className = `match-rr-home-win`;
                                                    matchRRspan.setAttribute("id", "match-rr-id-"+ count);
                                                }
                                                matchStanding.appendChild(document.createTextNode("SURRENDER"));
                                            } else {
                                                matchStanding.className = "match-result-lost";
                                                if(matchmode == "Competitive") {
                                                    matchRRspan.className = `match-rr-home-lose`;
                                                    matchRRspan.setAttribute("id", "match-rr-id-"+ count);
                                                }
                                                matchStanding.appendChild(document.createTextNode("SURRENDER"));
                                            }
                                        } else {
                                            if(data3.data[count].players.all_players[playerCount].team == "Blue") {
                                                if(data3.data[count].teams.blue.rounds_won == data3.data[count].teams.blue.rounds_lots) {
                                                    matchStanding.className = "match-result-draw";
                                                    if(matchmode == "Competitive") {
                                                        matchRRspan.className = `match-rr-home-draw`;
                                                        matchRRspan.setAttribute("id", "match-rr-id-"+ count);
                                                    }
                                                    matchStanding.appendChild(document.createTextNode(data3.data[count].teams.blue.rounds_won + " : " + data3.data[count].teams.blue.rounds_lots));
                                                } else {
                                                    if(data3.data[count].teams.blue.has_won == false) {
                                                        matchStanding.className = "match-result-lost";
                                                        if(matchmode == "Competitive") {
                                                            matchRRspan.className = `match-rr-home-lose`;
                                                            matchRRspan.setAttribute("id", "match-rr-id-"+ count);
                                                        }
                                                        matchStanding.appendChild(document.createTextNode(data3.data[count].teams.blue.rounds_won + " : " + data3.data[count].teams.blue.rounds_lots));
                                                    } else {
                                                        matchStanding.className = "match-result-won";
                                                        if(matchmode == "Competitive") {
                                                            matchRRspan.className = `match-rr-home-win`;
                                                            matchRRspan.setAttribute("id", "match-rr-id-"+ count);
                                                        }
                                                        matchStanding.appendChild(document.createTextNode(data3.data[count].teams.blue.rounds_won + " : " + data3.data[count].teams.blue.rounds_lots));
                                                    }
                                                }
                                            } else {
                                                if(data3.data[count].teams.blue.rounds_won == data3.data[count].teams.blue.rounds_lots) {
                                                    matchStanding.className = "match-result-draw";
                                                    if(matchmode == "Competitive") {
                                                        matchRRspan.className = `match-rr-home-draw`;
                                                        matchRRspan.setAttribute("id", "match-rr-id-"+ count);
                                                    }
                                                    matchStanding.appendChild(document.createTextNode(data3.data[count].teams.blue.rounds_won + " : " + data3.data[count].teams.blue.rounds_lots));
                                                } else {
                                                    if(data3.data[count].teams.red.has_won == false) {
                                                        matchStanding.className = "match-result-lost";
                                                        if(matchmode == "Competitive") {
                                                            matchRRspan.className = `match-rr-home-lose`;
                                                            matchRRspan.setAttribute("id", "match-rr-id-"+ count);
                                                        }
                                                        matchStanding.appendChild(document.createTextNode(data3.data[count].teams.red.rounds_won + " : " + data3.data[count].teams.red.rounds_lots));
                                                    } else {
                                                        matchStanding.className = "match-result-won";
                                                        if(matchmode == "Competitive") {
                                                            matchRRspan.className = `match-rr-home-win`;
                                                            matchRRspan.setAttribute("id", "match-rr-id-"+ count);
                                                        }
                                                        matchStanding.appendChild(document.createTextNode(data3.data[count].teams.red.rounds_won + " : " + data3.data[count].teams.red.rounds_lots));
                                                    }
                                                }
                                            }
                                        }
                                    }
        
                                    //////////////////////////////////////////////////////////////////////
                                } else {
                                    continue;
                                }
                            }
                            var hiddenMatchID = document.createElement("span");
                            hiddenMatchID.className = "hidden-matchid"
                            hiddenMatchID.appendChild(document.createTextNode(data3.data[count].metadata.matchid))
                            Matchcontainer.appendChild(hiddenMatchID);
                            Matchcontainer.setAttribute("onclick", "loadMatchView(this.firstChild.textContent, window.location.pathname)")
                            Matchcontainer.appendChild(playedAgent);
                            Matchcontainer.appendChild(matchmodeIcon);
                            Matchcontainer.appendChild(matchKDA);
                            Matchcontainer.appendChild(matchStanding);
                            if(matchmode == "Competitive") {
                                matchRRwrapper.appendChild(matchRRspan)
                                Matchcontainer.appendChild(matchRRwrapper);
                            }
                            Matchcontainer.appendChild(matchMap);
                            var favStarIcon = document.createElement("i")
                            favStarIcon.classList.add("far", "fa-star")
                            favStarIcon.setAttribute("onclick", "saveToFavs(this.parentElement.firstChild.textContent, this); event.stopPropagation();");
                            Matchcontainer.appendChild(favStarIcon)   
                            
                            var wrapper = document.getElementById("last-matches");
                            var nextElement = document.getElementById("lastElement");
                            wrapper.insertBefore(Matchcontainer, nextElement);
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
                        $('.home-avg-headshots').empty()
                        $('.home-avg-bodyshots').empty()
                        $('.home-avg-legshots').empty()
                        $('#home-stats-header').empty()
                        $('.home-avg-headshots').append(" " + Math.floor((headshots_after / totalShotsHit) * 100) + "%")
                        $('.home-avg-bodyshots').append(" " + Math.floor((bodyshots_after / totalShotsHit) * 100) + "%")
                        $('.home-avg-legshots').append(" " + Math.floor((legshots_after / totalShotsHit) * 100) + "%")
                        $('#home-stats-header').append(`Stats of your last 5 Matches`)
    
                        var pKills_before = 0;
                        var pDeaths_before = 0;
                        var pAssists_before = 0;
                        var pScore_before = 0;
                        var pDmg_before = 0;
                        for(var count = 0; count < 5; count++) {
                            pScore_before = pScore_before + parseInt(sessionStorage.getItem(`addToTotal_score-${count}`))
                            pKills_before = pKills_before + parseInt(sessionStorage.getItem(`addToTotal_kills-${count}`))
                            pDeaths_before = pDeaths_before + parseInt(sessionStorage.getItem(`addToTotal_deaths-${count}`))
                            pAssists_before = pAssists_before + parseInt(sessionStorage.getItem(`addToTotal_assists-${count}`))
                            pDmg_before = pDmg_before + parseInt(sessionStorage.getItem(`addToTotal_dmg-${count}`))
                        }
                        var pKills_after = pKills_before / 5;
                        var pDeaths_after = pDeaths_before / 5;
                        var pAssists_after = pAssists_before / 5;
                        var pScore_after = pScore_before / 5;
                        var pDmg_after = pDmg_before / parseInt(sessionStorage.getItem(`totalRoundCount`));
                
                        $('.home-avg-kda').empty()
                        $('.home-avg-score').empty()
                        $('.home-avg-dmg_match').empty()
                        $('.home-avg-kda').append(" " + Math.round(pKills_after) + "/" + Math.round(pDeaths_after) + "/" + Math.round(pAssists_after));
                        $('.home-avg-score').append(" " + pScore_after);
                        $('.home-avg-dmg_match').append(" " + Math.round(pDmg_after) + "HP");
    
                        let finishedData = {
                            preferredMatchFilter: filterType
                        };
                         
                        let data1 = JSON.stringify(finishedData);
                        fs.writeFileSync(process.env.APPDATA + '/VALTracker/settings/home/preferredMatchFilter.json', data1);
                
                        $.ajax({
                            dataType: "json",
                            url: `https://api.henrikdev.xyz/valorant/v1/mmr-history/eu/${playerName}/${playerTag}`,
                            type: 'get',
                            success: function(data, xhr) {
                                function ispositive(n){
                                    return 1/(n*0)===1/0
                                }
                                var RR_after = data.data[0].mmr_change_to_last_game + data.data[1].mmr_change_to_last_game + data.data[2].mmr_change_to_last_game + data.data[3].mmr_change_to_last_game + data.data[4].mmr_change_to_last_game;
                                if(ispositive(RR_after) == true) {
                                    $('.home-avg-rrchange').empty()
                                    $('.home-avg-rrchange').append(" +" + RR_after)
                                } else {
                                    $('.home-avg-rrchange').empty()
                                    $('.home-avg-rrchange').append("" + RR_after)
                                }
                                for(var count = 0; count < 5; count++) {
                                    if(ispositive(data.data[count].mmr_change_to_last_game) == true) {
                                        $(`#match-rr-id-${count}`).append("+" + data.data[count].mmr_change_to_last_game)
                                    } else {
                                        $(`#match-rr-id-${count}`).append(data.data[count].mmr_change_to_last_game)
                                    }
                                }

                                var checkedPath1 = process.env.APPDATA + '/VALTracker/settings/favourites.json'
                                if(fs.existsSync(checkedPath1)) {
                                    var rawdata = fs.readFileSync(checkedPath1);
                                    var dataToRead = JSON.parse(rawdata);
                                    var matches = document.getElementsByClassName('home-matchtile')
                                    for(var count = 0; count < matches.length; count++) {
                                        for(var jsonCount = 0; jsonCount < dataToRead.favourites.length; jsonCount++) {
                                            if(matches.item(count).firstChild.textContent == dataToRead.favourites[jsonCount].MatchID) {
                                                matches.item(count).lastChild.classList.toggle('far')
                                                matches.item(count).lastChild.classList.toggle('fas')
                                                matches.item(count).lastChild.setAttribute("id", dataToRead.favourites[jsonCount].MatchID)
                                            }
                                        }
                                    }
                                } else {
                                    var newArrToPush = {
                                        "favourites": [{
                            
                                        }]
                                    };
                            
                                    fs.writeFileSync(checkedPath1, JSON.stringify(newArrToPush));
                                }
                                                    
                                $('.loading-icon').fadeTo(150, 0)
                                setTimeout(function() {
                                    $('.loading-icon').css("display", "none");
                                    $('.loading-layer').css("opacity", "0");
                                    $('.loading-layer').css("display", "block");
                                    $('.loading-layer').fadeTo(150, 1)
                                }, 200)
                            }
                        })
                    }
                });
            } else {
                $.ajax({
                    dataType: "json",
                    url: `https://api.henrikdev.xyz/valorant/v3/matches/${playerRegion}/${playerName}/${playerTag}?filter=${filterType}`,
                    type: 'get',
                    success: function(data3, xhr) {
                        var totalRoundCount = 0;
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

                            totalRoundCount = totalRoundCount + data3.data[count].rounds.length
                
                            for(var playerCount = 0; playerCount < data3.data[count].players.all_players.length; playerCount++) {
                                if(data3.data[count].players.all_players[playerCount].name == playerName && data3.data[count].players.all_players[playerCount].tag == playerTag) {
        
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

                                    if(matchmode == "Competitive") {
                                        var matchRRwrapper = document.createElement("div");
                                        matchRRwrapper.className = "match-rr-wrapper";
            
                                        var matchRRimg = document.createElement("img");
                                        matchRRimg.className = "match-rr-img";
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
                                        matchRRimg.setAttribute("src", `${rankIcons[data3.data[count].players.all_players[playerCount].currenttier -3]}`)
                
                                        matchRRwrapper.appendChild(matchRRimg)
            
                                        var matchRRspan = document.createElement("span");
                                    }

                                    playedAgent.src = `assets/img/${data3.data[count].players.all_players[playerCount].character}.png`;
                
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
                                        if(data3.data[count].rounds[data3.data[count].rounds.length -1].end_type == "Surrendered") {
                                            if(data3.data[count].players.all_players[playerCount].team == data3.data[count].rounds[data3.data[count].rounds.length -1].winning_team) {
                                                matchStanding.className = "match-result-won";
                                                if(matchmode == "Competitive") {
                                                    matchRRspan.className = `match-rr-home-win`;
                                                    matchRRspan.setAttribute("id", "match-rr-id-"+ count);
                                                }
                                                matchStanding.appendChild(document.createTextNode("SURRENDER"));
                                            } else {
                                                matchStanding.className = "match-result-lost";
                                                if(matchmode == "Competitive") {
                                                    matchRRspan.className = `match-rr-home-lose`;
                                                    matchRRspan.setAttribute("id", "match-rr-id-"+ count);
                                                }
                                                matchStanding.appendChild(document.createTextNode("SURRENDER"));
                                            }
                                        } else {
                                            if(data3.data[count].players.all_players[playerCount].team == "Blue") {
                                                if(data3.data[count].teams.blue.rounds_won == data3.data[count].teams.blue.rounds_lots) {
                                                    matchStanding.className = "match-result-draw";
                                                    if(matchmode == "Competitive") {
                                                        matchRRspan.className = `match-rr-home-draw`;
                                                        matchRRspan.setAttribute("id", "match-rr-id-"+ count);
                                                    }
                                                    matchStanding.appendChild(document.createTextNode(data3.data[count].teams.blue.rounds_won + " : " + data3.data[count].teams.blue.rounds_lots));
                                                } else {
                                                    if(data3.data[count].teams.blue.has_won == false) {
                                                        matchStanding.className = "match-result-lost";
                                                        if(matchmode == "Competitive") {
                                                            matchRRspan.className = `match-rr-home-lose`;
                                                            matchRRspan.setAttribute("id", "match-rr-id-"+ count);
                                                        }
                                                        matchStanding.appendChild(document.createTextNode(data3.data[count].teams.blue.rounds_won + " : " + data3.data[count].teams.blue.rounds_lots));
                                                    } else {
                                                        matchStanding.className = "match-result-won";
                                                        if(matchmode == "Competitive") {
                                                            matchRRspan.className = `match-rr-home-win`;
                                                            matchRRspan.setAttribute("id", "match-rr-id-"+ count);
                                                        }
                                                        matchStanding.appendChild(document.createTextNode(data3.data[count].teams.blue.rounds_won + " : " + data3.data[count].teams.blue.rounds_lots));
                                                    }
                                                }
                                            } else {
                                                if(data3.data[count].teams.blue.rounds_won == data3.data[count].teams.blue.rounds_lots) {
                                                    matchStanding.className = "match-result-draw";
                                                    if(matchmode == "Competitive") {
                                                        matchRRspan.className = `match-rr-home-draw`;
                                                        matchRRspan.setAttribute("id", "match-rr-id-"+ count);
                                                    }
                                                    matchStanding.appendChild(document.createTextNode(data3.data[count].teams.blue.rounds_won + " : " + data3.data[count].teams.blue.rounds_lots));
                                                } else {
                                                    if(data3.data[count].teams.red.has_won == false) {
                                                        matchStanding.className = "match-result-lost";
                                                        if(matchmode == "Competitive") {
                                                            matchRRspan.className = `match-rr-home-lose`;
                                                            matchRRspan.setAttribute("id", "match-rr-id-"+ count);
                                                        }
                                                        matchStanding.appendChild(document.createTextNode(data3.data[count].teams.red.rounds_won + " : " + data3.data[count].teams.red.rounds_lots));
                                                    } else {
                                                        matchStanding.className = "match-result-won";
                                                        if(matchmode == "Competitive") {
                                                            matchRRspan.className = `match-rr-home-win`;
                                                            matchRRspan.setAttribute("id", "match-rr-id-"+ count);
                                                        }
                                                        matchStanding.appendChild(document.createTextNode(data3.data[count].teams.red.rounds_won + " : " + data3.data[count].teams.red.rounds_lots));
                                                    }
                                                }
                                            }
                                        }
                                    }
        
                                    //////////////////////////////////////////////////////////////////////
                                } else {
                                    continue;
                                }
                            }
                            var hiddenMatchID = document.createElement("span");
                            hiddenMatchID.className = "hidden-matchid"
                            hiddenMatchID.appendChild(document.createTextNode(data3.data[count].metadata.matchid))
                            Matchcontainer.appendChild(hiddenMatchID);
                            Matchcontainer.setAttribute("onclick", "loadMatchView(this.firstChild.textContent, window.location.pathname)")
                            Matchcontainer.appendChild(playedAgent);
                            Matchcontainer.appendChild(matchmodeIcon);
                            Matchcontainer.appendChild(matchKDA);
                            Matchcontainer.appendChild(matchStanding);
                            if(matchmode == "Competitive") {
                                matchRRwrapper.appendChild(matchRRspan)
                                Matchcontainer.appendChild(matchRRwrapper);
                            }
                            Matchcontainer.appendChild(matchMap);
                            var favStarIcon = document.createElement("i")
                            favStarIcon.classList.add("far", "fa-star")
                            favStarIcon.setAttribute("onclick", "saveToFavs(this.parentElement.firstChild.textContent, this); event.stopPropagation();");
                            Matchcontainer.appendChild(favStarIcon)   
                            
                            var wrapper = document.getElementById("last-matches");
                            var nextElement = document.getElementById("lastElement");
                            wrapper.insertBefore(Matchcontainer, nextElement);
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
                        $('.home-avg-headshots').empty()
                        $('.home-avg-bodyshots').empty()
                        $('.home-avg-legshots').empty()
                        $('#home-stats-header').empty()
                        $('.home-avg-headshots').append(" " + Math.floor((headshots_after / totalShotsHit) * 100) + "%")
                        $('.home-avg-bodyshots').append(" " + Math.floor((bodyshots_after / totalShotsHit) * 100) + "%")
                        $('.home-avg-legshots').append(" " + Math.floor((legshots_after / totalShotsHit) * 100) + "%")
                        let titleCase = filterType[0].toUpperCase() + filterType.substr(1);
                        $('#home-stats-header').append(`Stats of your last 5 ${titleCase} Matches`)
    
                        var pKills_before = 0;
                        var pDeaths_before = 0;
                        var pAssists_before = 0;
                        var pScore_before = 0;
                        var pDmg_before = 0;
                        for(var count = 0; count < 5; count++) {
                            pScore_before = pScore_before + parseInt(sessionStorage.getItem(`addToTotal_score-${count}`))
                            pKills_before = pKills_before + parseInt(sessionStorage.getItem(`addToTotal_kills-${count}`))
                            pDeaths_before = pDeaths_before + parseInt(sessionStorage.getItem(`addToTotal_deaths-${count}`))
                            pAssists_before = pAssists_before + parseInt(sessionStorage.getItem(`addToTotal_assists-${count}`))
                            pDmg_before = pDmg_before + parseInt(sessionStorage.getItem(`addToTotal_dmg-${count}`))
                        }
                        var pKills_after = pKills_before / 5;
                        var pDeaths_after = pDeaths_before / 5;
                        var pAssists_after = pAssists_before / 5;
                        var pScore_after = pScore_before / 5;
                        var pDmg_after = pDmg_before / parseInt(sessionStorage.getItem(`totalRoundCount`));
                
                        $('.home-avg-kda').empty()
                        $('.home-avg-score').empty()
                        $('.home-avg-dmg_match').empty()
                        $('.home-avg-kda').append(" " + Math.round(pKills_after) + "/" + Math.round(pDeaths_after) + "/" + Math.round(pAssists_after));
                        $('.home-avg-score').append(" " + pScore_after);
                        $('.home-avg-dmg_match').append(" " + Math.round(pDmg_after) + "HP");
    
                        let finishedData = {
                            preferredMatchFilter: filterType
                        };
                         
                        let data1 = JSON.stringify(finishedData);
                        fs.writeFileSync(process.env.APPDATA + '/VALTracker/settings/home/preferredMatchFilter.json', data1);
                
                        $.ajax({
                            dataType: "json",
                            url: `https://api.henrikdev.xyz/valorant/v1/mmr-history/eu/${playerName}/${playerTag}`,
                            type: 'get',
                            success: function(data, xhr) {
                                function ispositive(n){
                                    return 1/(n*0)===1/0
                                }
                                var RR_after = data.data[0].mmr_change_to_last_game + data.data[1].mmr_change_to_last_game + data.data[2].mmr_change_to_last_game + data.data[3].mmr_change_to_last_game + data.data[4].mmr_change_to_last_game;
                                if(ispositive(RR_after) == true) {
                                    $('.home-avg-rrchange').empty()
                                    $('.home-avg-rrchange').append(" +" + RR_after)
                                } else {
                                    $('.home-avg-rrchange').empty()
                                    $('.home-avg-rrchange').append("" + RR_after)
                                }
                                for(var count = 0; count < 5; count++) {
                                    if(ispositive(data.data[count].mmr_change_to_last_game) == true) {
                                        $(`#match-rr-id-${count}`).append("+" + data.data[count].mmr_change_to_last_game)
                                    } else {
                                        $(`#match-rr-id-${count}`).append(data.data[count].mmr_change_to_last_game)
                                    }
                                }

                                var checkedPath1 = process.env.APPDATA + '/VALTracker/settings/favourites.json'
                                if(fs.existsSync(checkedPath1)) {
                                    var rawdata = fs.readFileSync(checkedPath1);
                                    var dataToRead = JSON.parse(rawdata);
                                    var matches = document.getElementsByClassName('home-matchtile')
                                    for(var count = 0; count < matches.length; count++) {
                                        for(var jsonCount = 0; jsonCount < dataToRead.favourites.length; jsonCount++) {
                                            if(matches.item(count).firstChild.textContent == dataToRead.favourites[jsonCount].MatchID) {
                                                matches.item(count).lastChild.classList.toggle('far')
                                                matches.item(count).lastChild.classList.toggle('fas')
                                                matches.item(count).lastChild.setAttribute("id", dataToRead.favourites[jsonCount].MatchID)
                                            }
                                        }
                                    }
                                } else {
                                    var newArrToPush = {
                                        "favourites": [{
                            
                                        }]
                                    };
                            
                                    fs.writeFileSync(checkedPath1, JSON.stringify(newArrToPush));
                                }
                                                    
                                $('.loading-icon').fadeTo(150, 0)
                                setTimeout(function() {
                                    $('.loading-icon').css("display", "none");
                                    $('.loading-layer').css("opacity", "0");
                                    $('.loading-layer').css("display", "block");
                                    $('.loading-layer').fadeTo(150, 1)
                                }, 200)
                            }
                        })
                    }
                });
            }
        });
    }, 500)
});