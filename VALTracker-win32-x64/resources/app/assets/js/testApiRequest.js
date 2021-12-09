/*$.getJSON("https://valorant-api.com/v1/agents", function(data) {
    //console.log(data)
    var excludedList = [7]
    for(var count = 0; count < 1000; count++) {
        if(count === 7 || count in excludedList){
            continue;
        }
        console.log(data.data[count-1].displayName);
        if(count == undefined) {
            break;
        }
    }
    var icon = data.data;
    console.log(icon);
    console.log(Math.max(icon));
});
//Wenn jedes neue Unterteil ne nummer ist, so lange neue angeben bis Nummer nichts zurückgibt


window.addEventListener('DOMContentLoaded', () => {
    var playerName;
    $.getJSON("https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/Spirit/6996?api_key=RGAPI-ace9a246-5478-4c8d-bafb-0782a4b02ac1", function(data) {
        console.log(data.puuid);
        console.log(data.gameName);
        console.log(data.tagLine);
        playerName = data.puuid;

        const replaceText = (text) => {
          const element = document.getElementById("api-output");
          if (element) element.innerText = text
        }
        replaceText(playerName);
    });
})
*/