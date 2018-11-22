/**
 * @file
 * Captures checkbox radio testform with disabled inline_form_errors module.
 *
 * Works only if drupal commands are available.
 */
module.exports = {
  '@tags': ['seven'],
  before(browser) {
    if (browser.drupalInstall) {
      browser.drupalInstall({
        installProfile: 'sevenrefresh'
      }).drupalLoginAsAdmin(() => {
        browser
          .drupalRelativeURL('/admin/modules/uninstall')
          .waitForElementVisible('input[name="uninstall[inline_form_errors]"]', 2000)
          .click('input[name="uninstall[inline_form_errors]"]')
          .submitForm('form.system-modules-uninstall')
          .waitForElementPresent('form.system-modules-uninstall-confirm-form', 2000)
          .submitForm('form.system-modules-uninstall-confirm-form');
      });
    }
  },
  after(browser) {
    if (browser.drupalUninstall) {
      browser.drupalUninstall().end();
    }
    else {
      browser.end();
    }
  },
  'Default error states test'(browser) {
    if (browser.drupalInstall) {
      ['', 'he'].forEach((langprefix) => {
        browser
          .resizeWindow(1024, 800)
          .sevenRefreshURL((langprefix ? '/' + langprefix : '') + '/contact/checkbox_radio');

        browser
          .sevenRefreshURL('/contact/checkbox_radio')
          .click('[name="field_checkbox[value]"]')
          .click('[name="field_checkboxes[first]"]')
          .click('[name="field_checkboxes[second]"]')
          .click('[name="field_checkboxes[third]"]')
          .submitForm('form.contact-message-checkbox-radio-form');
        browser
          .waitForElementPresent('.messages--error', 5000)
          .elements('css selector', '.form-item__error-message,.form-item--error-message', (results) => {
            if (!results.value.length) {
              browser.currentTest.module = 'checkboxRadioTest';
              browser.savefullScreenShot('02', langprefix, 'Error states');
            }
          });
      });
    }
  }
};
