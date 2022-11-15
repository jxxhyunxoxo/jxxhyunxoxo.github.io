// $('.loader').fadeIn('fast').delay(1000).fadeOut('slow');
// $('#loader').fadeIn('slow').delay(1000).hide(0);

//paste this code under the head tag or in a separate js file.
	// Wait for window load
	$(window).load(function() {
		// Animate loader off screen
		$(".loader").fadeOut("slow");;
	});