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
        .sevenRefreshURL((langprefix ? '/' + langprefix : '') + '/contact/testform');

      browser
        .clearValue('[name="name"]').setValue('[name="name"]', 'My Name')
        .clearValue('[name="mail"]').setValue('[name="mail"]', 'test@localhost')
        .setValue('[name="subject[0][value]"]', 'test message subject')
        .setValue('[name="message[0][value]"]', 'test message body')
        // Date.
        .setDateValue('[name="field_date[0][value][date]"]', '2018-11-06')
        // Date and Time, filling only date.
        .setDateValue('[name="field_date_time[0][value][date]"]', '2018-11-06')
        // Timestamp: providing invalid value.
        .setDateValue('[name="field_timestamp[0][value][date]"]', '0476-11-21')
        .setValue('[name="field_timestamp[0][value][time]"]', '12:00:00')
        // Datetime range: starting datetime is more than the ending datetime.
        .setDateValue('[name="field_datetime_range[0][value][date]"]', '2018-12-01')
        .setValue('[name="field_datetime_range[0][value][time]"]', '12:00:00')
        .setDateValue('[name="field_datetime_range[0][end_value][date]"]', '2018-10-28')
        .setValue('[name="field_datetime_range[0][end_value][time]"]', '11:00:00')
        // Exiting datetime input.
        .click('[name="field_telephone_number[0][value]"]')
        .pause(300)
        .savefullScreenShot('01', langprefix)
        .click('input#edit-submit', () => {
          browser
            .waitForElementPresent('.messages--error', 5000)
            .setValue('[name="files[field_file_0]"]', path.resolve(__dirname + path.sep + 'test.txt'), () => {
              browser
                // Exiting file input.
                .click('[name="field_telephone_number[0][value]"]')
                .waitForElementPresent('.form-file.error', 5000);
            })
            .elements('css selector', '.form-item__error-message,.form-item--error-message', (results) => {
              browser.savefullScreenShot((results.value.length ? '03' : '02'), langprefix, (results.value.length ? 'Inline error states' : 'Error states'));
            });
        });
    });
  }
};
