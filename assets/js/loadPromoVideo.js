function showPromoVid(event) {
    $(".bundle-largeview").animate({
        scrollTop: 0
    }, {
        duration: 350,
    });
    $('html, body, .bundle-largeview').css("overflow", "hidden")
    $('.largeview-vid').css("display", "grid")
    $('.header-relative-div-largeview').css("display", "none")
    $('.header-relative-div-video').css("opacity", "1")
    setTimeout(function() {
        $('.largeview-vid').css("background-color", "rgba(0, 0, 0, 0.5)")
    }, 400)
}

function hideVideo() {
    $('.bundle-largeview').css("overflow", "auto")
    $('.header-relative-div-largeview').css("display", "block")
    $('.largeview-vid').css("display", "none")
    document.getElementById('largeview-vid-element').pause();
    setTimeout(function() {
        $('.largeview-vid').css("background-color", "rgba(0, 0, 0, 0)")
    }, 100)
}

//document.getElementById('largeview-vid-element').setAttribute()