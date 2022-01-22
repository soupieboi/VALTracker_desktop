const ipc = require('electron').ipcRenderer;
window.onload = function() {
  ipc.send('changeDiscordRP', `playersearch_acitivity`)

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
    $('#playersearch-loading-circle').css("display", "block")
    var inputValue = document.getElementById("playerNameSearch").value;
    var searchedPlayerName = inputValue.substring(0, inputValue.indexOf("#"));
    var searchedPlayerTag = inputValue.substring(inputValue.indexOf("#") + 1);

    if(inputValue == "") {
      replaceText("Search Field empty.")
      $('#playersearch-loading-circle').css("display", "none")
    } else {
      if (inputValue.indexOf('#') > -1) {
        replaceText("")
        event.preventDefault();
        var searchedPlayerName = inputValue.substring(0, inputValue.indexOf("#"));
        var searchedPlayerTag = inputValue.substring(inputValue.indexOf("#") + 1);
        var searchedRegion = document.getElementById('selected-region').value;
        $.ajax({
          url: `https://api.henrikdev.xyz/valorant/v1/account/${searchedPlayerName}/${searchedPlayerTag}`,
          type: 'get',
          success: function(data, xhr) {
            sessionStorage.setItem("player_name", data.data.name);
            sessionStorage.setItem("player_tag", data.data.tag);
            sessionStorage.setItem("player_region", searchedRegion);
            sessionStorage.setItem("puuid", data.data.puuid);
            var page = window.location.href;
            sessionStorage.setItem("last_page", page);
            window.location.href = "playerProfile.html";
          },
          error: function(xhr) {
            //get the status code
            if (xhr.status == 400) {
              replaceText('400, Bad Request');
              $('#playersearch-loading-circle').css("display", "none")
            }
            if (xhr.status == 401) {
              replaceText('401, Unauthorized');
              $('#playersearch-loading-circle').css("display", "none")
            }
            if (xhr.status == 403) {
              replaceText('403, Name/Tag Missing!');
              $('#playersearch-loading-circle').css("display", "none")
            }
            if (xhr.status == 404) {
              replaceText('404, No player found!');
              $('#playersearch-loading-circle').css("display", "none")
            }
            if (xhr.status == 405) {
              replaceText('405, Not allowed!');
              $('#playersearch-loading-circle').css("display", "none")
            }
            if (xhr.status == 415) {
              replaceText('415, unsupported Media Type');
              $('#playersearch-loading-circle').css("display", "none")
            }
            if (xhr.status == 429) {
              replaceText('429, Rate limit exceeded, try again later');
              $('#playersearch-loading-circle').css("display", "none")
            }
            if (xhr.status == 500) {
              replaceText('500, Internal Server Error');
              $('#playersearch-loading-circle').css("display", "none")
            }
            if (xhr.status == 502) {
              replaceText('502, Bad Gateway');
              $('#playersearch-loading-circle').css("display", "none")
            }
            if (xhr.status == 503) {
              replaceText('503, Service unavailable');
              $('#playersearch-loading-circle').css("display", "none")
            }
            if (xhr.status == 504) {
              replaceText('504, Gateway timeout');
              $('#playersearch-loading-circle').css("display", "none")
            }
          },
        });
      } else {
        replaceText("ERROR!\nRiot ID's require a #:\nRiot#NA1")
        document.getElementById("playerNameSearch").focus();
        document.getElementById("playerNameSearch").select();
      }
    }
  };
}