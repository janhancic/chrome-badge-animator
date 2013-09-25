# Chrome Badge Animator
JavaScript class to be used in Chrome extensions that want to animate the text on the extension badge.

## What is it?
This class will animate the text of your extension's badge. Think LED displays on train stations:

![LED displays](http://hancic.info/wp-content/uploads/2009/12/indoor-led-scrolling-signs.jpg "LED displays")

This is how it will actually look in Chrome:

![Chrome Badge Animator](http://hancic.info/wp-content/uploads/2009/12/animator.png "Chrome Badge Animator")

## How to use it?
You can look at the example extension in `sampleext`. You have to include the `src/BadgeAnimator.js` file in your extension (either in the manifest file or directly in the code somewhere). Once you've done that you can use it like this:

```javascript
// all parameters, apart from `text`, are optional
var animator = new BadgeTextAnimator( {
	text: 'this is some sample text', // text to be scrolled (or animated)
	interval: 200, // the "speed" of the scrolling
	repeat: false, // repeat the animation or not
	size: 6 // size of the badge
} );

animator.animate();

// call `animator.stop();` to stop the animation
```

## License
Licensed under MIT. See [LICENSE.md](https://github.com/janhancic/chrome-badge-animator/blob/master/LICENSE.md) file for details.