/**
 * @class
 * @constructor
 * A Chrome badge (extension button) text animator class.
 * 
 * @param {Object} options Configuration options. Available 
 *  options are: text (the text to display), interval (default: 
 *  500, how fast to animate), repeat (default: true, should the 
 *  text start animating from the beginning when animation 
 *  finishes), size (default: 6, the size of the badge text).
 */
function BadgeTextAnimator ( options ) {
	if ( options == null ) {
		throw new Error( 'You must pass options to the BadgeTextAnimator' );
	}

	this._options = {
		text: options.text,
		interval: ( options.interval == null ? 500 : options.interval ),
		repeat: ( options.repeat == null ? true : options.repeat ),
		size: ( options.size != null && options.size > 0 && options.size <= 6 ? options.size : 6 )
	};

	this._intervalId = null;
	this._currentIndex = 0;
}

/**
 * Start the animation of the badge text.
 */
BadgeTextAnimator.prototype.animate = function () {
	var spaces = [ '', ' ', '  ', '   ', '    ', '     ', '      ' ];
	this._setBadgeText( spaces[this._options.size] );

	this._doAnimate();

	this._intervalId = setInterval(
		function () {
			this._doAnimate();
		}.bind( this ),
		this._options.interval
	);
};

/**
 * Stops the animation.
 */
BadgeTextAnimator.prototype.stop = function () {
	clearInterval( this._intervalId );
	this._intervalId = null;

	this._setBadgeText( '' );
};

/** @private */
BadgeTextAnimator.prototype._doAnimate = function () {
	var startAt = this._currentIndex,
		cutAt = this._options.size,
		addBefore = false,
		chunk, difference;

	if ( this._currentIndex < this._options.size ) {
		cutAt = this._currentIndex + 1;
		addBefore = true;
		startAt = 0;
	}

	chunk = this._options.text.substr( startAt, cutAt );

	if ( chunk.length < this._options.size ) {
		difference = this._options.size - chunk.length;
		for ( var i = 0; i <= difference; i++ ) {
			if ( addBefore === true ) {
				chunk = ' ' + chunk;
			} else {
				chunk = chunk + ' ';
			}
		}
	}

	this._setBadgeText( chunk );

	this._currentIndex = this._currentIndex + 1;
	if ( this._currentIndex === this._options.text.length ) {
		if ( this._options.repeat === true ) {
			this._currentIndex = 0;
		} else {
			this.stop();
		}
	}
};

/** @private */
BadgeTextAnimator.prototype._setBadgeText = function ( text ) {
	browser.browserAction.setBadgeText( { text: text } );
};
