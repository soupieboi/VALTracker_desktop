function loadFade() {
    $('.app').fadeTo(150, 1);
}

function leaveFade() {
    $('.app').fadeTo(150, 0);
}

function toggle(){
    var sec = document.getElementById('sec');
    sec.classList.toggle('active');
}

$(document).ready(() => {
    loadFade();
    $('#psearch').on("click", function(){
        leaveFade();
        toggle();
        setTimeout(function() {
            window.location.href = "index.html";
        }, 500);
    });
    $('#profile').on("click", function(){
        leaveFade();
        toggle();
        setTimeout(function() {
            window.location.href = "profile.html";
        }, 500);
    });
    $('#collects-sub-bundles').on("click", function(){
        leaveFade();
        toggle();
        setTimeout(function() {
            window.location.href = "bundles.html";
        }, 500);
    });
    $('#collects-sub-buddys').on("click", function(){
        leaveFade();
        toggle();
        setTimeout(function() {
            window.location.href = "buddys.html";
        }, 500);
    });
});