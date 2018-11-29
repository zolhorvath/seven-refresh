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
  const _self = this;
  // Year: dateparts[0], month: dateparts[1], day: dateparts[2];
  const dateparts = value.split('-');
  const fillWith = {
    chrome: dateparts[0] + this.Keys.TAB + dateparts[1] + dateparts[2]
  };

  this
    .setValue(cssSelector, (fillWith[this.capabilities.browserName] ? fillWith[this.capabilities.browserName] : value))
    .pause(1)
    .execute(
      function () {
        document.querySelector(arguments[0]).dispatchEvent(new Event('change'));
      },
      [cssSelector]
    );

  if (typeof callback === 'function') {
    callback.call(_self);
  }

  return this;

};
