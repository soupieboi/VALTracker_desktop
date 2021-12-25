var searchedPlayerName = sessionStorage.getItem("player_name");
var searchedPlayerTag = sessionStorage.getItem("player_tag");

var playerRegion = sessionStorage.getItem("player_region");

function makeCallAndBuildElements() {
    $.ajax({
        dataType: "json",
        url: `https://api.henrikdev.xyz/valorant/v1/account/${searchedPlayerName}/${searchedPlayerTag}`,
        type: 'get',
        success: function(data, xhr) {
            $('.player-pageheader').append(searchedPlayerName + "#" + searchedPlayerTag);
            $('.player-card-img').attr("src", data.data.card.small);
            $('.player-card-img').attr("onclick", `cardRedirect(this, this.src)`);
            //console.log("Card: " + data.data.card.small);
            $('.last-updated').append("Last updated: " + data.data.last_update);
            $('.player-account-level').append("Account Level: " + data.data.account_level);
            $('#player-region-span').append("Region: " + playerRegion.toUpperCase());
        },
    });
}

$(document).ready(() => {
    makeCallAndBuildElements();
});