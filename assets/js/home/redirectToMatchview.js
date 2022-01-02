function loadMatchView(matchID, page) {
    let rawdata = fs.readFileSync(process.env.APPDATA + '/VALTracker/settings/userData.json');
    let dataToRead = JSON.parse(rawdata);
    var playerName = dataToRead.playerName
    var playerTag = dataToRead.playerTag
    sessionStorage.setItem("matchID", matchID)
    sessionStorage.setItem("player_name", playerName);
    sessionStorage.setItem("player_tag", playerTag);
    var path = page.split("/").pop();
    console.log(path);
    if(path == "fakeLoadingIndex.html") {
        var redirectPath = "index.html"
    } else {
        var redirectPath = page
    }
    sessionStorage.setItem("last_page", redirectPath);
    window.location.href = "./matchView.html"
}