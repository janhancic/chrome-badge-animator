window.onload = function() {
	var animator = new BadgeTextAnimator ( {
		text: 'this is some sample text', // text to be scrolled (or animated)
		interval: 200, // the "speed" of the scrolling
		repeat: false, // repeat the animation or not
		size: 6 // size of the badge
	} );

	animator.animate ();
};
