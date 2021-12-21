const placeName = (name, tag) => {
    const element = document.getElementById("playername-header");
    if (element) element.innerText = name + "#" + tag
}

$(document).ready(() => {
    placeName(sessionStorage.getItem("player_name"), sessionStorage.getItem("player_tag"))
 });