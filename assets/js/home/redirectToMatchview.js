function loadMatchView(matchID, page) {
    let rawdata = fs.readFileSync(process.env.APPDATA + '/VALTracker/settings/userData.json');
    let dataToRead = JSON.parse(rawdata);
    var playerName = dataToRead.playerName
    var playerTag = dataToRead.playerTag
    sessionStorage.setItem("matchID", matchID)
    sessionStorage.setItem("player_name", playerName);
    sessionStorage.setItem("player_tag", playerTag);
    sessionStorage.setItem("last_page", page);
    window.location.href = "./matchView.html"
}