/* Mobile menu */

(function (){

    let menuButton = $('#menu__button'),
		menuMobile = $('.nav-list'),
		menuLink = $('.nav__link'),
		menuMobileOpen = 'nav-list--active';

	function screenWidthCheck() {
		if (menuButton.hasClass('active')) {
	        menuButton.removeClass('active');
	    } else {
	        menuButton.addClass('active');
	    }
	};

	menuButton.on('click', function(e) {
		e.preventDefault();
		menuMobile.toggleClass(menuMobileOpen);
		screenWidthCheck();
		console.log('Yes');
	});

	menuLink.on('click', function() {
		menuMobile.removeClass(menuMobileOpen);
		screenWidthCheck();
	});

	$(window).resize(function() {
		let w = $(window).width();
			if (w > 1024 ) {
			    menuMobile.removeAttr('style');
			    menuMobile.removeClass(menuMobileOpen);

			    if (menuButton.hasClass('active')) {
	       			menuButton.removeClass('active');
	       		}
			}
	});

})();