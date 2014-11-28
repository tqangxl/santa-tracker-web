goog.provide('app.Picker');

/**
 * Manages the background and foreground picker.
 * @constructor
 * @param {Scene} scene The scene object.
 */
app.Picker = function(scene) {
  this.elem = scene.elem;
  this.foreground = scene.foreground;
  this.background = scene.background;

  this.attachEvents_();
};

/**
 * Attaches events for picker interactions.
 * @private
 */
app.Picker.prototype.attachEvents_ = function() {
  this.elem.find('.fgs-up').on('click', this.handleChange_(0, -1));
  this.elem.find('.fgs-down').on('click', this.handleChange_(0, 1));
  this.elem.find('.bgs-left').on('click', this.handleChange_(-1, 0));
  this.elem.find('.bgs-right').on('click', this.handleChange_(1, 0));
};

/**
 * Create event handler to change background and foreground
 * @private
 * @param {number} bg This number is added to the selected background.
 * @param {number} fg This number is added to the selected foreground.
 * @return {function} event handler
 */
app.Picker.prototype.handleChange_ = function(bg, fg) {
  return function(e) {
    e.preventDefault();

    this.navigate(bg, fg);
  }.bind(this);
};

/**
 * Go to a different foreground or background
 * @param {number} bg This number is added to the selected background.
 * @param {number} fg This number is added to the selected foreground.
 */
app.Picker.prototype.navigate = function(bg, fg) {
  var bgNum = this.background.getPosition(bg),
      fgNum = this.foreground.getPosition(fg);

  window.location.replace('#postcard?bg=' + bgNum + '&fg=' + fgNum);
  if (bg !== 0) {
    window.santaApp.fire('sound-trigger', {
      name: 'sm_change_bg',
      args: [bgNum]
    });
  } else if (fg !== 0) {
    window.santaApp.fire('sound-trigger', {
      name: 'sm_change_fg',
      args: [fgNum]
    });
  }
};

/**
 * Get parameters from the url.
 * @param {string} bg The background parameter.
 * @param {string} fg The foreground parameter.
 */
app.Picker.prototype.fromUrl = function(bg, fg) {
  this.background.set(parseInt(bg, 10));
  this.foreground.set(parseInt(fg, 10));
};
