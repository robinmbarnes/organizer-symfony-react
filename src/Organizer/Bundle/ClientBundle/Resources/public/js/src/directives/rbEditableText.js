module.exports = function () {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/bundles/organizerclient/js/templates/rbEditableText.html',
    require: 'ngModel',
    link: function(scope, elem, attrs, ngModel) {
      'use strict';

      var $staticTextElement = elem.children('div');
      var $editableTextElement = elem.children('input');

      $staticTextElement.on('click', function () {
        //Set the height of the input (height including padding) to be the same
        //as the height of the div containing the text (including margin + padding)
        var staticTextElementHeight = $staticTextElement.outerHeight(true);
        var editableTextElementHeightWithPadding = $editableTextElement.outerHeight();
        var editableTextElementHeightWithoutPadding = $editableTextElement.height();
        var editableTextElementPaddingHeight =
          editableTextElementHeightWithPadding - editableTextElementHeightWithoutPadding;
        var heightDifference = staticTextElementHeight - editableTextElementHeightWithPadding;
        $editableTextElement.height(
          (editableTextElementHeightWithPadding + heightDifference)
            - editableTextElementPaddingHeight
        );

        $staticTextElement.toggle();
        $editableTextElement.toggle().focus();
      });

      $editableTextElement.on('blur', function () {
        ngModel.$setViewValue($editableTextElement.val());
        ngModel.$render();
        scope.$apply();
        $staticTextElement.toggle();
        $editableTextElement.toggle();
      });

      scope.$watch(
        function () {
          return ngModel.$modelValue;
        },
        function () {
          $staticTextElement.text(ngModel.$modelValue);
          $editableTextElement.val(ngModel.$modelValue);
        }
      );
    }
  };
}