$(document).ready(() => {
    setTimeout(function() {
        var playerRegion = sessionStorage.getItem("player_region");
        var playerName = sessionStorage.getItem("player_name");
        var playerTag = sessionStorage.getItem("player_tag");
        $.ajax({
            dataType: "json",
            url: `https://api.henrikdev.xyz/valorant/v1/mmr-history/${playerRegion}/${playerName}/${playerTag}`,
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
                $('.player-rank').attr("src", rankIcons[data2.data[0].currenttier -3])
                function ispositive(n){
                    return 1/(n*0)===1/0
                }
                for(var count = 0; count < 5; count++) {
                    if(ispositive(data2.data[count].mmr_change_to_last_game) == true) {
                        $(`#match-rr-id-${count}`).append("+" + data2.data[count].mmr_change_to_last_game)
                    } else {
                        $(`#match-rr-id-${count}`).append(data2.data[count].mmr_change_to_last_game)
                    }
                }
                $('.user-rankrating').append(data2.data[0].ranking_in_tier)
            },
        });
    }, 1000)
})