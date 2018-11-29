/**
 * @file
 * Captures checkbox radio testform with different states.
 *
 * Error state's fileName vary by the state of the inline_form_errors module.
 */
module.exports = {
  '@tags': ['seven'],
  before(browser) {
    if (browser.drupalInstall) {
      browser.drupalInstall({
        installProfile: 'sevenrefresh'
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
  'Checked states'(browser) {
    ['', 'he'].forEach((langprefix) => {
      browser
        .resizeWindow(1024, 800)
        .sevenRefreshURL((langprefix ? '/' + langprefix : '') + '/contact/checkbox_radio');

      browser
        .click('[name="checkbox[value]"]')
        .click('[name="checkboxes[first]"]')
        .click('[name="checkboxes[second]"]')
        .click('[name="checkboxes[third]"]')
        .click('[name="radios"][value="second"]')
        .pause(300)
        .savefullScreenShot('01', langprefix);
    });
  },
  'Error states'(browser) {
    ['', 'he'].forEach((langprefix) => {
      browser
        .resizeWindow(1024, 800)
        .sevenRefreshURL((langprefix ? '/' + langprefix : '') + '/contact/checkbox_radio');

      browser
        .click('[name="checkbox[value]"]')
        .click('[name="checkboxes[first]"]')
        .click('[name="checkboxes[second]"]')
        .click('[name="checkboxes[third]"]')
        .submitForm('form.contact-message-checkbox-radio-form')
        .waitForElementPresent('.messages--error', 5000)
        .elements('css selector', '.form-item__error-message,.form-item--error-message', (results) => {
          browser.savefullScreenShot((results.value.length ? '03' : '02'), langprefix, (results.value.length ? 'Inline error states' : ''));
        });
    });
  }
};
