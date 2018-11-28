/**
 * @file
 * Captures text input testform with different states.
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
  'Filled form'(browser) {
    const path = require('path');

    ['', 'he'].forEach((langprefix) => {
      browser
        .resizeWindow(1024, 800)
        .sevenRefreshURL((langprefix ? '/' + langprefix : '') + '/contact/textarea');

      browser
        .setValue('[name="message[0][value]"]', 'Test message body')
        // .waitForElementPresent('[name="formatted[0][value]"] + .cke .cke_wysiwyg_frame', 5000)
        .setEditorValue('[name="formatted[0][value]"]', 'Some text here...')
        .click('[class*="js-form-item-"][class*="-formatted-summary-0-value"] .link-edit-summary')
        .waitForElementVisible('[name="formatted_summary[0][summary]"]', 5000)
        .setValue('[name="formatted_summary[0][summary]"]', '..some summary here...')
        .waitForElementPresent('[name="formatted_summary[0][value]"] + .cke .cke_wysiwyg_frame', 5000)
        .setEditorValue('[name="formatted_summary[0][value]"]', '..and some body text here too.')
        .pause(300)
        .savefullScreenShot('01', langprefix);
    });
  },
  'Errors'(browser) {
    const path = require('path');

    ['', 'he'].forEach((langprefix) => {
      browser
        .resizeWindow(1024, 800)
        .sevenRefreshURL((langprefix ? '/' + langprefix : '') + '/contact/textarea');

      browser
        .setValue('[name="message[0][value]"]', 'Test message body with error')
        // .waitForElementPresent('[name="formatted[0][value]"] + .cke .cke_wysiwyg_frame', 5000)
        .setEditorValue('[name="formatted[0][value]"]', 'Some text here (this doesn\'t matter).')
        .click('[class*="js-form-item-"][class*="-formatted-summary-0-value"] .link-edit-summary')
        .waitForElementVisible('[name="formatted_summary[0][summary]"]', 5000)
        .setValue('[name="formatted_summary[0][summary]"]', '..some summary here, but no text in main area!')
        .click('input#edit-submit');

      browser
        .waitForElementPresent('.messages--error', 5000)
        .elements('css selector', '.form-item__error-message,.form-item--error-message', (results) => {
          browser.savefullScreenShot((results.value.length ? '03' : '02'), langprefix, (results.value.length ? 'Inline errors' : ''));
        });
    });
  }
};
