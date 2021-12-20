function showPromoVid(event, id, weaponNums) {
    $(".bundle-largeview").animate({
        scrollTop: 0
    }, {
        duration: 350,
    });
    var video = document.getElementById("largeview-vid-element");
    video.currentTime = 0;
    $('html, body, .bundle-largeview').css("overflow", "hidden")
    $('.largeview-vid').css("display", "grid")
    $('.header-relative-div-largeview').css("display", "none")
    $('.header-relative-div-video').css("opacity", "1")
    setTimeout(function() {
        $('.largeview-vid').css("background-color", "rgba(0, 0, 0, 0.5)")
    }, 400)
    var chroma = sessionStorage.getItem("chroma");
    if(chroma == null) {
        chroma = 0;
    } else {
        chroma = chroma-1
    }
    $.ajax({
        url: `https://valorant-api.com/v1/weapons`,
        type: 'get',
        success: function(data, jqXHR) {
            const str = weaponNums;
            
            const slug1 = str.substring(str.indexOf('-') + 1); // 01-2020var x = '/Controller/Action?id=11112&value=4444';
            remove_after = slug1.indexOf('-');
            var result =  slug1.substring(0, remove_after);
                
            const slug2 = str.split('-').pop(); // 2020
            if(data.data[parseInt(slug1)].skins[parseInt(slug2)].chromas[chroma].streamedVideo) {
                video.setAttribute("src", data.data[parseInt(slug1)].skins[parseInt(slug2)].chromas[chroma].streamedVideo);
            } else if(data.data[parseInt(slug1)].skins[parseInt(slug2)].levels[data.data[parseInt(slug1)].skins[parseInt(slug2)].levels.length -1].streamedVideo) {
                video.setAttribute("src", data.data[parseInt(slug1)].skins[parseInt(slug2)].levels[data.data[parseInt(slug1)].skins[parseInt(slug2)].levels.length -1].streamedVideo);
            } else {
                video.setAttribute("src", data.data[parseInt(slug1)].skins[parseInt(slug2)].levels[data.data[parseInt(slug1)].skins[parseInt(slug2)].levels.length -1].streamedVideo);
            }
            //video.setAttribute("src", event)
        }
    })
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