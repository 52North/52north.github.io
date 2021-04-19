jQuery(function( $ ){

	// Local Scroll Speed
	$.localScroll({
		duration: 750
	});

	// Sticky Navigation
	
	$(window).scroll(function(){
		if(width > 960) {
            var scrollheight = $('.site-header').innerHeight()+1;
            $('.site-header').addClass('fixed');
            $('.fiftytwonorth-subheader').css('margin-top',scrollheight);
            $('.post-88 .entry-content').css('margin-top',scrollheight);
            $('a[name]').css('margin-top',"-"+scrollheight+"px");
            $('a[name]').css('border-top',scrollheight+"px solid transparent");
            $('a[id]').css('margin-top',"-"+scrollheight+"px");
            $('a[id]').css('border-top',scrollheight+"px solid transparent");
            $('.vc_tta-accordion .vc_active').css('margin-top',"-"+scrollheight+"px");
            $('.vc_tta-accordion .vc_active').css('border-top',scrollheight+"px solid transparent");
        }
    
	});

	// Mobile Menu
	$(".nav-header-main .genesis-nav-menu").addClass("responsive-menu").before('<div class="responsive-menu-icon"></div>');

	$(".responsive-menu-icon").click(function(){
		$(this).next(".nav-header-main .genesis-nav-menu").slideToggle();
	});

	// 959, not 960: show default logo on full+half 1920 resolution
	$(window).load(function(){
	
		width = $( window ).width();
		
		if(width > 960) {
			$('.nav-header-main .genesis-nav-menu').removeAttr('style');
			$('.responsive-menu > .menu-item').removeClass('menu-open');
		}
		
	});

	// 959, not 960: show default logo on full+half 1920 resolution
	$(window).resize(function(){

		width = $( window ).width();
		
		if(width > 960) {	
	
			$('.nav-header-main .genesis-nav-menu').removeAttr('style');
			$('.responsive-menu > .menu-item').removeClass('menu-open');
		}
	});

	$(".responsive-menu > .menu-item").click(function(event){
	
		if (event.target !== this)
		return;
			$(this).find(".sub-menu:first").slideToggle(function() {
			$(this).parent().toggleClass("menu-open");
		});
		
	});
	
	// remove doesn't work with resize
	$(window).resize(function(){
	
		width = $( window ).width();
		if(width > 943) {
			$(".site-header .mobile-title-area").hide();
			$(".nav-header-main .title-area").show();
		} else {
			$(".site-header .mobile-title-area").show();
			$(".nav-header-main .title-area").hide();
		}
		
	});
	
	$('.footer-widgets').prop('id', 'footer-widgets');

});