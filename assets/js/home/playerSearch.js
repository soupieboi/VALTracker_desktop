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
      console.log(searchedPlayerName)
      console.log(searchedPlayerTag)
      $.ajax({
        url: `https://api.henrikdev.xyz/valorant/v1/account/${searchedPlayerName}/${searchedPlayerTag}`,
        type: 'get',
        success: function(data, xhr) {
          sessionStorage.setItem("player_name", searchedPlayerName);
          sessionStorage.setItem("player_tag", searchedPlayerTag);
          window.location.href = "playerProfile.html";
        },
        error: function(xhr) {
          //get the status code
          if (xhr.status == 400) {
            replaceText('400, Bad Request');
          }
          if (xhr.status == 401) {
            replaceText('401, Unauthorized');
          }
          if (xhr.status == 403) {
            replaceText('403, Name/Tag Missing!');
          }
          if (xhr.status == 404) {
            replaceText('404, No player found!');
          }
          if (xhr.status == 405) {
            replaceText('405, Not allowed!');
          }
          if (xhr.status == 415) {
            replaceText('415, unsupported Media Type');
          }
          if (xhr.status == 429) {
            replaceText('429, Rate limit exceeded, try again later');
          }
          if (xhr.status == 500) {
            replaceText('500, Internal Server Error');
          }
          if (xhr.status == 502) {
            replaceText('502, Bad Gateway');
          }
          if (xhr.status == 503) {
            replaceText('503, Service unavailable');
          }
          if (xhr.status == 504) {
            replaceText('504, Gateway timeout');
          }
       },
      });
    } else {
      replaceText("ERROR!\nRiot ID's require a #:\nRiot#NA1")
      document.getElementById("playerNameSearch").focus();
      document.getElementById("playerNameSearch").select();
    }
  };
}