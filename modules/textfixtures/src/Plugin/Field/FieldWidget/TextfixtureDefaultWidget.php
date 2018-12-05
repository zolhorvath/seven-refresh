<?php

namespace Drupal\textfixtures\Plugin\Field\FieldWidget;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\WidgetBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Plugin implementation of the 'textfixture_default' widget.
 *
 * @FieldWidget(
 *   id = "textfixture_default",
 *   label = @Translation("Text fixture"),
 *   field_types = {
 *     "textfixture"
 *   }
 * )
 */
class TextfixtureDefaultWidget extends WidgetBase {

  /**
   * {@inheritdoc}
   */
  public static function defaultSettings() {
    return [
      'type' => 'color',
      'placeholder' => '',
    ] + parent::defaultSettings();
  }

  /**
   * {@inheritdoc}
   */
  public function settingsForm(array $form, FormStateInterface $form_state) {
    $element['type'] = [
      '#type' => 'select',
      '#options' => [
        'search' => $this->t('Search'),
        'password' => $this->t('Password'),
        'color' => $this->t('Color'),
      ],
      '#required' => TRUE,
      '#title' => t('Input type'),
      '#default_value' => $this->getSetting('type'),
      '#description' => t('Type of the input field element.'),
    ];
    $element['placeholder'] = [
      '#type' => 'textfield',
      '#title' => t('Placeholder'),
      '#default_value' => $this->getSetting('placeholder'),
      '#description' => t('Text that will be shown inside the field until a value is entered. This hint is usually a sample value or a brief description of the expected format.'),
    ];
    return $element;
  }

  /**
   * {@inheritdoc}
   */
  public function settingsSummary() {
    $summary = [];

    $placeholder = $this->getSetting('placeholder');
    if (!empty($placeholder)) {
      $summary[] = t('Placeholder: @placeholder', ['@placeholder' => $placeholder]);
    }
    else {
      $summary[] = t('No placeholder');
    }

    $summary[] = t('Type: @type', ['@type' => $this->getSetting('type') ?: 'no type']);

    return $summary;
  }

  /**
   * {@inheritdoc}
   */
  public function formElement(FieldItemListInterface $items, $delta, array $element, array &$form, FormStateInterface $form_state) {
    $element['value'] = $element + [
      '#type' => $this->getSetting('type'),
      '#default_value' => isset($items[$delta]->value) ? $items[$delta]->value : NULL,
      '#placeholder' => $this->getSetting('placeholder'),
    ];
    return $element;
  }

}
