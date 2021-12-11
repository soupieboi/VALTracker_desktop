function loadFade() {
    $('.app').fadeTo(150, 1);
}

function leaveFade() {
    $('.app').fadeTo(150, 0);
}

$(document).ready(() => {
    loadFade();
    $('#psearch').on("click", function(){
        leaveFade();
        setTimeout(function() {
            window.location.href = "index.html";
        }, 300);
    });
    $('#profile').on("click", function(){
        leaveFade();
        setTimeout(function() {
            window.location.href = "profile.html";
        }, 300);
    });
    $('#collects-sub-bundles').on("click", function(){
        leaveFade();
        setTimeout(function() {
            window.location.href = "bundles.html";
        }, 300);
    });
});