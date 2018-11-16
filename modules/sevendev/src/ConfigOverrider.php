<?php

namespace Drupal\sevendev;

use Drupal\Core\Cache\CacheableMetadata;
use Drupal\Core\Config\ConfigFactoryOverrideInterface;

/**
 * Provides dev-helper overrides of Seven Refresh profile.
 */
class ConfigOverrider implements ConfigFactoryOverrideInterface {

  /**
   * {@inheritdoc}
   */
  public function loadOverrides($names) {
    $overrides = [];

    if (in_array('system.logging', $names)) {
      $overrides['system.logging'] = ['error_level' => 'verbose'];
    }

    if (in_array('system.performance', $names)) {
      $overrides['system.performance'] = [
        'css' => ['preprocess' => FALSE],
        'js' => ['preprocess' => FALSE],
      ];
    }

    return $overrides;
  }

  /**
   * {@inheritdoc}
   */
  public function getCacheSuffix() {
    return 'SevenDevConfigOverrider';
  }

  /**
   * {@inheritdoc}
   */
  public function createConfigObject($name, $collection = StorageInterface::DEFAULT_COLLECTION) {
    return NULL;
  }

  /**
   * {@inheritdoc}
   */
  public function getCacheableMetadata($name) {
    return new CacheableMetadata();
  }

}
