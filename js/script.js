$(document).ready(function(){
	// Sticky nav bar
	var nav = $("nav");
  var nvsp = $(".navspace");

	$(window).scroll(function(){
		if( $(this).scrollTop() > 650 ) {
			nav.addClass("nav-scrolled", function(){
        nvsp.addClass("no-nav-space");
      });
		}
		else {
			nav.removeClass("nav-scrolled")
		}
	});

  //Smooth scrolling between ""#anchor" links.
	$('a[href^="#"]').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash;
	    var $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 900, 'swing', function () {
	        window.location.hash = target;
	    });
	});
});
