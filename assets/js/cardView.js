$(document).ready(() => {
    var path = sessionStorage.getItem("imgLink");
    var path2 = path.substring(path.indexOf('/') + 37, path.lastIndexOf('/'));
    $.ajax({
        dataType: "json",
        url: `https://valorant-api.com/v1/playercards/${path2}`,
        type: 'get',
        success: function(data, xhr) {
            $('.pageheader').append(data.data.displayName);
            $('.small-img').attr("src", data.data.smallArt);
            $('.wide-img').attr("src", data.data.wideArt);
            $('.large-img').attr("src", data.data.largeArt);
        }
    });
});