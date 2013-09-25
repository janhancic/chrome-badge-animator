function BadgeTextAnimator ( options ) {
	if ( options === undefined ) {
		return null;
	}

	this.options = {
		text: options.text,
		interval: ( options.interval === undefined ? 500 : options.interval ),
		repeat: ( options.repeat === undefined ? true : options.repeat ),
		size: ( options.size !== undefined && options.size > 0 && options.size <= 6 ? options.size : 6 )
	};

	this.intervalId = null;
	this.index = 0;
}

BadgeTextAnimator.prototype.doAnimate = function () {
	var startAt = this.index;
	var cutAt = this.options.size;
	var addBefore = false;
	if ( this.index < this.options.size ) {
		cutAt = this.index + 1;
		addBefore = true;
		startAt = 0;
	}

	var chunk = this.options.text.substr ( startAt, cutAt );

	if ( chunk.length < this.options.size ) {
		var difference = this.options.size - chunk.length;
		for ( var i = 0; i <= difference; i++ ) {
			if ( addBefore === true ) {
				chunk = ' ' + chunk;
			} else {
				chunk = chunk + ' ';
			}
		}
	}

	chrome.browserAction.setBadgeText ( { text: chunk } );

	this.index = this.index + 1;
	if ( this.index === this.options.text.length ) {
		if ( this.options.repeat === true ) {
			this.index = 0;
		} else {
			this.stop ();
		}
	}
};

BadgeTextAnimator.prototype.animate = function () {
	var spaces = Array ( '', ' ', '  ', '   ', '    ', '     ', '      ' );
	chrome.browserAction.setBadgeText ( { text: spaces[this.options.size] } );

	this.doAnimate ();
	this.intervalId = setInterval ( (function ( self ) {
			return function () {
				self.doAnimate();
			};
		} ) ( this ),
		this.options.interval
	);
};

BadgeTextAnimator.prototype.stop = function () {
	clearInterval ( this.intervalId );
	this.intervalId = null;

	chrome.browserAction.setBadgeText ( { text: '' } );
};