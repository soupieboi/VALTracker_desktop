$(document).ready(() => {
    setTimeout(function() {
        var playerRegion = sessionStorage.getItem("player_region");
        var playerName = sessionStorage.getItem("player_name");
        var playerTag = sessionStorage.getItem("player_tag");
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
            },
        });
    }, 1000)
})