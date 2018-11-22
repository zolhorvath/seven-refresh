/**
 * @file
 * Example nightwatch overrides.
 *
 * To personalize environment settings easily, copy this file to
 * `./nightwatch.conf.js` and modify that instead of directly manipulate
 * the main `nightwatch.json` configuration.
 */
module.exports = ((settings) => {
  // Customize test site url.
  settings.test_settings.default.launch_url = 'http://127.0.0.1/seven-test/docroot';
  // Custom arguments for Chrome.
  settings.test_settings.default.desiredCapabilities.chromeOptions.args = [
    'disable-gpu',
    'disable-web-security',
    'ignore-certificate-errors'
  ];
  // Real profile for Firefox.
  settings.test_settings.firefox.desiredCapabilities['moz:firefoxOptions'].args.push('-profile', '/path/to/profile');
  // Don't override full screen capture files.
  // If this isn't defined or true, then the generated pngs get overridden on
  // each test run.
  settings.test_settings.default.globals.fullScreenShotOverride = true;

  return settings;
})(require('./nightwatch.json'));
