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
    const filePath = require('path').join(__dirname, '..', '..', 'assets', 'test.txt');

    ['', 'he'].forEach((langprefix) => {
      browser
        .resizeWindow(1024, 800)
        .sevenRefreshURL((langprefix ? '/' + langprefix : '') + '/contact/testform');

      browser
        .clearValue('[name="name"]').setValueAndChange('[name="name"]', 'My Name')
        .clearValue('[name="mail"]').setValueAndChange('[name="mail"]', 'test@localhost')
        .setValue('[name="subject[0][value]"]', 'test message subject')
        .setValue('[name="message[0][value]"]', 'test message body')
        // Date.
        .setValueAndChange('[name="field_date[0][value][date]"]', '2018-11-06')
        // Date and Time, filling only date.
        .setValueAndChange('[name="field_date_time[0][value][date]"]', '2018-11-06')
        // Timestamp: providing invalid value.
        .setValueAndChange('[name="field_timestamp[0][value][date]"]', '0476-11-21')
        .setValueAndChange('[name="field_timestamp[0][value][time]"]', '12:00:00')
        // Datetime range: starting datetime is more than the ending datetime.
        .setValueAndChange('[name="field_datetime_range[0][value][date]"]', '2018-12-01')
        .setValueAndChange('[name="field_datetime_range[0][value][time]"]', '12:00:00')
        .setValueAndChange('[name="field_datetime_range[0][end_value][date]"]', '2018-10-28')
        .setValueAndChange('[name="field_datetime_range[0][end_value][time]"]', '11:00:00')
        // Exiting datetime input.
        .click('[name="field_telephone_number[0][value]"]')
        .pause(300)
        .savefullScreenShot('01', langprefix)
        .click('input#edit-submit')
        // Waiting for error messages (Big Pipe).
        .waitForElementPresent('.messages--error', 5000)
        .setValueAndChange('[name="files[field_file_0]"]', filePath)
        .waitForElementPresent('.form-file.error', 5000)
        .elements('css selector', '.form-item__error-message,.form-item--error-message', (results) => {
          browser.savefullScreenShot((results.value.length ? '03' : '02'), langprefix, (results.value.length ? 'Inline error states' : 'Error states'));
        });
    });
  }
};
