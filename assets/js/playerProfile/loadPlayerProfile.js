var searchedPlayerName = sessionStorage.getItem("player_name");
var searchedPlayerTag = sessionStorage.getItem("player_tag");

function makeCallAndBuildElements() {
    $('.player-pageheader').append(searchedPlayerName + "#" + searchedPlayerTag)
    $.ajax({
        dataType: "json",
        url: `https://api.henrikdev.xyz/valorant/v1/account/${searchedPlayerName}/${searchedPlayerTag}`,
        type: 'get',
        success: function(data, xhr) {
            $('.player-card-img').attr("src", data.data.card.small);
            //console.log("Card: " + data.data.card.small);
            var playerRegion = data.data.region
            var playerName = data.data.name
            var playerTag = data.data.tag
            var puuid = data.data.puuid
            $('.last-updated').append("Last updated: " + data.data.last_update)
            $('.player-account-level').append("Account Level: " + data.data.account_level)
            $('#player-region-span').append("Region: " + playerRegion.toUpperCase());
            setTimeout(function() {
                $.ajax({
                    dataType: "json",
                    url: `https://api.henrikdev.xyz/valorant/v1/mmr/${playerRegion}/${playerName}/${playerTag}`,
                    type: 'get',
                    success: function(data2, xhr) {
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
                        $('.player-rank').attr("src", rankIcons[data2.data.currenttier -3])
                        setTimeout(function() {
                            $.ajax({
                                dataType: "json",
                                url: `https://api.henrikdev.xyz/valorant/v3/by-puuid/matches/${playerRegion}/${puuid}`,
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
                                        if(matchmode == "Unrated" || matchmode == "Competitive") {
                                            matchmodeIcon.setAttribute("src", "./assets/img/standard.png")
                                        } else {
                                            matchmodeIcon.setAttribute("src", `./assets/img/${matchmode.toLowerCase()}.png`)
                                        }
        
                                        var matchMap = document.createElement("div");
                                        matchMap.className = "match-map";
                                        //matchMap.src = `./assets/img/${data3.data[count].metadata.map.toLowerCase()}.png`
                                        matchMap.setAttribute("style", `background: linear-gradient(to left, transparent, #1b222b), url(./assets/img/${data3.data[count].metadata.map.toLowerCase()}.png)`)
        
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
                                                        if(data3.data[count].teams.blue.has_won == false) {
                                                            matchStanding.className = "match-result-lost";
                                                            matchStanding.appendChild(document.createTextNode(data3.data[count].teams.blue.rounds_won + " : " + data3.data[count].teams.blue.rounds_lost));
                                                        } else {
                                                            matchStanding.className = "match-result-won";
                                                            matchStanding.appendChild(document.createTextNode(data3.data[count].teams.blue.rounds_won + " : " + data3.data[count].teams.blue.rounds_lost));
                                                        }
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
                    
                                        var wrapper = document.getElementById("main-collection");
                                        var nextElement = document.getElementById("lastElement");
                                        wrapper.insertBefore(Matchcontainer, nextElement);
                                    }
                                }
                            });
                        }, 1500)
                    },
                });
            }, 1500)
        },
    });
}

$(document).ready(() => {
    makeCallAndBuildElements();
});