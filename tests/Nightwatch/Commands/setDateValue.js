/**
 * Sets date value by js.
 *
 * Properly works around browser differences.
 *
 * @param {string} cssSelector
 *   The selector of the input field.
 * @param {string} value
 *   Date as ISO-8601 string: yyyy-mm-dd.
 * @param {function} callback
 *   A callback which will be called, when the creating the use is finished.
 *
 * @return {object}
 *   The 'browser' instance.
 */
exports.command = function setDateValue(cssSelector, value = '', callback) {

  // Year: dateparts[0], month: dateparts[1], day: dateparts[2];
  const dateparts = value.split('-');

  const fillWith = {
    chrome: dateparts[0] + this.Keys.TAB + dateparts[1] + dateparts[2]
  };

  this.setValue(cssSelector, (fillWith[this.capabilities.browserName] ? fillWith[this.capabilities.browserName] : value));
  this.pause(1);

  if (typeof callback === 'function') {
    callback.call(self);
  }

  return this;

};
