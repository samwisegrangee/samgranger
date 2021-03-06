function resizeImages(){
	var ww = $(window).width();
	if (ww < 767){
		$('img').each(function(){
			var filePath = $(this).attr("src"),
					newPath  = filePath.replace('full-img', 'small-img');
			$(this).attr('src', newPath);
		});
	}
	if (ww > 767){
		$('img').each(function(){
			var filePath = $(this).attr("src"),
					newPath  = filePath.replace('small-img', 'full-img');
			$(this).attr('src', newPath);
		});
	}
}

function byzHub() {
	$('.wheel-box').each(function(){
		var halfHeight = ($(this).height())/2,
				moveItUp = '-'+(halfHeight-10)+'px';
		$('h2', this).css('margin-top', moveItUp);
	});
}

$(document).ready(function() {

	resizeImages();
	byzHub();

	$(window).resize(function(){
		resizeImages();
	});

	// Scroll Events
	$(window).on('scroll', function () {
		var scrollTop   = $(this).scrollTop(),
				navHeight   = $('nav').height(),
				workOffset  = $('#work').offset().top;

		// Sticky Nav Bar
		if(scrollTop > (workOffset-navHeight)){
			$("nav").addClass("nav-scrolled", function(){
				$(".navspace").addClass("no-nav-space");
			});
		} else {
			$("nav").removeClass("nav-scrolled")
		}

		//Animate Galleries
		if($('.opened').length > 0 && $('.faded-button').length < 1) {
			$('.button-long').addClass('faded-button');
		}

		//Animate Galleries
		if(scrollTop > workOffset) {
			$('.scroller').addClass('scroll-it');
		} else {
			$('.scroller').removeClass('scroll-it');
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
	//$('#home a').click(function(){
		//$('#byzantine-wheel .rivulet').addClass('spin-once');
	//});


	// Pop in Services Copy
	$('.work-column').click(function(){

		var client = $('.client-quote', this).text(),
				myself = $('.my-response', this).text();

		$('.work-explain .left-half p').text(client).addClass('fade-half');
		$('.work-explain .right-half p').html(myself).addClass('fade-whole');
		$('.work-explain').addClass('opened').removeClass('closed-up');
	});

	//Make double to simulate repeating
	$('.scroll-gallery').each(function(){
		$('.scroller', this).clone().addClass('gall-clone').appendTo(this);
		$(this).append('<div class="circle-holder"></div>');
	});

	// Make clickable gallery
	/*
	$('.scroller:not(.gall-clone) .scroll-item').each(function(){
		var container = $(this).closest(".scroll-gallery").find(".circle-holder");
		$('<div class="circle"></div>').appendTo(container);
	});

	$('.scroll-holder', ).each(function(){
		var gallId = $(this).attr('id');
		$('.scroller', this).each(function(){
			$('.scroll-item', this).addClass(function(i) {
				 return 'image-'+gallId+'_'+(i+1);
			});
		});

		$('.circle', this).attr('id', function(i) {
			 return 'circle-'+gallId+'_'+(i+1);
		});
	});

	$('.scroll-item').click(function(){

		$('.scroll-item').removeClass('viewed');
		var id = $(this).closest(".scroll-holder").prop("id"),
				num = $(this).attr('class').match(/\d+$/)[0];
		//console.log(id +' '+num);
		$('.circle-'+id+'_'+num).addClass('active-dot');
		//$(this).addClass('viewed');
	});*/

	/*$('.circle').click(function(){
		$('.active-dot').removeClass('active-dot');
		$(this).addClass('active-dot');
		var id = $(this).closest(".scroll-holder").prop("id"),
				num = $(this).attr('id').split('_').pop();

		$('.image-'+id+'_'+num).trigger('click');
		//console.log('.image-'+id+'_'+num);
	});*/



	// Move gallery based on click
	/*$('.scroll-item').click(function(){
		var thisWidth = $(this).width(),
				gallWidth = $(this).parent('.scroller').width(),
				widthAdd = 0,
		    prevLength = $(this).prevAll().length;

    for(i=0; i<prevLength; i++) {
        widthAdd = widthAdd+parseInt($(this).siblings().eq(i).width());
    }
		var percent = widthAdd/gallWidth;
		console.log('This comes in at ' + percent + '% of the gallery');
		console.log('This is '+ thisWidth + ' of '+ gallWidth +' with '+ widthAdd + 'coming before');
	});*/
	$('.grid-gallery .gallery-item').each(function(){
		var image = $('img', this),
				imgPath = image.attr('src');

		$(this).css('background-image', "url('../"+imgPath+"')");
	});

	//Lightbox Display with Clicked Image\
	$('.gallery-item').click(function () {
		var source   = $('img', this).attr('src'),
				caption  = $('img', this).attr('alt'),
				credits  = $('.credits', this),
				notes    = $('.notes', this),
				soloText = $('.this-alone', this);

		$('#lightBox img').attr({'src': source, 'alt': caption});
		credits.clone().appendTo('.grid-half:first-child');
		notes.clone().appendTo('.grid-half:last-child');
		soloText.clone().appendTo('.modal-content');


		$('#lightBox').fadeIn();
	});

	$('#lightBox').click(function () {
		$(this).fadeOut();
		$('.credits, .notes, .this-alone', this).remove();
	});

	// Scroll Gallery
	$('.see-below .scroll-item').click(function(){
		var heading  = $('h3', this),
				describe = $('.describe', this),
				image 	 = $('img', this),
				credits  = $('ul', this);

		$('.open').removeClass('open');
		$('.description h3').remove();
		$('.description p').remove();
		$('.feature-image img').remove(); // If the window is open, just swap src
		$('.credits ul').remove();
		$(this).closest('.scroll-holder').addClass('open');

		if($(this).hasClass('viewing') == true)	{
			$('.open .toggle-text').css('height', '0');
			var imagePath = image.attr('src');
			$('.open .toggle-text img').attr('src', imagePath);
			$('.toggle-svg').delay(500).addClass('closed');
			$('.open').removeClass('open');
		} else {

			$('.viewing').removeClass('viewing');

			$(this).addClass('viewing');

			image.clone().appendTo('.open .feature-image');
			heading.clone().appendTo('.open .description');
			describe.clone().appendTo('.open .description');
			credits.clone().appendTo('.open .credits');

			$('.toggle-svg').removeClass('closed');

			function resizeGallery() {
				jQuery('.scroll-holder').each(function(){
					var fullHeight = jQuery('.half-holder', this).outerHeight();
					jQuery('.toggle-text', this).css('height', fullHeight);
				});
			}
			setTimeout(resizeGallery, 50);
		}
		jQuery(".scroll-holder:not(.open) .toggle-text").css('height', 0);

	});

});
