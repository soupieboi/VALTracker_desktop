function loadMatchView(matchID) {
    sessionStorage.setItem("matchID", matchID)
    window.location.href = "./matchView.html"
}