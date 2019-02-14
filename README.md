# Seven Refresh

⛔️ DEPRECATED ⛔️ Project is moved to [Claro Distribution](https://github.com/zolhorvath/clarodist/).

Drupal distribution for Seven refresh

## Getting

* `composer config repositories.'zolhorvath/seven-refresh' github
https://github.com/zolhorvath/seven-refresh.git`
* `composer require zolhorvath/seven-refresh`
* `drush si sevenrefresh`

## Automatic webpage captures

* Installed Drupal instance with this profile.
* `java -jar selenium-server-standalone-[VERSION].jar -port 4444`
  Selenium on port 4444.
* Change dir to the root of this profile.
* Copy `example.nightwatch.conf.js` as `nightwatch.conf.js` and override env
  vars, for example `settings.test_settings.default.launch_url`.
* `yarn`
  Get NodeJs dependencies (recommended node v8), and...
* `./node_modules/.bin/nightwatch`
  Create screenshots with the default env, which uses `chrome`, so it should be
  installed (and should be available for Selenium)

  Additional environments:
  * `firefox`
  * `safari` [How to enable Safari WebDriver][1]

  `./node_modules/.bin/nightwatch -e default,firefox,safari`
  To create screenshots in every defined env (parallelly).

  `./node_modules/.bin/nightwatch tests/Nightwatch/Tests/textInputTest.js`
  To run only a single test.
* Screenshots will be saved to `reports/screenshots/[testName]`.

## Further tools

* __Seven Developer Helper__ `sevendev` module
  Disables caches and switches on twig debugging. Not enabled by default.
* [Incubator][1] for Drupal 8 extension development
  A simple _Grunt Drupal Tasks_-based scaffolding tool what provides a flexible
  local environment for Drupal contrib extension development

[1]: https://gitlab.com/z.a.horvath/incubator
[2]:
http://developer.apple.com/documentation/webkit/testing_with_webdriver_in_safari
