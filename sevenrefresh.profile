<?php

/**
 * @file
 * Contains code for Seven Refresh profile.
 */

use Drupal\Core\Url;

/**
 * Implements hook_toolbar().
 */
function sevenrefresh_toolbar() {
  $items['sevenrefresh_home'] = [
    '#type' => 'toolbar_item',
    'tab' => [
      '#type' => 'link',
      '#title' => t('Style Guide'),
      '#url' => Url::fromRoute('<front>'),
    ],
    '#weight' => 101,
  ];

  return $items;
}

/**
 * Implements hook_preprocess_HOOK() for menu__main.
 */
function sevenrefresh_preprocess_menu__main(&$variables) {
  // Makes main menu items inline.
  $variables['attributes']['class'][] = 'inline';
}
