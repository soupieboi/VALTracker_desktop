$(document).ready(function() {
    var matchID = sessionStorage.getItem("matchID");
    var playerName = sessionStorage.getItem("player_name");
    var playerTag = sessionStorage.getItem("player_tag");
    var lastPage = sessionStorage.getItem("last_page");
    $('#backToLastPage').on("click", function() {
        window.location.href = lastPage
    })
    $.ajax({
        url: `https://api.henrikdev.xyz/valorant/v2/match/${matchID}`,
        type: 'get',
        success: function(data, jqXHR) {
            $('.matchview-matchmode').append(data.data.metadata.mode)
            $('.insertMapName').append(data.data.metadata.map)
            var date = new Date(data.data.metadata.game_length);
            $('.matchview-matchstart').append(data.data.metadata.game_start_patched);
            $('.insertGameLength').append(`${date.getMinutes()}:${date.getSeconds()}`);

            var agentUUID_url;
            var headshot_before = 0;
            var bodyshot_before = 0;
            var legshot_before = 0;
            var totalFBs = 0;
            
            for(var count = 0; count < data.data.rounds.length; count++) { //Für jede runde Neu
                var killerArray = [] //Neuer Array
                var killtimeArray = [] //Neuer Array
                for(var count2 = 0; count2 < data.data.rounds[count].player_stats.length; count2++) { // Für Jeden spieler
                    for(var count3 = 0; count3 < data.data.rounds[count].player_stats[count2].kill_events.length; count3++) { //Für jeden Kill
                        killerArray.push(data.data.rounds[count].player_stats[count2].kill_events[count3].killer_display_name + " " + data.data.rounds[count].player_stats[count2].kill_events[count3].kill_time_in_round)
                        killtimeArray.push(data.data.rounds[count].player_stats[count2].kill_events[count3].kill_time_in_round)
                    }
                    if(data.data.rounds[count].player_stats[count2].player_display_name == playerName + "#" + playerTag) {
                        headshot_before = headshot_before + data.data.rounds[count].player_stats[count2].headshots
                        bodyshot_before = bodyshot_before + data.data.rounds[count].player_stats[count2].bodyshots
                        legshot_before = legshot_before + data.data.rounds[count].player_stats[count2].legshots
                    }
                }
                for(var count2 = 0; count2 < killerArray.length; count2++) {
                    var killerArrayObj = killerArray[count2];
                    var killerArrayTime = killerArrayObj.split(" ").pop();
                    if(killerArrayTime == Math.min(...killtimeArray)) {
                        var firstBloodKiller = killerArrayObj.substring(0, killerArrayObj.lastIndexOf(' '))
                        if(firstBloodKiller == playerName + "#" + playerTag) {
                            totalFBs++;
                        }
                        break;
                    }
                }
            }

            for(var count = 0; count < data.data.players.all_players.length; count++) {
                if(data.data.players.all_players[count].name == playerName && data.data.players.all_players[count].tag == playerTag) {
                    if(data.data.metadata.mode == "Competitive") {
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
                        $('.matchview-playerrank-img').attr("src", rankIcons[data.data.players.all_players[count].currenttier -3])
                    }
                    var dmgperround = Math.round(data.data.players.all_players[count].damage_made / data.data.rounds.length);
                    $(`.insertDmgPerRound`).append(dmgperround);
                    if(data.data.players.all_players[count].team == "Blue") {
                        $('#team1-result').addClass("matchview-blue-standing")
                        $('#team2-result').addClass("matchview-red-standing")
                        if(data.data.teams.blue.has_won == true) {
                            $('.matchview-result-span').append("VICTORY");
                        } else {
                            $('.matchview-result-span').append("LOSS");
                        }
                        $('#team1-result').append(data.data.teams.blue.rounds_won)
                        $('#team2-result').append(data.data.teams.blue.rounds_lost)
                    } else if(data.data.players.all_players[count].team == "Red") {
                        $('#team1-result').addClass("matchview-red-standing")
                        $('#team2-result').addClass("matchview-blue-standing")
                        if(data.data.teams.red.has_won == true) {
                            $('.matchview-result-span').append("VICTORY");
                        } else {
                            $('.matchview-result-span').append("LOSS");
                        }
                        $('#team1-result').append(data.data.teams.red.rounds_won)
                        $('#team2-result').append(data.data.teams.red.rounds_lost)
                    }
                    $('.matchview-agent').attr("src", data.data.players.all_players[count].assets.agent.small)
                    agentUUID_url = data.data.players.all_players[count].assets.agent.small
                    var path2 = agentUUID_url.substring(agentUUID_url.indexOf('/'), agentUUID_url.lastIndexOf('/'));
                    var agentUUID = path2.split("/").pop();
                    $(`.ability-c-count`).append(data.data.players.all_players[count].ability_casts.c_cast);
                    $(`.ability-q-count`).append(data.data.players.all_players[count].ability_casts.q_cast);
                    $(`.ability-e-count`).append(data.data.players.all_players[count].ability_casts.e_cast);
                    $(`.ability-x-count`).append(data.data.players.all_players[count].ability_casts.x_cast);
                    $('.insertKDAhere').append(data.data.players.all_players[count].stats.kills + "/" + data.data.players.all_players[count].stats.deaths + "/" + data.data.players.all_players[count].stats.assists)
                    break;
                }
            }
            $.ajax({
                url: `https://valorant-api.com/v1/agents/${agentUUID}`,
                type: 'get',
                success: function(data2, jqXHR) {
                    for(var iconCount = 0; iconCount < data2.data.abilities.length; iconCount++) {
                        $(`.matchview-abilityicon-${iconCount}`).attr("src", data2.data.abilities[iconCount].displayIcon)
                        $(`.matchview-abilityname-${iconCount}`).append(data2.data.abilities[iconCount].displayName + ": ")
                    }
                    $('.insertFBsHere').append(totalFBs)
                    var totalShotsHit = headshot_before + bodyshot_before + legshot_before
                    const headshotPercent = Math.round((headshot_before / totalShotsHit) * 100)
                    const bodyshotPercent = Math.round((bodyshot_before / totalShotsHit) * 100)
                    const legshotPercent = Math.round((legshot_before / totalShotsHit) * 100)
                    $('.insertHeadshotPercent').append(headshotPercent + "%")
                    $('.insertBodyshotPercent').append(bodyshotPercent + "%")
                    $('.insertLegshotPercent').append(legshotPercent + "%")
                    $('.matchview-playername').append(playerName)
                }
            })
        }
    })
})