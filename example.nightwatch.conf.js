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

  return settings;
})(require('./nightwatch.json'));
