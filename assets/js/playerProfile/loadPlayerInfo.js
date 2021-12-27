var searchedPlayerName = sessionStorage.getItem("player_name");
var searchedPlayerTag = sessionStorage.getItem("player_tag");

var playerRegion = sessionStorage.getItem("player_region");

function makeCallAndBuildElements() {
    $.ajax({
        dataType: "json",
        url: `https://api.henrikdev.xyz/valorant/v1/account/${searchedPlayerName}/${searchedPlayerTag}`,
        type: 'get',
        success: function(data, xhr) {
            $('.player-pageheader').append(data.data.name + "#" + data.data.tag);
            $('.player-card-img').attr("src", data.data.card.small);
            $('.player-card-img').attr("onclick", `cardRedirect(this, this.src)`);
            //console.log("Card: " + data.data.card.small);
            $('.last-updated').append("Last updated: " + data.data.last_update);
            $('.player-account-level').append("Account Level: " + data.data.account_level);
            $('#player-region-span').append("Region: " + playerRegion.toUpperCase());
            var checkForS = data.data.name.slice(-1);
            if(checkForS.toLowerCase() == "s") {
                $('.insert-playername').append(data.data.name + "' Last Matches")
            } else {
                $('.insert-playername').append(data.data.name + "'s Last Matches")

            }
        },
    });
}

$(document).ready(() => {
    makeCallAndBuildElements();
});