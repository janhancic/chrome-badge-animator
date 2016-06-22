export default class ChromeBadgeAnimator {

  constructor (opts) {
    if (!opts) {
      throw new Error('[BTA] requires text in opts');
    }

    this._opts = {
      onAnimateEnd: opts.onAnimateEnd || noop,
      text: opts.text,
      interval: (opts.interval == null ? 500 : opts.interval),
      repeat: (opts.repeat == null ? true : opts.repeat),
      size: (opts.size != null && opts.size > 0 && opts.size <= 6 ? opts.size : 6)
    };

    this._intervalId = null;
    this._currentIndex = 0;
  }

  animate () {
    const spaces = [ '', ' ', '  ', '   ', '    ', '     ', '      ' ];
    this._setBadgeText(spaces[this._opts.size]);
    this._doAnimate();
    this._intervalId = setInterval(this._doAnimate, this._opts.interval);
  };

  stop () {
    clearInterval(this._intervalId);
    this._intervalId = null;
    this._opts.onAnimateEnd();
  };

  _doAnimate = () => {
    let startAt = this._currentIndex,
        cutAt = this._opts.size,
        addBefore = false,
        chunk,
        difference;

    if (this._currentIndex < this._opts.size) {
      cutAt = this._currentIndex + 1;
      addBefore = true;
      startAt = 0;
    }

    chunk = this._opts.text.substr(startAt, cutAt);

    if (chunk.length < this._opts.size) {
      difference = this._opts.size - chunk.length;
      for (let i = 0; i <= difference; i++) {
        if (addBefore === true) {
          chunk = ' ' + chunk;
        } else {
          chunk = chunk + ' ';
        }
      }
    }

    this._setBadgeText(chunk);

    this._currentIndex = this._currentIndex + 1;
    if (this._currentIndex === this._opts.text.length) {
      if (this._opts.repeat === true) {
        this._currentIndex = 0;
      } else {
        this.stop();
      }
    }
  };

  _setBadgeText (text) {
    chrome.browserAction.setBadgeText({ text });
  }

}

function noop () {}
