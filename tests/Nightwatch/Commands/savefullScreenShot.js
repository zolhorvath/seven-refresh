const path = require('path');
const fs = require('fs');

/**
 * Create and save a full-page 'screen' capture.
 *
 * @param {string} namePrefix
 *   Prefix for the file name, optional.
 * @param {string} nameSuffix
 *   Suffix for the file name, optional.
 * @param {string} name
 *   Test name override.
 * @param {bool} override
 *   Whether the destionation can be overridden if exists. True by default.
 *
 * @return {object}
 *   The 'browser' instance.
 */
exports.command = function savefullScreenShot(namePrefix = '', nameSuffix = '', name = '', override = (typeof this.globals.fullScreenShotOverride !== 'undefined' ? this.globals.fullScreenShotOverride : true)) {

  const _self = this;
  let nameComponents = [(name ? name : _self.currentTest.name), _self.capabilities.platform || _self.capabilities.platformName, _self.capabilities.browserName];
  if (
    _self.capabilities.mobileEmulationEnabled &&
    _self.options.desiredCapabilities.chromeOptions &&
    _self.options.desiredCapabilities.chromeOptions.mobileEmulation &&
    _self.options.desiredCapabilities.chromeOptions.mobileEmulation.deviceName) {
    nameComponents.push(_self.options.desiredCapabilities.chromeOptions.mobileEmulation.deviceName.replace(/\s/g, '').replace(/\//g, ''));
  }
  if (namePrefix) {
    nameComponents.unshift(namePrefix);
  }
  if (nameSuffix) {
    nameComponents.push(nameSuffix);
  }
  const fileName = nameComponents.join('--').replace(/\s/g, '-');
  let fileNameWithPath = [(this.options && this.options.screenshotsPath ?
    this.options.screenshotsPath : 'screenshots'), this.currentTest.module.split(path.sep).pop(), fileName].join(path.sep);

  if (!override && fs.existsSync(fileNameWithPath + '.png')) {
    let index = 0;
    while (fs.existsSync(`${fileNameWithPath}_${index}.png`)) {
      index++;
    }
    fileNameWithPath += `_${index}`;
  }

  this.getElementSize('html', function (result) {
    // Bigger height is a workaround for Safari and Gecko Webdriver.
    const weirdBrowsers = ['firefox', 'Safari'];
    const height = weirdBrowsers.indexOf(this.capabilities.browserName) < 0 ?
      result.value.height : result.value.height + 100;

    this.resizeWindow(Math.floor(result.value.width), Math.floor(height), () => {
      this
        .moveToElement('html', 0, 0)
        .saveScreenshot(fileNameWithPath + '.png');
    });
  });

  // Nightwatch doesn't like it when no actions are added in a command file.
  // https://github.com/nightwatchjs/nightwatch/issues/1792
  this.pause(1);

  return this;

};
