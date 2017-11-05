$(document).ready(function() {
	// Sticky nav bar
	var nav = $("nav");
	var nvsp = $(".navspace");

	$(window).scroll(function(){

		if( $(this).scrollTop() > 650 ) {
			nav.addClass("nav-scrolled", function(){
				nvsp.addClass("no-nav-space");
			});
		} else {
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

	//Make double to simulate repeating
	$('.scroll-gallery').each(function(){
		$('.scroller', this).clone().appendTo(this);
	});
	// Add animations on scroll
	$(window).on('scroll', function () {
		var scrollTop   = $(window).scrollTop(),
				gallOffset  = $('#work').offset().top,
				distance    = (gallOffset - scrollTop);

		if(distance < 0) {
			$('.scroller').addClass('scroll-it');
		} else {
			$('.scroller').removeClass('scroll-it');
		}
	});

	//Lightbox Display with Clicked Image\
	$('.showcase img').click(function () {
		var source   = $(this).attr('src'),
				caption  = $(this).attr('alt');
		$('#lightBox img').attr({'src': source, 'alt': caption});
		$('#img-caption').text(caption);
		$('#lightBox').fadeIn();
	});

	$('#lightBox').click(function () {
		$(this).fadeOut();
	});

	$('.see-below .scroll-item').click(function(){
		var heading    = $('h3', this),
				describe   = $('p', this),
				image 		 = $('img', this);

		$('.open').removeClass('open');
		$('.description h3').remove();
		$('.description p').remove();
		$('.feature-image img').remove(); // If the window is open, just swap src
		$(this).closest('.scroll-holder').addClass('open');

		if($(this).hasClass('viewing') == true)	{
			$('.open .toggle-text').css('height', '0');
			var imagePath = image.attr('src');
			$('.open .toggle-text img').attr('src', imagePath);
		} else {

			$('.viewing').removeClass('viewing');

			$(this).addClass('viewing');

			image.clone().appendTo('.open .feature-image');
			heading.clone().appendTo('.open .description');
			describe.clone().appendTo('.open .description');
			function resizeGallery() {
				jQuery('.scroll-holder').each(function(){
					var fullHeight = jQuery('.half-holder', this).outerHeight();
					jQuery('.toggle-text', this).css('height', fullHeight);
				});
			}
			setTimeout(resizeGallery, 50);
		}
		jQuery(".scroll-holder:not(.active) .toggle-text").css('height', 0);

	});

});
