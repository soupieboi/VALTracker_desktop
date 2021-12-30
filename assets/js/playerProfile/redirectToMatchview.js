function loadMatchView(matchID) {
    sessionStorage.setItem("matchID", matchID)
    console.log(matchID)
    window.location.href = "./matchView.html"
}