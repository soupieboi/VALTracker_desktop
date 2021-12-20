function leaveToBundles() {
    var leaveShift = 1.05;
    var hiddenShift = 0.9;
    var endShift = 1;
    $('body').css('overflow', 'hidden');
    $('.bundle-largeview').css('transform', 'scale(' + leaveShift + ')');
    $('.bundle-largeview').fadeTo(200, 0);
    $('.header-relative-div-largeview').fadeTo(100, 0);
    setTimeout(function() {
        location.reload();
    }, 300)
}