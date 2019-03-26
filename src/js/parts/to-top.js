/* Scroll to top */

(function (){ 
 
    $(window).scroll( function() {
 
        if($(this).scrollTop() > 700) {
            $('#toTop').fadeIn();
        } else {
            $('#toTop').fadeOut();
        }
    });
 
    $('#toTop').click( function() {
        $('body,html').animate({scrollTop:0},800);
    });
 
})();