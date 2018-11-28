/**
 * Sets select value by js.
 *
 * Properly works around browser differences and emits change event.
 *
 * @param {string} cssSelector
 *   The selector of the input field.
 * @param {string} value
 *   The new value for the select.
 * @param {function} callback
 *   A callback which will be called, when the creating the use is finished.
 *
 * @return {object}
 *   The 'browser' instance.
 */
exports.command = function setSelectValue(cssSelector, value = '', callback) {
  // document.querySelector('[name="formatted[0][format]"]').value='basic_html'
  // "basic_html"
  // document.querySelector('[name="formatted[0][format]"]').dispatchEvent(new Event('change'));
  // true
  const cssSelectorForOption = cssSelector + ' option[value="' + value + '"]';

  // Assert that the element is a select.
  this.assert.elementPresent(cssSelector);
  // Verifiy that the option with the provided value exists.
  this.assert.elementPresent(cssSelectorForOption);

  // Safari is a bit confused when trying to assert element type.
  const weirdBrowsers = ['Safari'];
  if (weirdBrowsers.indexOf(this.capabilities.browserName) < 0) {
    this.expect.element(cssSelector).to.be.a('select');
    this.expect.element(cssSelectorForOption).to.be.an('option');
  }

  // Set the value and trigger a change event.
  this
    .elements('css selector', cssSelector, (results) => {
      this
        .click(cssSelector) // To have focus...
        .perform(() => {
        // this.getAttribute(cssSelector, 'id', (result) => {
        //   const selectId = result.value;
          this.execute(
            function () {
              document.querySelector(arguments[0]).value = arguments[1];
              document.querySelector(arguments[0]).dispatchEvent(new Event('change'));
              // CKEDITOR.instances[arguments[0]].setData(arguments[1]);
            },
            [
              cssSelector,
              value
            ]
          );
        // });
      });
    });

  if (typeof callback === 'function') {
    callback.call(self);
  }

  return this;
}
