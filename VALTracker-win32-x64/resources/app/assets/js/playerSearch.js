window.onload=function(){

  const replaceText = (text) => {
    const element = document.getElementById("search-output");
    if (element) element.innerText = text
  }

  // Execute a function when the user releases a key on the keyboard
  $("#playerNameSearch").keyup(function(event) {
    var inputValue = document.getElementById("playerNameSearch").value;
    if (event.keyCode === 13) {
      if (inputValue.indexOf('#') > -1) {
        $("#playerNameSearchButton").click();
      } else {
        replaceText("ERROR!\nRiot ID's require a #:\nRiot#NA1")
        document.getElementById("playerNameSearch").focus();
        document.getElementById("playerNameSearch").select();
      }
    }
  });
  document.getElementById("playerNameSearchButton").onclick = function(event) {
    var inputValue = document.getElementById("playerNameSearch").value;
    var searchedPlayerName = inputValue.substring(0, inputValue.indexOf("#"));
    var searchedPlayerTag = inputValue.substring(inputValue.indexOf("#") + 1);

    if (inputValue.indexOf('#') > -1) {
      replaceText("")
      event.preventDefault();
      var searchedPlayerName = inputValue.substring(0, inputValue.indexOf("#"));
      var searchedPlayerTag = inputValue.substring(inputValue.indexOf("#") + 1);
      $.getJSON(`https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${searchedPlayerName}/${searchedPlayerTag}?api_key=RGAPI-418e6726-08f3-4059-a558-5ffdeb40f5bd`, function(data) {
        console.log(data.puuid);
        console.log(data.gameName);
        console.log(data.tagLine);
        var playerUUID = data.puuid;
  
        replaceText("you searched for: " + searchedPlayerName + "#" + searchedPlayerTag + "\n PUUID: " + playerUUID);
      }); 
    } else {
      replaceText("ERROR!\nRiot ID's require a #:\nRiot#NA1")
      document.getElementById("playerNameSearch").focus();
      document.getElementById("playerNameSearch").select();
    }
  };
}