$(document).ready(() => {
    var path = sessionStorage.getItem("imgLink");
    var path2 = path.substring(path.indexOf('/'), path.lastIndexOf('/'));
    $('.pageheader').append(sessionStorage.getItem("cardName") + "")
    $('.small-img').attr("src", "https:" + path2 + "/smallart.png")
    $('.wide-img').attr("src", "https:" + path2 + "/wideart.png")
    $('.large-img').attr("src", "https:" + path2 + "/largeart.png")
});