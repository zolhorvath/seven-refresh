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

  $items['sevenrefresh_contact'] = [
    '#type' => 'toolbar_item',
    'tab' => [
      '#type' => 'link',
      '#title' => t('Test form'),
      '#url' => Url::fromRoute('entity.contact_form.canonical', [
        'contact_form' => 'testform',
      ]),
    ],
    '#weight' => 102,
  ];

  return $items;
}
