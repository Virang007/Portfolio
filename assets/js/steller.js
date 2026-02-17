
$(document).ready(function(){
	$(".nav-link").on('click', function(event) {

    	if (this.hash !== "") {

			event.preventDefault();

			var hash = this.hash;

			$('html, body').animate({
				scrollTop: $(hash).offset().top
			}, 700, function(){
				window.location.hash = hash;
			});
      	}
        
        // Auto-close navbar on mobile - Enhanced for better UX
        if($('.navbar-toggler').is(':visible')) {
            $('.navbar-collapse').collapse('hide');
        }
    });
    
    // Close mobile menu when clicking outside
    $(document).on('click', function(event) {
        var clickover = $(event.target);
        var $navbar = $(".navbar-collapse");
        var _opened = $navbar.hasClass("show");
        if (_opened === true && !clickover.hasClass("navbar-toggler") && clickover.parents('.navbar-collapse').length === 0) {
            $(".navbar-toggler").click();
        }
    });

	// Navbar scroll effect & Auto-hide logic - Optimized for mobile
	var lastScrollTop = 0;
	var delta = 5;
	var navbarHeight = $('.navbar').outerHeight();
	var didScroll = false;

	$(window).scroll(function() {
		didScroll = true;
	});

	// Check scroll position every 250ms for better performance
	setInterval(function() {
		if (didScroll) {
			hasScrolled();
			didScroll = false;
		}
	}, 250);

	function hasScrolled() {
		var st = $(window).scrollTop();
		
		// Affix logic
		if (st > 50) {
			$('.navbar').addClass('affix');
		} else {
			$('.navbar').removeClass('affix');
		}

		// Auto-hide logic - More sensitive on mobile
		if (Math.abs(lastScrollTop - st) <= delta)
			return;
		
		// Adjust sensitivity based on screen size
		var isMobile = $(window).width() <= 768;
		var scrollThreshold = isMobile ? navbarHeight / 2 : navbarHeight;
		
		if (st > lastScrollTop && st > scrollThreshold) {
			// Scroll Down
			$('.navbar').addClass('nav-hidden');
		} else {
			// Scroll Up
			if(st + $(window).height() < $(document).height()) {
				$('.navbar').removeClass('nav-hidden');
			}
		}
		
		lastScrollTop = st;
	}
	
	// Prevent hover effects on touch devices
	if ('ontouchstart' in window) {
		document.documentElement.classList.add('touch-device');
	}
});