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
var path = document.location.pathname;
var path2 = path.substring(path.indexOf('/'), path.lastIndexOf('/'));
var directoryName = path2.split("/").pop();

$(document).ready(() => {
    console.log(directoryName)
    loadFade();
    $('#psearch').on("click", function(){
        leaveFade();
        toggle();
        setTimeout(function() {
            if(directoryName == "CollectablePages") {
                window.location.href = "../index.html";
            } else {
                window.location.href = "index.html";
            }
        }, 500);
    });
    $('#profile').on("click", function(){
        leaveFade();
        toggle();
        setTimeout(function() {
            if(directoryName == "CollectablePages") {
                window.location.href = "../profile.html";
            } else {
                window.location.href = "profile.html";
            }
        }, 500);
    });
    $('#collects-sub-bundles').on("click", function(){
        leaveFade();
        toggle();
        setTimeout(function() {
            if(directoryName == "CollectablePages") {
                window.location.href = "../bundles.html";
            } else {
                window.location.href = "bundles.html";
            }
        }, 500);
    });
    $('#collects-sub-skins').on("click", function(){
        leaveFade();
        toggle();
        setTimeout(function() {
            if(directoryName == "CollectablePages") {
                window.location.href = "../weaponskins.html";
            } else {
                window.location.href = "weaponskins.html";
            }
        }, 500);
    });
    $('#collects-sub-buddys').on("click", function(){
        leaveFade();
        toggle();
        setTimeout(function() {
            if(directoryName == "CollectablePages") {
                window.location.href = "../buddys.html";
            } else {
                window.location.href = "buddys.html";
            }
        }, 500);
    });
    $('.Classic').on("click", function(){
        leaveFade();
        setTimeout(function() {
            window.location.href = "CollectablePages/classic.html";
        }, 500);
    });
    $('.Shorty').on("click", function(){
        leaveFade();
        setTimeout(function() {
            window.location.href = "CollectablePages/shorty.html";
        }, 500);
    });
    $('.Frenzy').on("click", function(){
        leaveFade();
        setTimeout(function() {
            window.location.href = "CollectablePages/frenzy.html";
        }, 500);
    });
    $('.Ghost').on("click", function(){
        leaveFade();
        setTimeout(function() {
            window.location.href = "CollectablePages/ghost.html";
        }, 500);
    });
    $('.Sheriff').on("click", function(){
        leaveFade();
        setTimeout(function() {
            window.location.href = "CollectablePages/sheriff.html";
        }, 500);
    });
    $('.Stinger').on("click", function(){
        leaveFade();
        setTimeout(function() {
            window.location.href = "CollectablePages/stinger.html";
        }, 500);
    });
    $('.Spectre').on("click", function(){
        leaveFade();
        setTimeout(function() {
            window.location.href = "CollectablePages/spectre.html";
        }, 500);
    });
    $('.Bucky').on("click", function(){
        leaveFade();
        setTimeout(function() {
            window.location.href = "CollectablePages/bucky.html";
        }, 500);
    });
    $('.Judge').on("click", function(){
        leaveFade();
        setTimeout(function() {
            window.location.href = "CollectablePages/judge.html";
        }, 500);
    });
    $('.Bulldog').on("click", function(){
        leaveFade();
        setTimeout(function() {
            window.location.href = "CollectablePages/bulldog.html";
        }, 500);
    });
    $('.Guardian').on("click", function(){
        leaveFade();
        setTimeout(function() {
            window.location.href = "CollectablePages/guardian.html";
        }, 500);
    });
    $('.Phantom').on("click", function(){
        leaveFade();
        setTimeout(function() {
            window.location.href = "CollectablePages/phantom.html";
        }, 500);
    });
    $('.Vandal').on("click", function(){
        leaveFade();
        setTimeout(function() {
            window.location.href = "CollectablePages/vandal.html";
        }, 500);
    });
    $('.Marshal').on("click", function(){
        leaveFade();
        setTimeout(function() {
            window.location.href = "CollectablePages/marshal.html";
        }, 500);
    });
    $('.Operator').on("click", function(){
        leaveFade();
        setTimeout(function() {
            window.location.href = "CollectablePages/operator.html";
        }, 500);
    });
    $('.Ares').on("click", function(){
        leaveFade();
        setTimeout(function() {
            window.location.href = "CollectablePages/ares.html";
        }, 500);
    });
    $('.Odin').on("click", function(){
        leaveFade();
        setTimeout(function() {
            window.location.href = "CollectablePages/odin.html";
        }, 500);
    });
    $('.Melee').on("click", function(){
        leaveFade();
        setTimeout(function() {
            window.location.href = "CollectablePages/melee.html";
        }, 500);
    });
    $('.Card').on("click", function(){
        leaveFade();
        setTimeout(function() {
            window.location.href = "CollectablePages/cardsPage.html";
        }, 500);
    });
    $('.Title').on("click", function(){
        leaveFade();
        setTimeout(function() {
            window.location.href = "CollectablePages/titlesPage.html";
        }, 500);
    });
    $('.Spray').on("click", function(){
        leaveFade();
        setTimeout(function() {
            window.location.href = "CollectablePages/spraysPage.html";
        }, 500);
    });
});