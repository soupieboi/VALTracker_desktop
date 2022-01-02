$(document).ready(() => {
    //match-scoreboard, player-overview
    $('#match-scoreboard').on("click", function() {
        $('.matchview-wrapper-1').fadeTo(400, 0)
        $('#player-overview').toggleClass("active")
        $('#match-scoreboard').toggleClass("active")
        setTimeout(function() {
            $('.matchview-wrapper-1').css("display", "none")
            $('.matchview-wrapper-2').css("opacity", "0")
            $('.matchview-wrapper-2').css("display", "block")
            $('.matchview-wrapper-2').fadeTo(400, 1)
        }, 400)
    })
    $('#player-overview').on("click", function() {
        $('.matchview-wrapper-2').fadeTo(400, 0)
        $('#player-overview').toggleClass("active")
        $('#match-scoreboard').toggleClass("active")
        setTimeout(function() {
            $('.matchview-wrapper-2').css("display", "none")
            $('.matchview-wrapper-1').css("opacity", "0")
            $('.matchview-wrapper-1').css("display", "block")
            $('.matchview-wrapper-1').fadeTo(400, 1)
        }, 400)
    })
})